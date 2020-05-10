import React, { useState, useContext } from "react"
import Progress from "./basic/progress"
import Context from "../contexts/room"
import { setParticipant } from "../db/firebase"
import phrase from "random-words"

import "../styles/setup.scss"

const stepText = {
  next: ['Ok, got it!', 'Next →', 'Next →', 'Enter room'],
  back: [null, '← Back', '← Back', '← Back']
}

const SetupUser = () => {
  const { uuid, roles, loginAs } = useContext(Context)
  const allRoles = Object.values(roles).flat()

  const [step, setStep] = useState(0)
  const [{ id, name, role }, setUser] = useState({
    id: phrase({ exactly: 3, join: '-' }),
    name: ''
  })
  const next = () => setStep(step => step + 1)
  const back = () => setStep(step => step - 1)
  const submit = () => (
    setParticipant({ uuid }, { id, name, role }).then(() => (
      loginAs({ id, name, role })
    ))
  )

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
      <div className="setup-user-controls setup-controls">
        {step > 0 && <button onClick={back} className="btn btn-blue">{stepText.back[step]}</button>}
        <div className="setup-user-controls-divider setup-controls-divider">
          {step > 0 && <Progress step={step-1} max={3} />}
        </div>
        <button onClick={step < 3 ? next : submit} className="btn btn-blue">{stepText.next[step]}</button>
      </div>
    </div>
  )
}

export default SetupUser
