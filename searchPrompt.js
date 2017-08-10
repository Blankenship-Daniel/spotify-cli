import prompt from 'prompt'
import clear from 'clear'

const searchPrompt = (resolve) => {
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
    resolve(result.searchQuery)
  })
}

export default searchPrompt