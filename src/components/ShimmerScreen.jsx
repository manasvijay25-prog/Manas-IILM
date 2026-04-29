import React from "react";

const ShimmerScreen = () => {
  return (
    <div className="pt-4 px-2 md:px-4 w-full -mt-[20%] relative z-30 overflow-scroll">
      {/* Title shimmer with glass effect */}
      <div
        className="h-8 w-56 
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20 
        rounded-xl 
        mb-6 
        animate-pulse
      "
      ></div>

      {/* Glassmorphic row */}
      <div
        className="
          flex gap-4 overflow-hidden p-4
          bg-white/10  
          backdrop-blur-xl 
          border border-white/20 
          rounded-2xl
          shadow-lg shadow-black/40
        "
      >
        {[...Array(7)].map((_, i) => (
          <div key={i} className="shrink-0 w-36 md:w-48">
            {/* Glassmorphic shimmer card */}
            <div
              className="
                w-full h-52 md:h-72 
                bg-white/15  
                backdrop-blur-xl 
                border border-white/20 
                rounded-2xl 
                animate-pulse 
                shadow-md shadow-black/50
              "
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerScreen;
