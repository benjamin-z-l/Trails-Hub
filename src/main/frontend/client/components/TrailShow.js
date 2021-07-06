import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'

import ReviewTile from './ReviewTile';
import AverageStarRating from './AverageStarRating';

const TrailShow = props => {
  const [trail, setTrail] = useState({});
  const [reviews, setReviews] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const trailId = props.match.params.id;
  const {
    name,
    description,
    distance,
    elevationGain,
    difficulty,
    zipCode,
    rating,
    imgUrl
  } = trail;

  const getTrail = async () => {
    try {
      const res = await fetch(`/api/v1/trails/${trailId}`);
      if (!res.ok) {
        const error = new Error(`${res.status} (${res.statusText})`);
        throw(error);
      }
      const trailData = await res.json();
      setTrail(trailData.trail);
      setReviews(trailData.trail.reviews);
    } catch (e) {
      console.error("Error in fetch: ", e.message);
    }
  }

  const deleteTrail = async () => {
    console.log("HIT deleteTrail fetch")
    try {
      const res = await fetch(`/api/v1/trails/${trailId}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      if (!res.ok) {
        const error = new Error(`${res.status} (${res.statusText})`);
        throw(error);
      }

      setShouldRedirect(true);
    } catch (e) {
      console.error("Error in fetch: ", e.message);
    }
  }

  const deleteReview = async (reviewId) => {
    try {
      const res = await fetch(`/api/v1/trails/${trailId}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      if (!res.ok) {
        const error = new Error(`${res.status} (${res.statusText})`);
        throw(error);
      }
      setReviews(
        reviews.filter(review => review.id != reviewId)
      )
    } catch (e) {
      console.error("Error in fetch: ", e.message);
    }
  }

  useEffect(() => {
    getTrail();
  }, []);

  const deleteTrailHandler = event => {
    event.preventDefault()
    var result = confirm("Click 'OK' to delete the trail")
    if (result) {
        deleteTrail()
    }
  }

  const deleteReviewHandler = reviewId => {
    var result = confirm("Click 'OK' to delete the review")
    if (result) {
        deleteReview(reviewId)
    }
  }

  const reviewTiles = reviews.map(review => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        trailId={trailId}
        trail={trail}
        getTrail={getTrail}
        deleteReviewHandler={deleteReviewHandler}
      />
    );
  });

  if (shouldRedirect) {
    return <Redirect push to={`/trails`} />
  }

  return (
    <div>
      <h1 className="aspect-ratio-box">
        <div className="aspect-ratio-box-inside">
          <div className="flexbox-centering">
            <div className="viewport-sizing">
             <img className="show-image" src={imgUrl} />
            </div>
          </div>
        </div>
      </h1>

      <div className="grid-x grid-margin-x show-content">
        <div className="trail-info-left cell small-12 medium-12 large-6">
          <div className="trail-title-show">
            <h1>
              {name}
    
          
              <button class="config-button" type="button" data-toggle="example-dropdown-1"><i class="fas fa-cog"></i></button>
              <div class="dropdown-pane" id="example-dropdown-1" data-dropdown data-hover="true" data-hover-pane="true">
              <div className="grid-x grid-margin-x">
                  <div className="cell small-5">
                    <Link
                      to={{ pathname: `/trails/${trailId}/edit`, state: { trail: trail } }}>
                      <button type="button" className="button">Edit Trail</button>
                    </Link>
                  </div>
                  <div className="cell small-6">
                    <button type="button" className="button" onClick={deleteTrailHandler}>Delete Trail </button>
                  </div>
                </div>
                </div>


            </h1>
          </div>
          <div className="trail-attributes">
            <p className="attribute-line">
              <span className="trail-attribute">
                <span className="labelKey">Difficulty: </span>
                <span className={`difficulty-tag ${trail.difficulty}`}>{difficulty}</span>
              </span>
        
              <span className="trail-attribute">
                <span className="labelKey">Rating: </span>
                <AverageStarRating reviews={reviews} />
              </span>
            </p>
            <p className="attribute-line">
              <span className="trail-attribute">
                <span className="labelKey">Distance:</span> {distance} miles
              </span>
              
              <span className="trail-attribute">
                <span className="labelKey">Elevation Gain:</span> {elevationGain} ft
              </span>
            </p>
            <p className="attribute-line" >
              <span className="trail-attribute">
                <span className="labelKey">Location:</span> {zipCode}
              </span>
            </p>
          </div>
        </div>
        <div className="cell small-12 medium-12 large-6">
          <h5>Description</h5>
          <p>{description}</p>
        </div>
      </div>
      <div>
        <h4>User Reviews</h4>
        {reviewTiles}
      </div>
    </div>
  );
};

export default TrailShow;