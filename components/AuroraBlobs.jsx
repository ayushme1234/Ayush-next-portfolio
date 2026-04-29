'use client'

/**
 * 4 floating aurora blobs. Pure CSS animations + slow drift.
 * Lives behind content (z=-10), pointer-events: none.
 */
export default function AuroraBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="aurora-blob animate-blob-drift"
        style={{
          width: 700,
          height: 700,
          top: '-20%',
          left: '-15%',
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
          opacity: 0.28,
        }}
      />
      <div
        className="aurora-blob animate-blob-drift-2"
        style={{
          width: 600,
          height: 600,
          top: '20%',
          right: '-10%',
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          opacity: 0.22,
        }}
      />
      <div
        className="aurora-blob animate-blob-drift-3"
        style={{
          width: 500,
          height: 500,
          bottom: '10%',
          left: '40%',
          background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
          opacity: 0.18,
        }}
      />
      <div
        className="aurora-blob animate-blob-drift"
        style={{
          width: 400,
          height: 400,
          bottom: '-10%',
          right: '20%',
          background: 'radial-gradient(circle, #fb923c 0%, transparent 70%)',
          opacity: 0.18,
          animationDelay: '6s',
        }}
      />
    </div>
  )
}
