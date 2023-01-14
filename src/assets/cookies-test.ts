// @ts-ignore
import {readCookie, writeCookie, deleteCookie} from './cookies.js'
import {expect} from 'vitest'

describe('Cookie Tests', () => {
  beforeEach(() => {

  })
  it('should write and read a cookie', () => {
    writeCookie({'categoryId-cookieId': true})
    const cookie = readCookie('consents')
    expect(cookie).not.null
    expect(cookie).toEqual({'categoryId-cookieId': true})
  })
  it('should delete a cookie', () => {
    writeCookie({'categoryId-cookieId': true})
    let cookie = readCookie('consents')
    expect(cookie).not.null
    expect(cookie).toEqual({'categoryId-cookieId': true})

    deleteCookie('consents')
    cookie = readCookie('consents')
    expect(cookie).not.toEqual({'categoryId-cookieId': true})
  })
})
