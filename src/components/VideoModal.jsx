import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTrailerModalOpen, setTrailerModalVideoId } from '../utils/moviesSlice';

const VideoModal = () => {
  const dispatch = useDispatch();
  const { isTrailerModalOpen, trailerModalVideoId } = useSelector((store) => store.movies);

  if (!isTrailerModalOpen || !trailerModalVideoId) return null;

  const handleClose = () => {
    dispatch(setTrailerModalOpen(false));
    dispatch(setTrailerModalVideoId(null));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm shadow-2xl">
      <div className="relative w-11/12 max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-2 right-4 text-white hover:text-red-500 font-bold text-4xl z-[110]"
        >
          &times;
        </button>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerModalVideoId}?autoplay=1&mute=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;
