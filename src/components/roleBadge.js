import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/roleBadge.scss"
import Check from "../images/check-mark.svg"

const RoleBadge = ({ role, checked, onHover, onClick }) => {
  const { t } = useTranslation()

  return (
    <label className={`role-badge role-badge--${role} mvc-radio-option`}>
      <input
        type="checkbox"
        name="role"
        value={role}
        checked={checked}
        onChange={({ target: { checked, value } }) => onClick(value, checked)}
      />
      <div
        className="mvc-radio-option-label flex content-center"
        onMouseEnter={() => onHover(role)}
        onMouseLeave={() => onHover(null)}
      >
        <Check />
        {[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}
      </div>
    </label>
  )
}

export default RoleBadge
