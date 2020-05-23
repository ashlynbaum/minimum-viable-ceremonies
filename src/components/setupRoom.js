import React, { useRef, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { navigate } from "gatsby"
import phrase from "random-words"

import Controls from "./controls"
import ShareableLink from "./shareableLink"
import { createRoom } from "../db/firebase"
import useRoomContext from "../hooks/useRoomContext"
import "../styles/setup.scss"

const SetupRoom = ({ onSubmit = function() {} }) => {
  const { t } = useTranslation()
  const nameRef = useRef()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const room = useRoomContext(phrase({ exactly: 3, join: '-' }), true)
  const steps = [{
    nextText: "setup.controls.okGotIt",
    backText: null,
    canProceed: () => true
  }, {
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => room.nameValid,
    afterRender: () => nameRef.current.focus()
  }, {
    nextText: "setup.controls.createRoom",
    backText: "setup.controls.back",
    canProceed: () => true,
    submitting
  }]


  return (
    <div className="setup-room setup">
      <div className="setup-room-slides setup-slides" style={{marginLeft: `-${100 * step}%`}}>
        <div className={`setup-room-slide ${step === 0 ? 'active' : ''} setup-slide setup-room-help`}>
          <div className="setup-panel text-center">
            <h1>{t("setup.room.title", { name: room.name })}</h1>
            <p>{t("setup.room.helptext")}</p>
          </div>
        </div>
        <div className={`setup-room-slide ${step === 1 ? 'active' : ''} setup-slide setup-room-name`}>
          <div className="setup-panel">
            <h1 className="text-gray-900 font-bold text-2-xl">{t("setup.room.name")}</h1>
            <input
              ref={nameRef}
              className="ml-10 bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl leading-tight focus:outline-none"
              name="name"
              placeholder={t("setup.room.namePlaceholder")}
              value={room.name}
              onChange={({ target: { value } }) => room.setName(value)}
              onKeyPress={({ which }) => ( // next on enter
                steps[1].canProceed() && which === 13 && setStep(step => step + 1)
              )}
            />
          </div>
        </div>
        <div className={`setup-room-slide ${step === 2 ? 'active' : ''} setup-slide setup-room-link`}>
          <div className="setup-panel">
            <div className="text-left">
              <h1>{t("setup.room.ready")}</h1>
              <p>{t("setup.room.copyLink")}</p>
              <div className="setup-shareable-link">
              <div className="font-bold">{t("setup.room.copyLinkHelptext")}</div>
              <ShareableLink value={room.shareableLink} text={t("setup.room.copyLinkButton")} position="bottom" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Controls index={step} max={steps.length-1} step={{
        ...steps[step],
        back: () => setStep(step => step - 1),
        next: step < steps.length -1
          ? () => setStep(step => step + 1)
          : () => {
            setSubmitting(true)
            createRoom(room).then(
              () => navigate(`room/${room.uuid}`) || onSubmit(room.uuid),
              () => setSubmitting(false)
            )
          }
      }} />
    </div>
  )
}

export default SetupRoom
