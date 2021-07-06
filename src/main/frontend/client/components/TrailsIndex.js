import React, { useEffect, useState}  from 'react'

import TrailTile from './TrailTile'
import FilterForm from './FilterForm'

const TrailsIndex = props => {
  const [trails, setTrails] = useState([])

  const searchParams = new URLSearchParams(props.location.search)

  const fetchTrails = async () => {
    try {
      const response = await fetch("/api/v1/trails")
      if(!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const trailsData = await response.json()
      setTrails(trailsData.trails)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchTrails()
  },[])

  let filteredTrails = [...trails];

  searchParams.forEach((value, key) => {
    filteredTrails = filteredTrails.filter(trail => {
      if (key === "name") {
        return (
          trail.name.toLowerCase().includes(value.toLowerCase())
        );
      } else if (key === "difficulty") {
        return (
          trail.difficulty === value
        );
      } else if (key === "distance") {
        return  (
          trail.distance <= value
        );
      }
    })
  });

  const trailTiles = filteredTrails.map(trail => {
    return(
      <div>
        <TrailTile
          key={trail.id}
          trail={trail}
        />
      </div>
    )
  })

  return(
    <div className="trail-tiles-container-main">
      <FilterForm searchParams={searchParams} />
      {trailTiles}
    </div>
  )
}

export default TrailsIndex