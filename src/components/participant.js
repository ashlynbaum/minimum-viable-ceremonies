import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import Context from "../contexts/room"
import "../styles/participant.scss"

const Participant = ({ id, username, roles }) => {
  const { t } = useTranslation()
  const { currentUser, setEditingUserId } = useContext(Context)

  return (
    <div className="participant">
      <div className="participant-content">
        <div className="participant-icon">{username[0]}</div>
        <div className="participant-name">{username}</div>
        <div className="participant-actions">
          {currentUser && currentUser.id === id && <Dropdown
            klass="dark"
            theme="dark"
            icon="basic/more-horizontal"
            size={24}
            tooltip={t("participant.edit")}
            onClick={() => setEditingUserId(id)}
          />}
        </div>
      </div>
      <div className="participant-roles">
        {Object.values(roles).map(role => (
          <Dropdown
            key={role}
            klass="dark"
            theme="light"
            delay={750}
            position="right-start"
            width={400}
            text={[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}
            tooltip={<div className="participant-role-tooltip">
              <div className="text-4xl mb-6 mt-1">{t(`roles.${role}.icon`)} </div>
              <div className="text-2xl mb-2 mt-1">{t(`roles.${role}.name`)}</div>
              <p className="mb-2">{t(`roles.${role}.sub-heading`)}</p>
              <p>{t(`roles.${role}.description`)}</p>
            </div>}
          />
        ))}
      </div>
    </div>
  )
}

export default Participant
