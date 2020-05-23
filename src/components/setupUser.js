import React, { useRef, useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import phrase from "random-words"

import Controls from "./controls"
import Dropdown from "./dropdown"
import Context from "../contexts/room"
import "../styles/setup.scss"

const SetupUser = ({ onSubmit }) => {
  const { name, login, roleData } = useContext(Context)
  const { t } = useTranslation()
  const usernameRef = useRef()

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [{ id, username, roles }, setUser] = useState({
    id: phrase({ exactly: 3, join: '-' }),
    username: '',
    roles: [],
  })
  const steps = [{
    nextText: "setup.controls.okGotIt",
    backText: null,
    canProceed: () => true
  }, {
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => !!username,
    afterRender: () => usernameRef.current.focus()
  }, {
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => !!roles.length
  }, {
    nextText: "setup.controls.createUser",
    backText: "setup.controls.back",
    canProceed: () => true,
    submitting
  }]

  return (
    <div className="setup-user setup">
      <div className="setup-user-slides setup-slides" style={{ marginLeft: `-${100 * step}%`}}>
        <div className={`setup-user-slide setup-slide ${step === 0 ? 'active' : ''} setup-user-help`}>
          <div className="setup-panel">
            <h1 className="text-gray-900 font-bold text-2-xl">{t("setup.user.title", { name })}</h1>
            <p>{t("setup.user.helptext")}</p>
          </div>
        </div>
        <div className={`setup-user-slide setup-slide ${step === 1 ? 'active' : ''} setup-user-name`}>
          <div className="setup-panel">
            <h1 className="text-gray-900 font-bold text-2-xl mb-2">{t("setup.user.username")}</h1>
            <input
              ref={usernameRef}
              className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl mr-3 py-2 leading-tight focus:outline-none"
              name="username"
              placeholder={t("setup.user.usernamePlaceholder")}
              value={username}
              onChange={({ target: { value } }) => setUser(user => ({ ...user, username: value }))}
              onKeyPress={({ which }) => ( // next on enter
                steps[1].canProceed() && which === 13 && setStep(step => step + 1)
              )}
            />
          </div>
        </div>
        <div className={`setup-user-slide setup-slide ${step === 2 ? 'active' : ''} setup-user-cadence`}>
          <div className="setup-panel">
            <h1 className="text-gray-900 font-bold text-2-xl">{t("setup.user.role")}</h1>
            <p>{t("setup.user.roleHelpText")}</p>
            <div className="mvc-radio-options justify-center">
              {roleData.map(role => (
                <label key={role} className="mvc-radio-option">
                  <input
                    type="checkbox"
                    name="role"
                    value={role}
                    onChange={({ target: { checked, value } }) => (
                      setUser(current => ({
                        ...current,
                        roles: checked ? roles.concat(value) : roles.filter(r => r !== value)
                      }))
                    )}
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
          <div className="setup-panel">
            <h1 className="text-gray-900 font-bold text-2-xl">{t("setup.user.ready")}</h1>
            <p>{t("setup.user.summary", { name, username })}</p>
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
            login({ id, username, roles }).catch(() => setSubmitting(false))
          }
      }} />
    </div>
  )
}

export default SetupUser
