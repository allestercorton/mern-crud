const Loader = ({ isPage, isButton }) => {
  return (
    <>
      {isPage && (
        <div className='flex justify-center items-center min-h-[50vh] sm:min-h-[60vh] md:min-h-screen'>
          <span className='loading loading-spinner loading-lg sm:loading-xl'></span>
        </div>
      )}

      {isButton && (
        <span className='loading loading-spinner loading-xs ml-1'></span>
      )}
    </>
  );
};

export default Loader;
