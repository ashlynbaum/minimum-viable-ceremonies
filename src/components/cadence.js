import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Draggable, Droppable } from "react-beautiful-dnd"

import Ceremony from "./ceremony"
import Context from "../contexts/room"
import Dropdown from "./dropdown"
import "../styles/cadence.scss"
import Void from "../images/void.svg"

const Cadence = ({ id, basis, klass }) => {
  const { placedOn, setCreatingCeremonyId } = useContext(Context)
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
          {placedOn(id).map(({ id, index }) => (
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
          {['void'].includes(id) && (
            <div className="void-content mb-4 flex flex-col flex-grow justify-center">
              <div className='void-placeholder'>
                {t(`board.voidPlaceholder`)}
              </div>
              <Void className='void-svg'/>
            </div>
          )}
          {['undecided'].includes(id) && (
            <Dropdown
              klass="mt-1 cadence-add"
              size={14}
              position="right"
              icon="basic/plus"
              text={t("setup.ceremony.create")}
              tooltip={t("setup.ceremony.createHelptext")}
              onClick={() => setCreatingCeremonyId(true)}
            />
          )}
        </div>
      )}
    </Droppable>
  )
}

export default Cadence
