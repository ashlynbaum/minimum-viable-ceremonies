import React, { useState } from "react"

import Layout from "../components/layout"
import Board from "../components/board"
import Loading from "../components/loading"
import SEO from "../components/seo"
import Context from "../contexts/room"
import { setupRoom } from "../db/firebase"

const RoomPage = ({ location: { state: { uuid } } }) => {
  const [room, setRoom] = useState()

  if (!room) {
    setupRoom(uuid, setRoom)
    return <Layout><Loading /></Layout>
  }

  return (
    <Context.Provider value={room}>
      <Layout>
        <SEO title="Minimum Viable Ceremonies" />
        <Board />
      </Layout>
    </Context.Provider>
  )
}

export default RoomPage
