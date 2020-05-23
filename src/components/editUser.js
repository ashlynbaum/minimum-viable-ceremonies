import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"

import Controls from "./controls"
import RoleCard from "./roleCard"
import RoleBadge from "./roleBadge"
import Context from "../contexts/room"
import "../styles/editUser.scss"

const EditUser = ({ onSubmit }) => {
  const { editingUser, roleData, login, setEditingUserId } = useContext(Context)
  const { t } = useTranslation()
  const [user, setUser] = useState(editingUser)
  const [currentRole, setCurrentRole] = useState()
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="edit-user flex flex-col">
      <div className="setup-panel split">
        <div>
          <RoleCard role={currentRole || user.roles[0]} />
        </div>
        <div>
          <h3 className="mvc-subtitle">{t("participant.name")}</h3>
          <input
            className="edit-user-field bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl leading-tight focus:outline-none"
            name="username"
            placeholder={t("setup.user.usernamePlaceholder")}
            value={user.username}
            onChange={({ target: { value } }) => setUser(current => ({ ...current, username: value }))}
          />
          <h3 className="mvc-subtitle">{t("participant.roles")}</h3>
          <div className="justify-start mvc-radio-options edit-user-field">
            {roleData.map(role => (
              <RoleBadge
                key={role}
                role={role}
                checked={user.roles.includes(role)}
                onHover={setCurrentRole}
                onClick={setUser}
              />
            ))}
          </div>
        </div>
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
