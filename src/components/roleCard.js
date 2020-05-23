import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/roleCard.scss"

const RoleCard = ({ role }) => {
  const { t } = useTranslation()

  return (
    <div className={`role-card flex-grow flex justify-center ${role ? 'items-start' : 'items-center'}`}>
      {role ? (
        <div className="role-card-content">
          <h3>{[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}</h3>
          <p>{t(`roles.${role}.description`)}</p>
        </div>
      ) : (
        <div className="role-card-placeholder">{t("setup.user.showRole")}</div>
      )}
    </div>
  )
}

export default RoleCard
