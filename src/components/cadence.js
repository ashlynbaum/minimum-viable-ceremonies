import React, { useContext } from "react"
import Context from "../contexts/room"

import "../styles/cadence.scss"

const Cadence = ({ id, basis, klass, showTitle }) => {
  const { cadences, placedOn } = useContext(Context)

  return (
    <div style={{flexBasis: `${100 / basis}%`}} className={`cadence flex-grow ${id}`}>
      {cadences[id].name}
      {placedOn(id).map(ceremony => (
        <div key={ceremony.id} className="cadence-ceremony">{ceremony.icon} {ceremony.name}</div>
      ))}
    </div>
  )
}

export default Cadence
