import { renderBlock } from './lib.js'
import {Dates} from './date.js'

export function renderSearchFormBlock(startDate:{year:number,month:number,day:number}, endDate:{year:number,month:number,day:number}){
  let now:Date=new Date()//получаем нынешнюю дату
  let day=now.getDate()//берем день
  let month=now.getMonth()+1//месяц ,увеличиваем на 1,так как январь 0
  let year=now.getFullYear()//берем год
  let lastDayOfMonth = new Date(now.getFullYear(), month+1, 0);//находим последний день следующего месяца
  let lastMonth=lastDayOfMonth.getMonth()+1//следующий месяц
  let lastDay=lastDayOfMonth.getDate()//последний день
  let dateMin:Dates={year:year,month:month,day:day}
  let dateMax:Dates={year:year,month:lastMonth,day:lastDay}
  let dateMinString:string=`${year}-${month}-${day}`// чтобы сравнить даты меняем тип на строки
  let dateMaxString:string=`${year}-${lastMonth}-${lastDay}`
  let startDateString:string=`${startDate.year}-${startDate.month}-${startDate.day}`
  let endDateString:string=`${endDate.year}-${endDate.month}-${endDate.day}`
  let arrivalDate:Dates
 let  departureDate:Dates
  let arrivalDateString:string
  let departureDateString:string
  if(startDateString>=dateMinString && endDateString<=dateMaxString){
    arrivalDate={year:year,month:month,day:day+1}//к текущей дате добавляем 1 день
    arrivalDateString=`${arrivalDate.year}-${arrivalDate.month}-${arrivalDate.day}`//приводим ее к строке
    departureDate={year:arrivalDate.year,month:arrivalDate.month,day:arrivalDate.day+2}//выезд +2 дня от даты вьезда
    departureDateString=`${departureDate.year}-${departureDate.month}-${departureDate.day}`
  }
  renderBlock(
    'search-form-block',
    `
    <form>
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
            <input id="check-in-date" type="date" value=${arrivalDateString} min=${dateMinString} max=${dateMaxString} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${departureDateString} min=${dateMinString} max=${dateMaxString} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
