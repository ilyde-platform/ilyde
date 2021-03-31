import Keycloak from 'keycloak-js'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: 'http://kubernetes.docker.internal:30080/auth',
    realm: 'IlydeRealm',
    clientId: 'ilyde-webui',
    onLoad: 'login-required'
  })
 
export default keycloak