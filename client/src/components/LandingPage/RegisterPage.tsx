import { useState } from 'react';
import { registerUser } from '../../utils/api';  // Your axios or api function to make requests
import { connectWithSocketIOServer } from '../../utils/wss';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const socketId = await connectWithSocketIOServer();
      const response = await registerUser(username, socketId)
      if (response.data.success) {
        const { username, socketId, userId } = response.data.user
        dispatch(setUser({ username, socketId, userId}))
        navigate('/home')
        console.log('User created successfully', response.data);
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-3 bg-white rounded-md shadow-md">
      <input
        type="text"
        className="border rounded-md mr-3 px-2"
        placeholder="Enter name here .."
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="hover:text-blue-500 active:scale-95" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default RegisterPage;
