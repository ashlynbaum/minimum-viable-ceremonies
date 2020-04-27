import React, { useContext } from "react"
import Deck from "../components/deck"
import Context from "../contexts/room"

import "../styles/board.scss"

const Board = ({ weekCount = 1 }) => {
  const context = useContext(Context)
  const week = ["monday", "tuesday", "wednesday", "thursday", "friday"]
  const others = ["weekly", "monthly", "quarterly", "halfyearly", "void"]

  return (
    <div className="board">
      <h1>{context.uuid}</h1>
      <Deck type="cadences" names={week} />
      {weekCount === 2 && <Deck type="cadences" names={week} />}
      <Deck type="cadences" names={others} />
    </div>
  )
}

export default Board
