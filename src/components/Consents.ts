import {Props} from '../interfaces/CookieConsentProps'
import {Consent, Cookie, Id} from '../interfaces/Consent'
import {readCookie, writeCookie} from '../assets/cookies.js'
import {clearConsents} from "./CookieConsentComposable";

interface Consents {
  storagePrefix: string
  storageKey: string
  ids: Id[]
  set(categoryId: string, cookieId: string, value: boolean)
  get(categoryId: string, cookieId: string): boolean
  get hasAccepted(): boolean
  clear()
}

// eslint-disable
declare global {
  interface Window {
    Consents: Consents
  }
}
// eslint-enable

export default function (metaCookie: Cookie, props: Props, consents: Array<Consent>) {
 /* const { clearSite } = useCookieConsent(props)*/
  function loadConsentsWrapper() {
    const allIds = []
    let savedConsents = {}

    if (props.storageKey in localStorage) {
      savedConsents = JSON.parse(localStorage.getItem(props.storageKey!) || '{}')
    } else if (props.useMetaCookie) {
      savedConsents = readCookie(props.storageKey)
      if (Object.keys(savedConsents).length > 0) localStorage.setItem(props.storageKey!, JSON.stringify(savedConsents))
    }

    for (let i = 1; props.categories != undefined && i < props.categories.length; i++) {
      const res = []

      if ('cookies' in props.categories[i]) {
        for (let j = 0; j < props.categories[i].cookies.length; j++) {
          const {cookies} = props.categories[i]
          if (!cookies) continue

          allIds.push({
            categoryId: props.categories[i].id,
            cookieId: cookies[j].id
          })

          consents[i].cookies[j].accepted =
            savedConsents[`${props.storagePrefix}-${props.categories[i].id}-${cookies[j].id}`]
            ?? false

          res.push(consents[i].cookies[j].accepted)

          if (consents[i].cookies[j].accepted && typeof cookies[j]?.onAccepted === 'function') {
            cookies[j].onAccepted()
          }
          if (!consents[i].cookies[j].accepted && typeof cookies[j]?.onDenied === 'function') {
            cookies[j].onDenied()
          }
        }

        const containsTruthyValue = res.includes(true)
        const containsFalsyValue = res.includes(false)

        // accept all cookies of the category
        if (containsTruthyValue && !containsFalsyValue) {
          consents[i].accepted = true
        }
        // accept some cookies of the category
        else if (containsTruthyValue && containsFalsyValue) consents[i].partial = true
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
        consent.cookies.push({accepted: i === 0})
      }
      consents.push(consent)
    }
  }

  // load consents and receive all ids
  const ids = loadConsentsWrapper()

  if (props.attachGlobal) {
    window.Consents = {
      get storagePrefix(): string {
        return props.storagePrefix!
      },
      get storageKey(): string {
        return props.storageKey!
      },
      get ids(): string[] {
        return ids
      },
      /**
       * Did the user saved the given consents or just minimized the Cookie Consent
       *
       * @return boolean
       */
      get hasAccepted(): boolean {
        return this.storageKey in localStorage
      },
      /**
       * Set the consent for a cookie and save
       *
       * @param categoryId
       * @param cookieId
       * @param value
       * @return boolean
       */
      set(categoryId: string, cookieId: string, value: boolean): boolean {
        const categoryIndex = props.categories.findIndex(c => c.id === categoryId)

        if (categoryIndex > 0) {
          const cookieIndex = props.categories[categoryIndex].cookies.findIndex(c => c.id === cookieId)

          if (cookieIndex > -1) {
            const category = consents[categoryIndex]
            category.cookies[cookieIndex].accepted = value
            const bools = category.cookies.map(cookie => cookie.accepted)
            if (
              value && bools.includes(false)
              || !value && bools.includes(true)
            ) {
              category.accepted = false
              category.partial = true
            } else if (value && !bools.includes(false)) {
              category.accepted = true
              category.partial = false
            } else if (!value && !bools.includes(true)) {
              category.accepted = false
              category.partial = false
            }

            const id = this.ids.find((id: any) => id.categoryId === categoryId && id.cookieId === cookieId)
            const key = `${this.storagePrefix}-${categoryId}-${cookieId}`
            if (id) {
              const savedConsents = JSON.parse(localStorage.getItem(this.storageKey) || '{}')
              if (Object.keys(savedConsents).length === 0) {
                for (const id of this.ids) {
                  savedConsents[`${this.storagePrefix}-${id.categoryId}-${id.cookieId}`] = false
                }
              }
              if (key in savedConsents) {
                savedConsents[key] = value
              }

              localStorage.setItem(this.storageKey, JSON.stringify(savedConsents))

              if (props.useMetaCookie) {
                const consents = readCookie(this.storageKey)

                if (Object.keys(consents).length === 0) {
                  for (const id of this.ids) {
                    consents[`${this.storagePrefix}-${id.categoryId}-${id.cookieId}`] = false
                  }
                }

                consents[key] = value
                writeCookie(consents)
              }
            }
            return true
          }
        }
        return false
      },
      /**
       * Obtain the current consent about a cookie
       *
       * @param categoryId
       * @param cookieId
       * @return boolean
       */
      get(categoryId: string, cookieId: string): boolean {
        const _consents = JSON.parse(localStorage.getItem(this.storageKey) || '{}')

        if (Object.keys(_consents).length === 0) {
          const categoryIndex = props.categories.findIndex(c => c.id === categoryId)
          if (categoryIndex > -1) {
            const cookieIndex = props.categories[categoryIndex].cookies.findIndex(c => c.id === cookieId)
            if (cookieIndex > -1) {
              return consents[categoryIndex].cookies[cookieIndex].accepted
            }
          }
          return false
        }

        return !!_consents[`${this.storagePrefix}-${categoryId}-${cookieId}`]
      },
      /**
       * Clear the Consents (also saved Consents)
       */
      clear() {
        clearConsents(props, consents)
      }
    } as Consents
  }
}
