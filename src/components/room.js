import React from "react"
import phrase from "random-words"

import Loading from "./loading"
import SEO from "./seo"
import Board from "./board"
import Modal from "./modal"
import SetupUser from "./setupUser"
import EditUser from "./editUser"
import SetupRoom from "./setupRoom"
import SetupCeremony from "./setupCeremony"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"
import { createRoom } from "../db/firebase"

const Room = ({ uuid }) => {
  const context = useRoomContext(uuid)
  const draft = useRoomContext(phrase({exactly: 3, join: '-'}), true)

  return (
    <Context.Provider value={context}>
      <SEO title={`Minimum Viable Ceremonies | ${context.name}`} />
      {context.ready ? <>
        <Board />
        <Modal
          Content={SetupUser}
          open={!context.currentUser}
          initialModel={{
            id: phrase({ exactly: 3, join: '-' }),
            username: '',
            roles: [],
          }}
          submit={participant => context.modifyParticipant(participant.id, participant)}
          steps={[{
            next: "setup.controls.next",
            canProceed: ({ username }) => !!username,
          }, {
            next: "setup.controls.next",
            back: "setup.controls.back",
            canProceed: ({ roles = [] }) => !!roles.length
          }, {
            next: "setup.controls.createUser",
            back: "setup.controls.back",
          }]}
        />
        <Modal
          Content={SetupRoom}
          open={context.editingRoom}
          initialModel={draft}
          close={context.setEditingRoomId}
          submit={room => createRoom(room).then(() => context.setUuid(room.uuid))}
          steps={[{
            next: "setup.controls.okGotIt",
          }, {
            next: "setup.controls.next",
            back: "setup.controls.back",
            canProceed: ({ name = "" }) => name.length > 3,
          }, {
            next: "setup.controls.createRoom",
            back: "setup.controls.back",
          }]}
        />
        <Modal
          Content={SetupCeremony}
          open={context.editingCeremony}
          close={context.setEditingCeremonyId}
        />
        <Modal
          Content={EditUser}
          open={context.editingUser}
          close={context.setEditingUserId}
        />
      </> : <Loading />}
    </Context.Provider>
  )
}

export default Room
