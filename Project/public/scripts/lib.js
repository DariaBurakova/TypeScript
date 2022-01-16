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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsV0FBVyxDQUFFLFNBQVMsRUFBRSxJQUFJO0lBQzFDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDbEQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7QUFDMUIsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUUsT0FBdUMsRUFBRSxNQUE2QztJQUNqSCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFFcEIsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ25CLFdBQVcsR0FBRzsrQ0FDNkIsT0FBTyxDQUFDLElBQUk7YUFDOUMsT0FBTyxDQUFDLElBQUk7eUNBQ2dCLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksS0FBSSxTQUFTOztLQUU3RCxDQUFBO0tBQ0Y7SUFFRCxXQUFXLENBQ1QsYUFBYSxFQUNiLFdBQVcsQ0FDWixDQUFBO0lBRUQ7Ozs7Ozs7O09BUUc7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckJsb2NrIChlbGVtZW50SWQsIGh0bWwpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZClcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUb2FzdCAobWVzc2FnZTogeyB0ZXh0OiBzdHJpbmc7IHR5cGU6IHN0cmluZyB9LCBhY3Rpb246IHsgaGFuZGxlcjogKCkgPT4gdm9pZDsgbmFtZTogc3RyaW5nIH0pIHtcbiAgbGV0IG1lc3NhZ2VUZXh0ID0gJydcbiAgXG4gIGlmIChtZXNzYWdlICE9IG51bGwpIHtcbiAgICBtZXNzYWdlVGV4dCA9IGBcbiAgICAgIDxkaXYgaWQ9XCJpbmZvLWJsb2NrXCIgY2xhc3M9XCJpbmZvLWJsb2NrICR7bWVzc2FnZS50eXBlfVwiPlxuICAgICAgICA8cD4ke21lc3NhZ2UudGV4dH08L3A+XG4gICAgICAgIDxidXR0b24gaWQ9XCJ0b2FzdC1tYWluLWFjdGlvblwiPiR7YWN0aW9uPy5uYW1lIHx8ICfQl9Cw0LrRgNGL0YLRjCd9PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICBgXG4gIH1cbiAgXG4gIHJlbmRlckJsb2NrKFxuICAgICd0b2FzdC1ibG9jaycsXG4gICAgbWVzc2FnZVRleHRcbiAgKVxuXG4gIC8qY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvYXN0LW1haW4tYWN0aW9uJylcbiAgaWYgKGJ1dHRvbiAhPSBudWxsKSB7XG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgaWYgKGFjdGlvbiAhPSBudWxsICYmIGFjdGlvbi5oYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgYWN0aW9uLmhhbmRsZXIoKVxuICAgICAgfVxuICAgICAgcmVuZGVyVG9hc3QobnVsbClcbiAgICB9XG4gIH0qL1xufVxuIl19