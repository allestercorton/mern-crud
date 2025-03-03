import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch users: ${error}` });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.create({ name, age });

    res.status(201).json({ message: 'User created successfully!', data: user });
  } catch (error) {
    res.status(500).json({ message: `Failed to create a user: ${error}` });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res
        .status(400)
        .json({ message: 'At least one field must be provided for update.' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(400).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated successfully!', data: user });
  } catch (error) {
    res.status(500).json({ message: `Failed to update a user: ${error}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(400).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: `Failed to delete a user: ${error}` });
  }
};
