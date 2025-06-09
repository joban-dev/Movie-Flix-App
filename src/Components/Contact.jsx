import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiUserLine, RiMailLine, RiMessageLine, RiMapPinLine, RiPhoneLine, RiTimeLine } from 'react-icons/ri';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Sidenav from './partials/Sidenav';
import backgroundimg from '/backgroundimage.jpg';

function Contact() {

  document.title = "MovieFlix | Contact Us";

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: <FaTwitter />, href: 'https://twitter.com', color: '#1DA1F2' },
    { icon: <FaFacebook />, href: 'https://facebook.com', color: '#1877F2' },
    { icon: <FaInstagram />, href: 'https://instagram.com', color: '#E4405F' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', color: '#0A66C2' },
  ];

  const contactInfo = [
    { icon: <RiMapPinLine />, title: 'Office Address', text: '123 Movie Street, Hollywood, CA' },
    { icon: <RiPhoneLine />, title: 'Phone Number', text: '+1 (123) 456-7890' },
    { icon: <RiTimeLine />, title: 'Working Hours', text: 'Mon - Fri: 9 AM - 6 PM' },
  ];

  return (
    <>
      <Sidenav />
      <div
        className="w-[80%] h-full overflow-auto overflow-x-hidden"
        style={{
          backgroundImage: `url(${backgroundimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1F1E24]/20 to-[#2A2930]/20"
        >
          <div className="w-full max-w-sm rounded-lg shadow-2xl p-4 border-2 border-[#6556CD] my-12 backdrop-blur-lg bg-[#2A2930]/70">
            <h1 className="text-xl font-bold text-center mb-4 text-[#b138e9] flex items-center justify-center">
              <RiMessageLine className="mr-2" />
              Contact Us
            </h1>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {[ 
                { id: 'name', icon: <RiUserLine />, type: 'text', placeholder: 'Enter your name' },
                { id: 'email', icon: <RiMailLine />, type: 'email', placeholder: 'Enter your email' },
                { id: 'message', icon: <RiMessageLine />, type: 'textarea', placeholder: 'Enter your message' },
              ].map(({ id, icon, type, placeholder }) => (
                <div key={id}>
                  <label className="text-xs font-semibold mb-1 text-zinc-300 flex items-center" htmlFor={id}>
                    {icon}
                    <span className="ml-2">{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                  </label>
                  {type === 'textarea' ? (
                    <textarea
                      id={id}
                      name={id}
                      value={formData[id]}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg bg-[#3A3940]/90 border-2 border-[#6556CD] text-white focus:outline-none focus:border-[#b138e9] transition-all duration-300"
                      rows="3"
                      placeholder={placeholder}
                      required
                    />
                  ) : (
                    <input
                      type={type}
                      id={id}
                      name={id}
                      value={formData[id]}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg bg-[#3A3940]/90 border-2 border-[#6556CD] text-white focus:outline-none focus:border-[#b138e9] transition-all duration-300"
                      placeholder={placeholder}
                      required
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-[#6556CD] text-white font-semibold rounded-lg hover:bg-[#b138e9] transition-all duration-300 flex items-center"
                >
                  <RiMailLine className="mr-2" />
                  Send Message
                </motion.button>
              </div>
            </form>

            {/* Divider */}
            <div className="my-4 border-t border-zinc-600"></div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-zinc-300">
              {contactInfo.map(({ icon, title, text }) => (
                <div key={title} className="flex items-center space-x-2">
                  <div className="text-lg text-[#b138e9]">{icon}</div>
                  <div>
                    <h2 className="font-semibold text-xs">{title}</h2>
                    <p className="text-xs">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-zinc-600"></div>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-3">
              {socialLinks.map(({ icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[${color}] transition-all duration-300"
                >
                  <div className="text-lg">{icon}</div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Contact;
