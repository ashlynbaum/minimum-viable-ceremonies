import React from "react"

import Icon from "./icon"

import "../../styles/dropdown.scss"

const Dropdown = ({ klass, position = 'right', icon, size, text, tooltip, dropdown, onClick }) => (
  <div className={`dropdown ${klass}`}>
    <button className="dropdown-button hover-state" onClick={onClick}>
      {icon && <Icon icon={icon} size={size} />}
      {text && <span>{text}</span>}
    </button>
    <div className={`dropdown-tooltip ${position}`}>
      {tooltip}
    </div>
  </div>
)

export default Dropdown
