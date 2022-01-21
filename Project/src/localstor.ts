
export const getUserData=(item)=>{
  localStorage.setItem('user',JSON.stringify(item.name))
  localStorage.setItem('url',JSON.stringify(item.url))
  const person=localStorage.getItem('user')
  const address=localStorage.getItem('url')
  const user=JSON.parse(person)
  const url=JSON.parse(address)
}
export const getFavoritesAmount=(item)=>{
  localStorage.setItem('favorite',JSON.stringify(item.favoriteItemsAmount))
  const number=localStorage.getItem('favorite')
  const favoriteItemsAmount=JSON.parse(number)
}
