// @flow
export default function expose(name, instance) {
  if (process.env.NODE_ENV !== 'production') {
    window[name] = instance
  }
  return instance
}
