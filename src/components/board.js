import React, { useContext } from "react"
import Cadence from "../components/cadence"
import Sidebar from "../components/sidebar"
import Context from "../contexts/room"

import "../styles/board.scss"


const Board = () => {
  const { placedOn, place, weekCount } = useContext(Context)

  return (
    <div className="board flex flex-row">
      <Sidebar />
      <div className="flex flex-col board-content">
        <div className="board-title">
          <h1>Minimum Viable Ceremonies</h1>
          <p>Go through all ceremonies with the team and either add them to a cadence, a sprint, or the void.</p>
        </div>
        <div className="flex flex-row justify-around">
          <div style={{flexBasis: "20%"}} className="flex flex-col">
            <div className="sidebar-subtitle">Ceremonies</div>
            <Cadence className="flex-grow" id="undecided" />
          </div>

          <div style={{flexBasis: "60%"}} className="flex flex-row">
            <div className="flex flex-col">
              <div className="sidebar-subtitle">Cadences</div>
              <div className="flex flex-row">
                <div style={{flexBasis: "33.33%"}} className="flex flex-col">
                  <Cadence id="daily" />
                  <Cadence id="quarterly" />
                </div>
                <div style={{flexBasis: "33.33%"}} className="flex flex-col">
                  <Cadence id="weekly" />
                  <Cadence id="halfyearly" />
                </div>
                <div style={{flexBasis: "33.33%"}} className="flex flex-col">
                  <Cadence id="monthly" />
                  <Cadence id="yearly" />
                </div>
              </div>
            </div>
          </div>
          <div style={{flexBasis: "20%"}} className="flex flex-col">
            <div className="sidebar-subtitle">The Void</div>
            <Cadence id="void" void={true} />
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            {[...Array(parseInt(weekCount))].map((_, index) => <div key={index}>
              <div className="sidebar-subtitle">Sprint week {index}</div>
              <div className="flex flex-row justify-around">
                <Cadence basis={5} id={`monday-${index+1}`} />
                <Cadence basis={5} id={`tuesday-${index+1}`} />
                <Cadence basis={5} id={`wednesday-${index+1}`} />
                <Cadence basis={5} id={`thursday-${index+1}`} />
                <Cadence basis={5} id={`friday-${index+1}`} />
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
