import opn from 'opn'
import api from './api'
import express from 'express'
import request from 'request-promise'
import queryString from 'query-string'
import { config } from './config/spotify_client_creds'

const app = express()

const id = config.id
const secret = config.secret
const server = config.server
const redirectUri = `${server}/callback/`

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email'
  opn('https://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: id,
      scope: scope,
      redirect_uri: redirectUri
    }))
})

app.get('/callback', (req, res) => {
  const code = req.query.code || null

  const authOptions = {
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    qs: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(id + ':' + secret).toString('base64'))
    },
    json: true
  }

  request(authOptions)
    .then(data => {
      const accessToken = data.access_token
      const refreshToken = data.refresh_token
      api(accessToken)
    })
    .catch(err => console.error(err))
})

export default app