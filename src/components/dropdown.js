import React, { useState, useRef } from "react"

import Icon from "./icon"
import useScreenEnforcedRef from "../hooks/useScreenEnforcedRef"
import "../styles/dropdown.scss"

const Dropdown = ({
  klass,
  position = 'right',
  theme = 'dark',
  delay = 0,
  icon,
  size,
  text,
  width,
  tooltip,
  dropdown,
  onClick
}) => {
  const opening = useRef(false)
  const [open, setOpen] = useState(false)
  const tooltipRef = useScreenEnforcedRef()

  return (
    <div className={`dropdown ${klass} ${open ? 'open' : 'closed'} mvc-hover-state`}>
      <div
        className="dropdown-button"
        onClick={onClick}
        onMouseEnter={() => {
          delay > 0 ? (
            opening.current = true &&
            setTimeout(() => opening.current ? setOpen(true) : null, delay)
          ) : (
            setOpen(true)
          )
        }}
        onMouseLeave={() => {
          opening.current = false
          setOpen(false)
        }}
      >
        {icon && <Icon icon={icon} size={size} />}
        {text && <span>{text}</span>}
      </div>
      <div ref={tooltipRef} style={width ? {width} : {whiteSpace: 'nowrap'}} className={`dropdown-tooltip ${position} ${theme}`}>
        {tooltip}
      </div>
    </div>
  )
}

export default Dropdown
