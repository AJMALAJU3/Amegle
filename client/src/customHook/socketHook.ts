import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSocketId } from '../store/slices/socketSlice';

const socketHook = (socketId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (socketId) {
      dispatch(setSocketId(socketId)); // Dispatch the socketId to Redux
      console.log('Socket ID dispatched:', socketId);
    }
  }, [socketId, dispatch]); // Dependency array includes socketId and dispatch to rerun when socketId changes

  return null;
};

export default socketHook;
