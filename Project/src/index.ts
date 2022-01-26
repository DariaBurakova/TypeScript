import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getTodosByCount, List } from './todolist.js';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Marshmallow','/img/ava.png',1)
  renderSearchFormBlock()
  renderSearchStubBlock()
  
  
  

  /*renderToast(
      {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
      {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )*/
})
getTodosByCount(3)