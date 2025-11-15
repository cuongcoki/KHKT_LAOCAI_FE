import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { 
  Upload, 
  FileText, 
  Eye, 
  Code, 
  Download, 
  Copy, 
  Check,
  Sparkles,
  FileType,
  Layers
} from "lucide-react";

// Sample markdown data for testing
const SAMPLE_MARKDOWN = `# Báo cáo Kết quả Kinh doanh Quý 4/2024
## Tổng quan

Trong quý 4 năm 2024, công ty đã đạt được những thành tựu đáng kể trong việc mở rộng thị trường và tăng trưởng doanh thu.

### Các chỉ số chính

| Chỉ số | Quý 3/2024 | Quý 4/2024 | Tăng trưởng |
|--------|-----------|-----------|------------|
| Doanh thu | 125 tỷ | 156 tỷ | +24.8% |
| Lợi nhuận | 28 tỷ | 38 tỷ | +35.7% |
| Khách hàng mới | 1,250 | 1,890 | +51.2% |

## Những điểm nổi bật

### 1. Mở rộng thị trường

- ✅ Ra mắt 3 chi nhánh mới tại **Hà Nội**, **Đà Nẵng**, và **Cần Thơ**
- ✅ Ký kết hợp đồng với 15 đối tác chiến lược
- ✅ Tăng 45% nhân sự bán hàng

### 2. Phát triển sản phẩm

Chúng tôi đã tung ra **5 sản phẩm mới** trong quý này:

1. **ProductX Pro** - Giải pháp quản lý dự án
2. **DataFlow AI** - Phân tích dữ liệu thông minh
3. **CloudSync Enterprise** - Đồng bộ đám mây doanh nghiệp
4. **SecureVault** - Bảo mật dữ liệu cấp cao
5. **MobileHub** - Ứng dụng di động đa nền tảng

### 3. Đánh giá khách hàng

> "Sản phẩm tuyệt vời! Đã giúp công ty chúng tôi tăng năng suất lên 40%" - *Nguyễn Văn A, CEO TechCorp*

> "Dịch vụ hỗ trợ chuyên nghiệp và nhanh chóng" - *Trần Thị B, Giám đốc MarketingPro*

## Kế hoạch Quý 1/2025

### Mục tiêu chính

- 🎯 Tăng doanh thu lên **180 tỷ** (+15%)
- 🎯 Mở rộng thêm **5 chi nhánh** mới
- 🎯 Ra mắt **3 sản phẩm** AI-powered
- 🎯 Đào tạo **200 nhân viên** mới

### Đầu tư công nghệ

Chúng tôi sẽ đầu tư mạnh vào:

\`\`\`
- Machine Learning & AI
- Cloud Infrastructure  
- Cybersecurity
- Mobile Development
\`\`\`

## Thách thức và Giải pháp

### Thách thức
1. **Cạnh tranh khốc liệt** trên thị trường
2. **Khan hiếm nhân sự** công nghệ cao
3. **Biến động kinh tế** toàn cầu

### Giải pháp đề xuất
- Đẩy mạnh R&D để tạo ra sản phẩm độc đáo
- Xây dựng chương trình đào tạo nội bộ
- Đa dạng hóa nguồn thu và thị trường

## Kết luận

Quý 4/2024 là một quý thành công rực rỡ. Với nền tảng vững chắc này, chúng tôi tự tin sẽ đạt được những **mục tiêu đầy tham vọng** trong năm 2025.

---

**Ngày báo cáo:** 15/01/2025  
**Người lập:** Ban Giám đốc  
**Phê duyệt:** CEO`;

const SAMPLE_RAW = `BÁO CÁO KẾT QUẢ KINH DOANH QUÝ 4/2024

TỔNG QUAN
Trong quý 4 năm 2024, công ty đã đạt được những thành tựu đáng kể trong việc mở rộng thị trường và tăng trưởng doanh thu.

CÁC CHỈ SỐ CHÍNH
Chỉ số          Quý 3/2024    Quý 4/2024    Tăng trưởng
Doanh thu       125 tỷ        156 tỷ        +24.8%
Lợi nhuận       28 tỷ         38 tỷ         +35.7%
Khách hàng mới  1,250         1,890         +51.2%

NHỮNG ĐIỂM NỔI BẬT

1. MỞ RỘNG THỊ TRƯỜNG
- Ra mắt 3 chi nhánh mới tại Hà Nội, Đà Nẵng, và Cần Thơ
- Ký kết hợp đồng với 15 đối tác chiến lược
- Tăng 45% nhân sự bán hàng

2. PHÁT TRIỂN SẢN PHẨM
Chúng tôi đã tung ra 5 sản phẩm mới trong quý này:
1. ProductX Pro - Giải pháp quản lý dự án
2. DataFlow AI - Phân tích dữ liệu thông minh
3. CloudSync Enterprise - Đồng bộ đám mây doanh nghiệp
4. SecureVault - Bảo mật dữ liệu cấp cao
5. MobileHub - Ứng dụng di động đa nền tảng`;

const TeacherDatasets = () => {
  const [raw, setRaw] = useState(SAMPLE_RAW);
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [viewMode, setViewMode] = useState<"raw" | "markdown">("markdown");
  const [fileName, setFileName] = useState("sample-report.docx");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    characters: SAMPLE_MARKDOWN.length,
    words: SAMPLE_MARKDOWN.split(/\s+/).length,
    lines: SAMPLE_MARKDOWN.split('\n').length
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Simulate file processing
    const text = await file.text();
    setRaw(text);

    // Demo conversion to markdown
    const md = `# Tệp: ${file.name}\n\n${text}`;
    setMarkdown(md);
    
    // Update stats
    setStats({
      characters: md.length,
      words: md.split(/\s+/).length,
      lines: md.split('\n').length
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace(/\.[^/.]+$/, "") + '.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Document to Markdown Converter
            </h1>
          </div>
          <p className="text-slate-600 text-lg">
            Chuyển đổi PDF, Word sang Markdown để chuẩn bị dataset cho RAG
          </p>
        </div>

        {/* Upload Section */}
        <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors bg-white/50 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-slate-700">
                  Tải lên tài liệu của bạn
                </h3>
                <p className="text-sm text-slate-500">
                  Hỗ trợ PDF, DOC, DOCX (Tối đa 10MB)
                </p>
              </div>
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Chọn tệp
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              {fileName && (
                <Badge variant="secondary" className="mt-2 px-4 py-2 text-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  {fileName}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 flex items-center gap-3">
              <FileType className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Ký tự</p>
                <p className="text-2xl font-bold text-blue-600">{stats.characters.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-4 flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-sm text-slate-600">Từ</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.words.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 flex items-center gap-3">
              <Layers className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-slate-600">Dòng</p>
                <p className="text-2xl font-bold text-purple-600">{stats.lines.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-2 border-slate-200 bg-white/70 backdrop-blur">
          <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <Eye className="w-5 h-5" />
                Kết quả chuyển đổi
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Đã copy
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Tải xuống
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "raw" | "markdown")} className="w-full">
              <div className="border-b bg-slate-50/50 px-6 pt-4">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="markdown" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Markdown Preview
                  </TabsTrigger>
                  <TabsTrigger value="raw" className="gap-2">
                    <Code className="w-4 h-4" />
                    Raw Text
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="markdown" className="m-0 p-6">
                <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-a:text-blue-600 prose-strong:text-slate-900 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:italic">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              </TabsContent>

              <TabsContent value="raw" className="m-0">
                <div className="p-6 bg-slate-900 text-slate-100 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed overflow-auto max-h-[600px]">
                    {raw}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Info Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-slate-800">
                  💡 Mẹo sử dụng
                </h4>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                  <li>Chuyển đổi tài liệu sang Markdown để dễ dàng xử lý bằng AI</li>
                  <li>Sử dụng định dạng Markdown để chuẩn bị dataset cho RAG (Retrieval-Augmented Generation)</li>
                  <li>Copy nội dung hoặc tải xuống file .md để sử dụng trong dự án của bạn</li>
                  <li>Markdown giúp AI hiểu cấu trúc tài liệu tốt hơn so với plain text</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDatasets;