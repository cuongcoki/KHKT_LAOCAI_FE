import toast from "react-hot-toast";
import { GlassToast } from "./GlassToast";

const showToast = {
  success: (message: string) => {
    toast.custom((t) => <GlassToast t={t} message={message} type="success" />);
  },
  error: (message: string) => {
    toast.custom((t) => <GlassToast t={t} message={message} type="error" />);
  },
  warning: (message: string) => {
    toast.custom((t) => <GlassToast t={t} message={message} type="warning" />);
  },
  info: (message: string) => {
    toast.custom((t) => <GlassToast t={t} message={message} type="info" />);
  },
};

export default showToast;
