import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/role.scss"

const Role = ({ role }) => {
  const { t } = useTranslation()

  return (
    <div className={`role flex-grow flex justify-center ${role ? 'items-start' : 'items-center'}`}>
      {role ? (
        <div className="role-content">
          <h3>{[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}</h3>
          <p>{t(`roles.${role}.description`)}</p>
        </div>
      ) : (
        <div className="role-placeholder">{t("setup.user.showRole")}</div>
      )}
    </div>
  )
}

export default Role
