import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DifficultyFormField from './DifficultyFormField';

const FilterForm = props => {
  const [filterFormData, setFilterFormData] = useState({
    name: '',
    difficulty: '',
    distance: '',
    zipCode: ''
  });

  useEffect(() => {
    props.searchParams.forEach((value, key) => {
      setFilterFormData({
        ...filterFormData,
        [key]: value
      });
    });
  }, [props.searchParams]);

  const clearForm = () => {
    setFilterFormData({
       name: '',
       difficulty: '',
       distance: '',
       zipCode: ''
    });
  };

  const changeHandler = event => {
    setFilterFormData({
      ...filterFormData,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  
  const buildQueryString = () => {
    let queryString = '';
    Object.keys(filterFormData).forEach(field => {
      if (filterFormData[field]) {
        queryString += field + "=" + filterFormData[field] + "&"
      }
    })
    return queryString;
  }

  const queryString = buildQueryString();

  return (
    <form>
      <div className="grid-x grid-padding-x">
        <div className="cell small-4">
          <label htmlFor="Trail Name">Trail Name: </label>
          <input
            name="name"
            type="text"
            placeholder="search trails"
            value={filterFormData.name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="distance">Distance (miles): {filterFormData.distance}</label>
          <input 
            type="range"
            name="distance"
            id="distance"
            min="1"
            max="20"
            value={filterFormData.distance}
            onChange={changeHandler}
          />
        </div>
        <DifficultyFormField changeHandler={changeHandler} difficulty={filterFormData.difficulty} />
        <div>
          <Link to={`/trails?${queryString}`}>
              <button type="button" className="button">
                <i className="fas fa-search"></i>
              </button>
          </Link>
          <Link onClick={clearForm} to={`/trails`}>
            Clear Filters
          </Link>

        </div>
      </div>
    </form>
  );
};

export default FilterForm;