import React from "react"
import Card from "../components/card"
import "../styles/deck.scss"

const Deck = ({ type, names, CardClass = Card }) => (
  <>
    <div className="deck-cards">
      {names.map((name, index) => (
        <CardClass key={`${type}-${name}`} type={type} name={name} index={index} />
      ))}
    </div>
  </>
)

export default Deck
