import React from "react"
import Dropdown from "../components/basic/dropdown"
import { Draggable } from "react-beautiful-dnd"

import "../styles/ceremony.scss"

const Ceremony = ({ icon, name, description }) => (
  <div className="ceremony">
    <Dropdown
      position="right-start"
      width={300}
      text={`${icon} ${name}`}
      tooltip={description}
      clickToOpen={true}
    />
  </div>
)

export default Ceremony
