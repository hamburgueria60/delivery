export default interface Payment {
  type: 'card' | 'money'
  service: 'postpaid' | 'prepaid'
  value: number
}
