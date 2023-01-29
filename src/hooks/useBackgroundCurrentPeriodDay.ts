import sunIcon from '../assets/desktop/icon-sun.svg'
import moonIcon from '../assets/desktop/icon-moon.svg'

export function useBackGroundCurrentPeriodDay() {
  const dayQuote = "good morning, it's currently"
  const nightQuote = "good evening it's currently"

  enum ETiming {
    DAY = 'day',
    NIGHT = 'night',
    INIT_NIGHT = 18,
    INIT_DAY = 5,
  }

  const currentHour = new Date().getHours()
  const currentPeriodOfDay =
    currentHour >= (ETiming.INIT_NIGHT as number) || currentHour <= (ETiming.INIT_DAY as number) ? ETiming.NIGHT : ETiming.DAY
  const periodQuote = currentPeriodOfDay === ETiming.DAY ? dayQuote : nightQuote
  const periodIcon = currentPeriodOfDay === ETiming.DAY ? sunIcon : moonIcon

  return {
    period: currentPeriodOfDay,
    icon: periodIcon,
    quote: periodQuote,
  }
}
