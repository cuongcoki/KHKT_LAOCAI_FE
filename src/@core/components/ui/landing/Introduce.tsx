import { GradientButton } from "@core/components/ui/GradientButton";
import bannerCBlog from "@/assets/images/banner/banner_c_blog.jpg";
export const Introduce = () => {
  return (
    <section className="relative w-full h-[700px] rounded-2xl overflow-hidden shadow-lg">
      {/* Background Image */}
      <img
        src={bannerCBlog}
        alt="C Blog Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay (transparent) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Welcome */}
        <h1 className="font-cookie text-6xl text-white drop-shadow-lg">
          Welcome to C Blog
        </h1>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl">
          This is my personal blog where I share knowledge, experiences, and
          ideas.
        </p>

        {/* Topics */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Topics you can explore:
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-100 max-w-lg mx-auto">
            <li className="p-3 rounded-lg bg-white/10 backdrop-blur-md">
              🚀 New Technology
            </li>
            <li className="p-3 rounded-lg bg-white/10 backdrop-blur-md">
              🤖 Artificial Intelligence (AI)
            </li>
            <li className="p-3 rounded-lg bg-white/10 backdrop-blur-md">
              🎥 YouTube
            </li>
            <li className="p-3 rounded-lg bg-white/10 backdrop-blur-md">
              💰 Make Money Online (MMO)
            </li>
          </ul>
        </div>

        {/* Call to action */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <GradientButton text="Login" />
          <button className="px-6 py-3 text-lg rounded-lg bg-primary-dark text-white hover:bg-primary-light transition">
            Join now to become a member of{" "}
            <span className="font-bold">C_Blog</span>
          </button>
        </div>
      </div>
    </section>
  );
};
