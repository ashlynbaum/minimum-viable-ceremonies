import React, { useContext } from "react"
import { DragDropContext } from "react-beautiful-dnd"

import MiniCadence from "./miniCadence"
import Dropdown from "./dropdown"
import Sidebar from "./sidebar"
import Context from "../contexts/room"
import "../styles/miniBoard.scss"

const MiniBoard = () => {
  const { weekCount } = useContext(Context)

  return (
    <div className="mini-board flex flex-row justify-around">
      <div style={{flexBasis: "100%"}} className="flex flex-col">
        <div className="flex flex-row mb-4">
          <div style={{flexBasis: "60%"}} className="flex flex-col">
            <div className="flex flex-col flex-grow">
              <div className="flex flex-row" style={{flexBasis: "50%"}}>
                <MiniCadence basis={3} id="daily" />
                <MiniCadence basis={3} id="weekly" />
                <MiniCadence basis={3} id="monthly" />
              </div>
              <div className="flex flex-row" style={{flexBasis: "50%"}}>
                <MiniCadence basis={3} id="quarterly" />
                <MiniCadence basis={3} id="halfyearly" />
                <MiniCadence basis={3} id="yearly" />
              </div>
            </div>
          </div>
          <div style={{flexBasis: "40%"}} className="flex flex-col">
            <MiniCadence id="void" void={true} />
          </div>
        </div>
        <div className="flex flex-col">
          {[...Array(parseInt(weekCount))].map((_, index) => <div key={index}>
            <div className="flex flex-row justify-around">
              <MiniCadence basis={5} id={`monday-${index+1}`} />
              <MiniCadence basis={5} id={`tuesday-${index+1}`} />
              <MiniCadence basis={5} id={`wednesday-${index+1}`} />
              <MiniCadence basis={5} id={`thursday-${index+1}`} />
              <MiniCadence basis={5} id={`friday-${index+1}`} />
            </div>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default MiniBoard
