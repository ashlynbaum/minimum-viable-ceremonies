import React from "react"

import Icon from "./icon"

import "../../styles/dropdown.scss"

const Dropdown = ({ klass, position = 'right', icon, size, text, width, tooltip, dropdown, onClick }) => (
  <div className={`dropdown ${klass} hover-state`}>
    <button className="dropdown-button" onClick={onClick}>
      {icon && <Icon icon={icon} size={size} />}
      {text && <span>{text}</span>}
    </button>
    <div style={width ? {width} : {'white-space': 'nowrap'}} className={`dropdown-tooltip ${position}`}>
      {tooltip}
    </div>
  </div>
)

export default Dropdown