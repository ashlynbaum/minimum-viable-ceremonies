import React from "react"
import Modal from "react-modal"

import Loading from "./loading"
import SEO from "./seo"
import Board from "./board"
import SetupUser from "./setupUser"
import SetupRoom from "./setupRoom"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"

const Room = ({ uuid }) => {
  const context = useRoomContext(uuid)
  if (!context.ready) { context.setup() }

  Modal.setAppElement("#___gatsby")
  const modalStyle = {
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
  }

  return (
    <Context.Provider value={context}>
      <SEO title={`Minimum Viable Ceremonies | ${context.name}`} />
      {context.ready ? <>
        <Board />
        <Modal isOpen={!context.currentUser} style={modalStyle}>
          <SetupUser />
        </Modal>
        <Modal isOpen={context.creatingRoom} style={modalStyle} onRequestClose={() => context.createRoom(false)}>
          <SetupRoom />
        </Modal>
      </> : <Loading />}
    </Context.Provider>
  )
}

export default Room
