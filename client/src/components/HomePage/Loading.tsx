import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import "./loaderStyle.css"

const Loading = () => {
    const { isLoading } = useSelector((state: RootState) => state.loading)

    return (
        <>
            {isLoading && (
                <div className='fixed top-0 left-0 w-screen h-screen bg-[#2b2b2b65] flex justify-center items-center'>
                    <div className="loading-wave">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Loading
