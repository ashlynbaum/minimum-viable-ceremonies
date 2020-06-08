import React, { useMemo, useContext } from "react"
import { useTranslation } from 'react-i18next'

import Context from "../../contexts/room"

const Clock = ({ face, time, onSelect }) => {
  const { timeFor } = useContext(Context)
  const { t } = useTranslation()
  const am = useMemo(() => time.hour < 12, [time.hour])
  const selected = useMemo(() => (
    face === 'hour' ? time[face] % 12 : time[face]
  ), [time, face])

  const values = useMemo(() => (
    face === 'hour' ? (
      [...Array(12)].map((_, i) => ({ value: i+1, position: i+1 }))
    ) : (
      [...Array(60)].map((_, i) => (i % 15 === 0 ? ({ value: i, position: i / 5 }) : null))
    )
  ), [face])

  return <>
    <div className="clock">
      <div className={`face ${face}`}>
        {values.filter(v => v !== null).map(({ value, position }) => (
          <div
            key={value}
            className={`position position-${position} ${value === selected ? 'position-selected' : ''}`}
            onClick={() => onSelect(face, value, face === 'hour' ? 'minute' : 'complete')}
          >{parseInt(value)}</div>
        ))}
      </div>
    </div>
    <div className="flex flex-row justify-center">
      <div className="time flex items-center mr-2">{timeFor(time, false)}</div>
      <div className="flex flex-col">
        <button
          disabled={am}
          className={`meridian ${am ? 'selected' : ''}`}
          onClick={() => onSelect('hour', time.hour - 12)}
        >{t("timepicker.am")}</button>
        <button
          disabled={!am}
          className={`meridian ${am ? '' : 'selected'}`}
          onClick={() => onSelect('hour', time.hour + 12)}
        >{t("timepicker.pm")}</button>
      </div>
    </div>
  </>
}

export default Clock
