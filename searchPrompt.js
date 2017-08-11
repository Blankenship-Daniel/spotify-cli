import prompt from 'prompt'
import clear from 'clear'

const searchPrompt = () => {
  return new Promise((resolve, reject) => {
    const schema = {
      properties: {
        searchQuery: {
          message: 'Search query must not be empty.',
          required: true
        }
      }
    }

    clear() // the terminal window
    prompt.start()

    console.log('Please enter the search term.')
    prompt.get(schema, (err, result) => {
      if (err !== null)
        reject(new Error('there was an error processing the search prompt'))

      resolve(result.searchQuery)
    })
  })
}

export default searchPrompt