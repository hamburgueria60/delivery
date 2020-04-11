import React from 'react'
import PropTypes from 'prop-types'

export default function ShortId({ id }) {
  const shortId = id.substr(id.length - 6)
  return <span>#{shortId}</span>
}

ShortId.propTypes = {
  id: PropTypes.string.isRequired,
}
