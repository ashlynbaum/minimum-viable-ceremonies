import React, { useRef, useEffect, useContext } from "react"
import { useTranslation } from "react-i18next"

import ShareableLink from "./shareableLink"
import BoardSvg from "../images/board.svg"
import Context from "../contexts/modal"
import "../styles/setup.scss"

const SetupRoom = () => {
  const { t } = useTranslation()
  const nameRef = useRef()
  const { currentStep, model, setModel, nextStepOnEnter } = useContext(Context)

  useEffect(() => {
    if (currentStep.index === 1) {
      setTimeout(() => nameRef.current.focus(), 500)
    }
  }, [currentStep])

  return (
    <div className="setup-room setup">
      <div className="setup-room-slides setup-slides" style={{marginLeft: `-${100 * currentStep.index}%`}}>
        <div className={`setup-room-slide ${currentStep.index === 0 ? 'active' : ''} setup-slide setup-room-help`}>
          <div className="setup-panel text-center mx-auto">
            <div className="setup-subpanel">
              <div className="flex flex-col items-center justify-center">
                <div className="">
                  <BoardSvg style={{width: "50%", height: "auto", margin: "2rem auto"}} />
                </div>
                <h1>{t("setup.room.title", { name: model.name })}</h1>
                <p>{t("setup.room.helptext")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`setup-room-slide ${currentStep.index === 1 ? 'active' : ''} setup-slide setup-room-name`}>
          <div className="setup-panel">
            <div className="setup-input-subpanel sm:mx-auto">
              <div className="input-label">{t("setup.room.name")}</div>
              <input
                ref={nameRef}
                autoComplete="off"
                className="bg-transparent border-none w-full placeholder-gray-600 focus:placeholder-gray-500 leading-tight focus:outline-none"
                name="name"
                placeholder={t("setup.room.namePlaceholder")}
                value={model.name}
                onChange={({ target: { value } }) => setModel(current => ({ ...current, name: value }))}
                onKeyPress={currentStep.index === 1 ? nextStepOnEnter : null}
              />
            </div>
          </div>
        </div>
        <div className={`setup-room-slide ${currentStep.index === 2 ? 'active' : ''} setup-slide setup-room-link`}>
          <div className="setup-panel">
            <div className="setup-subpanel">
              <h1 className="ml-1">{t("setup.room.ready")}</h1>
              <p className="ml-1">{t("setup.room.copyLink")}</p>
              <div className="setup-panel-card">
                <div className="">{t("setup.room.copyLinkHelptext")}</div>
                <ShareableLink value={model.shareableLink} text={t("setup.room.copyLinkButton")} position="bottom" size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupRoom
