import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: 'https://api.dicebear.com/7.x/lorelei/svg',
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
