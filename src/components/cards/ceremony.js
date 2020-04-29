import React from "react"
import DraggableCard from "../components/draggableCard"

const Ceremony = ({ name, flip }) => (
  <div class="ceremony">
    <DraggableCard type="ceremonies" name={name} flip={flip} />
  </div>
)

export default Ceremony
