import { useState } from 'react'
import styles from './app.module.scss'
import { useBackGroundCurrentPeriodDay } from './hooks/useBackgroundCurrentPeriodDay'
import { classNames } from './tools/classNames'
import { Clock } from './components/clock/clock'

function App() {
  const [toggle, setToggle] = useState<boolean>(false)

  function handleToggleFooter() {
    setToggle(!toggle)
  }

  const toggleClassName = toggle ? 'show' : ''
  const currentPeriodDay = useBackGroundCurrentPeriodDay()
  const periodDayForFooter = `footerBg-${currentPeriodDay}`

  return (
    <div className={classNames([styles.app, styles[currentPeriodDay]])}>
      <div className={classNames([styles.appContainer, styles[toggleClassName]])}>
        <main className={classNames([styles.main])}>
          <Clock />
          <h1>Clock App</h1>
          <button className={styles.btn} onClick={handleToggleFooter}>
            Clicked
          </button>
        </main>
        <footer className={classNames([styles.footer, styles[periodDayForFooter]])}> This is the footer </footer>
      </div>
    </div>
  )
}

export default App
