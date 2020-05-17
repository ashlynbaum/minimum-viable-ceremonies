import React from "react"

import "../styles/participant.scss"

const Participant = ({ id, username, role }) => (
  <div className="participant">
    <div className="participant-content">
      <div className="participant-icon" title={`${username} (${role})`}>{username[0]}</div>
    </div>
  </div>
)

export default Participant
