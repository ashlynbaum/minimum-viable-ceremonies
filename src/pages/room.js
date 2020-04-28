import React, { useState } from "react"

import Layout from "../components/layout"
import Board from "../components/board"
import Loading from "../components/loading"
import SEO from "../components/seo"
import Context from "../contexts/room"
import { getRoom } from "../db/fauna"

const RoomPage = ({ location: { state: { uuid } } }) => {
  const [context, setContext] = useState()

  if (!context) {
    getRoom(uuid).then(setContext)
    return <Layout><Loading /></Layout>
  }

  return (
    <Context.Provider value={context}>
      <Layout>
        <SEO title="Minimum Viable Ceremonies" />
        <Board />
      </Layout>
    </Context.Provider>
  )
}

export default RoomPage
