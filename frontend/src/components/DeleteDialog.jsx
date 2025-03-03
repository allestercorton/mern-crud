import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import { deleteUser } from '../api/userApi';
import toast from 'react-hot-toast';
import Loader from './Loader';

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
        className='btn btn-square btn-ghost'
        onClick={() => document.getElementById(modalId)?.showModal()}
      >
        <Trash className='size-[1.2em]' />
      </button>
      <dialog id={modalId} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Delete Confirmation</h3>
          <p className='py-4'>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <div className='modal-action'>
            <button
              type='button'
              onClick={() => document.getElementById(modalId)?.close()}
              className='btn btn-ghost'
            >
              Close
            </button>
            <button
              type='submit'
              onClick={handleDelete}
              className='btn btn-error'
            >
              Confirm
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
