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

  Modal.setAppElement("#___gatsby")
  const buildModal = (Content, open, close = function() {}, props = {}) => (
    <Modal isOpen={!!open} onRequestClose={close ? () => close(null) : undefined} style={{
      content: {
        height: "70vh",
        width: "75vw",
        bottom: "auto",
        margin: "auto",
        borderRadius: "3px",
        backgroundColor: "#F6F8FA",
        overflow: "visible",
      },
      overlay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    }}><Content onSubmit={close} {...props} /></Modal>
  )

  return (
    <Context.Provider value={context}>
      <SEO title={`Minimum Viable Ceremonies | ${context.name}`} />
      {context.ready ? <>
        <Board />
        {buildModal(SetupUser, !context.currentUser)}
        {buildModal(SetupRoom, context.editingRoom, context.setEditingRoomId, {
          onSubmit: uuid => context.setUuid(uuid) || context.setEditingRoomId(null)
        })}
        {buildModal(SetupCeremony, context.editingCeremony, context.setEditingCeremonyId)}
        {buildModal(EditUser, context.editingUser, context.setEditingUserId)}
      </> : <Loading />}
    </Context.Provider>
  )
}

export default Room
