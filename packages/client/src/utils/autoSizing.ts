import { Data } from 'popper.js'

const autoSizing = {
  enabled: true,
  fn: (data: Data): {} => {
    data.styles.width = `${data.offsets.reference.width}`
    return data
  },
  order: true,
}

export default autoSizing
