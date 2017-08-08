import request from 'request-promise'
import { exec } from 'child-process-promise'

exec('./spotify_platform_oauth.sh')
  .then(result => {
    let oauthToken = result.stdout
  })
  .catch(err => console.error('ERROR: ' + err))
