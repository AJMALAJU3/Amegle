import VideoPreview from '../components/HomePage/VideoPreview';
import HomeSelectCards from '../components/HomePage/HomeSelectCards';

const HomePage = () => {

    

  return (
    <div className="flex flex-col gap-4">
        <VideoPreview />
        <HomeSelectCards />
    </div>
  );
};

export default HomePage;
