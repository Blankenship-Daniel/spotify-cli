import prompt from 'prompt'
import clear from 'clear'

const typePrompt = (resolve) => {
  const options = ['album', 'artist', 'playlist', 'track']
  const optionsPrompt = 
    options
      .map((option, i) => `${i}: ${option}`)
      .join('\n')

  const schema = {
    properties: {
      option: {
        pattern: /^[0-3]$/,
        message: `Selection must only be numbers between 0 and ${options.length - 1}.\n${optionsPrompt}`,
        required: true
      }
    }
  }

  clear() // the terminal window
  prompt.start()

  console.log('Please choose the type of search you want to make.')
  console.log(optionsPrompt)
  prompt.get(schema, (err, result) => {
    resolve(options[result.option])
  })
}

export default typePrompt