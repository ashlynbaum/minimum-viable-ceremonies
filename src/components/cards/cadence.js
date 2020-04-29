import React from "react"
import Card from "../basic/card"
import { Droppable } from "react-beautiful-dnd"

const Cadence = ({ name, value }) => (
  <Droppable key={value} droppableId={value}>
    {({ innerRef, droppableProps, placeholder }) => (
      <div ref={innerRef} {...droppableProps}>
        <Card type="cadences" name={name} />
        {placeholder}
      </div>
    )}
  </Droppable>
)

export default Cadence
