import { useEffect, useState } from 'react';
import CreateDialog from './CreateDialog';
import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';
import { fetchUsers } from '../api/userApi';
import Loader from './Loader';
import Error from './Error';

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
    <div className='w-full px-4 sm:px-6 md:px-8 py-6'>
      <ul className='list bg-base-100 rounded-box shadow-md w-full max-w-2xl mx-auto mt-4 sm:mt-10'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 gap-3 sm:gap-0'>
          <li className='text-lg sm:text-xl opacity-80 tracking-wide'>
            User Lists
          </li>
          <CreateDialog setUsers={setUsers} />
        </div>

        {users.length === 0 ? (
          <p className='px-4 pb-4'>No users found. Add a new user.</p>
        ) : (
          users.map((user) => (
            <li
              key={user._id}
              className='list-row flex items-center p-3 sm:p-4 border-t border-base-200'
            >
              <div className='mr-3'>
                <img
                  className='size-8 sm:size-10 rounded-box'
                  src={user.image || '/placeholder.svg'}
                  alt={user.name}
                />
              </div>
              <div className='flex-1 space-y-0.5 min-w-0'>
                <div className='font-medium truncate'>{user.name}</div>
                <div className='text-xs uppercase font-semibold opacity-60'>
                  {user.age}
                </div>
              </div>
              <div className='flex items-center gap-1 sm:gap-2'>
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
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;
