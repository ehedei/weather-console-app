const fs = require('fs')
const file = './data/data.json'

const saveData = data => {
  const text = JSON.stringify(data)
  fs.writeFileSync(file, text)
}

const loadData = () => {
  if(fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, {encoding: 'utf8'}))
  } else {
    return []
  }
}

module.exports = {
  saveData,
  loadData
}