import React from "react"

import "../styles/participant.scss"

const Participant = ({ id, name, role }) => (
  <div className="participant" title={`${name} (${role})`}>
    {name.substr(0,2)}
  </div>
)

export default Participant
