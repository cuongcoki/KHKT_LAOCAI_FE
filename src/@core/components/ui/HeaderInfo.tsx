import { Plus } from "lucide-react";
import { Link } from "react-router";

interface Props {
  title: string;
  description: string;
  onAddNew?: string;
  addButtonText?: string;
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HeaderInfo: React.FC<Props> = ({
  title,
  description,
  onAddNew,
  addButtonText = "Thêm mới",
}) => {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-4 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
        <Link
          to={onAddNew as string}
          style={{
            background: `
    radial-gradient(
          circle at 0% 100%,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0.1) 40%,
          transparent 70%
        )
    `,
            boxShadow: "0 4px 20px rgba(255,255,255,0.25)",
          }}
          className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-gradient-to-r from-white/30 to-white/20 hover:from-white/40 hover:to-white/30 border border-white/40 text-white rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          {addButtonText}
        </Link>

        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HeaderInfo;
