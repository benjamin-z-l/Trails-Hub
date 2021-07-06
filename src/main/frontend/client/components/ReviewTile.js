import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ReviewImageTile from "./ReviewImageTile"
import ReviewEditForm from "./ReviewEditForm"
import AverageStarRating from "./AverageStarRating"

const ReviewTile = (props) => {
  const { name } = props.review.user
  const { id, comment, rating, createdAt, reviewImages } = props.review
  const trailId = props.trailId
  const [editMode, setEditMode] = useState(false)

  const reviewImageTiles = reviewImages.map((imgUrl, index) => {
    return <ReviewImageTile key={index} imgUrl={imgUrl} />
  })

  const date = new Date(createdAt)
  const dateString = date.toDateString()

  const editHandler = () => {
    setEditMode(!editMode)
  }

  const deleteHandler = (event) => {
    event.preventDefault()
    props.deleteReviewHandler(id)
  }

  if (editMode) {
    return (
      <ReviewEditForm
        review={props.review}
        editHandler={editHandler}
        trailId={props.trailId}
        trail={props.trail}
        dateString={dateString}
        getTrail={props.getTrail}
      />
    )
  } else {
    return (
      <div className="callout">
        <div className="grid-x grid-margin-x">
          <div className="cell small-2">
            <p>{name}</p>
          </div>
          <div className="cell small-8">
            <div>
              <p>{dateString}</p>
            </div>
            <div>
              <p>Rating:
                <AverageStarRating reviews={[props.review]}/>
              </p>
            </div>
          </div>
          <div className="cell small-2">
            <button type="button" className="button" onClick={editHandler}>
              Edit Review
            </button>
          </div>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="cell small-12">
            <p>{comment}</p>
          </div>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="cell small-12">{reviewImageTiles}</div>
        </div>
        <div>
          <button type="button" className="button" onClick={deleteHandler}>
            Delete Review
          </button>
        </div>
      </div>
    )
  }
}

export default ReviewTile
