'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Eye,
  ThumbsUp,
  MessageSquare,
  Globe,
  Users,
  MoreVertical,
  Edit,
  Trash2,
  Download,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Types
type ModelStatus = 'draft' | 'active' | 'archived';
type PublishedType = 'only_class' | 'global';

interface ModelDatasetRAG {
  id: string;
  user_id: string;
  name: string;
  code: string;
  description: string;
  document: string;
  avatar: string;
  query: number; // view count
  vote: number; // like count
  published: PublishedType;
  status: ModelStatus;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_avatar?: string;
}

// Mock data
const mockModels: ModelDatasetRAG[] = [
  {
    id: '1',
    user_id: 'u1',
    name: 'Bộ câu hỏi Toán lớp 10 - Hàm số',
    code: 'MATH_10_HS',
    description: 'Dataset câu hỏi về hàm số bậc 2, đạo hàm và ứng dụng',
    document: 'math_dataset.pdf',
    avatar: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400',
    query: 581,
    vote: 23,
    published: 'global',
    status: 'active',
    created_at: '2024-11-01T10:00:00Z',
    updated_at: '2024-11-03T15:30:00Z',
    user_name: 'Nguyễn Văn A',
    user_avatar: 'GV001',
  },
  {
    id: '2',
    user_id: 'u1',
    name: 'Văn học Việt Nam hiện đại',
    code: 'LIT_VN_MOD',
    description: 'Tập hợp các tác phẩm văn học Việt Nam thế kỷ 20',
    document: 'literature_dataset.pdf',
    avatar: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    query: 342,
    vote: 18,
    published: 'only_class',
    status: 'active',
    created_at: '2024-10-28T14:00:00Z',
    updated_at: '2024-11-02T09:15:00Z',
    user_name: 'Nguyễn Văn A',
    user_avatar: 'GV001',
  },
  {
    id: '3',
    user_id: 'u1',
    name: 'English Grammar Practice',
    code: 'ENG_GRAM',
    description: 'Comprehensive grammar exercises and examples',
    document: 'english_grammar.pdf',
    avatar: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
    query: 892,
    vote: 45,
    published: 'global',
    status: 'active',
    created_at: '2024-10-15T08:30:00Z',
    updated_at: '2024-11-04T11:00:00Z',
    user_name: 'Nguyễn Văn A',
    user_avatar: 'GV001',
  },
  {
    id: '4',
    user_id: 'u1',
    name: 'Vật lý đại cương - Cơ học',
    code: 'PHY_MECH',
    description: 'Bài tập và lý thuyết về cơ học Newton',
    document: 'physics_mechanics.pdf',
    avatar: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
    query: 156,
    vote: 12,
    published: 'only_class',
    status: 'draft',
    created_at: '2024-11-03T16:00:00Z',
    updated_at: '2024-11-04T10:30:00Z',
    user_name: 'Nguyễn Văn A',
    user_avatar: 'GV001',
  },
  {
    id: '5',
    user_id: 'u1',
    name: 'Hóa học hữu cơ - Hydrocacbon',
    code: 'CHEM_ORG',
    description: 'Dataset về các hợp chất hữu cơ cơ bản',
    document: 'organic_chemistry.pdf',
    avatar: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400',
    query: 234,
    vote: 15,
    published: 'global',
    status: 'archived',
    created_at: '2024-09-20T12:00:00Z',
    updated_at: '2024-10-01T14:00:00Z',
    user_name: 'Nguyễn Văn A',
    user_avatar: 'GV001',
  },
  {
    id: '6',
    user_id: 'u1',
    name: 'Lịch sử Việt Nam - Kháng chiến',
    code: 'HIST_VN',
    description: 'Tài liệu lịch sử kháng chiến chống Pháp và Mỹ',
    document: 'vietnam_history.pdf',
    avatar: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400',
    query: 445,
    vote: 31,
    published: 'global',
    status: 'active',
    created_at: '2024-10-10T09:00:00Z',
    updated_at: '2024-11-01T16:45:00Z',
    user_name: 'Nguyễn Văn A',
    user_avatar: 'GV001',
  },
];

const ModelDatasetRAG = () => {
  const [models, setModels] = useState<ModelDatasetRAG[]>(mockModels);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter models by status
  const filteredModels = models.filter((model) => {
    if (filterStatus === 'all') return true;
    return model.status === filterStatus;
  });

  // Calculate stats
  const stats = {
    total: models.length,
    active: models.filter((m) => m.status === 'active').length,
    draft: models.filter((m) => m.status === 'draft').length,
    archived: models.filter((m) => m.status === 'archived').length,
  };

  // Get status badge
  const getStatusBadge = (status: ModelStatus) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Active
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Draft
          </Badge>
        );
      case 'archived':
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600 text-white">
            Archived
          </Badge>
        );
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa model này?')) {
      setModels(models.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="min-h-screen  bg-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Model Dataset RAG
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Quản lý các bộ dữ liệu AI của bạn
            </p>
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Tạo Model mới
          </Button>
        </div>

        {/* Stats & Filter */}
        <div className="flex items-center justify-between">

          {/* Filter */}
          <div className="w-64">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả ({stats.total})</SelectItem>
                <SelectItem value="active">Active ({stats.active})</SelectItem>
                <SelectItem value="draft">Draft ({stats.draft})</SelectItem>
                <SelectItem value="archived">
                  Archived ({stats.archived})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                <img
                  src={model.avatar}
                  alt={model.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </div>

                {/* Top badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {getStatusBadge(model.status)}
                  {model.published === 'global' ? (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Globe className="w-3 h-3 mr-1" />
                      Global
                    </Badge>
                  ) : (
                    <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
                      <Users className="w-3 h-3 mr-1" />
                      Class
                    </Badge>
                  )}
                </div>

                {/* Menu */}
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Tải xuống
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(model.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="flex items-center gap-1 text-white">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs font-medium">{model.query}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <ThumbsUp className="w-3 h-3" />
                    <span className="text-xs font-medium">{model.vote}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <MessageSquare className="w-3 h-3" />
                    <span className="text-xs font-medium">4</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                  {model.name}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {model.description}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                    {model.user_avatar?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                      {model.user_name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {model.code}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredModels.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Không tìm thấy model nào
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Thử thay đổi bộ lọc hoặc tạo model mới
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelDatasetRAG;