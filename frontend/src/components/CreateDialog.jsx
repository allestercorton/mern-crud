import { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { createUser, fetchUsers } from '../api/userApi';

const CreateDialog = ({ setUsers }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (age <= 0 || isNaN(age)) {
      return toast.error('Age must be a positive number.');
    }
    setIsLoading(true);
    try {
      await createUser(name, age);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      toast.success('User created successfully!');
      setName('');
      setAge('');
    } catch (error) {
      toast.error(error.message || 'Failed to create user.');
    } finally {
      setIsLoading(false);
    }
    document.getElementById('create-modal').close();
  };

  return (
    <>
      <button
        className='btn btn-outline btn-primary w-full sm:w-auto'
        onClick={() => document.getElementById('create-modal').showModal()}
      >
        Add User
      </button>
      <dialog id='create-modal' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box w-full max-w-md'>
          <h3 className='font-bold text-lg mb-4'>Add User</h3>
          <form onSubmit={handleCreate} className='space-y-4'>
            <div className='form-control'>
              <label className='label' htmlFor='name'>
                <span className='label-text'>Name</span>
              </label>
              <input
                id='name'
                type='text'
                name='name'
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
                type='number'
                name='age'
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
                onClick={() => document.getElementById('create-modal').close()}
                className='btn btn-ghost w-full sm:w-auto'
              >
                Close
              </button>
              <button
                type='submit'
                className='btn btn-primary w-full sm:w-auto'
              >
                Submit
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

export default CreateDialog;
