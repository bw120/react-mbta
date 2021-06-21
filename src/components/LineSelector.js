import React from "react";
import { useHistory } from "react-router-dom";
import "./StopSelector.css";

function LineSelector(props) {

  const {
    lines,
  } = props;
  const history = useHistory();

  const clickHandler = (e, line) => {
    e.preventDefault();
    history.push(`/line/${line}`);
  }

  return (
    <div className="line-selector">
      <h1>Choose a line:</h1>
      {lines.map((line) => {
        const {
          id,
          attributes: { color },
        } = line;

        return (
          <button
            key={id}
            onClick={(e) => clickHandler(e, id) }
            className="line-selector-btn"
            type="button"
            style={{backgroundColor: `#${color}`}}
          >
            {id}
          </button>
        );
      })}
    </div>
  );
}

export default LineSelector;
