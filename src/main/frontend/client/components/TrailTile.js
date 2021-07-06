import React from 'react'
import { Link } from 'react-router-dom'

import AverageStarRating from './AverageStarRating'

const TrailTile = props =>{
  const {id, name, imgUrl, distance, difficulty, zipCode, reviews} = props.trail

  return(
    <div className="trail-tile-container-single">
      <div>
        <Link to={`/trails/${id}`} >
          <img src={imgUrl} className="trail-tile-img"></img>
        </Link>
      </div>
      <div className="text-box">
        <h3><Link to={`/trails/${id}`} >{name}</Link></h3>
        <h4>
          <AverageStarRating reviews={reviews} />
        </h4>
        <h4>Difficulty: {difficulty}</h4>
        <h4>Length: {distance} miles</h4>
        <h4>Location: {zipCode}</h4>
      </div>
    </div>
  )
}

export default TrailTile