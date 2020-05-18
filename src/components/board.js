import React, { useContext } from "react"
import { useTranslation } from 'react-i18next'
import { DragDropContext } from "react-beautiful-dnd"

import Cadence from "./cadence"
import Sidebar from "./sidebar"
import Context from "../contexts/room"
import "../styles/board.scss"

const Board = () => {
  const { t } = useTranslation()
  const { place, weekCount } = useContext(Context)

  return (
    <div className="board flex flex-row">
      <Sidebar />
      <DragDropContext onDragEnd={({ draggableId, destination }) => (
        destination ? place(draggableId, destination.droppableId) : null
      )}>
        <div className="flex flex-col board-content">
          <div className="board-title">
            <h1>{t("board.title")}</h1>
            <p>{t("board.subtitle")}</p>
          </div>
          <div className="flex flex-row justify-around">
            <div style={{flexBasis: "20%"}} className="flex flex-col">
              <div className="sidebar-subtitle">{t("board.ceremonies")}</div>
              <Cadence className="flex-grow" id="undecided" />
            </div>
            <div style={{flexBasis: "80%"}} className="flex flex-col">
              <div className="flex flex-row">
                <div style={{flexBasis: "60%"}} className="flex flex-col">
                  <div className="sidebar-subtitle">{t("board.cadences")}</div>
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
                <div style={{flexBasis: "40%"}} className="flex flex-col">
                  <div className="sidebar-subtitle">{t("board.void")}</div>
                  <Cadence id="void" void={true} />
                </div>
              </div>
              <div className="flex flex-col">
                {[...Array(parseInt(weekCount))].map((_, index) => <div key={index}>
                  <div className="sidebar-subtitle">{t("board.sprint", { index: index+1 })}</div>
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
      </DragDropContext>
    </div>
  )
}

export default Board
