import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import "../styles/intro.scss"
import board from "../images/board.svg"

const Intro = () => {
  const [uuid, setUuid] = useState('')

  return (
    <div className="intro">
      <div className="intro-wrapper">
        <div className="intro-left">
          <h1>Welcome to Minimum Viable Ceremonies</h1>
          <div className="intro-new">
            <Link className="btn btn-blue" to="setupRoom">Start a new room</Link>
          </div>
          <div className="intro-divider">
            <hr/>
            <p>Or, enter an existing room:</p>
            <hr/>
          </div>
          <div className="intro-existing">
            <input
              className="btn-input"
              name="room"
              placeholder="e.g. wealthy-dusty-llama"
              value={uuid}
              onChange={({ target: { value } }) => setUuid(value)}
            />
            <button disabled={!uuid.length} onClick={() => navigate('room', { state: { uuid } })} className="btn btn-blue">
              Go!
            </button>
          </div>
        </div>
        <div className="intro-right">
          <img src={board} alt="board" />
        </div>
      </div>
    </div>
  )
}

export default Intro
