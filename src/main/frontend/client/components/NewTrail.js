import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import ErrorList from './ErrorList';
import DifficultyFormField from './DifficultyFormField';

const NewTrail = () => {
  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [trailId, setTrailId] = useState(null);
  const [formData, setFormData] = useState({
     name: "",
     description: "",
     distance: "",
     elevationGain: "",
     difficulty: "",
     zipCode: "",
     imgUrl: ""
  });

  const submitNewTrail = async () => {
    try {
      const res = await fetch('/api/v1/trails', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        if(res.status === 422) {
          const body = await res.json();
          return setErrors(body.errors);
        } else {
          const error = new Error(`${res.status} (${res.statusText})`);
          throw(error);
        }
      }
      const trail = await res.json();
      setTrailId(trail.id);
      setShouldRedirect(true);
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  };

  const changeHandler = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const submitFormHandler = event => {
    event.preventDefault();
    setErrors({});
    submitNewTrail();
  };

  if (shouldRedirect) {
    return <Redirect push to={`/trails/${trailId}`} />;
  }

  return (
    <>
      <h1 className="new-trail-header">Tell Us About Your Hike!</h1>
      <form onSubmit={submitFormHandler}>
        <ErrorList errors={errors} />
        <div className="new-trail-container">
          <div>
            <label htmlFor="name">Name: </label>
            <input
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <textarea
              rows="5" cols="33"
              name="description"
              id="description"
              type="textarea"
              value={formData.description}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="distance">Length (miles): </label>
            <input
              name="distance"
              id="distance"
              type="number"
              step=".1"
              value={formData.distance}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="elevationGain">Elevation Gain: </label>
            <input
              name="elevationGain"
              id="elevationGain"
              type="number"
              step=".1"
              value={formData.elevationGain}
              onChange={changeHandler}
            />
          </div>
          <DifficultyFormField
            changeHandler={changeHandler}
            difficulty={formData.difficulty}
          />
          <div>
            <label htmlFor="zipCode">Location (zip code): </label>
            <input
              name="zipCode"
              id="zipCode"
              type="text"
              value={formData.zipCode}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="imgUrl">Image URL: </label>
            <input
              name="imgUrl"
              id="imgUrl"
              type="text"
              value={formData.imgUrl}
              onChange={changeHandler}
            />
          </div>
          <input type="submit" className="button" />
        </div>
      </form>
    </>
  );
};

export default NewTrail;