import { Configuration } from './ilyde/configuration';
import keycloak from '../keycloak';
import { ilydeApiBasePath } from '../environments';


export function getIlydeApiConfiguration(){
  return new Configuration({basePath: ilydeApiBasePath, baseOptions: {
    headers: {Authorization: `Bearer ${keycloak?.token}`},
  }});
}

export function capitalize(str){
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}
