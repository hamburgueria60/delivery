import './index.scss'
import React, { useCallback, useState } from 'react'
import axios from 'axios'

const IDLE = 'IDLE'
const LOADING = 'LOADING'
const DONE = 'DONE'

const SettingsPage = () => {
  const [status, setStatus] = useState(IDLE)
  const [iSuccessful, setSuccessful] = useState()

  const handleSyncClick = useCallback(async () => {
    setStatus(LOADING)
    try {
      await axios.get('/settings/database/sync')
      setSuccessful(true)
    } catch (e) {
      setSuccessful(false)
    } finally {
      setStatus(DONE)
    }
  })

  return (
    <div className="settings-page" ng-bind-html="teste">
      <button type="button" onClick={handleSyncClick}>
        Sincronizar banco de dados com Restaurant
      </button>

      {status === DONE && iSuccessful ? 'OK' : null}
      {status === DONE && !iSuccessful ? 'TENTE NOVAMENTE' : null}
    </div>
  )
}

export default function settingsPage(reactDirective) {
  return reactDirective(SettingsPage, [])
}

settingsPage.displayName = 'settingsPage'
