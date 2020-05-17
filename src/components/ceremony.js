import React, { useContext } from "react"
import Context from "../contexts/room"
import Dropdown from "../components/basic/dropdown"
import { Draggable } from "react-beautiful-dnd"

import "../styles/ceremony.scss"

const Ceremony = ({ id, icon, name, description, index }) => {
  return (
    <div className="ceremony">
      <Draggable draggableId={id} index={index}>
        {({ innerRef, draggableProps, dragHandleProps }) => (
          <div className="ceremony-draggable" ref={innerRef} {...draggableProps} {...dragHandleProps}>
            <Dropdown
              position="top-right"
              text={`${icon} ${name}`}
              tooltip={description}
              clickToOpen={true}
            />
          </div>
        )}
      </Draggable>
    </div>
  )
}

export default Ceremony
