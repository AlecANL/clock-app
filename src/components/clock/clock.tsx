import styles from './clock.module.scss'
import { useClock } from '../../hooks/useClock'

interface IClockProps {
  currentTimeHourDescription: string
}

export function Clock(props: IClockProps) {
  const { currentTimeHourDescription } = props

  const currentTime = useClock()

  function parseCurrentTimeValues(value: number) {
    return ('0' + String(value)).slice(-2)
  }

  const hour = parseCurrentTimeValues(currentTime.getHours())
  const minutes = parseCurrentTimeValues(currentTime.getMinutes())
  const seconds = parseCurrentTimeValues(currentTime.getSeconds())

  return (
    <h1 className={styles.clock}>
      <span>
        {hour}:{minutes}
      </span>
      <span className={styles.description}>{currentTimeHourDescription}</span>
    </h1>
  )
}
