import React from "react"
import Progress from "./progress"
import "../../styles/controls.scss"

const Controls = ({ step: { next, nextText, back, backText, canProceed }, index, max }) => (
  <div className="controls">
    {index > 0 && <button onClick={back} className="btn btn-blue">{backText}</button>}
    <div className="controls-divider">
      {index > 0 && <Progress step={index-1} max={max} />}
    </div>
    <button disabled={!canProceed()} onClick={next} className="btn btn-blue">{nextText}</button>
  </div>
)

export default Controls
