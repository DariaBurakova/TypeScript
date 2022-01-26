import { renderBlock } from './lib.js'
import {newDate,lastDay,formatDate} from './date.js'
import { SearchFormData, search } from './interface.js';

export type infoType = 'start' | 'end' | 'price'


export function renderSearchFormBlock(startDate?:Date, endDate?:Date):void{
  let now=formatDate(new Date())
  startDate = startDate || newDate(new Date(), 1)
  let startDateNew=formatDate(startDate)
  let endDateNew=formatDate(endDate || newDate(startDate, 2));
  let lastDayofMonth=formatDate(lastDay(new Date()))
  
  
 function handleForm(event:Event,infoList:infoType[]){
  event.preventDefault()

if(event.target){
  const formData = new FormData(event.target as HTMLFormElement)
  const formDataEntries:SearchFormData = {};
  infoList.forEach(key=>{
    formDataEntries[key]=<infoType>formData.get(key)
  })
  search(formDataEntries)
}

  } 

  renderBlock(
    'search-form-block',
    `
    <form class='form'>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${startDateNew} min=${now} max=${lastDayofMonth} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${endDateNew} min=${startDateNew} max=${lastDayofMonth} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button class="button">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
  const form=document.querySelector('.form')
 if(form){
   const info:infoType[]=['start','end','price']
  form.addEventListener('submit',(event)=>handleForm(event,info)) }

}
