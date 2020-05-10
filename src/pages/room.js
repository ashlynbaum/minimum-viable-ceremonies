import React from "react"
import Layout from "../components/layout"
import Board from "../components/board"
import SetupUser from "../components/setupUser"
import Loading from "../components/loading"
import SEO from "../components/seo"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"

const RoomPage = ({ location: { state } }) => {
  const context = useRoomContext((state || {}).uuid)

  if (!context.ready) {
    context.setup()
    return <Layout><Loading /></Layout>
  }

  return (
    <Context.Provider value={context}>
      <Layout>
        <SEO title={`Minimum Viable Ceremonies | ${context.name}`} />
        {context.user ? <Board /> : <SetupUser />}
      </Layout>
    </Context.Provider>
  )
}

export default RoomPage
