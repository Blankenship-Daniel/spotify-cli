import searchPrompt from './searchPrompt'
import songSelectionPrompt from './songSelectionPrompt'
import mainMenuPrompt from './mainMenuPrompt'
import request from 'request-promise'
import opn from 'opn'

/**
 * Uses the opn library to open the user's default browser
 * at the specified URL.
 * @param {object} track 
 */
const openTrack = track => opn(track.external_urls.spotify)

/**
 * Returns an array of search result items.
 * @param {object} searchResults 
 */
const mapSearchResults = searchResults => {
  return new Promise((resolve, reject) => {
    const tracks = searchResults.tracks.items

    if (tracks === null)
      reject(new Error('search did not populate any results'))

    resolve(tracks)
  })
}

/**
 * Sends the sanitized search string to the Spotify API.
 * @param {string} searchQuery 
 * @param {string} accessToken 
 */
const makeSearchRequest = accessToken => searchQuery => {
  return new Promise((resolve, reject) => {
    const searchOptions = {
      uri: 'https://api.spotify.com/v1/search',
      qs: {
        type: 'track,artist,album,playlist',
        q: searchQuery
      },
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    }
    request(searchOptions)
      .then(resolve).catch(reject)
  })
}

const spotifyCliDriver = accessToken => {
    mainMenuPrompt()
      .then(option => {
        if (option === '0')
          process.exit() // exit the program

        searchPrompt()
          .then(makeSearchRequest(accessToken))
          .then(mapSearchResults)
          .then(songSelectionPrompt)
          .then(track => {
            openTrack(track)
            spotifyCliDriver(accessToken) // go back to main menu
          })
          .catch(console.error)
      })
      .catch(console.error)
}

export default spotifyCliDriver