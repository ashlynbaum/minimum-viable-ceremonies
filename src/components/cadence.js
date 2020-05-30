import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Draggable, Droppable } from "react-beautiful-dnd"

import Ceremony from "./ceremony"
import Context from "../contexts/room"
import "../styles/cadence.scss"
import Void from "../images/void.svg"
import Confetti from "./confetti"

const Cadence = ({ id, basis, klass }) => {
  const { placedOn } = useContext(Context)
  const { t } = useTranslation()

  return (
    <Droppable droppableId={id}>
      {({ innerRef, droppableProps, placeholder}, { isDraggingOver }) => (
        <div
          ref={innerRef}
          style={{flexBasis: `${100 / basis}%`}}
          className={`cadence flex flex-col flex-grow ${id} ${isDraggingOver ? 'highlight' : ''}`}
          {...droppableProps}
        >
          {!['undecided'].includes(id) &&
            <div className="leading-tight">
              {t(`cadences.${id}.name`)}
            </div>
          }
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
          
          { (['undecided'].includes(id) && (placedOn(id).length < 1)) && 
            <div>
              {/* {console.log("placeOn(id)=", (placedOn(id).length == 22))} */}
              <Confetti />
            </div>
          }
          

          {placeholder}
          {['void'].includes(id) &&
            <div className="void-content mb-4 flex flex-col flex-grow justify-center">
              <div className='void-placeholder'>
                {t(`board.voidPlaceholder`)}
              </div>
              <Void className='void-svg'/>
            </div>
          }
        </div>
      )}
    </Droppable>
  )
}

export default Cadence
