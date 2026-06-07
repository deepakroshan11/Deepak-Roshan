export const FindoraAnimation = () => {
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scoreReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .findora-stage {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .findora-stage:nth-child(1) { animation-delay: 0.1s; }
        .findora-stage:nth-child(2) { animation-delay: 0.3s; }
        .findora-stage:nth-child(3) { animation-delay: 0.5s; }
        
        .line-segment {
          animation: slideIn 1s ease-out 1.2s forwards;
          opacity: 0;
        }
        
        .ai-engine {
          animation: pulse 2s ease-in-out 1.4s infinite;
        }
        
        .ai-icon {
          animation: rotate 3s linear 1.4s infinite;
        }
        
        .ai-score {
          animation: scoreReveal 0.6s ease-out 2s forwards;
          opacity: 0;
        }
        
        .result-section {
          animation: slideUp 0.8s ease-out 2.8s forwards;
          opacity: 0;
        }
      `}</style>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Left: Lost Item Journey */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            👤 Lost Item Reporter
          </h3>
          <div className="space-y-6">
            <div className="findora-stage bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Report Lost Item</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Upload photo & details</p>
            </div>

            <div className="flex justify-center text-gray-400">↓</div>

            <div className="findora-stage bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">AI Processing</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Extract embeddings</p>
            </div>

            <div className="flex justify-center text-gray-400">↓</div>

            <div className="findora-stage bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7a2 2 0 012-2h12a2 2 0 012 2m0 0H2.458C1.734 7 1 7.895 1 9.514V21c0 1.119.894 2 2 2h15.666c1.105 0 2-1.119 2-2.333V9.514c0-1.619-.759-2.514-1.458-2.514" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Enter Database</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Stored in Supabase</p>
            </div>
          </div>
        </div>

        {/* Right: Found Item Journey */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            👤 Found Item Reporter
          </h3>
          <div className="space-y-6">
            <div className="findora-stage bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Report Found Item</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Upload photo & details</p>
            </div>

            <div className="flex justify-center text-gray-400">↓</div>

            <div className="findora-stage bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">AI Processing</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Extract embeddings</p>
            </div>

            <div className="flex justify-center text-gray-400">↓</div>

            <div className="findora-stage bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-teal-600 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7a2 2 0 012-2h12a2 2 0 012 2m0 0H2.458C1.734 7 1 7.895 1 9.514V21c0 1.119.894 2 2 2h15.666c1.105 0 2-1.119 2-2.333V9.514c0-1.619-.759-2.514-1.458-2.514" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Enter Database</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Stored in Supabase</p>
            </div>
          </div>
        </div>
      </div>

      {/* Convergence */}
      <div className="mb-6">
        <div className="flex items-center gap-4 justify-center">
          <div className="line-segment flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-blue-400"></div>
          <div className="ai-engine bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
            <div className="ai-icon text-2xl mb-2">✨</div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Fusion Scoring</p>
            <p className="ai-score text-lg font-bold text-green-600 dark:text-green-400">Match: 87%</p>
          </div>
          <div className="line-segment flex-1 h-0.5 bg-gradient-to-l from-gray-300 to-blue-400"></div>
        </div>
      </div>

      {/* Result */}
      <div className="result-section bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <div className="text-3xl mb-2">📧</div>
        <h3 className="font-semibold text-green-900 dark:text-green-100">Automatic Alert</h3>
        <p className="text-sm text-green-700 dark:text-green-300 mt-1">Both users notified instantly. No manual search needed.</p>
      </div>
    </div>
  );
};
