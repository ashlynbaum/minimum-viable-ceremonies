import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import { useTranslation } from "react-i18next"
import Context from "../contexts/room"
import Dropdown from "../components/basic/dropdown"
import ShareableLink from "../components/shareableLink"
import Participant from "../components/participant"
import ParticipantIcon from "../components/participantIcon"

import "../styles/sidebar.scss"

const Sidebar = () => {
  const { uuid, name, participants } = useContext(Context)
  const [expanded, setExpanded] = useState(true)
  const { t } = useTranslation()

  return expanded ? (
    <div className="sidebar expanded">
      <div className="sidebar-header hover-state">
        <div className="sidebar-title">{name}</div>
        <Dropdown
          klass="sidebar-collapse dark"
          icon="arrows/chevrons-left"
          tooltip={t("sidebar.collapse")}
          onClick={() => setExpanded(false)}
        />
      </div>
      <div className="sidebar-actions">
        <h3 className="sidebar-subtitle">{t("sidebar.shareableLink")}</h3>
        <div className="sidebar-option hover-state">
          <ShareableLink text={uuid} />
        </div>
      </div>
      <div className="sidebar-participants">
        <h3 className="sidebar-subtitle">{t("sidebar.teamsAndRoles")}</h3>
        {Object.values(participants).map(({ id, username, role }) => (
          <div key={id} className="hover-state">
            <Participant username={username} role={role} />
          </div>
        ))}
      </div>
      <div className="sidebar-option hover-state">
        <Dropdown
          klass="light"
          icon="basic/plus"
          size={16}
          text={t("sidebar.setupRoom")}
          tooltip={t("sidebar.setupRoomTooltip")}
          onClick={() => navigate("setupRoom")}
        />
      </div>
    </div>
  ) : (
    <div className="sidebar collapsed">
      <div className="sidebar-collapsed-item hover-state">
        <Dropdown
          className="sidebar-expand"
          icon="arrows/chevrons-right"
          tooltip={t("sidebar.expand")}
          onClick={() => setExpanded(true)}
        />
      </div>
      <div className="sidebar-collapsed-item hover-state">
        <ShareableLink />
      </div>
      <div className="sidebar-collapsed-participants">
        {Object.values(participants).map(({ id, username, role }) => (
          <div key={id} className="sidebar-collapsed-item hover-state">
            <Dropdown
              klass="sidebar-collapsed-participant"
              text={<ParticipantIcon key={id} username={username} role={role} />}
              tooltip={`${username}: ${role}`}
            />
          </div>
        ))}
      </div>
      <div className="sidebar-collapsed-item hover-state">
        <Dropdown
          icon="basic/plus"
          size={16}
          tooltip={t("sidebar.setupRoomTooltip")}
          onClick={() => navigate("setupRoom")}
        />
      </div>
    </div>
  )
}

export default Sidebar
