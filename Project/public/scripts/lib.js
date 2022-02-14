export function renderBlock(elementId, html) {
    const element = document.getElementById(elementId);
    element.innerHTML = html;
}
export function renderToast(message, action) {
    let messageText = '';
    if (message != null) {
        messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${(action === null || action === void 0 ? void 0 : action.name) || 'Закрыть'}</button>
      </div>
    `;
    }
    renderBlock('toast-block', messageText);
    /*const button = document.getElementById('toast-main-action')
    if (button != null) {
      button.onclick = function (message) {
        if (action != null && action.handler != null) {
          action.handler()
        }
        renderToast(null)
      }
    }*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsV0FBVyxDQUFFLFNBQWdCLEVBQUUsSUFBVztJQUN4RCxNQUFNLE9BQU8sR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtBQUMxQixDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBRSxPQUF1QyxFQUFFLE1BQTZDO0lBQ2pILElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDbkIsV0FBVyxHQUFHOytDQUM2QixPQUFPLENBQUMsSUFBSTthQUM5QyxPQUFPLENBQUMsSUFBSTt5Q0FDZ0IsQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSxLQUFJLFNBQVM7O0tBRTdELENBQUE7S0FDRjtJQUVELFdBQVcsQ0FDVCxhQUFhLEVBQ2IsV0FBVyxDQUNaLENBQUE7SUFFRDs7Ozs7Ozs7T0FRRztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmVuZGVyQmxvY2sgKGVsZW1lbnRJZDpzdHJpbmcsIGh0bWw6c3RyaW5nKSB7XG4gIGNvbnN0IGVsZW1lbnQ9IDxIVE1MRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKVxuICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclRvYXN0IChtZXNzYWdlOiB7IHRleHQ6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0sIGFjdGlvbjogeyBoYW5kbGVyOiAoKSA9PiB2b2lkOyBuYW1lOiBzdHJpbmcgfSkge1xuICBsZXQgbWVzc2FnZVRleHQgPSAnJ1xuICBcbiAgaWYgKG1lc3NhZ2UgIT0gbnVsbCkge1xuICAgIG1lc3NhZ2VUZXh0ID0gYFxuICAgICAgPGRpdiBpZD1cImluZm8tYmxvY2tcIiBjbGFzcz1cImluZm8tYmxvY2sgJHttZXNzYWdlLnR5cGV9XCI+XG4gICAgICAgIDxwPiR7bWVzc2FnZS50ZXh0fTwvcD5cbiAgICAgICAgPGJ1dHRvbiBpZD1cInRvYXN0LW1haW4tYWN0aW9uXCI+JHthY3Rpb24/Lm5hbWUgfHwgJ9CX0LDQutGA0YvRgtGMJ308L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIGBcbiAgfVxuICBcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3RvYXN0LWJsb2NrJyxcbiAgICBtZXNzYWdlVGV4dFxuICApXG5cbiAgLypjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9hc3QtbWFpbi1hY3Rpb24nKVxuICBpZiAoYnV0dG9uICE9IG51bGwpIHtcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBpZiAoYWN0aW9uICE9IG51bGwgJiYgYWN0aW9uLmhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICBhY3Rpb24uaGFuZGxlcigpXG4gICAgICB9XG4gICAgICByZW5kZXJUb2FzdChudWxsKVxuICAgIH1cbiAgfSovXG59XG4iXX0=