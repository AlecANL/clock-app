import { IQuote } from './quote.interface'
import { IWorldTime } from './world-time.interface'
import { IGeolocation } from './geolocation.interface'

export interface IAppState {
  quoteResponse: IQuote | null
  worldTime: IWorldTime
  geolocation: IGeolocation | null
}
