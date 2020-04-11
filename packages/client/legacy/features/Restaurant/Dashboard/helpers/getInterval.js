import { DateTime } from 'luxon'

export default function getInterval() {
  // TODO: avoid hardcoded, get it from admin
  // TODO working time should be provided by api
  const zone = 'America/Manaus'
  const date = DateTime.fromObject({ hour: 18, zone })

  const startsAt = date.hour >= 18 ? date : date.minus({ days: 1 })
  const endsAt = startsAt.plus({ day: 1 }).minus({ millisecond: 1 })

  return { startsAt: startsAt.toISO(), endsAt: endsAt.toISO() }
}
