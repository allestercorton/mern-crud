import { CircleX } from 'lucide-react';

const Error = ({ error }) => (
  <div className='w-full px-4 sm:px-6 py-6 flex justify-center'>
    <div
      role='alert'
      className='alert alert-error w-full max-w-2xl mx-auto mt-4 sm:mt-10 text-sm sm:text-base'
    >
      <CircleX className='size-5 sm:size-6 flex-shrink-0' />
      <span className='break-words'>
        {error.message || 'An unknown error occurred.'}
      </span>
    </div>
  </div>
);

export default Error;
