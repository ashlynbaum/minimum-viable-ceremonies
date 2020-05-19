import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import phrase from "random-words"

import Controls from "./controls"
import Dropdown from "./dropdown"
import Context from "../contexts/room"
import "../styles/setup.scss"

const SetupUser = ({ onSubmit }) => {
  const { name, login, roles } = useContext(Context)
  const { t } = useTranslation()

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [{ id, username, role }, setUser] = useState({
    id: phrase({ exactly: 3, join: '-' }),
    username: ''
  })
  const steps = [{
    nextText: "setup.controls.okGotIt",
    backText: null,
    canProceed: () => true
  }, {
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => !!username
  }, {
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => !!role
  }, {
    nextText: "setup.controls.createUser",
    backText: "setup.controls.back",
    canProceed: () => true,
    submitting
  }]

  return (
    <div className="setup-user setup">
      <div className="setup-user-slidessetup-slide setup-slides" style={{ marginLeft: `-${100 * step}%`}}>
        <div className={`setup-user-slide setup-slide ${step === 0 ? 'active' : ''} setup-user-help`}>
          <h1>{t("setup.user.title", { name })}</h1>
          <p>{t("setup.user.helptext")}</p>
        </div>
        <div className={`setup-user-slide setup-slide ${step === 1 ? 'active' : ''} setup-user-name`}>
          <h1>{t("setup.user.username")}</h1>
          <input
            name="username"
            placeholder={t("setup.user.usernamePlaceholder")}
            value={username}
            onChange={({ target: { value } }) => setUser(user => ({ ...user, username: value }))}
            onKeyPress={({ which }) => ( // next on enter
              steps[1].canProceed() && which === 13 && setStep(step => step + 1)
            )}
          />
        </div>
        <div className={`setup-user-slide setup-slide ${step === 2 ? 'active' : ''} setup-user-cadence`}>
          <div className="setup-panel">
            <h1>{t("setup.user.role")}</h1>
            <div className="mvc-radio-options justify-center">
              {roles.map(role => (
                <label key={role} className="mvc-radio-option">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    onChange={({ target: { value } }) => setUser(room => ({ ...room, role: value }))}
                    className="setup-user-role"
                  />
                  <div className="mvc-radio-option-label">
                    <Dropdown
                      theme="light"
                      position="bottom"
                      text={[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}
                      tooltip={<div className="participant-role-tooltip">
                        <h3>{[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}</h3>
                        <p>{t(`roles.${role}.description`)}</p>
                      </div>}
                      width={600}
                      delay={1000}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className={`setup-user-slide setup-slide ${step === 3 ? 'active' : ''} setup-user-link`}>
          <h1>{t("setup.user.ready")}</h1>
          <p>{t("setup.user.summary", { name, username, role })}</p>
        </div>
      </div>
      <Controls index={step} max={steps.length-1} step={{
        ...steps[step],
        back: () => setStep(step => step - 1),
        next: step < steps.length -1
          ? () => setStep(step => step + 1)
          : () => {
            setSubmitting(true)
            login({ id, username, role })
              .then(onSubmit)
              .catch(() => setSubmitting(false))
          }
      }} />
    </div>
  )
}

export default SetupUser
