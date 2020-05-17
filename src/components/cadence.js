import React, { useContext } from "react"
import Context from "../contexts/room"
import Ceremony from "../components/ceremony"
import { Draggable, Droppable } from "react-beautiful-dnd"

import "../styles/cadence.scss"

const Cadence = ({ id, basis, klass, showTitle }) => {
  const { cadences, placedOn } = useContext(Context)

  return (
    <Droppable droppableId={cadences[id].id}>
      {({ innerRef, droppableProps, placeholder}, { isDraggingOver }) => (
        <div
          ref={innerRef}
          style={{flexBasis: `${100 / basis}%`}}
          className={`cadence flex-grow ${id} ${isDraggingOver ? 'highlight' : ''}`}
          {...droppableProps}
        >
          {!['void', 'undecided'].includes(id) && <div>{cadences[id].name}</div>}
          {placedOn(id).map(({ id, icon, name, description }, index) => (
            <Draggable draggableId={id} index={index} key={id}>
              {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                  className="ceremony-draggable"
                  ref={innerRef}
                  {...draggableProps}
                  {...dragHandleProps}
                >
                  <Ceremony
                    id={id}
                    icon={icon}
                    name={name}
                    description={description}
                    index={index}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Cadence
