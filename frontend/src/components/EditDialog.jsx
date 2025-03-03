import React, { useEffect, useState } from 'react';
import { PenLine } from 'lucide-react';
import { updateUser } from '../api/userApi';
import toast from 'react-hot-toast';
import Loader from './Loader';

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
        className='btn btn-square btn-ghost'
        onClick={() => document.getElementById(modalId)?.showModal()}
      >
        <PenLine className='size-[1.2em]' />
      </button>
      <dialog id={modalId} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-4'>Edit User</h3>
          <form onSubmit={handleUpdate} className='space-y-4'>
            <div className='form-control'>
              <label className='label' htmlFor='name'>
                <span className='label-text'>Name</span>
              </label>
              <input
                id='name'
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
              <label className='label' htmlFor='age'>
                <span className='label-text'>Age</span>
              </label>
              <input
                id='age'
                name='age'
                type='number'
                placeholder='Enter age'
                value={age || ''}
                onChange={(e) => setAge(e.target.value)}
                className='input input-bordered w-full'
                required
              />
            </div>
            <div className='modal-action'>
              <button type='submit' className='btn btn-primary'>
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
