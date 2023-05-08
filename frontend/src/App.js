import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from './components/Spots/SpotIndex';
import SpotShow from './components/Spots/SpotShow'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotIndex} />
          <Route exact path="/spots/:spotId" component={SpotShow} />
        </Switch>
      )
      }
    </>
  );
}

export default App;
