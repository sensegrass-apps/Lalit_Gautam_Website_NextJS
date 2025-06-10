import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('success'); // 'success' or 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile || !/^[0-9]{10,15}$/.test(formData.mobile.replace(/\s+/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number (10-15 digits)';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters long';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFeedbackType('success');
        setFeedbackMessage('Message sent successfully! You will receive a confirmation email shortly.');
        setShowFeedback(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          mobile: '',
          subject: '',
          message: ''
        });
      } else {
        setFeedbackType('error');
        setFeedbackMessage(data.message || 'Failed to send message. Please try again.');
        setShowFeedback(true);
        
        // Handle validation errors from server
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      setFeedbackType('error');
      setFeedbackMessage('Network error. Please check your connection and try again.');
      setShowFeedback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Countdown and auto-close effect
  useEffect(() => {
    let timer;
    if (showFeedback) {
      setCountdown(5);
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Use setTimeout to avoid setState during render
            setTimeout(() => {
              setShowFeedback(false);
              onClose();
            }, 0);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showFeedback, onClose]);

  const closeFeedback = () => {
    setShowFeedback(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-lg max-h-[95vh] overflow-hidden shadow-2xl">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Get In Touch</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex flex-col h-full max-h-[calc(95vh-64px)]">
            <div onSubmit={handleSubmit} className="flex-1 flex flex-col">
              {/* Scrollable Form Fields */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {/* Name and Email in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:bg-white'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:bg-white'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Mobile and Subject in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm ${
                        errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:bg-white'
                      }`}
                      placeholder="Your phone"
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm ${
                        errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:bg-white'
                      }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm ${
                      errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:bg-white'
                    }`}
                    placeholder="Tell me about your project, question, or how I can help..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
              </div>

              {/* Fixed Footer with Buttons */}
              <div className="border-t bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Popup */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className={`bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl transform animate-pulse`}>
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 p-1 rounded-full ${
                feedbackType === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {feedbackType === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-base ${
                  feedbackType === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {feedbackType === 'success' ? 'Message Sent!' : 'Something went wrong'}
                </h3>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{feedbackMessage}</p>
                <div className="flex items-center mt-3 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  Auto-closing in {countdown}s
                </div>
              </div>
              
              <button
                onClick={closeFeedback}
                className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;