import React, { useState } from "react"
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
      <div className="setup-room-slides setup-slides" style={{ height: '100%', marginLeft: `-${100 * step}%`}}>
        <div className={`setup-room-slide ${step === 0 ? 'active' : ''} setup-slide setup-room-help`}>
          <h1>{t("setup.room.title", { name: room.name })}</h1>
          <p>{t("setup.room.helptext")}</p>
        </div>
        <div className={`setup-room-slide ${step === 1 ? 'active' : ''} setup-slide setup-room-name`}>
          <div className="">
            <h1 className="text-gray-900 font-bold text-2-xl mb-2">{t("setup.room.name")}</h1>
            {/* <label className="setup-room-input-label"> */}
              {/* {t("setup.room.nameLabel")} */}
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl mr-3 py-2 leading-tight focus:outline-none"
                name="name"
                placeholder={t("setup.room.namePlaceholder")}
                value={room.name}
                onChange={({ target: { value } }) => room.setName(value)}
                onKeyPress={({ which }) => ( // next on enter
                  steps[1].canProceed() && which === 13 && setStep(step => step + 1)
                )}
              />
          </div>
          {/* </label> */}
        </div>
        <div className={`setup-room-slide ${step === 2 ? 'active' : ''} setup-slide setup-room-week-count`}>
          <div className="setup-panel">
            <h1>{t("setup.room.weekCount")}</h1>
            <p>{t("setup.room.weekCountHelper")}</p>
            <div className="mvc-radio-options justify-center">
              {[1,2].map(weekCount => (
                <label className="mvc-radio-option" key={weekCount}>
                  <input
                    type="radio"
                    name="weekCount"
                    value={weekCount}
                    onChange={({ target: { value } }) => room.setWeekCount(value)}
                  />
                  <div className="mvc-radio-option-label" style={{padding: '8px'}}>
                    {t(weekCount === 1 ? "setup.room.weeksSingular" : "setup.room.weeksPlural", { weekCount })}
                  </div>
                </label>
            ))}
            </div>
          </div>
        </div>
        <div className={`setup-room-slide ${step === 3 ? 'active' : ''} setup-slide setup-room-link`}>
          <h1>{t("setup.room.ready")}</h1>
          <p>{t("setup.room.linkHelptext")}</p>
          <ShareableLink text={room.uuid} value={room.shareableLink} position="bottom" inline={true} />
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
