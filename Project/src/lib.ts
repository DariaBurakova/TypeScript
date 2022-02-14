export function renderBlock (elementId:string, html:string) {
  const element= <HTMLElement> document.getElementById(elementId)
  element.innerHTML = html
}

export function renderToast (message: { text: string; type: string }, action: { handler: () => void; name: string }) {
  let messageText = ''
  
  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }
  
  renderBlock(
    'toast-block',
    messageText
  )

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
