import { useState, useEffect, useCallback } from 'react'
import styles from './app.module.scss'
import { useBackGroundCurrentPeriodDay } from './hooks/useBackgroundCurrentPeriodDay'
import { classNames } from './tools/classNames'
import { Clock } from './components/clock/clock'
import arrowIcon from './assets/desktop/icon-arrow-down.svg'
import reloadIcon from './assets/desktop/icon-refresh.svg'
import { useWindowResize } from './hooks/useWindowResize'
import { IQuote } from './interfaces/quote.interface'
import { EAPIUrl } from './constants/constant'
import { IGeolocation } from './interfaces/geolocation.interface'
import geolocationJson from './data/geolocation.json'
import timeZoneJson from './data/time-zone.json'
import quoteJson from './data/quote.json'
import { IWorldTime } from './interfaces/world-time.interface'
import { IAppState } from './interfaces/app-state.interface'
const isFakeCalled = import.meta.env.DEV

function App() {
  const { period, quote, icon } = useBackGroundCurrentPeriodDay()
  const [toggle, setToggle] = useState<boolean>(false)
  const [appState, setAppState] = useState<IAppState | null>(null)

  function handleToggleFooter() {
    setToggle(!toggle)
  }

  const toggleClassName = toggle ? 'show' : ''
  const periodDayForFooter = `footerBg-${period}`
  const iconText = toggle ? 'less' : 'more'
  const rotateIconClassName = toggle ? 'rotate' : ''

  async function fetchData<T>(url: string, supportedData: T, fakeCalled = false): Promise<T> {
    try {
      if (fakeCalled) {
        return supportedData
      }
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      return response.json()
    } catch (error) {
      return supportedData
    }
  }

  async function getRandomQuote(): Promise<IQuote | null> {
    return fetchData<IQuote | null>(EAPIUrl.QUOTE, quoteJson, isFakeCalled)
  }

  async function getGeolocationIP(): Promise<IGeolocation | null> {
    const url = EAPIUrl.GEOLOCATION_URL
    const queryParams = new URLSearchParams()
    queryParams.append('info', EAPIUrl.GEOIP_API_KEY as unknown as string)
    return fetchData<IGeolocation>(`${url}?${queryParams.toString()}`, geolocationJson, isFakeCalled)
  }

  async function getTimeZone(idRegion: string) {
    return fetchData<IWorldTime>(`${EAPIUrl.TIME_ZONE_URL}${idRegion}`, timeZoneJson, isFakeCalled)
  }

  async function handleGetQuote() {
    try {
      const quote = await getRandomQuote()
      setAppState({
        ...(appState as IAppState),
        quoteResponse: quote,
      })
    } catch (error) {}
  }

  useEffect(() => {
    async function getData() {
      try {
        const quote = await getRandomQuote()
        const geolocation = await getGeolocationIP()
        const timeZone = await getTimeZone(geolocation?.data?.timezone?.id ?? '')
        setAppState({
          ...appState,
          quoteResponse: quote,
          geolocation,
          worldTime: timeZone,
        })
      } catch (error) {
      } finally {
      }
    }
    getData()
  }, [])

  const { quoteResponse, worldTime, geolocation } = appState ?? {}

  return (
    <div className={classNames([styles.app, styles[period]])}>
      <div className={classNames([styles.appContainer, styles[toggleClassName]])}>
        <main className={classNames([styles.main])}>
          <blockquote className={styles.quote}>
            <div className='quote-content'>
              <p>{quoteResponse?.content}</p>
              <cite className={styles.cite}>{quoteResponse?.author}</cite>
            </div>
            <button onClick={handleGetQuote} className={styles['button-reload']}>
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
              <p className={styles['current-location']}>
                <span> in </span>
                <span>
                  {geolocation?.data?.location?.city?.name}, {geolocation?.data?.location?.country?.alpha2}
                </span>
              </p>
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
                  <h3 className={classNames([styles['footer-description']])}>{geolocation?.data?.timezone?.id}</h3>
                </div>
                <div className={classNames([styles['footer-item']])}>
                  <p className={classNames([styles['footer-title']])}>day of the year</p>
                  <h3 className={classNames([styles['footer-description']])}>{worldTime?.day_of_year}</h3>
                </div>
              </div>
              <div className={classNames([styles['right-side'], styles.side])}>
                <div className={classNames([styles['footer-item']])}>
                  <p className={classNames([styles['footer-title']])}>day of the week</p>
                  <h3 className={classNames([styles['footer-description']])}>{worldTime?.day_of_week}</h3>
                </div>
                <div className={classNames([styles['footer-item']])}>
                  <p className={classNames([styles['footer-title']])}>week number</p>
                  <h3 className={classNames([styles['footer-description']])}>{worldTime?.week_number}</h3>
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
