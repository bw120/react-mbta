import React, { useEffect, useState } from "react";
import {
  useParams,
} from "react-router-dom";
import { getPredictionsByStop } from "../helpers/api";
import { getMinutesFromNow } from '../helpers/time';
import "./Predictions.css";

function Predictions(props) {
  let {stopId} = useParams();

  const {
    lineDetails,
  } = props;
  const line = lineDetails?.id;
  const [direction, setDirection] = useState(0);
  const [predictions, setPredictions] = useState([]);

  const handleChangeDirection = (e) => {
    const {value} = e.target;
    setDirection(Number(value));
  }

  const updatePredictions = () => {
    getPredictionsByStop(line, stopId).then((data) => {
      const predictions = data.map((item) => {
        const {
          departure_time: departure,
        } = item.attributes;

        const minutesToDepart = getMinutesFromNow(departure);

        item = {
          ...item,
          minutesToDepart,
        }

        return item;
      }).sort((a, b) => a.minutesToDepart - b.minutesToDepart);

      setPredictions(predictions)
    });
  }

  useEffect(() => {
    updatePredictions();

    // update predictions every 30 seconds
    const interval = setInterval(() => {
      updatePredictions();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const currentStop = props.stops?.filter((stop) => stop.id === stopId)[0] || [];
  const lineDirections = lineDetails?.attributes?.direction_names;
  const predictionsToDisplay = predictions.filter((item) => {
    return item.attributes.direction_id === direction;
  });

  return (
    <div className="predictions">
      <h2>{currentStop?.attributes?.name}</h2>
      <label>Select a direction:&nbsp;
        <select onChange={(e) => handleChangeDirection(e)} value={direction}>
          {lineDirections && lineDirections.map((name, key) => {
            return (<option key={name} value={key}>{name}</option>)
          })}
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <td colSpan={2}><h3>Predictions</h3></td>
          </tr>
          <tr>
            <td>Minutes to departure</td>
            <td>Destination</td>
          </tr>
        </thead>
        <tbody>
          {predictionsToDisplay.map((prediction, key) => {
          const {
            minutesToDepart,
            id,
            attributes,
          } = prediction;

          const {
            headsign,
          } = attributes;

            if (minutesToDepart) {
              return (
                <>
                  {minutesToDepart && <tr key={id}>
                    <td>{minutesToDepart}</td>
                    <td>{headsign}</td>
                  </tr>}
                </>)
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Predictions;
