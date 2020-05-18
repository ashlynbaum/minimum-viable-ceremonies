import React, { useState, useContext, useRef } from "react"
import { document } from "browser-monads"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import Context from "../contexts/room"
import "../styles/shareableLink.scss"

const ShareableLink = ({ text }) => {
  const { t } = useTranslation()
  const { shareableLink } = useContext(Context)
  const [copied, setCopied] = useState(false)
  const linkRef = useRef()

  return (
    <div className="shareable-link">
      <Dropdown
        icon="basic/link"
        klass="light"
        text={text}
        size={16}
        tooltip={t(`shareableLink.${copied ? 'copied' : 'copy'}`)}
        onClick={() => {
          setCopied(true)
          linkRef.current.select()
          document.execCommand("copy")
          setTimeout(() => setCopied(false), 1000)
        }}
      />
      <textarea readOnly={true} ref={linkRef} value={shareableLink} />
    </div>
  )
}

export default ShareableLink
