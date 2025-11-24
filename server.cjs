// Загружает переменные окружения из файла .env.
// Этот вызов должен быть как можно раньше в файле.
require('dotenv').config();
console.log("DEBUG: dotenv.config() был вызван.");

// Импорт необходимых модулей
const express = require('express');
const bodyParser = require('body-parser'); // Для парсинга JSON-тела запросов
const axios = require('axios');           // Для выполнения HTTP-запросов к API Telegram
const cors = require('cors');             // Для обработки Cross-Origin Resource Sharing

console.log("DEBUG: Все необходимые модули импортированы.");

const app = express();
// Порт для вашего бэкенда. Ищет порт в переменных окружения или использует 3001 по умолчанию.
const PORT = process.env.PORT || 3001;

// Получаем токен бота и ID чата из переменных окружения.
// ВАЖНО: Эти переменные должны быть определены в файле .env в корне проекта.
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

console.log(`DEBUG: TELEGRAM_BOT_TOKEN загружен: ${TELEGRAM_BOT_TOKEN ? 'Да' : 'Нет'}`);
console.log(`DEBUG: TELEGRAM_CHAT_ID загружен: ${TELEGRAM_CHAT_ID ? 'Да' : 'Нет'}`);

// Проверка на наличие критически важных переменных окружения.
if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не установлен в файле .env.');
  console.error('ERROR: Сервер не может быть запущен без этих переменных.');
  // Завершаем процесс Node.js, если критические переменные отсутствуют.
  process.exit(1); 
}

// Включаем CORS для всех запросов. В продакшене рекомендуется настроить более строго.
app.use(cors());
console.log("DEBUG: CORS middleware подключен.");

// Включаем парсинг JSON-тела запросов.
app.use(bodyParser.json());
console.log("DEBUG: bodyParser.json() middleware подключен.");

// Определение маршрута для обработки POST-запросов от фронтенда.
app.post('/api/send-telegram-message', async (req, res) => {
  console.log("DEBUG: Получен POST-запрос на /api/send-telegram-message");
  // Извлекаем данные (name и phone) из тела запроса.
  // Эти поля должны соответствовать тем, что отправляются из формы на фронтенде.
  const { name, phone } = req.body; 
  console.log(`DEBUG: Данные из формы - Имя: ${name}, Телефон: ${phone}`);

  // Проверка на обязательные поля.
  if (!name || !phone) {
    console.error('ERROR: Имя или Телефон не предоставлены в запросе.');
    return res.status(400).json({ error: 'Имя и Телефон обязательны.' });
  }

  // Формируем сообщение для Telegram.
  const message = `
Новая заявка на курс AI Agent Builder:
Имя: ${name}
Телефон: ${phone}
`;
  console.log("DEBUG: Сообщение для Telegram сформировано.");

  try {
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    console.log(`DEBUG: Отправка запроса в Telegram API: ${telegramApiUrl}`);
    
    // Отправляем сообщение в Telegram через API.
    await axios.post(telegramApiUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML' // Позволяет использовать HTML форматирование в сообщении.
    });

    console.log('SUCCESS: Сообщение успешно отправлено в Telegram.');
    res.status(200).json({ message: 'Заявка успешно отправлена!' });
  } catch (error) {
    console.error('ERROR: Ошибка при отправке сообщения в Telegram:');
    // Более детальный вывод ошибки, если она пришла от Telegram API
    if (error.response) {
      console.error('Telegram API response error:', error.response.data);
      console.error('Telegram API status:', error.response.status);
    } else {
      console.error('General error:', error.message);
    }
    res.status(500).json({ error: 'Не удалось отправить заявку в Telegram.' });
  }
});

// Запускаем сервер на указанном порту.
try {
  app.listen(PORT, () => {
    console.log(`SUCCESS: Сервер успешно запущен и слушает порт ${PORT}`);
  });
} catch (error) {
  console.error("CRITICAL ERROR: Не удалось запустить сервер:");
  console.error(error);
  process.exit(1); // Завершаем процесс, так как сервер не смог стартануть.
}
