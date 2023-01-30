import { useState } from 'react'
import styles from './app.module.scss'
import { useBackGroundCurrentPeriodDay } from './hooks/useBackgroundCurrentPeriodDay'
import { classNames } from './tools/classNames'
import { Clock } from './components/clock/clock'
import arrowIcon from './assets/desktop/icon-arrow-down.svg'
import reloadIcon from './assets/desktop/icon-refresh.svg'
import { useWindowResize } from './hooks/useWindowResize'

function App() {
  const { period, quote, icon } = useBackGroundCurrentPeriodDay()

  const [toggle, setToggle] = useState<boolean>(false)
  const size = useWindowResize()

  function handleToggleFooter() {
    setToggle(!toggle)
  }

  const toggleClassName = toggle ? 'show' : ''
  const periodDayForFooter = `footerBg-${period}`
  const iconText = toggle ? 'less' : 'more'
  const rotateIconClassName = toggle ? 'rotate' : ''

  return (
    <div
      style={{
        height: `${size}px`,
      }}
      className={classNames([styles.app, styles[period]])}
    >
      <div className={classNames([styles.appContainer, styles[toggleClassName]])}>
        <main className={classNames([styles.main])}>
          <blockquote className={styles.quote}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt tempore sunt sit error, minima nisi quos incidunt delectus
              laudantium provident enim, deserunt explicabo maxime accusamus, soluta facere suscipit sed hic.
            </p>
            <button className={styles['button-reload']}>
              <img src={reloadIcon} alt='reload icon' aria-hidden={true} />
            </button>
          </blockquote>
          <section className={styles['clock-widget']}>
            <div className='widget'>
              <div className={styles['current-period']}>
                <img src={icon} alt={`icon for ${period} period`} />
                <p>{quote}</p>
              </div>
              <Clock />
              <p className={styles['current-location']}>in london, uk</p>
            </div>
            <button className={styles.btn} onClick={handleToggleFooter}>
              <span className={styles['icon-text']}>{iconText}</span>
              <span className={styles['icon']}>
                <img
                  className={classNames([styles[rotateIconClassName], styles['icon-image']])}
                  src={arrowIcon}
                  alt='arrow icon'
                  aria-hidden={true}
                />
              </span>
            </button>
          </section>
        </main>
        <footer className={classNames([styles.footer, styles[periodDayForFooter]])}>
          <div className={classNames([styles['footer-container']])}>
            <div className={classNames([styles['footer-content']])}>
              <div className={classNames([styles.side, styles['left-side']])}>
                <div className={classNames([styles['footer-item']])}>
                  <p className={classNames([styles['footer-title']])}>current timezone</p>
                  <h3 className={classNames([styles['footer-description']])}>Europe/London</h3>
                </div>
                <div className={classNames([styles['footer-item']])}>
                  <p className={classNames([styles['footer-title']])}>day of the year</p>
                  <h3 className={classNames([styles['footer-description']])}>Europe/London</h3>
                </div>
              </div>
              <div className={classNames([styles['right-side'], styles.side])}>
                <div className={classNames([styles['footer-item']])}>
                  <p className={classNames([styles['footer-title']])}>day of the week</p>
                  <h3 className={classNames([styles['footer-description']])}>Europe/London</h3>
                </div>
                <div className={classNames([styles['footer-item']])}>
                  <p className={classNames([styles['footer-title']])}>week number</p>
                  <h3 className={classNames([styles['footer-description']])}>Europe/London</h3>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
