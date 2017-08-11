import opn from 'opn'
import queryString from 'query-string'
import server from './server'

opn('https://accounts.spotify.com/authorize?' +
  queryString.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: 'user-read-private user-read-email',
    redirect_uri: process.env.CALLBACK_URI
  }))