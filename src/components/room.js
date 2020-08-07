import React, { useEffect } from "react"
import phrase from "random-words"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import Loading from "./loading"
import SEO from "./seo"
import Board from "./board"
import Modal from "./modal"
import SetupUser from "./setupUser"
import EditUser from "./editUser"
import SetupRoom from "./setupRoom"
import SetupCeremony from "./setupCeremony"
import EditCeremony from "./editCeremony"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"
import roomTable from "../firebase/db/room"

const Room = ({ uuid }) => {
  const context = useRoomContext(uuid)
  const draft = useRoomContext(phrase({exactly: 3, join: '-'}), true)

  const { trackPageView } = useMatomo()

  useEffect(() => { trackPageView() }, [])

  return (
    <Context.Provider value={context}>
      <SEO page="room" params={{room: context.name}} />
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
          initialStep={context.features.premium ? 0 : 1}
          submit={participant => context.modifyParticipant(participant.id, participant)}
          steps={[{
            // auth provider step
            canProceed: ({ uid }) => !!uid
          }, {
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
          submit={room => roomTable.create(room).then(() => context.setUuid(room.uuid))}
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
          open={context.creatingCeremony}
          initialModel={{
            id: phrase({exactly: 3, join: '-'}),
            theme: "coordination",
            emoji: "🙂",
            title: "",
            subheading: "",
            description: "",
            placement: "undecided",
            async: true,
            custom: true,
          }}
          close={context.setCreatingCeremonyId}
          styles={{
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            width: "auto",
            height: "auto"
          }}
          submit={ceremony => (
            context.modifyCeremony(ceremony.id, ceremony).then(() => (
              context.setEditingCeremonyId(ceremony.id)
            ))
          )}
          singleControl={true}
          steps={[{
            next: "common.save",
            canProceed: model => (
              model.title && model.emoji && model.theme
            )
          }]}
        />
        <Modal
          Content={EditCeremony}
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
