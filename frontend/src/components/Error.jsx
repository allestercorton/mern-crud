import React from 'react';
import { CircleX } from 'lucide-react';

export const Error = ({ error }) => (
  <div role='alert' className='alert alert-error max-w-2xl mx-auto mt-10'>
    <CircleX />
    <span>{error.message || 'An unknown error occured.'}</span>
  </div>
);
