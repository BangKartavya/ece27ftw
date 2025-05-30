
import { useEffect, useState } from "react";
import { FolderTree } from "@/components/FolderTree";
import { FilePreview } from "@/components/FilePreview";
import { Card } from "@/components/ui/card";
import { DriveItem } from "@/lib/utils";
import Loader from "@/components/Loader";

const Index = () => {
    const [selectedFile, setSelectedFile] = useState<DriveItem | null>(null);
    const [filesData, setFilesData] = useState<DriveItem[]>([]);
    const [loading, setLoading] = useState(true);

    const handleFileSelect = (file: DriveItem) => {
        setSelectedFile(file);
        console.log("Selected file:", file);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "/api/api",
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
            const data = await response.json();
            setFilesData([data.driveData]);
            setLoading(false);
        }
        fetchData();

    }, []);

    return (
        loading ? (
            <div className="flex items-center justify-center h-screen">
                <Loader text="Loading Please Wait..." size="lg" />
            </div>
        ) : (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">D</span>
                            </div>
                            My Drive
                        </h1>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
                        {/* Folder Tree */}
                        <div className="overflow-auto lg:col-span-1">
                            <Card className="h-full p-4">
                                <h2 className="text-lg font-semibold mb-4 text-gray-800">Folder Structure</h2>
                                <div className="overflow-auto h-[calc(100%-3rem)]">
                                    <FolderTree
                                        items={filesData}
                                        onFileSelect={handleFileSelect}
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* File Preview */}
                        <div className="lg:col-span-2">
                            <FilePreview file={selectedFile} />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
};

export default Index;
