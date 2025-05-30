
import { useState } from "react";
import { ChevronRight, ChevronDown, Download } from "lucide-react";
import { FileIcon } from "./FileIcon";
import { Button } from "@/components/ui/button";
import { DriveItem } from "@/lib/utils";

interface FolderTreeProps {
    items: DriveItem[];
    onFileSelect: (file: DriveItem) => void;
    level?: number;
}

export const FolderTree = ({ items, onFileSelect, level = 0 }: FolderTreeProps) => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = (folderId: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(folderId)) {
            newExpanded.delete(folderId);
        } else {
            newExpanded.add(folderId);
        }
        setExpandedFolders(newExpanded);
    };

    const handleDownload = (e: React.MouseEvent, file: DriveItem) => {
        e.stopPropagation();
        // Simulate download
        console.log(`Downloading ${file.name}`);
        if (file.url) {
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.name;
            link.click();
        }
    };

    return (
        <div className="space-y-1">
            {items.map((item) => {
                const isExpanded = expandedFolders.has(item.id);
                const isFolder = item.type === "folder";

                return (
                    <div key={item.id} className="select-none">
                        <div
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors group ${level > 0 ? `ml-${level * 4}` : ""
                                }`}
                            onClick={() => {
                                if (isFolder) {
                                    toggleFolder(item.id);
                                } else {
                                    onFileSelect(item);
                                }
                            }}
                            style={{ marginLeft: `${level * 16}px` }}
                        >
                            {isFolder ? (
                                <div className="flex items-center gap-1">
                                    {isExpanded ? (
                                        <ChevronDown size={16} className="text-gray-500" />
                                    ) : (
                                        <ChevronRight size={16} className="text-gray-500" />
                                    )}
                                    <FileIcon type="folder" isOpen={isExpanded} />
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 ml-5">
                                    <FileIcon type={item.type} />
                                </div>
                            )}

                            <span className="flex-1 text-sm text-gray-700 truncate">
                                {item.name}
                            </span>

                            {!isFolder && (
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.size && (
                                        <span className="text-xs text-gray-500">{item.size}</span>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={(e) => handleDownload(e, item)}
                                    >
                                        <Download size={12} />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {isFolder && isExpanded && item.children && (
                            <FolderTree
                                items={item.children}
                                onFileSelect={onFileSelect}
                                level={level + 1}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
