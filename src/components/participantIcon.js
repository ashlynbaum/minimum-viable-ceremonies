import React from "react"

import "../styles/participant.scss"

const ParticipantIcon = ({ id, image, username, roles }) => (
  <div className="participant-icon" title={`${username} (${roles.join(', ')})`}>
    {image ? (
      <img src={image} alt={`${username} (${roles.join(', ')})`} />
    ) : (
      <span>{username[0]}</span>
    )}
  </div>
)

export default ParticipantIcon
