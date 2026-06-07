export const ISLAnimation = () => {
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .isl-stage {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .isl-stage:nth-child(1) { animation-delay: 0.1s; }
        .isl-stage:nth-child(2) { animation-delay: 0.3s; }
        .isl-stage:nth-child(3) { animation-delay: 0.5s; }
        
        .convergence {
          animation: slideUp 0.8s ease-out 1.2s forwards;
          opacity: 0;
        }
        
        .result-final {
          animation: slideUp 0.8s ease-out 1.8s forwards;
          opacity: 0;
        }
      `}</style>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Input Path */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            📹 Input
          </h3>
          <div className="space-y-4">
            <div className="isl-stage bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">Webcam Capture</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Live video feed</p>
            </div>

            <div className="isl-stage bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 .267A2 2 0 0012 13a2 2 0 00-1-.267H9.5a2 2 0 00-2 2v4a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-purple-900 dark:text-purple-100">MediaPipe</h4>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Extract 21 hand + face keypoints</p>
            </div>

            <div className="isl-stage bg-cyan-50 dark:bg-cyan-950 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 .267A2 2 0 0012 13a2 2 0 00-1-.267H9.5a2 2 0 00-2 2v4a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-cyan-900 dark:text-cyan-100">Canvas Overlay</h4>
              <p className="text-xs text-cyan-700 dark:text-cyan-300 mt-1">Skeleton + hold-progress arc</p>
            </div>
          </div>
        </div>

        {/* Recognition Path */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            🧠 Recognition
          </h3>
          <div className="space-y-4">
            <div className="isl-stage bg-indigo-50 dark:bg-indigo-950 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-100">TensorFlow CNN</h4>
              <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">~95% accuracy on ISL</p>
            </div>

            <div className="isl-stage bg-pink-50 dark:bg-pink-950 p-4 rounded-lg border border-pink-200 dark:border-pink-800 text-center">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-pink-900 dark:text-pink-100">Emotion Detector</h4>
              <p className="text-xs text-pink-700 dark:text-pink-300 mt-1">Facial landmarks + smoothing</p>
            </div>

            <div className="isl-stage bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800 text-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-orange-900 dark:text-orange-100">Web Speech API</h4>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Voice input for avatar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Convergence */}
      <div className="convergence bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 text-center mb-4">
        <div className="text-2xl mb-2">🔀</div>
        <p className="font-semibold text-teal-900 dark:text-teal-100">All signals converge</p>
        <p className="text-sm text-teal-700 dark:text-teal-300 mt-1">Gesture + emotion + voice unified</p>
      </div>

      {/* Result */}
      <div className="result-final bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="text-3xl">👤</div>
          <div className="text-left">
            <h3 className="font-semibold text-green-900 dark:text-green-100">Three.js Avatar Rendering</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">Real-time sign animation with emotion and speech</p>
          </div>
        </div>
      </div>
    </div>
  );
};
