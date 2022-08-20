const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code'
  })

const googleProviderConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authorization: GOOGLE_AUTHORIZATION_URL
}

const emailProviderConfig = {
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_NO_REPLY_FROM,
}

export { googleProviderConfig, emailProviderConfig }