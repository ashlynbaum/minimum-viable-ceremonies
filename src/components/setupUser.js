import React, { useState, useContext } from "react"
import Controls from "./basic/controls"
import Context from "../contexts/room"
import phrase from "random-words"

import "../styles/setup.scss"

const SetupUser = () => {
  const { name, login, roles } = useContext(Context)

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [{ id, username, role }, setUser] = useState({
    id: phrase({ exactly: 3, join: '-' }),
    username: ''
  })
  const steps = [{
    nextText: 'Ok, got it!',
    backText: null,
    canProceed: () => true
  }, {
    nextText: 'Next →',
    backText: '← Back',
    canProceed: () => !!username
  }, {
    nextText: 'Next →',
    backText: '← Back',
    canProceed: () => !!role
  }, {
    nextText: 'Enter room',
    backText: '← Back',
    canProceed: () => true,
    submitting
  }]

  return (
    <div className="setup-user setup">
      <div className="setup-user-slidessetup-slide  setup-slides" style={{ marginLeft: `-${100 * step}%`}}>
        <div className="setup-user-slide setup-slide setup-user-help">
          <h1>Welcome to {name}!</h1>
          <p>Here is some help to get you started</p>
        </div>
        <div className="setup-user-slide setup-slide setup-user-name">
          <h1>First, what's your name?</h1>
          <input
            className="btn-input"
            name="username"
            placeholder="e.g. Sam Smooth"
            value={username}
            onChange={({ target: { value } }) => setUser(user => ({ ...user, username: value }))}
            onKeyPress={({ which }) => ( // next on enter
              steps[1].canProceed() && which === 13 && setStep(step => step + 1)
            )}
          />
        </div>
        <div className="setup-user-slide setup-slide setup-user-cadence">
          <div className="setup-panel">
            <h1>What role will you play?</h1>
            <div className="setup-radio-options">
              {Object.values(roles).map(({ id, name }) => (
                <label key={id} className="setup-radio-option">
                  <input
                    type="radio"
                    name="role"
                    value={id}
                    onChange={({ target: { value } }) => setUser(room => ({ ...room, role: value }))}
                    className="setup-user-role"
                  />
                  <div className="setup-radio-option-label">{name}</div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="setup-user-slide setup-slide setup-user-link">
          <h1>Ready to go!</h1>
          <p>You'll be entering room {name} as {username}, acting as the {role}</p>
        </div>
      </div>
      <Controls index={step} max={steps.length-1} step={{
        ...steps[step],
        back: () => setStep(step => step - 1),
        next: step < steps.length -1
          ? () => setStep(step => step + 1)
          : () => {
            setSubmitting(true)
            login({ id, username, role }).catch(() => setSubmitting(false))
          }
      }} />
    </div>
  )
}

export default SetupUser
