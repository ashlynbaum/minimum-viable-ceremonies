import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import Loading from "../components/loading"
import SEO from "../components/seo"
import Board from "../components/board"
import SetupUser from "../components/setupUser"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"

const Room = ({ uuid }) => {
  const context = useRoomContext(uuid)
  const [creatingUser, setupUser] = useState()
  if (!context.ready) { context.setup() }

  useEffect(() => {
    if (context.ready && !context.currentUser) { setupUser(true) }
  }, [context.ready, context.currentUser])

  Modal.setAppElement("#___gatsby")

  return (
    <Context.Provider value={context}>
      <SEO title={`Minimum Viable Ceremonies | ${context.name}`} />
      {!context.ready ? <Loading /> : <Board />}
      <Modal
        isOpen={creatingUser}
        style={{
          content: {
            height: "auto",
            top: "auto",
            right: "20%",
            left: "20%",
            bottom: "auto",
          },
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }}
      >
        <SetupUser onSubmit={() => setupUser(false)}/>
      </Modal>
    </Context.Provider>
  )
}

export default Room
