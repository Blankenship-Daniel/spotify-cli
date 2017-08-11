import spotifyCliDriver from './spotifyCliDriver'
import express from 'express'
import request from 'request-promise'

const app = express()

app.get('/callback/', (req, res) => {
  const code = req.query.code || null

  const authOptions = {
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    qs: {
      code: code,
      redirect_uri: process.env.CALLBACK_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + 
        (new Buffer(process.env.CLIENT_ID + ':' + 
        process.env.CLIENT_SECRET).toString('base64'))
    },
    json: true
  }

  request(authOptions)
    .then(data => {
      const accessToken  = data.access_token
      const refreshToken = data.refresh_token
      
      try {
        spotifyCliDriver(accessToken)
      }
      catch(e) {
        console.log('access token expired')
        console.log(e)
      }
    })
    .catch(err => console.error(err))
})

export default app