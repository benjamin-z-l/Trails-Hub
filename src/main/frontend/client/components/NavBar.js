import React, { useState } from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
  const [navbar, setNavbar] = useState(false)
  const [windowSize, setWindowSize] = useState(false)

  const shrinkSize = () => {
    console.log(window.scrollY)
    if(window.scrollY >= 100){
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  const keepOnTop = () => {
    console.log(window.innerWidth)
    if(window.innerWidth <= 1050){
      setWindowSize(true)
    } else {
      setWindowSize(false)
    }
  }

  window.addEventListener('scroll', shrinkSize)
  window.addEventListener('resize', keepOnTop)

  let classString = "top-bar sticky"
  if(navbar){
    classString += ' active'
  }

  if(windowSize) {
    classString += ' small-window'
  }


  return (
    <div className={classString} >
      <div className="top-bar-left">
        <div className="logo">
          <Link  to="/trails">Trails Hub</Link>
        </div>
      </div>
      <div className="add-button top-bar-right">
        <Link to="/trails/new">Add A Trail!</Link>
      </div>
    </div>
  );
};

export default NavBar;