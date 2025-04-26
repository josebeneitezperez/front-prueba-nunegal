/**
 * Devuelve el texto pasado por parámetro si este tiene valor, seguido del texto "append" si se indicó.
 * Si no tiene valor, se devolverá el texto por defecto.
 * @param {String} textToDraw Texto a mostrar si tiene valor.
 * @param {String} defaultText Texto a mostrar si el parámetro anterior no tiene valor.
 * @param {String} append Texto a añadir al final del texto, si corresponde.
 * @returns El texto inicial si tenía valor, o en su lugar el texto por defecto.
 */
export function drawValueOrDefault(textToDraw, defaultText, append = "") {
  return textToDraw ? `${textToDraw}${append}` : defaultText;
}
