import prompt from 'prompt'
import clear from 'clear'

const resultPrompt = (results, resolve) => {  
  const menu = 
    results
      .map((result, i) => 
        `${i}: 
  song:   ${result.name}
  artist: ${result.artists[0].name}
  album:  ${result.album.name}`)
      .join('\n')

  const schema = {
    properties: {
      option: {
        pattern: /^\d+$/,
        message: `You must enter a number between 0 and ${results.length - 1}.`,
        required: true
      }
    }
  }

  clear() // the terminal window
  prompt.start()

  console.log(menu)
  prompt.get(schema, (err, result) => {
    resolve(results[result.option])
  })
}

export default resultPrompt