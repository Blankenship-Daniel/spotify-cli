import prompt from 'prompt'
import clear from 'clear'

const songSelectionPrompt = results => {
  return new Promise((resolve, reject) => {
    if (results === null)
      reject(new Error('search did not populate any results'))

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
      if (err !== null)
        reject(new Error('there was an error processing the song selection prompt'))

      resolve(results[result.option])
    })
  })  
}

export default songSelectionPrompt