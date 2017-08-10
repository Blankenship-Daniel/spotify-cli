import app from './auth'
import request from 'request-promise'
import { config } from './config/spotify_client_creds'

const server = config.server

// Start the server listening on port 8888
app.listen(8888)

/**
 * This starts the process of logging in to the Spotify 
 * API to receive an access token. The access token
 * then gives us access to the Spotify API to start
 * querying data.
 */
request(`${server}/login`)
  .then(data => console.log(data))
  .then(err => console.error(err))