import React from "react"
import Dropdown from "../components/basic/dropdown"
import { Draggable } from "react-beautiful-dnd"

import "../styles/ceremony.scss"

const Ceremony = ({ icon, name, description }) => (
  <div className="ceremony hover-state">
    {icon} {name}
  </div>
)

export default Ceremony
