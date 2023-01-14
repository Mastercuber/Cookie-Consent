export function readCookie(key = 'consents') {
  let index = document.cookie.indexOf(key + '=')
  if (index === -1) return {}
  const s = document.cookie.substring(index)

  index = s.indexOf(';')
  if (index > -1) {
    return JSON.parse(s.substring(key.length + 1, index))
  } else {
    return JSON.parse(s.substring(key.length + 1))
  }
}

export function writeCookie(consents, validInYears = 1, key = 'consents', sameSite = 'Lax', path = '/', secure = true) {
  const d = new Date()
  d.setFullYear(d.getFullYear() + validInYears)
  document.cookie = `${key}=${JSON.stringify(consents)};expires=${d};samesite=${sameSite};path=${path};secure=${secure}`
}

export function deleteCookie(key = 'consents', value = '') {
  const cookieValue = readCookie(key)
  document.cookie = `${key}=${cookieValue};expires=Thu, 01-Jan-70 00:00:01 GMT;`
}
