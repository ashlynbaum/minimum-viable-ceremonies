import React from "react"

import Icon from "./icon"

import "../../styles/dropdown.scss"

const Dropdown = ({ klass, icon, size, text, tooltip, dropdown }) => (
  <div className={`dropdown ${klass}`}>
    {icon && <Icon icon={icon} size={size} />}
    {text && <span>{text}</span>}
    <div className="dropdown-tooltip">
      {tooltip}
    </div>
  </div>
)

export default Dropdown
