import React from "react"
import Deck from "../components/deck"

import "../styles/board.scss"

const Board = ({ weekCount = 1 }) => {
  const week = ["monday", "tuesday", "wednesday", "thursday", "friday"]
  const others = ["weekly", "monthly", "quarterly", "halfyearly", "void"]

  return (
    <div className="board">
      <Deck type="cadences" names={week} />
      {weekCount === 2 && <Deck type="cadences" names={week} />}
      <Deck type="cadences" names={others} />
    </div>
  )
}

export default Board
