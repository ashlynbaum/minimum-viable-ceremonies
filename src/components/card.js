import Image from "./image"
import { Draggable } from "react-beautiful-dnd"
import React from "react"

import "../styles/card.css"

const Card = ({ type, name, index }) => (
  <Draggable draggableId={`${type}-${name}`} index={index}>
    {({ innerRef, draggableProps, dragHandleProps }) => (
      <div className="card" ref={innerRef} {...draggableProps} {...dragHandleProps}>
        <div className="card-flipper">
          <div className="card-side front">
            <Image alt={name} path={`${type}/${name}/front.jpg`} klass="card" />
          </div>
          <div className="card-side back">
            <Image alt={name} path={`${type}/${name}/back.jpg`} klass="card" />
          </div>
        </div>
      </div>
    )}
  </Draggable>
)

export default Card
