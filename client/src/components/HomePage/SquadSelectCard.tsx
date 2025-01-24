import { useDispatch } from 'react-redux';
import { getRoomsExists } from '../../utils/api';
import { setRoomId } from '../../store/slices/roomSlice';
import { useNavigate } from 'react-router-dom';

const SquadSelectCard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const squadMeetHandler = async () => {
    const response = await getRoomsExists()
    console.log(response)
    if (response.data.roomExists) {
      dispatch(setRoomId(response.data.roomId))
    }
    navigate('/room')
  

  };
  return (

    <div
      className="w-[200px] h-[100px] bg-white shadow-md rounded-md active:scale-95 duration-300"
      onClick={squadMeetHandler}
    >
      Squad
    </div>
  )
}

export default SquadSelectCard
