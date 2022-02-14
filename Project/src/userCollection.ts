export class Users{
  name:string
  url:string|null
  favoriteItemsAmount?:number|null
  constructor(name:string,url:string,favoriteItemsAmount?:number) {
    this.name=name,
    this.url=url,
      this.favoriteItemsAmount=favoriteItemsAmount
  }
}
export const users=[
  new Users('Frog','/img/frog-ava.png',0),
  new Users('Wade Warren','/img/avatar.png'),
  new Users('Marshmallow','/img/ava.png',1)
]

