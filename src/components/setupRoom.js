import React, { useState, useRef } from "react"
import Progress from "./basic/progress"
import phrase from "random-words"

import "../styles/setupRoom.scss"

const stepText = {
  next: ['Ok, got it!', 'Next →', 'Next →', 'Create room'],
  back: [null, '← Back', '← Back', '← Back']
}

const SetupRoom = () => {
  const linkRef = useRef()
  const [step, setStep] = useState(0)
  const [{ name, cadence }, setRoom] = useState({
    name: phrase({ exactly: 3, join: '-' })
  })
  const next = () => setStep(step => step + 1)
  const back = () => setStep(step => step - 1)
  const submit = () => console.log('wark!')

  return (
    <div className="setup-room">
      <div className="setup-room-slides" style={{ marginLeft: `-${100 * step}%`}}>
        <div className="setup-room-slide setup-room-help">
          <h1>Welcome to Minimum Viable Ceremonies!</h1>
          <p>Here is some help to get you started</p>
        </div>
        <div className="setup-room-slide setup-room-name">
          <h1>What would you like to call your room?</h1>
          <input
            name="name"
            placeholder="e.g. wealthy-dusty-llama"
            value={name}
            onChange={({ target: { value } }) => setRoom(room => ({ ...room, name: value }))}
          />
        </div>
        <div className="setup-room-slide setup-room-cadence">
          <h1>How long are your sprints?</h1>
          <label>
            <input
              type="radio"
              name="cadence"
              value={1}
              onChange={({ target: { value } }) => setRoom(room => ({ ...room, cadence: value }))}
              className="setup-room-cadence"
            />
            One week
          </label>
          <label>
            <input
              type="radio"
              name="cadence"
              value={2}
              onChange={({ target: { value } }) => setRoom(room => ({ ...room, cadence: value }))}
              className="setup-room-cadence"
            />
            Two weeks
          </label>
        </div>
        <div className="setup-room-slide setup-room-link">
          <h1>Ready to go!</h1>
          <p>Just share the following link with your team to get started</p>
          <input
            ref={linkRef}
            className="btn-input"
            name="link"
            readOnly={true}
            value={`${document.location.origin}/room/${name}`}
          />
          <button className="btn btn-blue" onClick={() => {
            linkRef.current.select()
            document.execCommand("copy")
          }}>Copy</button>
        </div>
      </div>
      <div className="setup-room-controls">
        {step > 0 && <button onClick={back} className="btn btn-blue">{stepText.back[step]}</button>}
        <div className="setup-room-controls-divider">
          {step > 0 && <Progress step={step-1} max={3} />}
        </div>
        <button onClick={step < 3 ? next : submit} className="btn btn-blue">{stepText.next[step]}</button>
      </div>
    </div>
  )
}

export default SetupRoom
