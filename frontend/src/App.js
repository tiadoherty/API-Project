import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from './components/ReadSpots/SpotIndex';
import SpotShow from './components/ReadSpots/SpotShow'
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from './components/EditSpotForm'
import UserCurrentSpots from './components/UserSpots/UserCurrentSpots'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="main">
        {!isLoaded && <div>Loading...</div>}
        {isLoaded && (
          <Switch>
            <Route exact path="/spots/current" component={UserCurrentSpots} />
            <Route exact path="/spots/new" component={CreateSpotForm} />
            <Route exact path="/spots/:spotId/edit" component={EditSpotForm} />
            <Route exact path="/spots/:spotId" component={SpotShow} />
            <Route exact path="/" component={SpotIndex} />
          </Switch>
        )
        }
      </div>
    </>
  );
}

export default App;
