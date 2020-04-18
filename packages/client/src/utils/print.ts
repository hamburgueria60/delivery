import html2canvas from 'html2canvas'

export default async function print(dom: HTMLElement): Promise<void> {
  const order = await html2canvas(dom)
  order.classList.add('printable')
  document.body.appendChild(order)
  window.print()
  order.remove()
}
