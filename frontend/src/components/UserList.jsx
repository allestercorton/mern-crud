import React, { useEffect, useState } from 'react';
import CreateDialog from './CreateDialog';
import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';
import { fetchUsers } from '../api/userApi';
import Loader from './Loader';
import { Error } from './Error';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (isLoading) return <Loader isPage />;
  if (error) return <Error error={error} />;

  return (
    <ul className='list bg-base-100 rounded-box shadow-md max-w-2xl mx-auto mt-10'>
      <div className='flex justify-between items-center p-4'>
        <li className='text-xl opacity-80 tracking-wide'>User Lists</li>
        <CreateDialog setUsers={setUsers} />
      </div>

      {users.length === 0 ? (
        <p className='px-4'>No users found. Add a new user.</p>
      ) : (
        users.map((user) => (
          <li key={user._id} className='list-row'>
            <div>
              <img className='size-10 rounded-box' src={user.image} />
            </div>
            <div className='space-y-0.5'>
              <div>{user.name}</div>
              <div className='text-xs uppercase font-semibold opacity-60'>
                {user.age}
              </div>
            </div>
            <EditDialog
              user={user}
              setUsers={setUsers}
              modalId={`edit-modal-${user._id}`}
            />
            <DeleteDialog
              id={user._id}
              setUsers={setUsers}
              modalId={`delete-modal-${user._id}`}
            />
          </li>
        ))
      )}
    </ul>
  );
};

export default UserList;
