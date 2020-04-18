<script>
export default {
  props: {
    tag: { type: String, default: 'span' },
    query: { type: String, default: '' },
    text: { type: String, default: '' },
  },
  render(h) {
    const exp = new RegExp(`^${this.query}`, 'gi')
    const match = exp.exec(this.text)
    const index = match ? match.index + match[0].length : 0

    const parts = match
      ? [h('span', { class: 'bold' }, [this.text.slice(0, index)]), this.text.slice(index)]
      : [this.text]

    return h(this.tag, {}, parts)
  },
}
</script>
