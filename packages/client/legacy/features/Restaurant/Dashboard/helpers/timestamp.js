import { pipe, head, prop } from 'ramda'

const getLastReadTimestamp = pipe(head, prop('createdAt'))

export default getLastReadTimestamp
