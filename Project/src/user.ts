import { renderBlock } from './lib.js'

export function renderUserBlock (name:string,url:string,favoriteItemsAmount:number){
 const favoritesCaption = favoriteItemsAmount<1? 'ничего нет':favoriteItemsAmount
  const hasFavoriteItems = favoriteItemsAmount ? true : false
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${url} alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
