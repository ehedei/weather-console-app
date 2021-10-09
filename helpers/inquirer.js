const inquirer = require('inquirer')
require('colors')

const options = [
  {
    type: 'list',
    name: 'option',
    message: 'Please, select an option:',
    choices: [
      { value: '1', name: `${'1.'.green} Search` },
      { value: '2', name: `${'2.'.green} History` },
      { value: '0', name: `${'0.'.green} Exit` },
    ]
  }
]

const pauseOptions = [
  {
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.green} to continue`,
  }
]

const showMenu = async () => {
  console.clear()
  console.log('='.repeat(21).green)
  console.log('===== Main Menu ====='.white)
  console.log('='.repeat(21).green + '\n')

  const { option } = await inquirer.prompt(options)

  return option
}

const pause = async () => {
  console.log('\n')
  const { pause } = await inquirer.prompt(pauseOptions)

  return pause
}

const input = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'answer',
      message,
      validate(value) {
        if (value.length === 0) { return 'Please, insert a value' }
        return true
      }
    }
  ]

  const { answer } = await inquirer.prompt(question)
  return answer
}

const selectCity = async (cities = [], message) => {
  const choices = cities.map((city, index) => ({ value: city.id, name: `${(index + 1).toString().green}. ${city.name}` }))

  const options = [
    {
      type: 'list',
      name: 'selection',
      message,
      choices
    }
  ]

  const { selection } = await inquirer.prompt(options)

  return selection
}


module.exports = { showMenu, pause, input, selectCity }
