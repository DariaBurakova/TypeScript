import { renderBlock } from './lib.js';
import { newDate, lastDay, formatDate } from './date.js';
import { search } from './interface.js';
export function renderSearchFormBlock(startDate, endDate) {
    let now = formatDate(new Date());
    startDate = startDate || newDate(new Date(), 1);
    let startDateNew = formatDate(startDate);
    let endDateNew = formatDate(endDate || newDate(startDate, 2));
    let lastDayofMonth = formatDate(lastDay(new Date()));
    const info = {
        start: startDateNew,
        end: endDateNew,
        price: 0
    };
    const form = document.querySelector('.form');
    function handleForm(event, info) {
        event.preventDefault();
        if (event.target) {
            search(info);
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
    form.addEventListener('submit', (event) => handleForm(event, info)); //пишет что addEventListener null,не понимаю почему так
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxXQUFXLENBQUE7QUFDcEQsT0FBTyxFQUFrQixNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt4RCxNQUFNLFVBQVUscUJBQXFCLENBQUMsU0FBZSxFQUFFLE9BQWE7SUFDbEUsSUFBSSxHQUFHLEdBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUM5QixTQUFTLEdBQUcsU0FBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQy9DLElBQUksWUFBWSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN0QyxJQUFJLFVBQVUsR0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFJLGNBQWMsR0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRWxELE1BQU0sSUFBSSxHQUFDO1FBQ1QsS0FBSyxFQUFDLFlBQVk7UUFDbEIsR0FBRyxFQUFDLFVBQVU7UUFDZCxLQUFLLEVBQUMsQ0FBQztLQUNSLENBQUE7SUFDRCxNQUFNLElBQUksR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNDLFNBQVMsVUFBVSxDQUFDLEtBQVcsRUFBQyxJQUFtQjtRQUNsRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7UUFFeEIsSUFBRyxLQUFLLENBQUMsTUFBTSxFQUFDO1lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ2I7SUFDQyxDQUFDO0lBRUQsV0FBVyxDQUNULG1CQUFtQixFQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7MERBaUJzRCxZQUFZLFFBQVEsR0FBRyxRQUFRLGNBQWM7Ozs7MkRBSTVDLFVBQVUsUUFBUSxZQUFZLFFBQVEsY0FBYzs7Ozs7Ozs7Ozs7O0tBWTFHLENBQ0YsQ0FBQTtJQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFBLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFBLHVEQUF1RDtBQUN4SCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcbmltcG9ydCB7bmV3RGF0ZSxsYXN0RGF5LGZvcm1hdERhdGV9IGZyb20gJy4vZGF0ZS5qcydcbmltcG9ydCB7IFNlYXJjaEZvcm1EYXRhLCBzZWFyY2ggfSBmcm9tICcuL2ludGVyZmFjZS5qcyc7XG5cbmV4cG9ydCB0eXBlIG5hbWVzVHlwZSA9ICdjaGVja2luJyB8ICdjaGVja291dCcgfCAncHJpY2UnXG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaEZvcm1CbG9jayhzdGFydERhdGU/OkRhdGUsIGVuZERhdGU/OkRhdGUpOnZvaWR7XG4gIGxldCBub3c9Zm9ybWF0RGF0ZShuZXcgRGF0ZSgpKVxuICBzdGFydERhdGUgPSBzdGFydERhdGUgfHwgbmV3RGF0ZShuZXcgRGF0ZSgpLCAxKVxuICBsZXQgc3RhcnREYXRlTmV3PWZvcm1hdERhdGUoc3RhcnREYXRlKVxuICBsZXQgZW5kRGF0ZU5ldz1mb3JtYXREYXRlKGVuZERhdGUgfHwgbmV3RGF0ZShzdGFydERhdGUsIDIpKTtcbiAgbGV0IGxhc3REYXlvZk1vbnRoPWZvcm1hdERhdGUobGFzdERheShuZXcgRGF0ZSgpKSlcbiAgXG4gIGNvbnN0IGluZm89e1xuICAgIHN0YXJ0OnN0YXJ0RGF0ZU5ldyxcbiAgICBlbmQ6ZW5kRGF0ZU5ldyxcbiAgICBwcmljZTowXG4gIH1cbiAgY29uc3QgZm9ybT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybScpXG4gZnVuY3Rpb24gaGFuZGxlRm9ybShldmVudDpFdmVudCxpbmZvOlNlYXJjaEZvcm1EYXRhKXtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5pZihldmVudC50YXJnZXQpe1xuICBzZWFyY2goaW5mbylcbn1cbiAgfSBcblxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybSBjbGFzcz0nZm9ybSc+XG4gICAgICA8ZmllbGRzZXQgY2xhc3M9XCJzZWFyY2gtZmlsZWRzZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2l0eVwiPtCT0L7RgNC+0LQ8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2l0eVwiIHR5cGU9XCJ0ZXh0XCIgZGlzYWJsZWQgdmFsdWU9XCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs1wiIC8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGRpc2FibGVkIHZhbHVlPVwiNTkuOTM4NiwzMC4zMTQxXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInByb3ZpZGVyc1wiPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImhvbXlcIiBjaGVja2VkIC8+IEhvbXk8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImZsYXQtcmVudFwiIGNoZWNrZWQgLz4gRmxhdFJlbnQ8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2Pi0tIT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLWluLWRhdGVcIj7QlNCw0YLQsCDQt9Cw0LXQt9C00LA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2staW4tZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9JHtzdGFydERhdGVOZXd9IG1pbj0ke25vd30gbWF4PSR7bGFzdERheW9mTW9udGh9IG5hbWU9XCJjaGVja2luXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLW91dC1kYXRlXCI+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLW91dC1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT0ke2VuZERhdGVOZXd9IG1pbj0ke3N0YXJ0RGF0ZU5ld30gbWF4PSR7bGFzdERheW9mTW9udGh9IG5hbWU9XCJjaGVja291dFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtYXgtcHJpY2VcIj7QnNCw0LrRgS4g0YbQtdC90LAg0YHRg9GC0L7QujwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtYXgtcHJpY2VcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgbmFtZT1cInByaWNlXCIgY2xhc3M9XCJtYXgtcHJpY2VcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PjxidXR0b24gY2xhc3M9XCJidXR0b25cIj7QndCw0LnRgtC4PC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9maWVsZHNldD5cbiAgICA8L2Zvcm0+XG4gICAgYFxuICApXG4gXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywoZXZlbnQpPT5oYW5kbGVGb3JtKGV2ZW50LGluZm8pKS8v0L/QuNGI0LXRgiDRh9GC0L4gYWRkRXZlbnRMaXN0ZW5lciBudWxsLNC90LUg0L/QvtC90LjQvNCw0Y4g0L/QvtGH0LXQvNGDINGC0LDQulxufVxuIl19