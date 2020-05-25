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
  const buildModal = (Content, open, close = function() {}, props = {}, styles = {}) => (
    <Modal isOpen={!!open} onRequestClose={close ? () => close(null) : undefined} style={{
      content: {
        width: "80vw",
        bottom: "auto",
        margin: "auto",
        boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2), 0px 3px 11px rgba(0, 0, 0, 0.15)",
        overflow: "visible",
        ...styles
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
