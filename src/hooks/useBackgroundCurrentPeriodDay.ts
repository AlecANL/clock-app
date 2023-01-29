export function useBackGroundCurrentPeriodDay() {
  enum ETiming {
    DAY = 'day',
    NIGHT = 'night',
    INIT_NIGHT = 16,
    INIT_DAY = 5,
  }

  const currentHour = new Date().getHours()
  const currentPeriodOfDay =
    currentHour >= (ETiming.INIT_NIGHT as number) || currentHour <= (ETiming.INIT_DAY as number) ? ETiming.NIGHT : ETiming.DAY

  return currentPeriodOfDay
}
