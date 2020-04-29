import React from "react"
import Card from "./card"
import "../../styles/deck.scss"

const Deck = ({ type, names, CardClass = Card }) => (
  <div className="deck">
    {names.map((name, index) => (
      <CardClass key={`${type}-${name}`} type={type} name={name} index={index} />
    ))}
  </div>
)

export default Deck
