import { Outlet } from 'react-router-dom'
import Loading from '../components/HomePage/Loading'

const Layout = () => {
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
        <Loading />
      <Outlet />
    </div>
  )
}

export default Layout
