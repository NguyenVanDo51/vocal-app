const axios = require('axios')
const jwt = require('jsonwebtoken')
const db = require('../../database')
const { googleClientId, googleClientSecret, jwtSecret } = require('../../config')

async function getGoogleUserInfo(accessToken) {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`
  )
  return response.data
}

exports.handleGoogleLogin = async (accessToken) => {
  const googleUser = await getGoogleUserInfo(accessToken)
  console.log('googleUser', googleUser)
  let user = await db.query('SELECT * FROM users WHERE email = $1', [googleUser.email])

  if (!user.rows.length) {
    const newUser = await db.query(
      'INSERT INTO users (email, name, avatar) VALUES ($1, $2, $3) RETURNING *',
      [googleUser.email, googleUser.name, googleUser.picture]
    )
    user = newUser
  } else {
    user = user.rows[0]
  }

  const jwtToken = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '31557600000' })
  return { jwtToken }
}
