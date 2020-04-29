import React from "react"
import DraggableCard from "../basic/draggableCard"

const Ceremony = ({ name, index, flip }) => (
  <div className="ceremony">
    <DraggableCard type="ceremonies" name={name} index={index} flip={flip} />
  </div>
)

export default Ceremony
