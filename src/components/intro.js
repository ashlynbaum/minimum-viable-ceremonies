import React, { useEffect } from "react"
import phrase from "random-words"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import SetupRoom from "./setupRoom"
import Board from "./board"
import Modal from "./modal"
import useRoomContext from "../hooks/useRoomContext"
import Context from "../contexts/room"
import { createRoom } from "../db/firebase"

const Intro = () => {
  const draft = useRoomContext(phrase({exactly: 3, join: '-'}), true)
  const { trackPageView } = useMatomo()

  useEffect(() => { trackPageView() }, [])

  return (
    <Context.Provider value={draft}>
      <Modal
        Content={SetupRoom}
        open={true}
        initialModel={draft}
        submit={createRoom}
        steps={[{
          next: "setup.controls.okGotIt",
          back: null,
        }, {
          next: "setup.controls.next",
          back: "setup.controls.back",
          canProceed: ({ name }) => name.length > 3,
        }, {
          next: "setup.controls.createRoom",
          back: "setup.controls.back",
        }]}
      />
      <Board />
    </Context.Provider>
  )
}

export default Intro
