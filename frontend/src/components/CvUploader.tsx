"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, AlertCircle } from "lucide-react";

interface CvUploaderProps {
    onUploadComplete: (data: AnalysisResult) => void;
    onLoadingChange: (loading: boolean) => void;
    isLoading: boolean;
}

export interface AnalysisResult {
    profile_summary: string;
    growth_plan: Array<{
        step: number;
        focus: string;
        skills_to_acquire: string[];
    }>;
    company_matches: Array<{
        company_name: string;
        match_reason: string;
        search_query_used: string;
    }>;
}

export default function CvUploader({
    onUploadComplete,
    onLoadingChange,
    isLoading,
}: CvUploaderProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        async (accepted: File[]) => {
            const file = accepted[0];
            if (!file) return;

            setFileName(file.name);
            setError(null);
            onLoadingChange(true);

            try {
                const form = new FormData();
                form.append("file", file);

                const apiBase =
                    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
                const res = await fetch(`${apiBase}/api/analyze-cv`, {
                    method: "POST",
                    body: form,
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({ detail: "Unknown error" }));
                    throw new Error(err.detail || `HTTP ${res.status}`);
                }

                const json = await res.json();
                onUploadComplete(json.data as AnalysisResult);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Unexpected error";
                setError(message);
                onLoadingChange(false);
            }
        },
        [onUploadComplete, onLoadingChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        disabled: isLoading,
    });

    return (
        <div style={{ width: "100%", maxWidth: "512px", margin: "0 auto" }}>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={!isLoading ? { boxShadow: "var(--shadow-md)" } : {}}
                style={{ borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" }}
            >
                <div
                    {...getRootProps()}
                    style={{
                        border: `1.5px dashed ${isDragActive ? "#3f3f46" : "#e4e4e7"}`,
                        borderRadius: "var(--radius-lg)",
                        background: isDragActive ? "#f4f4f5" : "var(--surface)",
                        padding: "3rem 2rem",
                        cursor: isLoading ? "default" : "pointer",
                        textAlign: "center",
                        transition: "border-color 0.3s ease, background 0.3s ease",
                        outline: "none",
                    }}
                >
                    <input {...getInputProps()} id="cv-upload-input" />

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
                            >
                                {/* Animated dots loader */}
                                <div style={{ display: "flex", gap: "6px" }}>
                                    {[0, 1, 2].map((i) => (
                                        <motion.span
                                            key={i}
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                backgroundColor: "var(--text-primary)",
                                                display: "block",
                                            }}
                                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    ))}
                                </div>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                    Analyzing <strong style={{ color: "var(--text-primary)" }}>{fileName}</strong>
                                    &hellip;
                                </p>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                                    This may take 15–30 seconds
                                </p>
                            </motion.div>
                        ) : fileName && !error ? (
                            <motion.div
                                key="file"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
                            >
                                <FileText size={36} color="var(--accent)" strokeWidth={1.5} />
                                <p style={{ color: "var(--text-primary)", fontWeight: 500, fontSize: "0.95rem" }}>
                                    {fileName}
                                </p>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                                    Drop a new PDF to replace
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
                            >
                                <UploadCloud
                                    size={40}
                                    color={isDragActive ? "var(--text-primary)" : "var(--text-muted)"}
                                    strokeWidth={1.4}
                                />
                                <p style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: "1rem" }}>
                                    {isDragActive ? "Drop your CV here" : "Upload your CV"}
                                </p>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                                    Drag & drop or click to browse — PDF only
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            marginTop: "1rem",
                            padding: "0.75rem 1rem",
                            borderRadius: "var(--radius-sm)",
                            background: "#fef2f2",
                            border: "1px solid #fecaca",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.6rem",
                        }}
                    >
                        <AlertCircle size={16} color="#ef4444" style={{ marginTop: 2, flexShrink: 0 }} />
                        <p style={{ color: "#dc2626", fontSize: "0.85rem", lineHeight: 1.5 }}>{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
