import SquadSelectCard from './SquadSelectCard'
import DuoSelectCard from './DuoSelectCard'

const HomeSelectCards = () => {

  return (
    <div className="flex gap-4 justify-around">
        <DuoSelectCard />
        <SquadSelectCard />
    </div>
  )
}

export default HomeSelectCards
