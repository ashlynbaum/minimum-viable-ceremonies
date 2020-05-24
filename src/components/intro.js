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
            backgroundColor: "$warm-grey-000",
            boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2), 0px 3px 11px rgba(0, 0, 0, 0.15)",
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
