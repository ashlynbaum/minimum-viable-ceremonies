import Image from "./image"
import React from "react"
import "../../styles/card.scss"

const Card = ({ type, name, flip = false }) => (
  <div className={flip ? "card card-flip" : "card"}>
    <div className="card-content">
      <div className="card-side front">
        <Image alt={name} path={`${type}/${name}/front.jpg`} klass="card" />
      </div>
      <div className="card-side back">
        <Image alt={name} path={`${type}/${name}/back.jpg`} klass="card" />
      </div>
    </div>
  </div>
)

export default Card
