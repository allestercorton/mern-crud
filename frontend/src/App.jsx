import React from 'react';
import UserList from './components/UserList';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <main className='min-h-screen bg-base-200'>
      <UserList />
      <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
    </main>
  );
};

export default App;
