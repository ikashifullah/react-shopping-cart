import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Ratings = ({ ratings, onClick, style }) => {
  return (
    <div className='ratings'>
      <span>Ratings: </span>
      {[...Array(5)].map((_, i) => <span key={i} onClick={() => onClick(i)} style={style}>
        {(ratings > i)
          ? <AiFillStar fontSize={20} />
          : <AiOutlineStar fontSize={20} />
        }
      </span>
      )}
    </div>
  )
}

export default Ratings