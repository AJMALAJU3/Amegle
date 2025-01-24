import { useEffect } from "react"
import * as webRTCHandler from "../utils/webRTCHandler"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"


const RoomPage = () => {
  const user = useSelector((state: RootState) => state.user)
  const roomId = useSelector((state: RootState) => state.room.roomId)
  useEffect(() => {
    console.log(user,roomId,'getLocalPreviewAndInitRoomConnection')
    webRTCHandler.getLocalPreviewAndInitRoomConnection(user, roomId)
  }, [user, roomId])
  return (
    <div id="videos_portal" className="flex justify-center items-center w-full h-full px-10 flex-wrap">

    </div>
  )
}

export default RoomPage
