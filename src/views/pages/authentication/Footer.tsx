import { Calendar, Eye, TrendingUp, Users } from "lucide-react";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//import image

import manhcuong from "../../../../public/avatar/manhcuong.jpg";
import tranminh from "../../../../public/avatar/tran minh.jpg";
import thay from "../../../../public/avatar/thay.jpg";

import bg_sb from "../../../../public/image/ai_sb/bg-sb.jpg";

const Footer = () => {
  return (
    <footer className="footer-container relative overflow-hidden">
      {/* Background Image - Layer mờ */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg_sb}
          alt="Background"
          className="w-full h-full object-cover  "
        />
        {/* Overlay tối để text dễ đọc hơn */}
        {/* <div className="absolute inset-0 bg-black/10"></div> */}
      </div>

      {/* Background Pattern với CSS */}
      <div className="footer-pattern-bg"></div>

      <div className="mx-auto py-2 px-4 sm:px-6 lg:px-8 relative z-10 flex justify-between items-center">
        {/* Main Section - Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
          {/* Research Team Members */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="h-4 w-4 text-primary-light" />
              <h3 className="copyright-subtext text-sm font-semibold uppercase tracking-wide text-white/90">
                <i className="text-primary-light ">Nhóm nghiên cứu</i>
              </h3>
            </div>
            <div className="flex">
              <div className="bg-white/10 backdrop-blur-sm border border-primary-light px-2 py-1 rounded-lg mr-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white/30">
                    <AvatarImage
                      src={tranminh}
                      alt="Trần Minh"
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      TM
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary-light truncate">
                      Trần Minh
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-primary-light px-2 py-1 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white/30">
                    <AvatarImage
                      src={manhcuong}
                      alt="Phan Mạnh Cường"
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      PC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary-light truncate">
                      Phan Mạnh Cường
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advisors */}
          <div>
            <div className="flex items-start justify-start gap-2 mb-2">
              <User className="h-4 w-4 text-primary-light " />
              <h3 className="copyright-subtext text-sm font-semibold uppercase tracking-wide ">
                <i className="text-primary-light ">Giáo viên hướng dẫn</i>
              </h3>
            </div>
            <div className="flex">
              <div className="bg-white/10 backdrop-blur-sm border border-primary-light px-2 py-1 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white/30">
                    <AvatarImage
                      src={thay}
                      alt="Trần Minh"
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      TM
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary-light  truncate">
                      Thầy Đặng Tuấn Thành
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="copyright-section ">
          <p className="copyright-text text-primary-light">
            © 2025 Trường THPT Chuyên Nguyễn Tất Thành, Lào Cai
          </p>
          <p className="copyright-subtext text-primary-light">
            Sản phẩm dự thi Khoa học Kỹ thuật tỉnh 2025
          </p>
        </div>
      </div>

      <div className="flex px-4 py-1 bg-gradient-to-r from-primary-dark to-primary-light/80 backdrop-blur-sm justify-end items-center gap-2 text-xs text-white/75 relative z-10">

        <div className="flex justify-end items-center md:items-end">
          <div className="flex flex-wrap justify-center gap-4 px-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-xs text-white">
                <span className="font-medium text-white">20</span> online
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-xs text-white">
                <span className="font-medium text-white">22</span> hôm nay
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs text-white">
                <span className="font-medium text-white">1,429</span> tháng này
              </span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs text-white">
                <span className="font-medium text-white">82,455</span> tổng
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
