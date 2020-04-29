import React, { useContext } from "react"
import Cadence from "../components/cards/cadence"
import Ceremony from "../components/cards/ceremony"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Context from "../contexts/room"
import { ceremonies } from "../images/cards/cards.json"
import "../styles/board.scss"

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"]
const OTHER = ["weekly", "monthly", "quarterly", "halfyearly", "void"]

const Board = ({ weekCount = 1 }) => {
  const context = useContext(Context)

  const drop = console.log

  return (
    <DragDropContext onDragEnd={drop}>
      <div className="board">
        <h1>{context.uuid}</h1>
        <div className="board-cadences">
          {[...Array(weekCount)].map((_, index) => (
            <div key={`week-${index}`} className="board-cadence">
              {DAYS.map(name => <Cadence key={name} name={name} value={`${name}-${index}`} />)}
            </div>
          ))}
          <div className="board-cadence">
            {OTHER.map(name => <Cadence key={name} name={name} value={name} />)}
          </div>
          <Droppable droppableId="ceremonies-deck">
            {({ innerRef, droppableProps, placeholder }) => (
              <div ref={innerRef} className="board-ceremonies">
                {ceremonies.map((name, index) => <Ceremony key={name} name={name} index={index} />)}
                {placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  )
}

export default Board
