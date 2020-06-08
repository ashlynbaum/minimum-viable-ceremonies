import React from "react"
import Modal from "react-modal"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation()
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
    }}><>
      {props.closeButton && <button className="close-modal" onClick={close}>{t("setup.controls.back")}</button>}
      <Content onSubmit={close} {...props} />
    </>
    </Modal>
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
        {buildModal(SetupCeremony, context.editingCeremony, context.setEditingCeremonyId, {closeButton: true})}
        {buildModal(EditUser, context.editingUser, context.setEditingUserId, {closeButton: true})}
      </> : <Loading />}
    </Context.Provider>
  )
}

export default Room
