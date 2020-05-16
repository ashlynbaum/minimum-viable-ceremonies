import React, { useContext } from "react"
import Context from "../contexts/room"
import Dropdown from "../components/basic/dropdown"
import Icon from "../components/basic/icon"
import Participant from "../components/participant"

import "../styles/sidebar.scss"

const Sidebar = () => {
  const { uuid, shareableLink, participants } = useContext(Context)

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <span>Some name</span>
          <Dropdown
            klass="sidebar-shareable-link hover-state"
            icon="basic/link"
            size={16}
            text={uuid}
            tooltip="Click to copy shareable link"
          />
        </div>
        <Dropdown
          klass="sidebar-collapse hover-state"
          icon="arrows/chevrons-left"
          tooltip="Collapse the sidebar"
        />
      </div>
      <div className="sidebar-participants">
        <h3 className="sidebar-subtitle">Team and roles</h3>
        {Object.values(participants).map(({ id, name, role }) => (
          <Participant key={id} name={name} role={role} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
