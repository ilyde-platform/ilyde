import Keycloak from 'keycloak-js'
import { keycloakUrl } from './environments';
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: keycloakUrl,
    realm: 'IlydeRealm',
    clientId: 'ilyde-webui',
    onLoad: 'login-required'
  })

export default keycloak
