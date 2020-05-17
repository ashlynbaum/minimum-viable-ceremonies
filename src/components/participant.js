import React from "react"
import Dropdown from "../components/basic/dropdown"

import "../styles/participant.scss"

const Participant = ({ id, username, role }) => (
  <div className="participant">
    <div className="participant-content">
      <div className="participant-icon">{username[0]}</div>
      <div className="participant-name">{username}</div>
      <div className="participant-actions">
        <Dropdown
          klass="dark"
          icon="basic/more-horizontal"
          size={16}
          tooltip="Edit profile"
        />
      </div>
    </div>
    <div className="participant-roles">
      <div className="participant-role hover-state dark">{role}</div>
    </div>
  </div>
)

export default Participant
