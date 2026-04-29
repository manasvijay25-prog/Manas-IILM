import React from "react";

export default function Error({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  details = null,
  onRetry = null,
  retryLabel = "Try again",
  homeHref = "/",
  showHome = true,
  className = "",
}) {
  const rootBackground = {
    background:
      "radial-gradient(1200px 600px at 10% 20%, rgba(229,9,20,0.12), transparent 8%), radial-gradient(900px 500px at 90% 80%, rgba(229,9,20,0.08), transparent 10%), linear-gradient(180deg, #0f172a, #0b1220)",
    color: "white",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  };

  // Define the custom glow background, now purely red-focused
  const glowBackground = {
    background:
      "radial-gradient(circle at 30% 20%, rgba(229,9,20,0.25), transparent 14%), radial-gradient(circle at 80% 80%, rgba(229,9,20,0.15), transparent 18%)",
  };

  // Netflix Red Colors
  const NETFLIX_RED = "#E50914";
  const DARK_RED = "#B20710"; // Used for gradient depth

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 sm:p-10 ${className}`}
      role="alert"
      aria-live="assertive"
      style={rootBackground}
    >
      {/* Card: Added responsive classes for small screens (sm:) */}
      <div
        className="w-full max-w-[820px] bg-white/5 rounded-xl p-6 sm:p-9 shadow-2xl backdrop-blur-md 
                           flex flex-col sm:flex-row gap-5 sm:gap-7 items-stretch sm:items-center 
                           transform translate-y-2 animate-floatIn"
        style={{
          // Equivalent to original .eg-card box-shadow
          boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
        }}
      >
        <style>{`
                    /* Keyframe animation for floatIn */
                    @keyframes floatIn {
                        from { opacity: 0; transform: translateY(14px) scale(.995); }
                        to   { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .animate-floatIn {
                        animation: floatIn 420ms cubic-bezier(.2,.9,.2,1);
                    }
                `}</style>
        {/* Icon */}
        <div className="relative flex-none w-20 h-20 sm:w-32 sm:h-32 rounded-lg grid place-items-center bg-white/5 border border-white/5 overflow-hidden">
          <div
            className="absolute -inset-40 filter blur-2xl opacity-90 transform scale-[1.05]"
            style={glowBackground}
            aria-hidden="true"
          />
          <svg
            className="relative z-10 w-12 h-12 sm:w-16 sm:h-16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                {/* Updated gradient stops to Netflix Red tones */}
                <stop offset="0" stopColor={NETFLIX_RED} />
                <stop offset="1" stopColor={DARK_RED} />
              </linearGradient>
            </defs>
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="url(#g)"
              strokeWidth="1.6"
              opacity="0.92"
            />
            <path
              d="M12 7v5"
              stroke="url(#g)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16.2h.01"
              stroke="url(#g)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-1 leading-tight">{title}</h3>
          <p className="text-sm text-white/75 mb-0">{message}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {onRetry ? (
              <button
                onClick={onRetry}
                // Updated button gradient and focus ring to use Netflix Red
                className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm text-white 
                                           bg-gradient-to-r from-[#E50914] to-[#B20710] shadow-lg hover:shadow-xl transition-all
                                           focus:outline-none focus:ring-4 focus:ring-[#E50914]/40 focus:ring-offset-2
                                           active:scale-[0.99] active:translate-y-[1px]"
                aria-label={retryLabel}
                type="button"
              >
                {retryLabel}
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm text-white 
                                           bg-gradient-to-r from-[#E50914] to-[#B20710] shadow-lg hover:shadow-xl transition-all
                                           focus:outline-none focus:ring-4 focus:ring-[#E50914]/40 focus:ring-offset-2
                                           active:scale-[0.99] active:translate-y-[1px]"
                aria-label="Reload page"
                type="button"
              >
                Reload
              </button>
            )}

            {showHome && (
              <a
                // Secondary button remains white/muted for contrast
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white/75 
                                           bg-transparent border border-white/10 hover:border-white/20 transition-colors
                                           focus:outline-none focus:ring-2 focus:ring-white/30"
                href={homeHref}
                aria-label="Go to home"
              >
                Home
              </a>
            )}

            <a
              className="text-sm text-white/90 underline underline-offset-4 font-semibold hover:text-white transition-colors"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Scroll to top"
            >
              Scroll to top
            </a>
          </div>

          {details ? (
            <pre
              className="mt-4 text-sm text-white/70 font-mono bg-white/5 rounded-lg p-3 border border-dashed border-white/10 max-h-52 overflow-auto whitespace-pre-wrap"
              tabIndex={0}
            >
              {details}
            </pre>
          ) : null}
        </div>
      </div>
    </div>
  );
}
