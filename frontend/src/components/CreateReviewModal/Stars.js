import React, { useState } from 'react';
import FilledStarSVG from './FilledStar.svg'
import EmptyStarSVG from './EmptyStar.svg'

const filledStar = <img src={FilledStarSVG} className='star' />
const emptyStar = <img src={EmptyStarSVG} className='star' />

const Stars = ({ stars, handleClick }) => {
    const [activeStars, setActiveStars] = useState(stars)

    const star1 = activeStars >= 1 ? filledStar : emptyStar;
    const star2 = activeStars >= 2 ? filledStar : emptyStar;
    const star3 = activeStars >= 3 ? filledStar : emptyStar;
    const star4 = activeStars >= 4 ? filledStar : emptyStar;
    const star5 = activeStars >= 5 ? filledStar : emptyStar;

    return (
        <div onMouseOut={() => setActiveStars(stars)} className="stars-container">
            <span onClick={() => handleClick(1)} onMouseOver={() => setActiveStars(1)}>{star1}</span>
            <span onClick={() => handleClick(2)} onMouseOver={() => setActiveStars(2)}>{star2}</span>
            <span onClick={() => handleClick(3)} onMouseOver={() => setActiveStars(3)}>{star3}</span>
            <span onClick={() => handleClick(4)} onMouseOver={() => setActiveStars(4)}>{star4}</span>
            <span onClick={() => handleClick(5)} onMouseOver={() => setActiveStars(5)}>{star5}</span>
            <label className='stars-label'>Stars</label>
        </div >
    )
}



export default Stars;
