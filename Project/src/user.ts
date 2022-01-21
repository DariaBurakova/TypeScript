import { renderBlock } from './lib.js'
import {Users} from './userCollection.js'
import {users} from './userCollection.js'
import {getFavoritesAmount, getUserData} from "./localstor.js";

export function renderUserBlock (name:string,url:string,favoriteItemsAmount?:number) {
 const us=users.find((user:Users)=>{
   return( user.name===name && user.url===url && user.favoriteItemsAmount===favoriteItemsAmount)
 })
  getUserData(us)
  getFavoritesAmount(us)
 const favoritesCaption = us.favoriteItemsAmount<1 || us.favoriteItemsAmount==null ? 'ничего нет':us.favoriteItemsAmount
  const hasFavoriteItems = us.favoriteItemsAmount ? true : false
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${us.url} alt="Wade Warren" />
      <div class="info">
          <p class="name">${us.name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
