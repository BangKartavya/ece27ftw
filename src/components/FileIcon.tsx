
import { File, FileVideo, Folder, FolderOpen } from "lucide-react";

interface FileIconProps {
    type: "folder" | "file" | "video" | "image" | "document";
    isOpen?: boolean;
    size?: number;
}

export const FileIcon = ({ type, isOpen = false, size = 20 }: FileIconProps) => {
    const iconProps = { size, className: "shrink-0" };

    switch (type) {
        case "folder":
            return isOpen ? (
                <FolderOpen {...iconProps} className="text-blue-500" />
            ) : (
                <Folder {...iconProps} className="text-blue-500" />
            );
        case "video":
            return <FileVideo {...iconProps} className="text-red-500" />;
        case "image":
            return <File {...iconProps} className="text-green-500" />;
        case "document":
            return <File {...iconProps} className="text-blue-600" />;
        default:
            return <File {...iconProps} className="text-gray-500" />;
    }
};
