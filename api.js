import searchPrompt from './searchPrompt'
import resultPrompt from './resultPrompt'
import request from 'request-promise'
import opn from 'opn'

const api = accessToken => {
  searchPrompt(searchQuery => {
    const query = encodeURI(searchQuery)

    const searchOptions = {
      uri: 'https://api.spotify.com/v1/search',
      qs: {
        type: 'track,album,artist,playlist',
        q: query
      },
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    }

    request(searchOptions)
      .then(data => {
        const albums    = data.albums.items
        const artists   = data.artists.items
        const tracks    = data.tracks.items
        const playlists = data.playlists.items

        resultPrompt(tracks, (data) => {
          opn(data.external_urls.spotify)
        })
      })
      .catch(err => console.error(err))
  })
}

export default api