const authService = require('./authService')

exports.loginWithGoogle = async (req, res) => {
  try {
    const { access_token } = req.body
    const { jwtToken } = await authService.handleGoogleLogin(access_token)
    console.log('jwtToken', jwtToken)
    res.json({ token: jwtToken })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
