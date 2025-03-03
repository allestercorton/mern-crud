import React from 'react';
import UserList from './components/UserList';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <main>
      <UserList />
      <Toaster />
    </main>
  );
};

export default App;
