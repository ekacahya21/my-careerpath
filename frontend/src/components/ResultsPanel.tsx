"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Building2, TrendingUp, Sparkles } from "lucide-react";
import type { AnalysisResult } from "./CvUploader";

interface ResultsPanelProps {
    data: AnalysisResult;
    onReset: () => void;
}

// Staggered section entry — explicit props, avoids Variants typing issues
function sectionAnim(i: number) {
    return {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.65, delay: i * 0.13, ease: "easeOut" as const },
    };
}

export default function ResultsPanel({ data, onReset }: ResultsPanelProps) {
    const cardStyle = {
        background: "var(--surface)",
        borderRadius: "var(--radius-lg)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--border-subtle)",
    };

    const labelStyle = {
        fontSize: "0.8rem" as const,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: "var(--text-secondary)",
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            }}
        >
            {/* Profile Summary */}
            <motion.section {...sectionAnim(0)} style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.875rem" }}>
                    <Sparkles size={16} color="var(--text-secondary)" strokeWidth={1.8} />
                    <h2 style={labelStyle}>Profile Summary</h2>
                </div>
                <p style={{ color: "var(--text-primary)", lineHeight: 1.75, fontSize: "0.95rem" }}>
                    {data.profile_summary}
                </p>
            </motion.section>

            {/* Career Growth Plan */}
            <motion.section {...sectionAnim(1)} style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                    <TrendingUp size={16} color="var(--text-secondary)" strokeWidth={1.8} />
                    <h2 style={labelStyle}>Career Growth Plan</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {data.growth_plan.map((milestone) => (
                        <motion.div
                            key={milestone.step}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.18 + milestone.step * 0.1, ease: "easeOut" }}
                            style={{
                                display: "flex",
                                gap: "1rem",
                                padding: "1.1rem 1.25rem",
                                background: "var(--surface-elevated)",
                                borderRadius: "var(--radius)",
                                border: "1px solid var(--border-subtle)",
                            }}
                        >
                            <div
                                style={{
                                    minWidth: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    background: "var(--text-primary)",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    flexShrink: 0,
                                }}
                            >
                                {milestone.step}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                                    {milestone.focus}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                    {milestone.skills_to_acquire.map((skill) => (
                                        <span
                                            key={skill}
                                            style={{
                                                padding: "2px 10px",
                                                borderRadius: 99,
                                                background: "#f4f4f5",
                                                border: "1px solid var(--border)",
                                                fontSize: "0.78rem",
                                                color: "var(--text-secondary)",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Company Matches */}
            <motion.section {...sectionAnim(2)} style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                    <Building2 size={16} color="var(--text-secondary)" strokeWidth={1.8} />
                    <h2 style={labelStyle}>Company Matches</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {data.company_matches.map((company, i) => {
                        const searchQuery = encodeURIComponent(`${company.company_name} ${company.search_query_used || "careers jobs"}`);
                        const searchUrl = `https://www.google.com/search?q=${searchQuery}&ibp=htl;jobs`;

                        return (
                            <motion.a
                                key={company.company_name}
                                href={searchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.22 + i * 0.1, ease: "easeOut" }}
                                style={{
                                    display: "block",
                                    textDecoration: "none",
                                    padding: "1rem 1.25rem",
                                    background: "var(--surface-elevated)",
                                    borderRadius: "var(--radius)",
                                    border: "1px solid var(--border-subtle)",
                                    transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                                    cursor: "pointer",
                                }}
                                whileHover={{
                                    borderColor: "var(--border)",
                                    y: -2,
                                    boxShadow: "var(--shadow-sm)",
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.4rem" }}>
                                    <CheckCircle2 size={15} color="#22c55e" strokeWidth={2} style={{ marginTop: 2, flexShrink: 0 }} />
                                    <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9rem" }}>
                                        {company.company_name}
                                    </p>
                                </div>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.65, marginLeft: "1.45rem" }}>
                                    {company.match_reason}
                                </p>
                            </motion.a>
                        );
                    })}
                </div>
            </motion.section>

            {/* Analyze another */}
            <motion.div {...sectionAnim(3)} style={{ textAlign: "center", paddingBottom: "2rem" }}>
                <button
                    id="analyze-another-btn"
                    onClick={onReset}
                    style={{
                        background: "transparent",
                        border: "1.5px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        padding: "0.6rem 1.4rem",
                        color: "var(--text-secondary)",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "border-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.borderColor = "var(--accent)";
                        (e.target as HTMLButtonElement).style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.borderColor = "var(--border)";
                        (e.target as HTMLButtonElement).style.color = "var(--text-secondary)";
                    }}
                >
                    Analyze another CV
                </button>
            </motion.div>
        </motion.div>
    );
}
