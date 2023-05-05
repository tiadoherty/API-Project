// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
// import './Navigation.css';

// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);
//   const dispatch = useDispatch();

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li>
//         <ProfileButton user={sessionUser} />
//         {/* <button className="navbutton" onClick={logout}>Log Out</button> */}
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       <li>
//         <NavLink to="/login">Log In</NavLink>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </li>
//     );
//   }

//   return (
//     <ul>
//       <li className="home">
//         <NavLink className="navlinkbutton" exact to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
