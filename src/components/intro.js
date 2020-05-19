import React, { useState } from "react"
import Modal from "react-modal"
import { useTranslation } from "react-i18next"

import SetupRoom from "./setupRoom"
import BoardSvg from "../images/board.svg"
import "../styles/intro.scss"

const Intro = () => {
  const { t } = useTranslation()
  const [creatingRoom, setupRoom] = useState()

  Modal.setAppElement("#___gatsby")

  return (
    <div className="intro flex flex-col justify-center align-center">
      <div className="intro-content flex flex-row justify-center align-center">
        <div className="intro-left flex flex-col justify-center text-center align-center">
          <h1 className="intro-title">{t("intro.welcome")}</h1>
          <div className="intro-new">
            <button className="mvc-btn" onClick={() => setupRoom(true)}>
              {t("intro.setupRoom")}
            </button>
          </div>
        </div>
        <div className="intro-right">
          <BoardSvg />
        </div>
      </div>
      <Modal
        isOpen={creatingRoom}
        onRequestClose={() => setupRoom(false)}
        style={{
          content: {
            height: "auto",
            bottom: "auto",
          },
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }}
      >
        <SetupRoom />
      </Modal>
    </div>
  )
}

export default Intro
