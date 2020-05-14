import React, { useContext } from "react"
import Card from "../basic/card"
import Ceremony from "../cards/ceremony"
import { Droppable } from "react-beautiful-dnd"
import Context from "../../contexts/room"

const Cadence = ({ name, value }) => {
  const { placedOn } = useContext(Context)

  return <Droppable key={value} droppableId={value}>
    {({ innerRef, droppableProps, placeholder }) => (
      <div ref={innerRef} {...droppableProps}>
        <Card type="cadences" name={name} />
        {placedOn(value).map(({ name }, index) => (
          <Ceremony key={name} name={name} index={index} />
        ))}
      </div>
    )}
  </Droppable>
}

export default Cadence
