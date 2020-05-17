import React, { useState, useContext } from "react"
import Context from "../contexts/room"
import Dropdown from "../components/basic/dropdown"
import Participant from "../components/participant"

import "../styles/sidebar.scss"

const Sidebar = () => {
  const { uuid, shareableLink, participants } = useContext(Context)
  const [copied, setCopied] = useState(false)

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">Some name</div>
        <Dropdown
          klass="sidebar-collapse"
          icon="arrows/chevrons-left"
          tooltip="Collapse the sidebar"
        />
      </div>
      <div className="sidebar-actions">
        <h3 className="sidebar-subtitle">Shareable link</h3>
        <Dropdown
          klass="sidebar-shareable-link"
          icon="basic/link"
          size={16}
          text={uuid}
          tooltip={copied ? "Copied to clipboard!" : "Click to copy shareable link"}
          onClick={() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1000)
          }}
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
