import React, { useContext } from "react"
import Dropdown from "../components/basic/dropdown"
import Context from "../contexts/room";

import "../styles/participant.scss"

const Participant = ({ id, username, role }) => {
  const { roles } = useContext(Context)

  return (
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
        <Dropdown
          klass="dark"
          position="right-start"
          width={400}
          text={`${roles[role].icon} ${roles[role].name}`}
          tooltip={<div className="participant-role-tooltip">
            <h3>{roles[role].icon} {roles[role].name}</h3>
            <p>
              {roles[role].description}
            </p>
          </div>}
        />
      </div>
    </div>
  )
}

export default Participant
