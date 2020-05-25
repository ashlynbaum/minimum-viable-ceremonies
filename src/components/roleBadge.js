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
        className="mvc-radio-option-label flex content-center"
        onMouseEnter={() => onHover(role)}
        onMouseLeave={() => onHover(null)}
      >
        {/* <Check /> */}
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
        {[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}
      </div>
    </label>
  )
}

export default RoleBadge
