import React from 'react';

const Loader = ({ isPage, isButton }) => {
  return (
    <>
      {isPage && (
        <div className='flex justify-center items-center min-h-screen'>
          <span className='loading loading-spinner loading-xl'></span>
        </div>
      )}

      {isButton && <span className='loading loading-spinner loading-xs'></span>}
    </>
  );
};

export default Loader;
