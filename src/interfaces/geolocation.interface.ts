export interface IGeolocation {
  data: Data
}

export interface Data {
  ip: string
  hostname: string
  type: string
  range_type: RangeType
  connection: Connection
  location: Location
  tlds: string[]
  timezone: Timezone
  security: Security
  domains: Domains
}

export interface Connection {
  asn: number
  organization: string
  isp: string
  range: string
}

export interface Domains {
  count: null
  domains: any[]
}

export interface Location {
  geonames_id: number
  latitude: number
  longitude: number
  zip: string
  continent: Continent
  country: Country
  city: City
  region: City
}

export interface City {
  fips: null | string
  alpha2: null | string
  geonames_id: number
  hasc_id: null | string
  wikidata_id: string
  name: string
  name_translated: string
}

export interface Continent {
  code: string
  name: string
  name_translated: string
}

export interface Country {
  alpha2: string
  alpha3: string
  calling_codes: string[]
  currencies: Currency[]
  emoji: string
  ioc: string
  languages: Language[]
  name: string
  name_translated: string
  timezones: string[]
  is_in_european_union: boolean
  fips: string
  geonames_id: number
  hasc_id: string
  wikidata_id: string
}

export interface Currency {
  symbol: string
  name: string
  symbol_native: string
  decimal_digits: number
  rounding: number
  code: string
  name_plural: string
}

export interface Language {
  name: string
  name_native: string
}

export interface RangeType {
  type: string
  description: string
}

export interface Security {
  is_anonymous: null
  is_bot: null
  is_known_attacker: null
  is_proxy: null
  is_spam: null
  is_tor: null
  proxy_type: null
  threat_score: null
}

export interface Timezone {
  id: string
  current_time: string
  code: string
  is_daylight_saving: boolean
  gmt_offset: number
}
