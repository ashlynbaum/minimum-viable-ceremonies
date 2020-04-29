import React, { useContext } from "react"
import Deck from "../components/basic/deck"
import DraggableCard from "../components/basic/draggableCard"
import Cadence from "../components/cards/cadence"
import { DragDropContext } from "react-beautiful-dnd"
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
          <div className="board-ceremonies">
            <Deck type="ceremonies" names={ceremonies} />
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}

export default Board
