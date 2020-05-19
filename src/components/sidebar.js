import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import ShareableLink from "./shareableLink"
import Participant from "./participant"
import ParticipantIcon from "./participantIcon"
import Context from "../contexts/room"
import "../styles/sidebar.scss"

const Sidebar = () => {
  const { uuid, shareableLink, name, participants, createRoom } = useContext(Context)
  const [expanded, setExpanded] = useState(true)
  const { t } = useTranslation()

  return expanded ? (
    <div className="sidebar expanded">
      <div className="sidebar-header mvc-hover-state">
        <div className="sidebar-title">{name}</div>
        <Dropdown
          klass="sidebar-collapse dark"
          icon="arrows/chevrons-left"
          tooltip={t("sidebar.collapse")}
          onClick={() => setExpanded(false)}
        />
      </div>
      <div className="sidebar-actions">
        <h3 className="mvc-subtitle">{t("sidebar.shareableLink")}</h3>
        <div className="sidebar-option mvc-hover-state">
          <ShareableLink text={uuid} value={shareableLink} position="right" />
        </div>
      </div>
      <div className="sidebar-participants">
        <h3 className="mvc-subtitle">{t("sidebar.teamsAndRoles")}</h3>
        {Object.values(participants).map(({ id, username, role }, index) => (
          <div key={username} className="mvc-hover-state">
            <Participant username={username} role={role} />
          </div>
        ))}
      </div>
      <div className="sidebar-option mvc-hover-state">
        <Dropdown
          klass="light"
          icon="basic/plus"
          size={16}
          text={t("sidebar.setupRoom")}
          tooltip={t("sidebar.setupRoomTooltip")}
          onClick={() => createRoom(true)}
        />
      </div>
    </div>
  ) : (
    <div className="sidebar collapsed">
      <div className="sidebar-collapsed-item mvc-hover-state">
        <Dropdown
          className="sidebar-expand"
          icon="arrows/chevrons-right"
          tooltip={t("sidebar.expand")}
          onClick={() => setExpanded(true)}
        />
      </div>
      <div className="sidebar-collapsed-item mvc-hover-state">
        <ShareableLink value={shareableLink} direction="right" />
      </div>
      <div className="sidebar-collapsed-participants">
        {Object.values(participants).map(({ id, username, role }) => (
          <div key={id} className="sidebar-collapsed-item mvc-hover-state">
            <Dropdown
              klass="sidebar-collapsed-participant"
              text={<ParticipantIcon key={id} username={username} role={role} />}
              tooltip={`${username}: ${role}`}
            />
          </div>
        ))}
      </div>
      <div className="sidebar-collapsed-item mvc-hover-state">
        <Dropdown
          icon="basic/plus"
          size={16}
          tooltip={t("sidebar.setupRoomTooltip")}
          onClick={() => createRoom(true)}
        />
      </div>
    </div>
  )
}

export default Sidebar
