import React, { useState } from "react"
import Icon from "./icon"
import useScreenEnforcedRef from "../../hooks/useScreenEnforcedRef"

import "../../styles/dropdown.scss"

const Dropdown = ({
  klass,
  position = 'right',
  icon,
  size,
  text,
  width,
  tooltip,
  dropdown,
  onClick,
  clickToOpen
}) => {
  const [open, setOpen] = useState(false)
  const tooltipRef = useScreenEnforcedRef()

  return (
    <div className={`dropdown ${klass} ${open ? 'open' : 'closed'} hover-state`}>
      <button
        className="dropdown-button"
        onClick={clickToOpen ? () => setOpen(current => !current) : onClick}
        onMouseEnter={clickToOpen ? null : () => setOpen(true)}
        onMouseLeave={clickToOpen ? null : () => setOpen(false)}
      >
        {icon && <Icon icon={icon} size={size} />}
        {text && <span>{text}</span>}
      </button>
      <div ref={tooltipRef} style={width ? {width} : {whiteSpace: 'nowrap'}} className={`dropdown-tooltip ${position}`}>
        {tooltip}
      </div>
    </div>
  )
}

export default Dropdown
