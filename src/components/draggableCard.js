import { Draggable } from "react-beautiful-dnd"
import Card from "../components/card"
import React from "react"

const DraggableCard = ({ type, name, index }) => (
  <Draggable draggableId={`${type}-${name}`} index={index}>
    {({ innerRef, draggableProps, dragHandleProps }) => (
      <div className="card" ref={innerRef} {...draggableProps} {...dragHandleProps}>
        <Card type={type} name={name} />
      </div>
    )}
  </Draggable>
)

export default DraggableCard
