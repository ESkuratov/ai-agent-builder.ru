import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import axios from 'axios'; // Import axios

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false); // New state for success message
  const [submitError, setSubmitError] = useState('');      // New state for error message
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation and body scroll lock
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      // Reset form and messages when modal opens
      setFormData({ name: '', phone: '' });
      setErrors({ name: '', phone: '' });
      setSubmitSuccess(false);
      setSubmitError('');
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const validate = () => {
    const newErrors = { name: '', phone: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
      isValid = false;
    }

    // Remove non-digit characters for length check
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, введите номер телефона';
      isValid = false;
    } else if (phoneDigits.length < 10) { // Assuming a minimum of 10 digits for a valid phone number
      newErrors.phone = 'Введите корректный номер телефона (минимум 10 цифр)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(''); // Clear previous errors
      setSubmitSuccess(false); // Clear previous success

      try {
        // Send form data to your backend endpoint
        const response = await axios.post('http://localhost:3001/api/send-telegram-message', formData);
        
        if (response.status === 200) {
          setSubmitSuccess(true);
          // Optional: Close modal after a short delay or immediately
          setTimeout(() => {
            onClose();
            // Reset success/error states for next modal open
            setSubmitSuccess(false); 
          }, 3000); // Close after 3 seconds
        } else {
          setSubmitError('Произошла ошибка при отправке заявки.');
        }
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        setSubmitError('Не удалось отправить заявку. Попробуйте еще раз.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-1"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold font-heading text-textMain mb-2">
          Записаться на курс
        </h3>
        <p className="text-textSec mb-6">
          Оставьте свои контакты. Мы свяжемся с вами в течение 15 минут для оформления доступа.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-textMain mb-1.5">
              Имя <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                if (errors.name) setErrors({...errors, name: ''});
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white ${errors.name ? 'border-error' : 'border-gray-200'}`}
              placeholder="Иван Иванов"
            />
            {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-textMain mb-1.5">
              Телефон <span className="text-error">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                setFormData({...formData, phone: e.target.value});
                if (errors.phone) setErrors({...errors, phone: ''});
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white ${errors.phone ? 'border-error' : 'border-gray-200'}`}
              placeholder="+7 (999) 000-00-00"
            />
            {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone}</p>}
          </div>
          
          {submitSuccess && (
            <p className="text-emerald-600 text-center text-sm">Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.</p>
          )}
          {submitError && (
            <p className="text-red-600 text-center text-sm">{submitError}</p>
          )}

          <Button 
            type="submit" 
            fullWidth 
            disabled={isSubmitting}
            className={`mt-2 ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
          >
            {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
          </Button>
          
          <p className="text-xs text-center text-textSec mt-4">
            Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
          </p>
        </form>
      </div>
    </div>
  );
};