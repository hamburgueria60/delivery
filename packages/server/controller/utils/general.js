const moment = require('moment')

/* eslint-disable no-param-reassign */
const Utils = {}

/**
 * Usando uma string tida como máscara, substitui
 * a ocorrência do caractere % por uma string no parâmetro da função
 * na posição respectiva à ocorrência do caractere.
 * %param mask Máscara
 * %param String[] Array de strings
 * @returns {*}
 */
Utils.format = (...args) => {
  if (args.length > 1) {
    let string = args[0]
    for (let i = 1; i < args.length; i += 1) {
      const argument = args[i]
      string = string.replace('%', argument)
    }
    return string
  }
  return ''
}

/**
 * Remover offset de fuso horário, remanescendo UTC +0000
 * @param localDate
 * @returns {*}
 */
Utils.utc = localDate => {
  if (!(localDate instanceof Date)) localDate = localDate.toDate()

  const tzOffset = localDate.getTimezoneOffset() / 60
  localDate = moment(localDate).add(-1 * tzOffset, 'hour')
  return localDate
}

/**
 * Algoritmo para replace, similar ao C#
 * Utilizando chaves {} e um índice. Exemplo:
 *      format('{0}-{1}', 'a','b');
 *      Resultado: 'a-b'
 *
 */
Utils.format2 = (...pameters) => {
  const string = pameters[0]
  const args = Array.prototype.slice.call(pameters, 1)

  if (args.length > 0) {
    return string.replace(/{(\d+)}/g, (match, number) => {
      const mNumber = parseInt(number, 10)
      return typeof args[mNumber] !== 'undefined' ? args[mNumber] : match
    })
  }

  return ''
}

module.exports = Utils
