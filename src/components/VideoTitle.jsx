const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-end z-10 bg-linear-to-r from-black/60 via-black/40 to-transparent pb-48 pl-16 pr-24">
      <h1 className="text-5xl font-bold w-2/3 text-white drop-shadow-2xl mb-4 leading-tight tracking-tight">
        {title}
      </h1>
      <p className="text-base text-gray-100 w-1/3 mb-8 drop-shadow-lg line-clamp-3 leading-relaxed">
        {overview}
      </p>
      <div className="flex gap-4 items-center">
        <button className="bg-red-500 text-black hover:bg-white/80 px-8 py-3 font-bold rounded flex items-center gap-2 transition-all duration-200 hover:scale-105">
          ▶ Play
        </button>
        <button className="bg-gray-500/70 text-white hover:bg-gray-600 px-8 py-3 font-semibold rounded transition-all duration-200 hover:scale-105">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
