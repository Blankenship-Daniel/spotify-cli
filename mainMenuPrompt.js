import prompt from 'prompt'
import clear from 'clear'

const mainMenuPrompt = () => {
  return new Promise((resolve, reject) => {
    const options = ['quit', 'search']
    const menu = 
      options
        .map((x, i) => `${i}: ${x}`)
        .join('\n')

    const schema = {
      properties: {
        option: {
          pattern: /^[01]$/,
          message: 'Please choose either 0 or 1 as an option.',
          required: true
        }
      }
    }

    clear() // the terminal window
    prompt.start()

    console.log(
`
////////////////////////////////////////////
//                                        //  
//             SPOTIFY CLI                //
//                                        //
////////////////////////////////////////////
`
    )
    console.log(menu)
    console.log()
    
    prompt.get(schema, (err, result) => {
      if (err !== null)
        reject(new Error('there was an error processing the main menu prompt'))

      resolve(result.option)
    })
  })
}

export default mainMenuPrompt