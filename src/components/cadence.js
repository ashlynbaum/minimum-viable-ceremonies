import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Draggable, Droppable } from "react-beautiful-dnd"

import Ceremony from "../ceremony"
import Context from "../contexts/room"
import "../styles/cadence.scss"

const Cadence = ({ id, basis, klass }) => {
  const { placedOn } = useContext(Context)
  const { t } = useTranslation()

  return (
    <Droppable droppableId={id}>
      {({ innerRef, droppableProps, placeholder}, { isDraggingOver }) => (
        <div
          ref={innerRef}
          style={{flexBasis: `${100 / basis}%`}}
          className={`cadence flex-grow ${id} ${isDraggingOver ? 'highlight' : ''}`}
          {...droppableProps}
        >
          {!['void', 'undecided'].includes(id) && <div>{t(`cadences.${id}.name`)}</div>}
          {placedOn(id).map(({ id }, index) => (
            <Draggable draggableId={id} index={index} key={id}>
              {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                  className="ceremony-draggable"
                  ref={innerRef}
                  {...draggableProps}
                  {...dragHandleProps}
                >
                  <Ceremony id={id} />
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
