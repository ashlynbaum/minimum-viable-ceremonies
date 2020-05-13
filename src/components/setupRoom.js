import React, { useState, useMemo, useRef } from "react"
import { navigate } from "gatsby"
import { createRoom } from "../db/firebase"
import { document } from "browser-monads"
import phrase from "random-words"
import useRoomContext from "../hooks/useRoomContext"

import Progress from "./basic/progress"

import "../styles/setup.scss"

const SetupRoom = () => {
  const linkRef = useRef()
  const [step, setStep] = useState(0)
  const room = useRoomContext(phrase({ exactly: 3, join: '-' }))
  const steps = [{
    next: 'Ok, got it!',
    back: null,
    disableNext: () => false
  }, {
    next: 'Next →',
    back: '← Back',
    disableNext: () => !room.uuidValid
  }, {
    next: 'Next →',
    back: '← Back',
    disableNext: () => !room.weekCountValid
  }, {
    next: 'Create room',
    back: '← Back',
    disableNext: () => false
  }]
  const disableNext = useMemo(steps[step].disableNext, [step, room.uuidValid, room.weekCountValid])
  const next = () => setStep(step => step + 1)
  const back = () => setStep(step => step - 1)
  const submit = () => createRoom(room).then(() => navigate(`room`, { state: room }))


  return (
    <div className="setup-room setup">
      <div className="setup-room-slides setup-slides" style={{ marginLeft: `-${100 * step}%`}}>
        <div className="setup-room-slide setup-slide setup-room-help">
          <h1>Welcome to Minimum Viable Ceremonies!</h1>
          <p>Here is some help to get you started</p>
        </div>
        <div className="setup-room-slide setup-slide setup-room-name">
          <h1>What would you like to call your room?</h1>
          <input
            className="btn-input"
            name="uuid"
            placeholder="e.g. wealthy-dusty-llama"
            value={room.uuid}
            onChange={({ target: { value } }) => room.setUuid(value)}
          />
        </div>
        <div className="setup-room-slide setup-slide setup-room-week-count">
          <h1>How long are your sprints?</h1>
          {[1,2].map(weekCount => (
            <label key={weekCount}>
              <input
                type="radio"
                name="weekCount"
                value={weekCount}
                onChange={({ target: { value } }) => room.setWeekCount(value)}
              />
              {weekCount} week{weekCount === 1 ? '' : 's'}
            </label>
          ))}
        </div>
        <div className="setup-room-slide setup-slide setup-room-link">
          <h1>Ready to go!</h1>
          <p>Just share the following link with your team to get started</p>
          <input
            ref={linkRef}
            className="btn-input"
            name="link"
            readOnly={true}
            value={`${document.location.origin}/room/${room.uuid}`}
          />
          <button className="btn btn-blue" onClick={() => {
            linkRef.current.select()
            document.execCommand("copy")
          }}>Copy</button>
        </div>
      </div>
      <div className="setup-room-controls setup-controls">
        {step > 0 && <button onClick={back} className="btn btn-blue">{steps[step].back}</button>}
        <div className="setup-room-controls-divider setup-controls-divider">
          {step > 0 && <Progress step={step-1} max={3} />}
        </div>
        <button disabled={disableNext} onClick={step < 3 ? next : submit} className="btn btn-blue">{steps[step].next}</button>
      </div>
    </div>
  )
}

export default SetupRoom
