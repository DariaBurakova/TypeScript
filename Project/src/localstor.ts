import { Users } from "./userCollection";
export const getUserData=()=>{
  const user: unknown = JSON.parse(window.localStorage.getItem('user'));
    Object.setPrototypeOf(user, Users.prototype);
  const url:unknown=JSON.parse(window.localStorage.getItem('url'))
  Object.setPrototypeOf(user, Users.prototype);
    if (user && url instanceof Users) {
      return `${user},${url}`;
    } else {
      throw new Error('error');
    }
}
export function getFavoritesAmount(){
  return +window.localStorage.getItem('favoritesAmount')
}
