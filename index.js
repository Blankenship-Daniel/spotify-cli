import app from './auth'
import request from 'request-promise'
import { config } from './config/spotify_client_creds'

const server = config.server

// Start the server listening on port 8888
const s = app.listen(8888)

request(`${server}/login`)
  .then(data => console.log(data))
  .then(err => console.error(err))