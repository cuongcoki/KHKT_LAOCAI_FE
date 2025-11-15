import { useState, useRef, useEffect } from "react";
import {
  Send,
  Image as ImageIcon,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface Attachment {
  type: "image" | "document";
  url: string;
  name: string;
  file?: File;
}

interface ChatInputProps {
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<Attachment | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "56px";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 200) + "px";
    }
  }, [message]);

  const handleSend = () => {
    if ((message.trim() || image) && !isLoading) {
      onSendMessage(
        message.trim(),
        image ? [image] : undefined
      );
      setMessage("");
      setImage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ✅ Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // ✅ Handle image upload với validation 1MB
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      
      // ✅ Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chỉ chọn file ảnh');
        e.target.value = "";
        return;
      }

      // ✅ Validate file size - Tối đa 1MB
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        toast.error(
          `Kích thước ảnh quá lớn (${formatFileSize(file.size)}). Vui lòng chọn ảnh dưới 1MB`,
          {
            duration: 4000,
          }
        );
        e.target.value = "";
        return;
      }

      // ✅ All validations passed
      setImage({
        type: "image",
        url: URL.createObjectURL(file),
        name: file.name,
        file,
      });

      toast.success(`Đã chọn ảnh (${formatFileSize(file.size)})`);
    }
    e.target.value = "";
  };

  const removeImage = () => {
    if (image && image.url.startsWith("blob:")) {
      URL.revokeObjectURL(image.url);
    }
    setImage(null);
    toast.success("Đã xóa ảnh");
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* ✅ Single Image Preview */}
        {image && (
          <div className="mb-3">
            <div className="relative inline-block group rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all">
              <img
                src={image.url}
                alt={image.name}
                className="w-32 h-32 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <p className="text-xs text-white truncate">{image.name}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center items-end gap-2">
          {/* Text Input */}
          <div className="flex-1 relative max-w-[650px]">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Đặt câu hỏi hoặc nhập nội dung cần hỗ trợ..."
              className="min-h-[56px] max-h-[200px] resize-none border-[var(--color-primary-light)]/30 focus:ring-[var(--color-primary-light)] overflow-y-auto"
              rows={2}
              disabled={isLoading}
            />
          </div>

          {/* ✅ Image Upload Button - Chỉ hiện nếu chưa có ảnh */}
          {!image && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 flex-shrink-0 border-[var(--color-primary-light)]/30 hover:bg-[var(--color-primary-light)]/10"
              disabled={isLoading}
              onClick={() => imageInputRef.current?.click()}
              title="Tải lên ảnh (tối đa 1MB)" // ✅ Tooltip
            >
              <ImageIcon className="w-5 h-5 text-[var(--color-primary-light)]" />
            </Button>
          )}

          {/* Hidden Image Input - Single file only */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />

          {/* Send Button */}
          <Button
            type="button"
            onClick={handleSend}
            disabled={(!message.trim() && !image) || isLoading}
            className="h-8 w-8 bg-gradient-to-r from-[var(--color-primary-light)] to-green-950 hover:from-[var(--color-primary-dark)] hover:to-[var(--color-primary-light)]"
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-2">
          Nhấn{" "}
          <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd>{" "}
          để gửi,{" "}
          <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs">
            Shift + Enter
          </kbd>{" "}
          để xuống dòng • {" "}
          <span className="text-orange-600 font-medium">Ảnh tối đa 1MB</span>
        </p>
      </div>
    </div>
  );
};

export default ChatInput;