"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CvUploader, { type AnalysisResult } from "@/components/CvUploader";
import ResultsPanel from "@/components/ResultsPanel";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleUploadComplete = (data: AnalysisResult) => {
    setIsLoading(false);
    setResult(data);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        padding: "0 1rem",
      }}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          width: "100%",
          padding: "2.5rem 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            my-careerpath
          </span>
          <span
            style={{
              marginLeft: "0.5rem",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              background: "#f4f4f5",
              border: "1px solid var(--border)",
              borderRadius: 99,
              padding: "2px 8px",
            }}
          >
            Beta
          </span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Powered by Gemini · Google ADK
        </p>
      </motion.header>

      {/* Hero + Content */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "3rem",
          paddingBottom: "4rem",
          gap: "2.5rem",
        }}
      >
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="upload-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              {/* Hero copy */}
              <div style={{ textAlign: "center" }}>
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: "clamp(2rem, 5vw, 2.75rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.15,
                    color: "var(--text-primary)",
                    marginBottom: "0.875rem",
                  }}
                >
                  Your AI career
                  <br />
                  growth advisor.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: "1rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    maxWidth: "420px",
                    margin: "0 auto",
                  }}
                >
                  Upload your CV. Our AI identifies your skill gaps and builds
                  a personalized 3-step growth plan with real-world company matches.
                </motion.p>
              </div>

              {/* Upload zone */}
              <CvUploader
                onUploadComplete={handleUploadComplete}
                onLoadingChange={setIsLoading}
                isLoading={isLoading}
              />

              {/* Feature hints */}
              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "2rem",
                    flexWrap: "wrap",
                  }}
                >
                  {["Skill gap analysis", "3-step growth plan", "Company matches"].map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <span style={{ color: "#22c55e", fontSize: "0.9rem" }}>✦</span>
                      {f}
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "var(--text-primary)",
                    marginBottom: "0.35rem",
                  }}
                >
                  Your career roadmap is ready
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  Scroll down to explore your growth plan and company matches.
                </p>
              </div>
              <ResultsPanel data={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          textAlign: "center",
          padding: "1.5rem 0",
          borderTop: "1px solid var(--border-subtle)",
          color: "var(--text-muted)",
          fontSize: "0.75rem",
        }}
      >
        my-careerpath · Built with Google ADK &amp; Gemini
      </motion.footer>
    </div>
  );
}
