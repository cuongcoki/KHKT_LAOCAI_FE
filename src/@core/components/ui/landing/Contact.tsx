import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Send,
  MessageCircle,
  Clock,
  Globe,
} from "lucide-react";
import { useState } from "react";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Địa chỉ",
      value: "Tổ 4, Phường Phú Xá, Thái Nguyên",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Số điện thoại",
      value: "0976 994 116",
      link: "tel:0976994116",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "ccoki@gmail.com",
      link: "mailto:ccoki@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Giờ làm việc",
      value: "Thứ 2 - Chủ nhật: 8:00 - 22:00",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      url: "https://www.facebook.com/",
      color: "bg-[#1877F2] hover:bg-[#166FE5]",
      username: "@cuong.ccoki",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      url: "https://www.instagram.com/cuong.ccoki/",
      color: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600",
      username: "@cuong.ccoki",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      url: "https://www.youtube.com/@ungdungai5",
      color: "bg-[#FF0000] hover:bg-[#CC0000]",
      username: "@ungdungai5",
    },
    {
      name: "TikTok",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      url: "https://www.tiktok.com/@c_coki",
      color: "bg-black hover:bg-gray-900",
      username: "@c_coki",
    },
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/cuongcoki",
      color: "bg-gray-800 hover:bg-gray-900",
      username: "@cuongcoki",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block p-4 bg-gradient-to-r from-primary-light to-primary-dark rounded-full mb-6"
          >
            <MessageCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent">
            Liên Hệ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hãy kết nối với tôi! Tôi luôn sẵn sàng lắng nghe và hợp tác trên các dự án thú vị.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 dark:text-white mb-8"
            >
              Thông Tin Liên Hệ
            </motion.h2>

            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group"
              >
                {info.link ? (
                  <a
                    href={info.link}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div
                      className={`p-3 bg-gradient-to-br ${info.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {info.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-primary-dark transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                    <div
                      className={`p-3 bg-gradient-to-br ${info.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {info.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {info.value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.9450438650447!2d105.84230927610018!3d21.54900408023365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313521406ca0840d%3A0x40cb6f8d2cad2168!2sThai%20Nguyen%20University%20of%20Technology!5e0!3m2!1sen!2sus!4v1760602046074!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>


            
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Gửi Tin Nhắn
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:border-primary-dark focus:outline-none transition-all"
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:border-primary-dark focus:outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Tin nhắn
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:border-primary-dark focus:outline-none transition-all resize-none"
                  placeholder="Viết tin nhắn của bạn..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary-light to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Gửi tin nhắn
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Globe className="w-8 h-8 text-primary-dark" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Kết Nối Trên Mạng Xã Hội
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
                  <div
                    className={`${social.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {social.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                    {social.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {social.username}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-light to-primary-dark rounded-3xl p-12 text-center shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu dự án của bạn?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Hãy liên hệ với tôi ngay hôm nay để biến ý tưởng của bạn thành hiện thực!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:0976994116"
              className="inline-flex items-center gap-2 bg-white text-primary-dark px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              <Phone className="w-5 h-5" />
              Gọi ngay
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:ccoki@gmail.com"
              className="inline-flex items-center gap-2 bg-white/20 text-white border-2 border-white px-8 py-4 rounded-full font-bold backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              <Mail className="w-5 h-5" />
              Gửi email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contacts;