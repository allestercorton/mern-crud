import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { deleteUser } from '../api/userApi';

const DeleteDialog = ({ id, setUsers, modalId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to delete user.');
    } finally {
      setIsLoading(false);
    }
    document.getElementById(modalId)?.close();
  };

  return (
    <>
      <button
        className='btn btn-square btn-ghost btn-sm sm:btn-md'
        onClick={() => document.getElementById(modalId)?.showModal()}
        aria-label='Delete user'
      >
        <Trash className='size-[1em] sm:size-[1.2em]' />
      </button>
      <dialog id={modalId} className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box w-full max-w-md'>
          <h3 className='font-bold text-lg'>Delete Confirmation</h3>
          <p className='py-4'>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <div className='modal-action flex flex-col-reverse sm:flex-row gap-2 sm:gap-3'>
            <button
              type='button'
              onClick={() => document.getElementById(modalId)?.close()}
              className='btn btn-ghost w-full sm:w-auto'
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={handleDelete}
              className='btn btn-error w-full sm:w-auto'
            >
              Delete
              {isLoading && <Loader isButton />}
            </button>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default DeleteDialog;
