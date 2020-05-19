import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"

import Controls from "./controls"
import Dropdown from "./dropdown"
import Context from "../contexts/room"
import "../styles/editUser.scss"

const EditUser = ({ onSubmit }) => {
  const { editingUser, roleData, login, setEditingUserId } = useContext(Context)
  const { t } = useTranslation()
  const [user, setUser] = useState(editingUser)
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="edit-user">
      <h3 className="mvc-subtitle">{t("participant.name")}</h3>
      <input
        className="edit-user-field"
        name="username"
        placeholder={t("setup.user.usernamePlaceholder")}
        value={user.username}
        onChange={({ target: { value } }) => setUser(current => ({ ...current, username: value }))}
      />
      <h3 className="mvc-subtitle">{t("participant.roles")}</h3>
      <div className="justify-start mvc-radio-options edit-user-field">
        {roleData.map(role => (
          <label key={role} className="mvc-radio-option">
            <input
              type="checkbox"
              name="role"
              value={role}
              checked={user.roles.includes(role)}
              onChange={({ target: { value, checked } }) => (
                setUser(current => ({
                  ...current,
                  roles: checked ? user.roles.concat(value) : user.roles.filter(r => r !== value)
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
      <Controls step={{
        next: () => {
          setSubmitting(true)
          login(user, false).then(() => setEditingUserId(null))
        },
        nextText: t("common.save"),
        canProceed: () => true,
        submitting,
      }} />
    </div>
  )
}

export default EditUser
