export const CloudGuardAnimation = () => {
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <style>{`
        @keyframes slideInLoop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes checkmark {
          from { transform: scale(0) rotate(-45deg); }
          to { transform: scale(1) rotate(0); }
        }
        
        .cloudguard-stage {
          animation: slideInLoop 0.8s ease-out forwards;
          opacity: 0;
        }
        .cloudguard-stage:nth-child(1) { animation-delay: 0.1s; }
        .cloudguard-stage:nth-child(2) { animation-delay: 0.4s; }
        .cloudguard-stage:nth-child(3) { animation-delay: 0.7s; }
        .cloudguard-stage:nth-child(4) { animation-delay: 1s; }
        .cloudguard-stage:nth-child(5) { animation-delay: 1.3s; }
        
        .result-recovery {
          animation: bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.8s forwards;
          opacity: 0;
        }
        
        .result-icon {
          animation: checkmark 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.8s forwards;
          opacity: 0;
        }
      `}</style>

      <div className="space-y-0 w-full max-w-sm mx-auto mb-6">
        {/* Stage 1 */}
        <div className="cloudguard-stage bg-red-50 dark:bg-red-950 p-6 border border-red-200 dark:border-red-800 rounded-t-lg text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 5h6m-1 4v10m-6-10v10M5 15H3m18 0h-2M5 11h2m10 0h2M9 7h1m4 0h1" />
            </svg>
          </div>
          <h4 className="font-semibold text-red-900 dark:text-red-100">EC2 Running</h4>
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">Application processing requests</p>
          <p className="text-xs font-mono text-red-600 dark:text-red-400 mt-2">aws-ap-south-1</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1 bg-gray-100 dark:bg-gray-900">
          <span className="text-gray-400 text-lg">↓</span>
        </div>

        {/* Stage 2 */}
        <div className="cloudguard-stage bg-gray-50 dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-14 h-14 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">CloudWatch Metrics</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">CPU, memory, network streamed live</p>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-500 mt-2">metric-data-stream</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1 bg-gray-100 dark:bg-gray-900">
          <span className="text-gray-400 text-lg">↓</span>
        </div>

        {/* Stage 3 */}
        <div className="cloudguard-stage bg-purple-50 dark:bg-purple-950 p-6 border border-purple-200 dark:border-purple-800 text-center">
          <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="font-semibold text-purple-900 dark:text-purple-100">Isolation Forest</h4>
          <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Unsupervised anomaly detection</p>
          <p className="text-xs font-mono text-purple-600 dark:text-purple-400 mt-2">zero-labeled-training</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1 bg-gray-100 dark:bg-gray-900">
          <span className="text-gray-400 text-lg">↓</span>
        </div>

        {/* Stage 4 */}
        <div className="cloudguard-stage bg-blue-50 dark:bg-blue-950 p-6 border border-blue-200 dark:border-blue-800 text-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="font-semibold text-blue-900 dark:text-blue-100">Lambda Remediation</h4>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Auto-restart, scale, or isolate</p>
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-2">serverless-response</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1 bg-gray-100 dark:bg-gray-900">
          <span className="text-gray-400 text-lg">↓</span>
        </div>

        {/* Stage 5 */}
        <div className="cloudguard-stage bg-cyan-50 dark:bg-cyan-950 p-6 border border-cyan-200 dark:border-cyan-800 rounded-b-lg text-center">
          <div className="w-14 h-14 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-cyan-600 dark:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h4 className="font-semibold text-cyan-900 dark:text-cyan-100">SNS Alert + Logs</h4>
          <p className="text-sm text-cyan-700 dark:text-cyan-300 mt-1">Ops team notified, details in S3</p>
          <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-2">sns + s3-archive</p>
        </div>
      </div>

      {/* Result */}
      <div className="result-recovery bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <div className="result-icon text-4xl mb-3 inline-block">✓</div>
        <h3 className="font-semibold text-green-900 dark:text-green-100 text-lg">Infrastructure Self-Healed</h3>
        <p className="text-sm text-green-700 dark:text-green-300 mt-2 leading-relaxed">
          The entire loop runs serverlessly. No human in the loop. The system fixes itself in seconds.
        </p>
      </div>
    </div>
  );
};
