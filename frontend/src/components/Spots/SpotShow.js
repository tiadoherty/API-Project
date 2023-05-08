import { useParams } from 'react-router-dom'
import './SpotShow.css'

const SpotShow = () => {
    const { spotId } = useParams();

    return (
        <h1 className="spot-show-header"> This is the page for spot number {spotId}</h1>
    )
}

export default SpotShow
