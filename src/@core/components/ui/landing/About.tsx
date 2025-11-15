import { motion } from "framer-motion";
import { 
  Code, 
  Palette, 
  Cpu, 
  Utensils, 
  Dumbbell, 
  Github, 
  Linkedin, 
  Mail,
  ExternalLink,
  Sparkles,
  Heart,
  Bike,
  ChefHat,
  Brain
} from "lucide-react";

const About = () => {
  const techStacks = {
    frontend: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    backend: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"]
  };

  const projects = [
    {
      title: "Vietnam Share Me - Social Platform",
      url: "https://vietnamshareme.netlify.app/",
      description: "Nền tảng chia sẻ và kết nối cộng đồng",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      title: "E-Commerce Platform",
      url: "https://vietnamshareme.netlify.app/",
      description: "Hệ thống thương mại điện tử full-stack",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
    },
    {
      title: "Portfolio Website",
      url: "https://vietnamshareme.netlify.app/",
      description: "Website giới thiệu cá nhân và dự án",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
    }
  ];

  const aiProjects = [
    {
      title: "AI Video Generation",
      url: "https://www.youtube.com/watch?v=UVceBotxiVM&t=362s",
      thumbnail: "https://img.youtube.com/vi/UVceBotxiVM/maxresdefault.jpg"
    },
    {
      title: "Machine Learning Tutorial",
      url: "https://www.youtube.com/watch?v=u2UgxsXLfQI",
      thumbnail: "https://img.youtube.com/vi/u2UgxsXLfQI/maxresdefault.jpg"
    },
    {
      title: "AI Image Processing",
      url: "https://www.youtube.com/watch?v=4N6Wv74J9-o",
      thumbnail: "https://img.youtube.com/vi/4N6Wv74J9-o/maxresdefault.jpg"
    }
  ];

  const hobbies = [
    {
      title: "Nấu ăn",
      icon: <ChefHat className="w-8 h-8" />,
      items: [
        { name: "Bánh gà ", image: "https://file.hstatic.net/200000700229/article/lam-banh-ga-pho-mai-bang-noi-chien-khong-dau-1_6e5e8d829bac4a30a1c57b3fa726411e.jpg" },
        { name: "Mỳ cay Hàn Quốc", image: "https://vcdn1-dulich.vnecdn.net/2023/12/04/my-cay-jpeg-4190-1701685273.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=QI7JzUrvY60yFmWHTXYqPA" },
        { name: "Lẩu Thái chua cay", image: "https://i-giadinh.vnecdn.net/2022/12/17/Thanh-pham-1-1-5372-1671269525.jpg" }
      ]
    },
    {
      title: "Thể thao",
      icon: <Dumbbell className="w-8 h-8" />,
      activities: ["Đạp xe", "Chạy bộ", "Gym"],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-light to-primary-dark rounded-full blur-2xl opacity-30 animate-pulse" />
           <img
  src="https://cdn.sanity.io/images/s66cl962/production/2eaa0635971ab4c50e67d8203273241b2383ae0c-720x1280.png"
  alt="Trần Đình Cương"
  className="relative w-40 h-40 object-cover border-4 rounded-full border-white shadow-2xl object-top"
/>

            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary-light to-primary-dark p-3 rounded-full shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent">
            Trần Đình Cương
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">FullStack Developer</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://github.com"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://linkedin.com"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Linkedin className="w-6 h-6 text-blue-600" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="mailto:cuong@example.com"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Mail className="w-6 h-6 text-red-600" />
            </motion.a>
          </div>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Tôi là một con người <span className="text-primary-dark font-semibold">thân thiện</span>, luôn 
            <span className="text-primary-dark font-semibold"> tìm tòi và khám phá</span> những công nghệ mới. 
            Với <span className="text-primary-dark font-semibold">ý chí cầu tiến</span> và đam mê học hỏi không ngừng, 
            tôi không ngừng phát triển bản thân mỗi ngày để trở thành phiên bản tốt hơn.
          </p>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-12">
            <Code className="w-8 h-8 text-primary-dark" />
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Tech Stack</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-transparent hover:border-primary-light transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStacks.frontend.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-transparent hover:border-primary-dark transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStacks.backend.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Web Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              💻 Dự Án Web & Mobile
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Một số sản phẩm tôi đã xây dựng</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-5 h-5 text-primary-dark" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {project.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* AI Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">AI Projects</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Video AI và Machine Learning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiProjects.map((project, index) => (
              <motion.a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                    <div className="bg-red-600 p-4 rounded-full transform group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {project.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Hobbies Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Sở Thích</h2>
            </div>
          </div>

          {/* Cooking */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">Nấu ăn</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {hobbies[0].items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                      {item.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sports */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-primary-light to-primary-dark rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto">
                <img
                  src={hobbies[1].image}
                  alt="Sports"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-12 flex flex-col justify-center text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Bike className="w-8 h-8" />
                  <h3 className="text-3xl font-bold">Thể thao</h3>
                </div>
                <div className="space-y-4">
                  {hobbies[1].activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-xl">{activity}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-light to-primary-dark rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Hãy kết nối với tôi!
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Luôn sẵn sàng cho những dự án thú vị và cơ hội hợp tác mới
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:cuong@example.com"
              className="inline-flex items-center gap-2 bg-white text-primary-dark px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <Mail className="w-5 h-5" />
              Liên hệ ngay
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;