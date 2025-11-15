import toast, { Toast } from "react-hot-toast";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

export const GlassToast = ({
  t,
  message,
  type = "default",
}: {
  t: Toast;
  message: string;
  type?: "success" | "error" | "warning" | "info" | "default";
}) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
    default: <Info className="w-5 h-5 text-gray-400" />,
  };

  const borderColors = {
    success: "border-green-400/30",
    error: "border-red-400/30",
    warning: "border-yellow-400/30",
    info: "border-blue-400/30",
    default: "border-white/20",
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl
        bg-white/10 backdrop-blur-xl
        border ${borderColors[type]}
        shadow-lg shadow-black/20
        transform transition-all duration-300
        ${t.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
      `}
    >
      <div className="flex-shrink-0">{icons[type]}</div>

      <p className="text-sm text-white font-medium flex-1">{message}</p>

      <button
        onClick={() => toast.dismiss(t.id)}
        className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-4 h-4 text-white/60" />
      </button>
    </div>
  );
};
