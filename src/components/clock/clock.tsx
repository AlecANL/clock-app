import styles from './clock.module.scss'
import { useClock } from '../../hooks/useClock'

export function Clock() {
  const currentTime = useClock()

  function parseCurrentTimeValues(value: number) {
    return ('0' + String(value)).slice(-2)
  }

  const hour = parseCurrentTimeValues(currentTime.getHours())
  const minutes = parseCurrentTimeValues(currentTime.getMinutes())
  const seconds = parseCurrentTimeValues(currentTime.getSeconds())

  return (
    <h1 className={styles.clock}>
      {hour}:{minutes}
    </h1>
  )
}
