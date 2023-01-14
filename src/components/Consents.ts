import {Category, Cookie as CookieProp, Props} from '../interfaces/CookieConsentProps'
import {Consent, Cookie} from '../interfaces/Consent'
// @ts-ignore
import {deleteCookie, readCookie, writeCookie} from '../assets/cookies.js'
import {Ref, unref} from "vue";

// eslint-disable
declare global {
  interface Window {
    Consents: any
  }
}
// eslint-enable

export default function (metaCookie: Cookie, props: Props, consents: Ref<Array<Consent>>) {
  function loadConsentsWrapper() {
    const allIds = []
    let savedConsents = {}
    // @ts-ignore
    if (props.storageConsentsKey in localStorage) {
      savedConsents = JSON.parse(localStorage.getItem(props.storageConsentsKey || '') || '{}')
    } else if (props.useMetaCookie) {
      savedConsents = readCookie(props.storageConsentsKey)
      // @ts-ignore
      if (Object.keys(savedConsents).length > 0) localStorage.setItem(props.storageConsentsKey, JSON.stringify(savedConsents))
    }

    for (let i = 1; props.categories != undefined && i < props.categories.length; i++) {
      const res = []

      if ('cookies' in props.categories[i]) {
        // @ts-ignore
        for (let j = 0; j < props.categories[i].cookies.length; j++) {
          const {cookies} = props.categories[i]
          if (!cookies) continue


          allIds.push({
            categoryId: props.categories[i].id,
            cookieId: cookies[j].id
          })

          // @ts-ignore
          unref(consents)[i].cookies[j].accepted = savedConsents[`${props.storagePrefix}-${props.categories[i].id}-${cookies[j].id}`] ?? false

          res.push(unref(consents)[i].cookies[j].accepted)

          if (unref(consents)[i].cookies[j].accepted && typeof cookies[j]?.onAccepted === 'function') {
            // @ts-ignore
            cookies[j].onAccepted()
          }
          if (!unref(consents)[i].cookies[j].accepted && typeof cookies[j]?.onDenied === 'function') {
            // @ts-ignore
            cookies[j].onDenied()
          }
        }

        const containsTruthyValue = res.includes(true)
        const containsFalsyValue = res.includes(false)

        // accept all cookies of the category
        if (containsTruthyValue && !containsFalsyValue) {
          unref(consents)[i].accepted = true
        }
        // accept some cookies of the category
        else if (containsTruthyValue && containsFalsyValue) unref(consents)[i].partial = true
      }
    }

    return allIds
  }

  if (props.useMetaCookie) {
    const {cookies} = props.categories[0]
    if (cookies) { // @ts-ignore
      cookies.unshift(metaCookie)
    }
  }

  // initialise consents
  for (let i = 0; i < props.categories.length; i++) {
    const consent = {
      accepted: i === 0,
      partial: false,
      cookies: []
    }

    const {cookies} = props.categories[i]
    if (cookies) {
      for (let j = 0; j < cookies.length; j++) {
        // Accept all cookies of the first category
        // @ts-ignore
        consent.cookies.push({accepted: i === 0})
      }
      unref(consents).push(consent)
    }
  }

  // load consents and receive all ids
  const ids = loadConsentsWrapper()

  window.Consents = {
    storagePrefix: props.storagePrefix,
    storageConsentsKey: props.storageConsentsKey,
    ids,
    /**
     * Accept or deny a cookie
     *
     * @param categoryId
     * @param cookieId
     * @param value
     */
    set(categoryId: string, cookieId: string, value: boolean) {
      const id = this.ids.find((id: any) => id.categoryId === categoryId && id.cookieId === cookieId)

      if (id) {
        const key = `${this.storagePrefix}-${categoryId}-${cookieId}`

        const savedConsents = JSON.parse(localStorage.getItem(this.storageConsentsKey) || '{}')
        if (savedConsents[key] === undefined) return
        if (key in savedConsents) {
          savedConsents[key] = value

          const category = props.categories.find((category: Category) => category.id === id.categoryId)
          if (category && category.cookies) {
            const cookie = category.cookies.find((cookie: CookieProp) => cookie.id === id.cookieId)

            if (cookie && value && typeof cookie.onAccepted === 'function') cookie.onAccepted()
            if (cookie && !value && typeof cookie.onDenied === 'function') cookie.onDenied()
          }
        }

        localStorage.setItem(this.storageConsentsKey, JSON.stringify(savedConsents))

        if (props.useMetaCookie) {
          const consents = readCookie(this.storageConsentsKey)
          consents[`${this.storagePrefix}-${categoryId}-${cookieId}`] = value
          writeCookie(consents)
        }
      }
    },
    /**
     * Obtain the current consent about a cookie
     *
     * @param categoryId
     * @param cookieId
     */
    get(categoryId: string, cookieId: string) {
      console.debug(Object.keys(localStorage))
      const consents = JSON.parse(localStorage.getItem(this.storageConsentsKey) || '{}')

      return consents[`${this.storagePrefix}-${categoryId}-${cookieId}`] === 'true'
    },
    /**
     * Did the user gave a consent or just minimized the Cookie Consent
     */
    get hasAccepted() {
      return this.storageConsentsKey in localStorage
    },
    /**
     * Clear the Consents
     */
    clear() {
      localStorage.removeItem(this.storageConsentsKey)
      deleteCookie(this.storageConsentsKey)

      for (let i = 0; i < props.categories.length; i++) {
        if (props.categories[i].cookies) {
          for (let j = 0; j < props.categories[i].cookies!.length; j++) {
            if (typeof props.categories[i].cookies![j].onDenied === 'function') props.categories[i].cookies![j].onDenied!()
            if (i > 0) {
              unref(consents)[i].cookies[j].accepted = false
              unref(consents)[i].accepted = false
              unref(consents)[i].partial = false
            }
          }
        }
      }
    }
  }
}
