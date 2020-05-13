import React, { useState, useContext } from "react"
import Controls from "./basic/controls"
import Context from "../contexts/room"
import { setParticipant } from "../db/firebase"
import phrase from "random-words"

import "../styles/setup.scss"

const SetupUser = () => {
  const { uuid, roles, loginAs } = useContext(Context)
  const allRoles = Object.values(roles).flat()

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [{ id, name, role }, setUser] = useState({
    id: phrase({ exactly: 3, join: '-' }),
    name: ''
  })
  const steps = [{
    nextText: 'Ok, got it!',
    backText: null,
    canProceed: () => true
  }, {
    nextText: 'Next →',
    backText: '← Back',
    canProceed: () => !!name
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
          <h1>Welcome to {uuid}!</h1>
          <p>Here is some help to get you started</p>
        </div>
        <div className="setup-user-slide setup-slide setup-user-name">
          <h1>First, what's your name?</h1>
          <input
            className="btn-input"
            name="name"
            placeholder="e.g. Sam Smooth"
            value={name}
            onChange={({ target: { value } }) => setUser(user => ({ ...user, name: value }))}
          />
        </div>
        <div className="setup-user-slide setup-slide setup-user-cadence">
          <h1>What role will you play?</h1>
          {allRoles.map(role => (
            <div key={role}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value={role}
                  onChange={({ target: { value } }) => setUser(room => ({ ...room, role: value }))}
                  className="setup-user-role"
                />
                {role}
              </label>
            </div>
          ))}
        </div>
        <div className="setup-user-slide setup-slide setup-user-link">
          <h1>Ready to go!</h1>
          <p>You'll be entering room {uuid} as {name}, acting as the {role}</p>
        </div>
      </div>
      <Controls index={step} max={steps.length-1} step={{
        ...steps[step],
        back: () => setStep(step => step - 1),
        next: step < steps.length -1
          ? () => setStep(step => step + 1)
          : () => {
            setSubmitting(true)
            setParticipant({ uuid }, { id, name, role }).then(
              () => loginAs({ id, name, role }),
              () => setSubmitting(false)
            )
          }
      }} />
    </div>
  )
}

export default SetupUser
