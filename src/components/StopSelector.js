import React, { useEffect, useState } from "react";
import {
  useParams,
  useRouteMatch,
  useHistory,
  Switch,
  Route,
} from "react-router-dom";
import Predictions from "./Predictions";
import { getStopsByRoute } from "../helpers/api";
import "./LineSelector.css";

function StopSelector(props) {
  const { mbtaLine } = useParams();
  let {path} = useRouteMatch();

  const {
    lines,
  } = props;

  const [stops, setStops] = useState([]);

  useEffect(() => {
    getStopsByRoute([mbtaLine]).then((data) => {
      setStops(data);
    });
  }, []);

  const history = useHistory();
  const clickHandler = (e, stopId) => {
    e.preventDefault();
    history.push(`/line/${mbtaLine}/${stopId}`)
  }

  const lineDetails = lines.filter((line) => line.id === mbtaLine)[0] || {};
  const {attributes = {} } = lineDetails;
  const {
    color = '797a7a',
  } = attributes;

  return (
    <div className="stop-selector-screen">
      <h1>{mbtaLine} Line</h1>
      <Switch>
        <Route exact path={path}>
          <div className={`stop-selector-panel`}>
            <h2>Choose a stop:</h2>
            {stops.map((stop) => {
              const {
                id,
                attributes: {
                  name,
                } = {},
              } = stop;

              return (
                <button
                  style={{backgroundColor: `#${color}`}}
                  key={id}
                  type="button"
                  onClick={(e) => clickHandler(e, id)}
                >
                  {name}
                </button>
              )
            })}
          </div>
        </Route>
        <Route path={`${path}/:stopId`}>
          <Predictions lineDetails={lineDetails} stops={stops}/>
        </Route>
      </Switch>
      </div>
  );
}

export default StopSelector;
