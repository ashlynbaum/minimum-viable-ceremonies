import React from "react"
import DraggableCard from "../components/draggableCard"
import Deck from "../components/deck"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

const DraggableDeck = ({ type, names, reorder }) => (
  <DragDropContext onDragEnd={reorder(type)}>
    <Droppable direction="horizontal" key={type} droppableId={type}>
      {({ innerRef, droppableProps, placeholder }) => (
        <div ref={innerRef} className="deck-section" {...droppableProps}>
          <Deck type={type} names={names} CardClass={DraggableCard} />
          {placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

export default DraggableDeck
