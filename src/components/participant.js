import React from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import "../styles/participant.scss"

const Participant = ({ id, username, role }) => {
  const { t } = useTranslation()

  return (
    <div className="participant">
      <div className="participant-content">
        <div className="participant-icon">{username[0]}</div>
        <div className="participant-name">{username}</div>
        <div className="participant-actions">
          <Dropdown
            klass="dark"
            theme="dark"
            icon="basic/more-horizontal"
            size={16}
            tooltip={t("participant.edit")}
          />
        </div>
      </div>
      <div className="participant-roles">
        <Dropdown
          klass="dark"
          theme="light"
          delay={750}
          position="right-start"
          width={400}
          text={[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}
          tooltip={<div className="participant-role-tooltip">
            <h3>{[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}</h3>
            <p>{t(`roles.${role}.description`)}</p>
          </div>}
        />
      </div>
    </div>
  )
}

export default Participant
