import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {getLines} from "../helpers/api";
import LineSelector from "./LineSelector";
import StopSelector from "./StopSelector";

import "./App.css";

function App() {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    getLines([0, 1]).then((data) => setLines(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/"}>MBTA App</Link></header>
      <div className="app-body">
        <Switch>
          <Route path="/line/:mbtaLine">
            <StopSelector lines={lines}/>
          </Route>
          <Route path="/">
            <LineSelector lines={lines}/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;