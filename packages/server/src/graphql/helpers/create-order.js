import uuidv1 from 'uuid/v1'
import { sample, random  } from 'lodash'
import randomize from 'randomatic'
import addMinutes from 'date-fns/addMinutes'
import { STATUS  } from '../constants'

const makeStatus = () => {
  const flows = [
    [STATUS.DRAFT, STATUS.RECEIVED, STATUS.READY, STATUS.DONE],
    [STATUS.RECEIVED, STATUS.READY, STATUS.DONE],
  ]

  const allStatuses = sample(flows)
  const selectedStatus = random(0, allStatuses.length - 1)

  const statuses = allStatuses.slice(0, selectedStatus + 1).map((status, index) => ({
    name: status,
    createdAt: addMinutes(new Date(), allStatuses.length - index).toISOString(),
  }))

  return {
    lastStatus: statuses[statuses.length - 1],
    statuses,
  }
}

module.exports = order => {
  return {
    createdAt: new Date().toISOString(),
    ...order,
    id: uuidv1(),
    shortid: randomize('0', 6),
    ...makeStatus(),
  }
}
