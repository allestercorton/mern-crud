import { useEffect, useState } from 'react';
import { PenLine } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { updateUser } from '../api/userApi';

const EditDialog = ({ user, setUsers, modalId }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(user.name);
    setAge(user.age);
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (age <= 0 || isNaN(age)) {
      return toast.error('Age must be a positive number.');
    }
    setIsLoading(true);
    try {
      await updateUser(user._id, name, age);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? { ...u, name, age } : u))
      );
      toast.success('User updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update user.');
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
        aria-label='Edit user'
      >
        <PenLine className='size-[1em] sm:size-[1.2em]' />
      </button>
      <dialog id={modalId} className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box w-full max-w-md'>
          <h3 className='font-bold text-lg mb-4'>Edit User</h3>
          <form onSubmit={handleUpdate} className='space-y-4'>
            <div className='form-control'>
              <label className='label' htmlFor={`name-${user._id}`}>
                <span className='label-text'>Name</span>
              </label>
              <input
                id={`name-${user._id}`}
                name='name'
                type='text'
                placeholder='Enter name'
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
                className='input input-bordered w-full'
                autoComplete='name'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label' htmlFor={`age-${user._id}`}>
                <span className='label-text'>Age</span>
              </label>
              <input
                id={`age-${user._id}`}
                name='age'
                type='number'
                placeholder='Enter age'
                value={age || ''}
                onChange={(e) => setAge(e.target.value)}
                className='input input-bordered w-full'
                required
              />
            </div>
            <div className='modal-action flex flex-col-reverse sm:flex-row gap-2 sm:gap-3'>
              <button
                type='button'
                onClick={() => document.getElementById(modalId)?.close()}
                className='btn btn-ghost w-full sm:w-auto'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='btn btn-primary w-full sm:w-auto'
              >
                Save Changes
                {isLoading && <Loader isButton />}
              </button>
            </div>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default EditDialog;
