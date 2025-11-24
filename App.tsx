import React, { useState } from 'react';
import { Header } from './components/Header';
import { Section, SectionHeader } from './components/Section';
import { Button } from './components/Button';
import { Accordion } from './components/Accordion';
import { HeroVisual } from './components/HeroVisual';
import { EnrollmentModal } from './components/EnrollmentModal';
import { PROBLEMS, SOLUTIONS, PROGRAM_MODULES, TESTIMONIALS, FAQS } from './constants';
import { Check, PenTool, Settings, Rocket, Bot } from 'lucide-react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-textMain font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      <Header />
      
      <EnrollmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-textMain leading-tight">
                Прототипируйте и запускайте <span className="text-primary">AI-агентов</span> за дни, а не месяцы.
              </h1>
              <p className="text-lg md:text-xl text-textSec max-w-lg leading-relaxed">
                Практический курс для продакт-менеджеров и аналитиков. Хватит ждать разработчиков — научитесь создавать рабочие прототипы и MVP на no-code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" showIcon onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                  Начать обучение
                </Button>
                <Button variant="secondary" onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}>
                  Программа курса
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-textSec pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://picsum.photos/30/30?random=${i+10}`} alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                </div>
                <span>400+ продакт-менеджеров уже с нами</span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS SECTION */}
      <Section background="gray" className="rounded-3xl mx-4 md:mx-8 my-8">
        <SectionHeader 
          title="Идеи AI застревают на старте?" 
          subtitle="У вас есть виденье, но технический барьер мешает реализации."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEMS.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6 text-error">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">{item.title}</h3>
              <p className="text-textSec leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SOLUTION SECTION */}
      <Section>
        <SectionHeader 
          title="Станьте тем, кто строит, а не ждет" 
          subtitle="Получите суперсилу превращать требования в работающий софт."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SOLUTIONS.map((item, idx) => (
            <div key={idx} className="bg-surface p-8 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">{item.title}</h3>
              <p className="text-textSec leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section background="gray">
        <SectionHeader title="От хаоса к четкой системе" />
        <div className="relative max-w-4xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-300 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "1", title: "Проектирование", desc: "Схема логики агента.", icon: PenTool },
              { step: "2", title: "Сборка (No-Code)", desc: "Сборка в n8n/Flowise.", icon: Settings },
              { step: "3", title: "Запуск (Test)", desc: "Деплой и итерации.", icon: Rocket }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none">
                <div className="w-24 h-24 bg-white border-4 border-primary text-primary rounded-full flex flex-col items-center justify-center mb-6 z-10 shadow-sm">
                  <s.icon size={28} className="mb-1" />
                  <span className="text-xs font-bold font-heading uppercase tracking-wider">Шаг {s.step}</span>
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">{s.title}</h3>
                <p className="text-textSec">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROGRAM SECTION */}
      <Section id="program">
        <SectionHeader 
          title="Что внутри: От теории к практике" 
          subtitle="Комплексная программа, созданная для не-инженеров."
        />
        <Accordion items={PROGRAM_MODULES} />
        <div className="text-center mt-12">
          <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            Записаться на курс
          </Button>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="reviews" background="gray">
        <SectionHeader title="Результаты наших студентов" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm flex flex-col h-full">
              <div className="flex items-center mb-6">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <div className="font-bold font-heading text-textMain">{t.name}</div>
                  <div className="text-sm text-textSec">{t.role}</div>
                </div>
              </div>
              <p className="text-textSec italic flex-grow">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 relative z-10">
            Получите фреймворк и навыки создания AI-агентов
          </h2>
          <p className="text-primary-100 mb-8 text-lg relative z-10">
            Единоразовая оплата. Доступ навсегда.
          </p>

          <div className="bg-white text-textMain rounded-2xl p-8 md:p-10 max-w-md mx-auto shadow-xl relative z-10">
            <div className="text-5xl font-extrabold font-heading text-primary mb-2">
              25 000 ₽
            </div>
            <div className="text-textSec text-sm mb-8 line-through decoration-red-400">
              Стандартная цена: 45 000 ₽
            </div>

            <ul className="text-left space-y-4 mb-8">
              {[
                "Пожизненный доступ ко всем модулям",
                "Шаблоны фреймворков и схемы",
                "Доступ в закрытое Discord сообщество",
                "Записи еженедельных Q&A сессий",
                "Сертификат о прохождении"
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <div className="bg-green-100 rounded-full p-1 mr-3">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-medium text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Button 
              fullWidth 
              className="mb-4 text-lg py-4 shadow-primary/30"
              onClick={() => setIsModalOpen(true)}
            >
              Получить доступ к курсу
            </Button>
            <p className="text-xs text-textSec">
              14 дней гарантии возврата денег. Без лишних вопросов.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="gray">
        <SectionHeader title="Остались вопросы?" />
        <Accordion items={FAQS} />
      </Section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
               <div className="bg-primary text-white p-1.5 rounded-lg">
                  <Bot size={20} />
               </div>
               <span className="font-heading font-bold text-xl text-white">
                 Agent<span className="text-primary">Builder</span>
               </span>
            </div>
            <p className="text-gray-400 text-sm">
              Помогаем продактам строить будущее.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            <a href="#" className="hover:text-white transition-colors">Служба поддержки</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} Agent Builder Курс. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default App;