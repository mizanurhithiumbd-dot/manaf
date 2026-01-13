"use client"

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deepest black base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Cyan aurora blob */}
      <div
        className="aurora-blob absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #00f2ff 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Purple aurora blob */}
      <div
        className="aurora-blob-delayed absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Pink aurora blob */}
      <div
        className="aurora-blob-slow absolute -bottom-1/4 left-1/3 w-[550px] h-[550px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
    </div>
  )
}
