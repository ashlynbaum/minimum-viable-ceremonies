import React from "react"
import { Link } from "gatsby"

import "../styles/intro.scss"
import board from "../images/board.svg"

const Intro = () => (
  <div className="intro">
    <div className="intro-wrapper">
      <div className="intro-left">
        <h1>Welcome to Minimum Viable Ceremonies</h1>
        <div className="intro-new">
          <Link className="btn btn-blue" to="room">Start a new room</Link>
        </div>
        <div className="intro-divider">
          <hr/>
          <p>Or, enter an existing room:</p>
          <hr/>
        </div>
        <div className="intro-existing">
          <input className="btn-input" name="room" placeholder="e.g. wealthy-dusty-llama"/>
          <Link className="btn btn-blue" to="">Go!</Link>
        </div>
      </div>
      <div className="intro-right">
        <img src={board} alt="board" />
      </div>
    </div>
  </div>
)

export default Intro
