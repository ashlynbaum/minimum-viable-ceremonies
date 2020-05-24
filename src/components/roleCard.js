import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/roleCard.scss"

const RoleCard = ({ role }) => {
  const { t } = useTranslation()

  return (
    <div className={`role-card flex-grow flex justify-center ${role ? 'items-start' : 'items-center'}`}>
      {role ? (
        <div className="role-card-content">
          <div className="card-icon">
            {t(`roles.${role}.icon`)}
          </div>
          <div className="card-title">
            {t(`roles.${role}.name`)}
          </div>
          <div className="card-subheading">
            {t(`roles.${role}.sub-heading`)}
          </div>
          <div className="card-description">{t(`roles.${role}.description`)}</div>
        </div>
      ) : (
        <div className="role-card-placeholder">{t("setup.user.showRole")}</div>
      )}
    </div>
  )
}

export default RoleCard
