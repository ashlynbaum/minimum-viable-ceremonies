import React from "react"
import Modal from "react-modal"

import SetupRoom from "./setupRoom"
import "../styles/intro.scss"

const Intro = () => {
  Modal.setAppElement("#___gatsby")

  return (
    <div className="intro flex flex-col justify-center align-center">
      <Modal
        isOpen={true}
        style={{
          content: {
            height: "70vh",
            width: "75vw",
            bottom: "auto",
            margin: "auto",
            backgroundColor: "rgba(255,255,255,0.6)",
          },
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }
        }}
      >
        <SetupRoom />
      </Modal>
    </div>
  )
}

export default Intro
