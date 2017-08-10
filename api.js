import typePrompt from './typePrompt'
import searchPrompt from './searchPrompt'
import request from 'request-promise'

const api = accessToken => {
  typePrompt(option => {
    searchPrompt(searchQuery => {
      const query = encodeURI(searchQuery)

      const searchOptions = {
        uri: 'https://api.spotify.com/v1/search',
        qs: {
          type: option,
          q: query
        },
        headers: { 'Authorization': 'Bearer ' + accessToken },
        json: true
      }

      request(searchOptions)
        .then(data => console.log(data))
        .catch(err => console.error(err))
    })
  })


}

export default api