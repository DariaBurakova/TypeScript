import { renderBlock } from './lib.js';
export function renderSearchFormBlock(startDate, endDate) {
    let now = new Date(); //получаем нынешнюю дату
    let day = now.getDate(); //берем день
    let month = now.getMonth() + 1; //месяц ,увеличиваем на 1,так как январь 0
    let year = now.getFullYear(); //берем год
    let lastDayOfMonth = new Date(now.getFullYear(), month + 1, 0); //находим последний день следующего месяца
    let lastMonth = lastDayOfMonth.getMonth() + 1; //следующий месяц
    let lastDay = lastDayOfMonth.getDate(); //последний день
    let dateMin = { year: year, month: month, day: day };
    let dateMax = { year: year, month: lastMonth, day: lastDay };
    let dateMinString = `${year}-${month}-${day}`; // чтобы сравнить даты меняем тип на строки
    let dateMaxString = `${year}-${lastMonth}-${lastDay}`;
    let startDateString = `${startDate.year}-${startDate.month}-${startDate.day}`;
    let endDateString = `${endDate.year}-${endDate.month}-${endDate.day}`;
    let arrivalDate;
    let departureDate;
    let arrivalDateString;
    let departureDateString;
    if (startDateString >= dateMinString && endDateString <= dateMaxString) {
        arrivalDate = { year: year, month: month, day: day + 1 }; //к текущей дате добавляем 1 день
        arrivalDateString = `${arrivalDate.year}-${arrivalDate.month}-${arrivalDate.day}`; //приводим ее к строке
        departureDate = { year: arrivalDate.year, month: arrivalDate.month, day: arrivalDate.day + 2 }; //выезд +2 дня от даты вьезда
        departureDateString = `${departureDate.year}-${departureDate.month}-${departureDate.day}`;
    }
    renderBlock('search-form-block', `
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
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUd0QyxNQUFNLFVBQVUscUJBQXFCLENBQUMsU0FBK0MsRUFBRSxPQUE2QztJQUNsSSxJQUFJLEdBQUcsR0FBTSxJQUFJLElBQUksRUFBRSxDQUFBLENBQUEsd0JBQXdCO0lBQy9DLElBQUksR0FBRyxHQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQSxDQUFBLFlBQVk7SUFDakMsSUFBSSxLQUFLLEdBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFDLENBQUMsQ0FBQSxDQUFBLDBDQUEwQztJQUNwRSxJQUFJLElBQUksR0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUEsQ0FBQSxXQUFXO0lBQ3JDLElBQUksY0FBYyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsMENBQTBDO0lBQ3ZHLElBQUksU0FBUyxHQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBQyxDQUFDLENBQUEsQ0FBQSxpQkFBaUI7SUFDMUQsSUFBSSxPQUFPLEdBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFBLENBQUEsZ0JBQWdCO0lBQ3BELElBQUksT0FBTyxHQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsQ0FBQTtJQUNqRCxJQUFJLE9BQU8sR0FBTyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUE7SUFDekQsSUFBSSxhQUFhLEdBQVEsR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFBLENBQUEsMkNBQTJDO0lBQzdGLElBQUksYUFBYSxHQUFRLEdBQUcsSUFBSSxJQUFJLFNBQVMsSUFBSSxPQUFPLEVBQUUsQ0FBQTtJQUMxRCxJQUFJLGVBQWUsR0FBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDbEYsSUFBSSxhQUFhLEdBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQzFFLElBQUksV0FBaUIsQ0FBQTtJQUN0QixJQUFLLGFBQW1CLENBQUE7SUFDdkIsSUFBSSxpQkFBd0IsQ0FBQTtJQUM1QixJQUFJLG1CQUEwQixDQUFBO0lBQzlCLElBQUcsZUFBZSxJQUFFLGFBQWEsSUFBSSxhQUFhLElBQUUsYUFBYSxFQUFDO1FBQ2hFLFdBQVcsR0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsR0FBRyxHQUFDLENBQUMsRUFBQyxDQUFBLENBQUEsaUNBQWlDO1FBQzlFLGlCQUFpQixHQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQSxDQUFBLHNCQUFzQjtRQUNyRyxhQUFhLEdBQUMsRUFBQyxJQUFJLEVBQUMsV0FBVyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLEdBQUcsR0FBQyxDQUFDLEVBQUMsQ0FBQSxDQUFBLDZCQUE2QjtRQUNoSCxtQkFBbUIsR0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUE7S0FDeEY7SUFDRCxXQUFXLENBQ1QsbUJBQW1CLEVBQ25COzs7Ozs7Ozs7Ozs7Ozs7OzswREFpQnNELGlCQUFpQixRQUFRLGFBQWEsUUFBUSxhQUFhOzs7OzJEQUkxRCxtQkFBbUIsUUFBUSxhQUFhLFFBQVEsYUFBYTs7Ozs7Ozs7Ozs7O0tBWW5ILENBQ0YsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJCbG9jayB9IGZyb20gJy4vbGliLmpzJ1xuaW1wb3J0IHtEYXRlc30gZnJvbSAnLi9kYXRlLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoRm9ybUJsb2NrKHN0YXJ0RGF0ZTp7eWVhcjpudW1iZXIsbW9udGg6bnVtYmVyLGRheTpudW1iZXJ9LCBlbmREYXRlOnt5ZWFyOm51bWJlcixtb250aDpudW1iZXIsZGF5Om51bWJlcn0pe1xuICBsZXQgbm93OkRhdGU9bmV3IERhdGUoKS8v0L/QvtC70YPRh9Cw0LXQvCDQvdGL0L3QtdGI0L3RjtGOINC00LDRgtGDXG4gIGxldCBkYXk9bm93LmdldERhdGUoKS8v0LHQtdGA0LXQvCDQtNC10L3RjFxuICBsZXQgbW9udGg9bm93LmdldE1vbnRoKCkrMS8v0LzQtdGB0Y/RhiAs0YPQstC10LvQuNGH0LjQstCw0LXQvCDQvdCwIDEs0YLQsNC6INC60LDQuiDRj9C90LLQsNGA0YwgMFxuICBsZXQgeWVhcj1ub3cuZ2V0RnVsbFllYXIoKS8v0LHQtdGA0LXQvCDQs9C+0LRcbiAgbGV0IGxhc3REYXlPZk1vbnRoID0gbmV3IERhdGUobm93LmdldEZ1bGxZZWFyKCksIG1vbnRoKzEsIDApOy8v0L3QsNGF0L7QtNC40Lwg0L/QvtGB0LvQtdC00L3QuNC5INC00LXQvdGMINGB0LvQtdC00YPRjtGJ0LXQs9C+INC80LXRgdGP0YbQsFxuICBsZXQgbGFzdE1vbnRoPWxhc3REYXlPZk1vbnRoLmdldE1vbnRoKCkrMS8v0YHQu9C10LTRg9GO0YnQuNC5INC80LXRgdGP0YZcbiAgbGV0IGxhc3REYXk9bGFzdERheU9mTW9udGguZ2V0RGF0ZSgpLy/Qv9C+0YHQu9C10LTQvdC40Lkg0LTQtdC90YxcbiAgbGV0IGRhdGVNaW46RGF0ZXM9e3llYXI6eWVhcixtb250aDptb250aCxkYXk6ZGF5fVxuICBsZXQgZGF0ZU1heDpEYXRlcz17eWVhcjp5ZWFyLG1vbnRoOmxhc3RNb250aCxkYXk6bGFzdERheX1cbiAgbGV0IGRhdGVNaW5TdHJpbmc6c3RyaW5nPWAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWAvLyDRh9GC0L7QsdGLINGB0YDQsNCy0L3QuNGC0Ywg0LTQsNGC0Ysg0LzQtdC90Y/QtdC8INGC0LjQvyDQvdCwINGB0YLRgNC+0LrQuFxuICBsZXQgZGF0ZU1heFN0cmluZzpzdHJpbmc9YCR7eWVhcn0tJHtsYXN0TW9udGh9LSR7bGFzdERheX1gXG4gIGxldCBzdGFydERhdGVTdHJpbmc6c3RyaW5nPWAke3N0YXJ0RGF0ZS55ZWFyfS0ke3N0YXJ0RGF0ZS5tb250aH0tJHtzdGFydERhdGUuZGF5fWBcbiAgbGV0IGVuZERhdGVTdHJpbmc6c3RyaW5nPWAke2VuZERhdGUueWVhcn0tJHtlbmREYXRlLm1vbnRofS0ke2VuZERhdGUuZGF5fWBcbiAgbGV0IGFycml2YWxEYXRlOkRhdGVzXG4gbGV0ICBkZXBhcnR1cmVEYXRlOkRhdGVzXG4gIGxldCBhcnJpdmFsRGF0ZVN0cmluZzpzdHJpbmdcbiAgbGV0IGRlcGFydHVyZURhdGVTdHJpbmc6c3RyaW5nXG4gIGlmKHN0YXJ0RGF0ZVN0cmluZz49ZGF0ZU1pblN0cmluZyAmJiBlbmREYXRlU3RyaW5nPD1kYXRlTWF4U3RyaW5nKXtcbiAgICBhcnJpdmFsRGF0ZT17eWVhcjp5ZWFyLG1vbnRoOm1vbnRoLGRheTpkYXkrMX0vL9C6INGC0LXQutGD0YnQtdC5INC00LDRgtC1INC00L7QsdCw0LLQu9GP0LXQvCAxINC00LXQvdGMXG4gICAgYXJyaXZhbERhdGVTdHJpbmc9YCR7YXJyaXZhbERhdGUueWVhcn0tJHthcnJpdmFsRGF0ZS5tb250aH0tJHthcnJpdmFsRGF0ZS5kYXl9YC8v0L/RgNC40LLQvtC00LjQvCDQtdC1INC6INGB0YLRgNC+0LrQtVxuICAgIGRlcGFydHVyZURhdGU9e3llYXI6YXJyaXZhbERhdGUueWVhcixtb250aDphcnJpdmFsRGF0ZS5tb250aCxkYXk6YXJyaXZhbERhdGUuZGF5KzJ9Ly/QstGL0LXQt9C0ICsyINC00L3RjyDQvtGCINC00LDRgtGLINCy0YzQtdC30LTQsFxuICAgIGRlcGFydHVyZURhdGVTdHJpbmc9YCR7ZGVwYXJ0dXJlRGF0ZS55ZWFyfS0ke2RlcGFydHVyZURhdGUubW9udGh9LSR7ZGVwYXJ0dXJlRGF0ZS5kYXl9YFxuICB9XG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtZm9ybS1ibG9jaycsXG4gICAgYFxuICAgIDxmb3JtPlxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwic2VhcmNoLWZpbGVkc2V0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNpdHlcIj7Qk9C+0YDQvtC0PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNpdHlcIiB0eXBlPVwidGV4dFwiIGRpc2FibGVkIHZhbHVlPVwi0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LNcIiAvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBkaXNhYmxlZCB2YWx1ZT1cIjU5LjkzODYsMzAuMzE0MVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJwcm92aWRlcnNcIj5cbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyXCIgdmFsdWU9XCJob215XCIgY2hlY2tlZCAvPiBIb215PC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyXCIgdmFsdWU9XCJmbGF0LXJlbnRcIiBjaGVja2VkIC8+IEZsYXRSZW50PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj4tLSE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVjay1pbi1kYXRlXCI+0JTQsNGC0LAg0LfQsNC10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLWluLWRhdGVcIiB0eXBlPVwiZGF0ZVwiIHZhbHVlPSR7YXJyaXZhbERhdGVTdHJpbmd9IG1pbj0ke2RhdGVNaW5TdHJpbmd9IG1heD0ke2RhdGVNYXhTdHJpbmd9IG5hbWU9XCJjaGVja2luXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLW91dC1kYXRlXCI+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLW91dC1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT0ke2RlcGFydHVyZURhdGVTdHJpbmd9IG1pbj0ke2RhdGVNaW5TdHJpbmd9IG1heD0ke2RhdGVNYXhTdHJpbmd9IG5hbWU9XCJjaGVja291dFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtYXgtcHJpY2VcIj7QnNCw0LrRgS4g0YbQtdC90LAg0YHRg9GC0L7QujwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtYXgtcHJpY2VcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgbmFtZT1cInByaWNlXCIgY2xhc3M9XCJtYXgtcHJpY2VcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PjxidXR0b24+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGBcbiAgKVxufVxuIl19