// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '...'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-j8omys-t.auth0.com',            // Auth0 domain
  clientId: 'vmFbwe4wbcJuzf1azXjqPYo4WV5VuQp6',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
