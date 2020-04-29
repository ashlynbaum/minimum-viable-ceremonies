import React from "react"
import Deck from "./deck"
import DraggableCard from "./draggableCard"
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
