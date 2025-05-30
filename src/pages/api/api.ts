import { DriveItem, formatBytes } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const FOLDER_ID = process.env.NEXT_PUBLIC_FOLDER_ID;
    const API_KEY = process.env.API_KEY;

    const fetchFolderStructure = async (folderId: string): Promise<DriveItem> => {
        const res = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,size,webViewLink)`
        );
        const { files } = await res.json();

        const children = await Promise.all(
            files.map(async (file: any) => {
                const mime = file.mimeType;
                const type: DriveItem['type'] =
                    mime === 'application/vnd.google-apps.folder'
                        ? 'folder'
                        : mime.startsWith('image/')
                            ? 'image'
                            : mime.startsWith('video/')
                                ? 'video'
                                : mime === 'application/pdf' ||
                                    mime.includes('msword') ||
                                    mime.includes('officedocument')
                                    ? 'document'
                                    : 'file';

                if (type === 'folder') {
                    const child = await fetchFolderStructure(file.id);
                    return {
                        id: file.id,
                        name: file.name,
                        type: 'folder',
                        children: child.children,
                    };
                }

                return {
                    id: file.id,
                    name: file.name,
                    type,
                    size: file.size ? formatBytes(Number(file.size)) : undefined,
                    url: file.webViewLink,
                };
            })
        );
        children.sort((a, b) => a.name.localeCompare(b.name));
        return {
            id: folderId,
            name: folderId === FOLDER_ID ? "ECE'27" : 'Subfolder',
            type: 'folder',
            children,
        };
    };
    const driveData = await fetchFolderStructure(FOLDER_ID!);
    res.status(200).json({ driveData });
};

export default handler;
