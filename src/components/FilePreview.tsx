
import { FileItem } from "./FolderTree";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FilePreviewProps {
    file: FileItem | null;
}

export const FilePreview = ({ file }: FilePreviewProps) => {
    if (!file) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                    <Eye size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Select a file to preview</p>
                    <p className="text-sm">Click on any file in the folder tree to view it here</p>
                </div>
            </div>
        );
    }

    const handleDownload = () => {
        console.log(`Downloading ${file.name}`);
        if (file.url) {
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.name;
            link.click();
        }
    };

    const renderPreview = () => {
        switch (file.type) {
            case "image":
                return (
                    <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">🖼️</span>
                            </div>
                            <p className="text-sm text-gray-600">Image Preview</p>
                        </div>
                    </div>
                );
            case "video":
                return (
                    <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">🎥</span>
                            </div>
                            <p className="text-sm text-gray-600">Video Preview</p>
                        </div>
                    </div>
                );
            case "document":
                return (
                    <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">📄</span>
                            </div>
                            <p className="text-sm text-gray-600">Document Preview</p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">📁</span>
                            </div>
                            <p className="text-sm text-gray-600">File Preview</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{file.name}</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Eye size={16} className="mr-2" />
                            View
                        </Button>
                        <Button size="sm" onClick={handleDownload}>
                            <Download size={16} className="mr-2" />
                            Download
                        </Button>
                    </div>
                </div>
                {file.size && (
                    <p className="text-sm text-gray-500">Size: {file.size}</p>
                )}
            </CardHeader>
            <CardContent className="p-6">
                {renderPreview()}
            </CardContent>
        </Card>
    );
};
