import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import phrase from "random-words"
import moment from "moment"
import TimePicker from "rc-time-picker"

import Icon from "./icon"
import Context from "../contexts/room"
import "../styles/setup.scss"
import "../styles/setupCeremony.scss"
import "rc-time-picker/assets/index.css"

const SetupCeremony = ({ onSubmit }) => {
  const { t } = useTranslation()
  const { place, currentCeremony } = useContext(Context)

  if (!currentCeremony) { return null }

  return (
    <div className="setup-ceremony flex flex-row">
      <div className="setup-ceremony-left">
        <div className="setup-ceremony-schedule">
          <div className="mvc-subtitle">
            {t("setup.ceremony.schedule")}
          </div>
          <div className="flex flex-row items-center setup-ceremony-placement">
            {currentCeremony.placement ? <>
              <Icon icon="time/calendar-checked" />
            </> : <>
              <Icon icon="time/calendar-checked" />
              <span>{t("setup.ceremony.scheduled", { })}</span>
            </>}
          </div>
          <div className="flex flex-col">
            <div>{t("setup.ceremony.cadence")}</div>
            <div>DROPDOWN</div>
            <div>{t("setup.ceremony.sync")}</div>
            <div className="mvc-radio-options justify-center">
              {[1, 0].map(value => (
                <label className="mvc-radio-option" key={value}>
                  <input
                    type="radio"
                    name="sync"
                    value={value}
                    checked={currentCeremony.sync === !!value}
                    onChange={({ target: { value } }) => place(currentCeremony.id, {
                      ...currentCeremony,
                      sync: !!parseInt(value)
                    })}
                  />
                  <div className="mvc-radio-option-label">
                    {value ? "YES" : "NO"}
                  </div>
                </label>
              ))}
            </div>
            <div>{t("setup.ceremony.time")}</div>
            <div>
              <TimePicker
                showSecond={false}
                defaultValue={currentCeremony.time || moment().hour(16).minute(0)}
                onChange={console.log}
                format="h:mm a"
                minuteStep={15}
                use12Hours
                inputReadOnly
              />
            </div>
          </div>
          <div className="flex flex-col setup-ceremony-notes">
            <div className="mvc-subtitle">{t("setup.ceremony.notes")}</div>
            <textarea />
          </div>
        </div>
      </div>
      <div className="setup-ceremony-right">
        CARD
      </div>
    </div>
  )
}

export default SetupCeremony
