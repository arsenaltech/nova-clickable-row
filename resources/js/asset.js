const oldXHR = window.XMLHttpRequest

function elementOrParentPropertyMatchesValue(element, property, value) {
  let count = 0
  if (element.getAttribute(property) === value) {
    return true
  }
  while (element.parentNode && count < 10) {
    element = element.parentNode
    count++
    if (element.getAttribute(property) == value) {
      return true
    }
  }

  return false
}

function elementIsExcluded(e) {
  const excludedElements = [
      'a', 'option', 'select', 'button', 'input', 'role=checkbox', 'role=radio',
      'aria-labelledby=edit', 'aria-labelledby=view', 'aria-labelledby=delete'
  ]
  const eType = e.target.tagName.toLowerCase()

  return excludedElements.some(element => {
    if (element.indexOf('=') > -1) {
      const segments = element.split('=')
      return elementOrParentPropertyMatchesValue(e.target, segments[0], segments[1])
    }
    return eType === element
  })
}

function afterResourceTableLoadComplete() {
  const event = typeof Nova.config.clickableRow === "undefined" ? 'click' : Nova.config.clickableRow.event
  const action = typeof Nova.config.clickableRow === "undefined" ? 'view' : Nova.config.clickableRow.action

  let actionButtons = document.querySelectorAll(
    "table[data-testid='resource-table'] tr a[dusk$='-" + action + "-button']"
  )

  Array.from(actionButtons).forEach(button => {
    const row = button.parentElement.parentElement.parentElement
    row.addEventListener(event, e => {
      if (elementIsExcluded(e)) return
      window.location.href = button.href
    })
    row.style.cursor = 'pointer'
  })
}

function newXHR() {
  const realXHR = new oldXHR()

  realXHR.addEventListener('readystatechange', () => {
    if (realXHR.readyState == 4 && realXHR.status == 200) {
      const response = JSON.parse(realXHR.responseText)

      if (response.hasOwnProperty('count')) {
        afterResourceTableLoadComplete()
      }
    }
  }, false)

  return realXHR
}

window.XMLHttpRequest = newXHR
