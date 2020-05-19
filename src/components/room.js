import React from "react"
import Modal from "react-modal"

import Loading from "./loading"
import SEO from "./seo"
import Board from "./board"
import SetupUser from "./setupUser"
import EditUser from "./editUser"
import SetupRoom from "./setupRoom"
import SetupCeremony from "./setupCeremony"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"

const Room = ({ uuid }) => {
  const context = useRoomContext(uuid)
  if (!context.ready) { context.setup() }

  Modal.setAppElement("#___gatsby")
  const buildModal = (Content, open, close) => (
    <Modal isOpen={!!open} onRequestClose={close ? () => close(null) : undefined} style={{
      content: {
        height: "auto",
        top: "auto",
        right: "20%",
        left: "20%",
        bottom: "auto",
        overflow: "visible",
      },
      overlay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    }}><Content /></Modal>
  )

  return (
    <Context.Provider value={context}>
      <SEO title={`Minimum Viable Ceremonies | ${context.name}`} />
      {context.ready ? <>
        <Board />
        {buildModal(SetupUser, !context.currentUser)}
        {buildModal(SetupRoom, context.editingRoom, context.setEditingRoomId)}
        {buildModal(SetupCeremony, context.editingCeremony, context.setEditingCeremonyId)}
        {buildModal(EditUser, context.editingUser, context.setEditingUserId, {
          content: { overflow: "visible" },
        })}
      </> : <Loading />}
    </Context.Provider>
  )
}

export default Room
