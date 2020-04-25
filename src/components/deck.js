import React from "react"
import Card from "../components/card"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import "../styles/deck.css"

const Deck = ({ type, names, reorder }) => (
  <DragDropContext onDragEnd={reorder(type)}>
    <Droppable direction="horizontal" key={type} droppableId={type}>
      {({ innerRef, droppableProps, placeholder }) => (
        <div ref={innerRef} className="deck-section" {...droppableProps}>
          <h2 className="deck-title">{type}</h2>
          <div className="deck-cards">
            {names.map((name, index) => (
              <Card key={`${type}-${name}`} type={type} name={name} index={index} />
            ))}
          </div>
          {placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

export default Deck
