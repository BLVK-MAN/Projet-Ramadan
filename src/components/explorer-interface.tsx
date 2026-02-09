"use client";

import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { vectorAction } from "@/actions/vector-action";

export function ExplorerInterface() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setUploadStatus(null);

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        try {
            const result = await vectorAction(formData);
            if (result.success) {
                setUploadStatus("Files processed successfully!");
            } else {
                setUploadStatus("Failed to process files.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("Error uploading files.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="h-full p-6 bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col">
            <h2 className="text-2xl font-bold text-[var(--color-midnight-blue)] mb-6">Content Explorer</h2>

            <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <label htmlFor="file-upload-explorer" className="cursor-pointer flex flex-col items-center">
                    {isUploading ? (
                        <Loader2 className="h-12 w-12 text-[var(--color-ramadan-gold)] animate-spin mb-4" />
                    ) : (
                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {isUploading ? "Processing..." : "Upload Context Files (PDF/Excel)"}
                    </span>
                    <input
                        id="file-upload-explorer"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileUpload}
                        disabled={isUploading}
                    />
                </label>
            </div>

            {uploadStatus && (
                <div className={cn(
                    "mt-4 p-3 rounded-lg text-sm font-medium text-center",
                    uploadStatus.includes("success")
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                )}>
                    {uploadStatus}
                </div>
            )}

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Uploaded Context
                </h3>
                <p className="text-sm text-gray-500 italic">
                    Uploaded files will appear here (Visualization pending).
                </p>
            </div>
        </div>
    );
}
