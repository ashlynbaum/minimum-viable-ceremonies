import React from "react"
import { navigate } from "gatsby"
import phrase from "random-words"

import SetupRoom from "./setupRoom"
import Board from "./board"
import Modal from "./modal"
import useRoomContext from "../hooks/useRoomContext"
import Context from "../contexts/room"
import { createRoom } from "../db/firebase"

const Intro = () => {
  const draft = useRoomContext(phrase({exactly: 3, join: '-'}), true)

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
