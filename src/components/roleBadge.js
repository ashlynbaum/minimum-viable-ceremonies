import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/roleBadge.scss"
import Check from "../images/icons/basic/check-mark.svg"

const RoleBadge = ({ role, checked, onHover, onClick }) => {
  const { t } = useTranslation()

  return (
    <label className="role-badge mvc-radio-option">
      <input
        type="checkbox"
        name="role"
        value={role}
        checked={checked}
        onChange={({ target: { checked, value } }) => (
          onClick(current => ({
            ...current,
            roles: checked ? current.roles.concat(value) : current.roles.filter(r => r !== value)
          }))
        )}
      />

      <div
        className="mvc-radio-option-label"
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
