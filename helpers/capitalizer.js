const capitalize = (text = '') => {
  return text[0].toUpperCase() + text.slice(1)
}

module.exports = { capitalize }