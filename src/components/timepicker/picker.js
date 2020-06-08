import React, { useState, useEffect } from "react"

import Clock from "./clock"
import "../../styles/timepicker.scss"

const Picker = ({ time, onSelect }) => {
  const [face, setFace] = useState('hour')
  const [value, setValue] = useState(time)

  useEffect(() => {
    if (face !== 'complete') { return }

    setFace('hour')
    onSelect(value)
  }, [face, value])

  return (
    <div className="picker">
      <Clock time={value} face={face} onSelect={(key, value, next) => {
        setValue(current => ({ ...current, [key]: value }))
        setFace(current => next || current)
      }} />
    </div>
  )
}

export default Picker
