import React from "react"

import "../styles/participant.scss"

const Participant = ({ id, name, role }) => (
  <div className="participant">
    <div className="participant-content">
      <div className="participant-icon">{name[0]}</div>
      <div className="participant-name">{name}</div>
      <div className="participant-actions hover-state">···</div>
    </div>
    <div className="participant-roles">
      <div className="participant-role hover-state">{role}</div>
    </div>
  </div>
)

export default Participant
