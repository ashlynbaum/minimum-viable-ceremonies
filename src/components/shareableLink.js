import React, { useState, useRef } from "react"
import { document } from "browser-monads"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import "../styles/shareableLink.scss"

const ShareableLink = ({ text, value, position }) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const linkRef = useRef()

  return (
    <div className="shareable-link">
      <Dropdown
        icon="basic/link"
        position={position}
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
      <textarea readOnly={true} ref={linkRef} value={value} />
    </div>
  )
}

export default ShareableLink
