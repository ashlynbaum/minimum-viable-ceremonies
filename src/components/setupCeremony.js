import React, { useEffect, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import Check from "../images/check-mark.svg"

import Card from "./card"
import Dropdown from "./dropdown"
import MiniBoard from "./miniBoard"
import Timepicker from "./timepicker/picker"
import Context from "../contexts/room"
import "../styles/setup.scss"

const cadencesWithTime = [
  'monday-1', 'monday-2',
  'tuesday-1', 'tuesday-2',
  'wednesday-1', 'wednesday-2',
  'thursday-1', 'thursday-2',
  'friday-1', 'friday-2',
  'daily'
]

const SetupCeremony = ({ onSubmit }) => {
  const { t } = useTranslation()
  const { editingCeremony, modifyCeremony, timeFor } = useContext(Context)
  const [cadenceOpen, setCadenceOpen] = useState(false)
  const [startTimeOpen, setStartTimeOpen] = useState(false)
  const [endTimeOpen, setEndTimeOpen] = useState(false)
  const { id, placement, async, notes, startTime, endTime } = editingCeremony || {}

  useEffect(() => { setStartTimeOpen(false) }, [startTime])
  useEffect(() => { setEndTimeOpen(false) }, [endTime])

  return (
    <div className="setup-ceremony">
      <div className="setup-panel split">
        <div>
          <Card id={id} namespace="ceremonies" theme={true} />
        </div>
        <div>
          <div className="mvc-subtitle">{t("setup.ceremony.schedule")}</div>
          <div className="setup-ceremony-async flex flex-row">
            {[true, false].map(value => (
              <label key={value} className="mvc-radio-option flex content-center">
                <input
                  type="checkbox"
                  name="async"
                  value={value}
                  checked={value === async}
                  onChange={({ target: { checked, value } }) => modifyCeremony(id, { async: value === 'true' })}
                />
                <div className="mvc-radio-option-label">
                  <Check />
                  <span>{t(`setup.ceremony.${value ? 'async' : 'sync'}`)}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="mvc-note">{t(`setup.ceremony.${async ? 'async' : 'sync'}Helptext`)}</div>
          <div className="mvc-subtitle">{t("setup.ceremony.cadence")}</div>
          <div className={`setup-ceremony-selector ${placement}`}>
            <Dropdown
              theme="light"
              position="bottom"
              onClick={() => {
                setCadenceOpen(current => !current)
                setStartTimeOpen(false)
                setEndTimeOpen(false)
              }}
              tooltip={cadenceOpen ? null : t("common.clickEdit")}
              text={t(`cadences.${placement}.miniName`)}
            />
            <div className={`setup-ceremony-popup ${cadenceOpen ? 'visible' : ''}`}>
              <MiniBoard id={id} onClick={() => setCadenceOpen(false)} />
            </div>
          </div>
          {!async && cadencesWithTime.includes(placement) && <>
            <div className="mvc-subtitle">{t("setup.ceremony.time")}</div>
            <div className="flex flex-row items-center">
              <div className={`setup-ceremony-selector ${startTime ? '' : 'undecided'}`}>
                <Dropdown
                  theme="light"
                  position="bottom"
                  onClick={() => {
                    setStartTimeOpen(current => !current)
                    setEndTimeOpen(false)
                    setCadenceOpen(false)
                  }}
                  tooltip={startTimeOpen ? null : t("common.clickEdit")}
                  text={timeFor(startTime) || t("cadences.undecided.miniName")}
                />
                <div className={`setup-ceremony-popup ${startTimeOpen ? 'visible' : ''}`}>
                  <Timepicker time={startTime || {}} onSelect={startTime => modifyCeremony(id, { startTime })} />
                </div>
              </div>
              <div className="mvc-note" style={{margin: "0 12px"}}>{t("common.to")}</div>
              <div className={`setup-ceremony-selector ${endTime ? '' : 'undecided'}`}>
                <Dropdown
                  theme="light"
                  position="bottom"
                  onClick={() => {
                    setEndTimeOpen(current => !current)
                    setStartTimeOpen(false)
                    setCadenceOpen(false)
                  }}
                  tooltip={endTimeOpen ? null : t("common.clickEdit")}
                  text={timeFor(endTime) || t("cadences.undecided.miniName")}
                />
                <div className={`setup-ceremony-popup ${endTimeOpen ? 'visible' : ''}`}>
                  <Timepicker time={endTime || {}} onSelect={endTime => modifyCeremony(id, { endTime })} />
                </div>
              </div>
            </div>
          </>}
          <div className="mvc-subtitle">{t(`setup.ceremony.${async ? 'syncNotes' : 'asyncNotes'}`)}</div>
          <div>
            <textarea
              className="mvc-textarea"
              name="notes"
              placeholder={t(`setup.ceremony.${async ? 'syncNotesPlaceholder' : 'asyncNotesPlaceholder'}`)}
              value={notes}
              onChange={({ target: { value } }) => modifyCeremony(id, { notes: value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupCeremony
