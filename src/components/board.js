import React, { useContext } from "react"
import Cadence from "../components/cards/cadence"
import Ceremony from "../components/cards/ceremony"
import Sidebar from "../components/sidebar"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Context from "../contexts/room"
import "../styles/board.scss"

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"]
const OTHER = ["weekly", "monthly", "quarterly", "halfyearly", "void"]

const Board = ({ weekCount = 1 }) => {
  const { placedOn, place } = useContext(Context)

  return (
    <div className="board">
      <Sidebar />
      <DragDropContext onDragEnd={({ draggableId, destination }) => (
        place(draggableId, destination.droppableId)
      )}>
        <div className="board-cadences">
          {[...Array(weekCount)].map((_, index) => (
            <div key={`week-${index}`} className="board-cadence">
              {DAYS.map(name => <Cadence key={name} name={name} value={`${name}-${index}`} />)}
            </div>
          ))}
          <div className="board-cadence">
            {OTHER.map(name => <Cadence key={name} name={name} value={name} />)}
          </div>
          <Droppable droppableId="undecided">
            {({ innerRef, droppableProps, placeholder }) => (
              <div ref={innerRef} className="board-ceremonies">
                {placedOn('undecided').map(({ name }, index) => (
                  <Ceremony key={name} name={name} index={index} />
                ))}
                {placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}

export default Board
