export const VoxAIAnimation = () => {
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <style>{`
        @keyframes slideInFlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .voxai-stage {
          animation: slideInFlow 0.8s ease-out forwards;
          opacity: 0;
        }
        .voxai-stage:nth-child(1) { animation-delay: 0.1s; }
        .voxai-stage:nth-child(2) { animation-delay: 0.4s; }
        .voxai-stage:nth-child(3) { animation-delay: 0.7s; }
        .voxai-stage:nth-child(4) { animation-delay: 1s; }
      `}</style>

      <div className="space-y-0 w-full max-w-sm mx-auto">
        {/* Stage 1 */}
        <div className="voxai-stage bg-amber-50 dark:bg-amber-950 p-6 border border-amber-200 dark:border-amber-800 rounded-t-lg text-center">
          <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-amber-600 dark:text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
          </div>
          <h4 className="font-semibold text-amber-900 dark:text-amber-100">Record Voice Sample</h4>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">Short audio with accent & tone</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1 bg-gray-100 dark:bg-gray-900">
          <span className="text-gray-400 text-lg">↓</span>
        </div>

        {/* Stage 2 */}
        <div className="voxai-stage bg-gray-50 dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">FastAPI Upload</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Send to processing endpoint</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1 bg-gray-100 dark:bg-gray-900">
          <span className="text-gray-400 text-lg">↓</span>
        </div>

        {/* Stage 3 */}
        <div className="voxai-stage bg-gray-50 dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">ChatterboxTTS Synthesis</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Zero-shot voice generation</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1 bg-gray-100 dark:bg-gray-900">
          <span className="text-gray-400 text-lg">↓</span>
        </div>

        {/* Stage 4 - DSP */}
        <div className="voxai-stage bg-gray-50 dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">7-Stage DSP Polish</h4>
          <div className="space-y-1 mt-3 text-xs font-mono text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-950 rounded p-2">
            <p>bass restoration</p>
            <p>→ de-noising</p>
            <p>→ harmonic extension</p>
            <p>→ dynamics processing</p>
            <p>→ room tone removal</p>
            <p>→ LUFS normalization</p>
            <p>→ true-peak limiting</p>
          </div>
        </div>

        {/* Result */}
        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-b-lg border border-green-200 dark:border-green-800 text-center">
          <div className="text-3xl mb-2">🎙️</div>
          <h3 className="font-semibold text-green-900 dark:text-green-100">Broadcast-Quality Audio</h3>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">Studio-grade voice cloning, ready to ship</p>
        </div>
      </div>
    </div>
  );
};
