import React, { useState } from "react"
import DraggableDeck from "../components/draggableDeck"
import initialCardState from "../images/cards/cards.json"
import "../styles/deck.css"

const AllCards = () => {
  const [cards, setCards] = useState(initialCardState)
  const reorder = type => (
    ({ destination, source }) => {
      if (!destination || !source || destination.index === source.index) { return }

      const stack = Array.from(cards[type])
      stack.splice(destination.index, 0, stack.splice(source.index, 1)[0])

      setCards({ ...cards, [type]: stack })
    }
  )

  return <div className="all-cards">
    {Object.entries(cards).map(([type, names]) => (
      <DraggableDeck key={type} type={type} names={names} reorder={reorder} />
    ))}
  </div>
}

export default AllCards
