import React from "react"
import Loading from "../components/loading"
import SEO from "../components/seo"
import Board from "../components/board"
import SetupUser from "../components/setupUser"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"

const Room = ({ uuid }) => {
  const context = useRoomContext(uuid)
  let DisplayComponent

  if (!context.ready) {
    context.setup()
    DisplayComponent = Loading
  } else if (!context.user) {
    DisplayComponent = SetupUser
  } else {
    DisplayComponent = Board
  }

  return (
    <Context.Provider value={context}>
      <SEO title={`Minimum Viable Ceremonies | ${context.name}`} />
      <DisplayComponent />
    </Context.Provider>
  )
}

export default Room
