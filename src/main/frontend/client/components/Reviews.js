import React from 'react';
import ReviewTile from './ReviewTile';

const Reviews = props => {
  return (
    <div>
      <h4>User Reviews</h4>
      {reviewTiles}
    </div>
  );
}

export default Reviews;