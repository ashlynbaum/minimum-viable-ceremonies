import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"

import Controls from "./controls"
import Context from "../contexts/room"
import "../styles/editUser.scss"

const EditUser = ({ onSubmit }) => {
  const { editingUser, roles, login, setEditingUserId } = useContext(Context)
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
        {roles.map(role => (
          <label key={role} className="mvc-radio-option">
            <input
              type="radio"
              name="role"
              value={role}
              checked={user.role === role}
              onChange={({ target: { value } }) => setUser(current => ({ ...current, role: value }))}
              className="setup-user-role"
            />
            <div className="mvc-radio-option-label">{t(`roles.${role}.name`)}</div>
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
