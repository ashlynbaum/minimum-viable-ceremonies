import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { navigate } from "gatsby"
import { document } from "browser-monads"
import phrase from "random-words"

import Controls from "./basic/controls"
import { createRoom } from "../db/firebase"
import useRoomContext from "../hooks/useRoomContext"
import "../styles/setup.scss"

const SetupRoom = ({ onSubmit }) => {
  const { t } = useTranslation()
  const linkRef = useRef()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const room = useRoomContext(phrase({ exactly: 3, join: '-' }))
  const steps = [{
    nextText: "setup.controls.okGotIt",
    backText: null,
    canProceed: () => true
  }, {
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => room.nameValid
  }, {
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => room.weekCountValid
  }, {
    nextText: "setup.controls.createRoom",
    backText: "setup.controls.back",
    canProceed: () => true,
    submitting
  }]

  return (
    <div className="setup-room setup">
      <div className="setup-room-slides setup-slides" style={{ marginLeft: `-${100 * step}%`}}>
        <div className="setup-room-slide setup-slide setup-room-help">
          <h1>{t("setup.room.title", { name: room.name })}</h1>
          <p>{t("setup.room.helptext")}</p>
        </div>
        <div className="setup-room-slide setup-slide setup-room-name">
          <h1>{t("setup.room.name")}</h1>
          <input
            className="btn-input"
            name="name"
            placeholder={t("setup.room.namePlaceholder")}
            value={room.name}
            onChange={({ target: { value } }) => room.setName(value)}
            onKeyPress={({ which }) => ( // next on enter
              steps[1].canProceed() && which === 13 && setStep(step => step + 1)
            )}
          />
        </div>
        <div className="setup-room-slide setup-slide setup-room-week-count">
          <div className="setup-panel">
            <h1>{t("setup.room.weekCount")}</h1>
            <div className="setup-radio-options">
              {[1,2].map(weekCount => (
                <label className="setup-radio-option" key={weekCount}>
                  <input
                    type="radio"
                    name="weekCount"
                    value={weekCount}
                    onChange={({ target: { value } }) => room.setWeekCount(value)}
                  />
                  <div className="setup-radio-option-label">
                    {t(weekCount === 1 ? "setup.room.weeksSingular" : "setup.room.weeksPlural", { weekCount })}
                  </div>
                </label>
            ))}
            </div>
          </div>
        </div>
        <div className="setup-room-slide setup-slide setup-room-link">
          <h1>{t("setup.room.ready")}</h1>
          <p>{t("setup.room.linkHelptext")}</p>
          <input
            ref={linkRef}
            className="btn-input"
            name="link"
            readOnly={true}
            value={room.shareableLink}
          />
          <button className="btn btn-blue" onClick={() => {
            linkRef.current.select()
            document.execCommand("copy")
          }}>{t("common.copy")}</button>
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
              () => navigate(`room/${room.uuid}`),
              () => setSubmitting(false)
            )
          }
      }} />
    </div>
  )
}

export default SetupRoom
