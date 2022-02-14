import { renderBlock } from './lib.js';
import { newDate, lastDay, formatDate } from './date.js';
import { search } from './interface.js';
export function renderSearchFormBlock(startDate, endDate) {
    let now = formatDate(new Date());
    startDate = startDate || newDate(new Date(), 1);
    let startDateNew = formatDate(startDate);
    let endDateNew = formatDate(endDate || newDate(startDate, 2));
    let lastDayofMonth = formatDate(lastDay(new Date()));
    function handleForm(event, infoList) {
        event.preventDefault();
        if (event.target) {
            const formData = new FormData(event.target);
            const formDataEntries = {
                start: '',
                end: ''
            };
            infoList.forEach(key => {
                formDataEntries[key] = formData.get(key);
            });
            search(formDataEntries);
        }
    }
    renderBlock('search-form-block', `
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
    `);
    const form = document.querySelector('.form');
    if (form) {
        const info = ['start', 'end', 'price'];
        form.addEventListener('submit', (event) => handleForm(event, info));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUE7QUFDcEQsT0FBTyxFQUFrQixNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt4RCxNQUFNLFVBQVUscUJBQXFCLENBQUMsU0FBZSxFQUFFLE9BQWE7SUFDbEUsSUFBSSxHQUFHLEdBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUM5QixTQUFTLEdBQUcsU0FBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQy9DLElBQUksWUFBWSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN0QyxJQUFJLFVBQVUsR0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFJLGNBQWMsR0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBR25ELFNBQVMsVUFBVSxDQUFDLEtBQVcsRUFBQyxRQUFtQjtRQUNsRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7UUFFeEIsSUFBRyxLQUFLLENBQUMsTUFBTSxFQUFDO1lBQ2QsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQXlCLENBQUMsQ0FBQTtZQUM5RCxNQUFNLGVBQWUsR0FBa0I7Z0JBQ3JDLEtBQUssRUFBRSxFQUFFO2dCQUNULEdBQUcsRUFBRSxFQUFFO2FBQ1IsQ0FBQztZQUNGLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBLEVBQUU7Z0JBQ3BCLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBVyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2xELENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1NBQ3hCO0lBRUMsQ0FBQztJQUVELFdBQVcsQ0FDVCxtQkFBbUIsRUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7OzBEQWlCc0QsWUFBWSxRQUFRLEdBQUcsUUFBUSxjQUFjOzs7OzJEQUk1QyxVQUFVLFFBQVEsWUFBWSxRQUFRLGNBQWM7Ozs7Ozs7Ozs7OztLQVkxRyxDQUNGLENBQUE7SUFDRCxNQUFNLElBQUksR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNDLElBQUcsSUFBSSxFQUFDO1FBQ04sTUFBTSxJQUFJLEdBQVksQ0FBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFBLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtLQUFFO0FBRW5FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJCbG9jayB9IGZyb20gJy4vbGliLmpzJ1xuaW1wb3J0IHtuZXdEYXRlLGxhc3REYXksZm9ybWF0RGF0ZX0gZnJvbSAnLi9kYXRlLmpzJ1xuaW1wb3J0IHsgU2VhcmNoRm9ybURhdGEsIHNlYXJjaCB9IGZyb20gJy4vaW50ZXJmYWNlLmpzJztcblxuZXhwb3J0IHR5cGUgaW5mb1R5cGUgPSAnc3RhcnQnIHwgJ2VuZCcgfCAncHJpY2UnXG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaEZvcm1CbG9jayhzdGFydERhdGU/OkRhdGUsIGVuZERhdGU/OkRhdGUpOnZvaWR7XG4gIGxldCBub3c9Zm9ybWF0RGF0ZShuZXcgRGF0ZSgpKVxuICBzdGFydERhdGUgPSBzdGFydERhdGUgfHwgbmV3RGF0ZShuZXcgRGF0ZSgpLCAxKVxuICBsZXQgc3RhcnREYXRlTmV3PWZvcm1hdERhdGUoc3RhcnREYXRlKVxuICBsZXQgZW5kRGF0ZU5ldz1mb3JtYXREYXRlKGVuZERhdGUgfHwgbmV3RGF0ZShzdGFydERhdGUsIDIpKTtcbiAgbGV0IGxhc3REYXlvZk1vbnRoPWZvcm1hdERhdGUobGFzdERheShuZXcgRGF0ZSgpKSlcbiAgXG4gIFxuIGZ1bmN0aW9uIGhhbmRsZUZvcm0oZXZlbnQ6RXZlbnQsaW5mb0xpc3Q6aW5mb1R5cGVbXSl7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuaWYoZXZlbnQudGFyZ2V0KXtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZXZlbnQudGFyZ2V0IGFzIEhUTUxGb3JtRWxlbWVudClcbiAgY29uc3QgZm9ybURhdGFFbnRyaWVzOlNlYXJjaEZvcm1EYXRhID0ge1xuICAgIHN0YXJ0OiAnJyxcbiAgICBlbmQ6ICcnXG4gIH07XG4gIGluZm9MaXN0LmZvckVhY2goa2V5PT57XG4gICAgZm9ybURhdGFFbnRyaWVzW2tleV09PGluZm9UeXBlPmZvcm1EYXRhLmdldChrZXkpXG4gIH0pXG4gIHNlYXJjaChmb3JtRGF0YUVudHJpZXMpXG59XG5cbiAgfSBcblxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybSBjbGFzcz0nZm9ybSc+XG4gICAgICA8ZmllbGRzZXQgY2xhc3M9XCJzZWFyY2gtZmlsZWRzZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2l0eVwiPtCT0L7RgNC+0LQ8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2l0eVwiIHR5cGU9XCJ0ZXh0XCIgZGlzYWJsZWQgdmFsdWU9XCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs1wiIC8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGRpc2FibGVkIHZhbHVlPVwiNTkuOTM4NiwzMC4zMTQxXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInByb3ZpZGVyc1wiPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImhvbXlcIiBjaGVja2VkIC8+IEhvbXk8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImZsYXQtcmVudFwiIGNoZWNrZWQgLz4gRmxhdFJlbnQ8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2Pi0tIT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLWluLWRhdGVcIj7QlNCw0YLQsCDQt9Cw0LXQt9C00LA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2staW4tZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9JHtzdGFydERhdGVOZXd9IG1pbj0ke25vd30gbWF4PSR7bGFzdERheW9mTW9udGh9IG5hbWU9XCJjaGVja2luXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLW91dC1kYXRlXCI+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLW91dC1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT0ke2VuZERhdGVOZXd9IG1pbj0ke3N0YXJ0RGF0ZU5ld30gbWF4PSR7bGFzdERheW9mTW9udGh9IG5hbWU9XCJjaGVja291dFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtYXgtcHJpY2VcIj7QnNCw0LrRgS4g0YbQtdC90LAg0YHRg9GC0L7QujwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtYXgtcHJpY2VcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgbmFtZT1cInByaWNlXCIgY2xhc3M9XCJtYXgtcHJpY2VcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PjxidXR0b24gY2xhc3M9XCJidXR0b25cIj7QndCw0LnRgtC4PC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9maWVsZHNldD5cbiAgICA8L2Zvcm0+XG4gICAgYFxuICApXG4gIGNvbnN0IGZvcm09ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0nKVxuIGlmKGZvcm0pe1xuICAgY29uc3QgaW5mbzppbmZvVHlwZVtdPVsnc3RhcnQnLCdlbmQnLCdwcmljZSddXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywoZXZlbnQpPT5oYW5kbGVGb3JtKGV2ZW50LGluZm8pKSB9XG5cbn1cbiJdfQ==