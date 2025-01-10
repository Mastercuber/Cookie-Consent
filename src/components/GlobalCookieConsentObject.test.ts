import { shallowMount } from '@vue/test-utils'
import CookieConsent from '@/components/CookieConsent.vue'
import { createI18n } from 'vue-i18n'
import { expect } from "vitest";
import {checkConsentInStorage, isSaved} from "./TestUtils";


const i18n = createI18n({
  legacy: false,
  locale: 'de'
})

const handler = {
  has(target, p) {
    return p in target
  }
}
localStorage = new Proxy(localStorage, handler as ProxyHandler<Storage>)

describe('Global Consents Object Tests', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = shallowMount(CookieConsent, {
      global: { plugins: [i18n] },
      props: {
        lang: 'de',
        useMetaCookie: true,
        attachGlobal: true,

        requiredLinks: {
          privacy: {
            title: 'Datenschutz',
            href: '/datenschutz'
          },
          impress: {
            title: 'Impressum',
            href: '/impressum'
          }
        },
        categories: [
          {
            id: 'essential',
            label: 'Essenziell',
            description: 'Essenzielle Cookies ermöglichen grundlegende Funktionalität und sind für den einwandfreien Betrieb der Webseite unabdingbar.',
            cookies: [
              {
                id: 'session-cookie',
                name: 'Sitzungscookie',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              }
            ]
          },
          {
            id: 'statistic',
            label: 'Statistik',
            description: 'Statistische Cookies geben uns Einblicke in das Besucherverhalten. Damit können wir u.A. in Erfahrung bringen, welche Seiten wie häufig besucht wurden und wie lange ein Besucher auf einer Seite verweilt.',
            cookies: [
              {
                id: 'session-cookie-2',
                name: 'Sitzungscookie 2',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              }, {
                id: 'session-cookie-3',
                name: 'Sitzungscookie 3',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              },
              {
                id: 'matomo',
                name: 'Matomo',
                provider: 'Eigentümer der Webseite',
                purpose: 'Wird verwendet um einige Details über den Besucher zu speichern, wie die eindeutige Besucher-ID',
                cookieName: '_pk_id*, _pk_ref*, _pk_ses*, _pk_cvar*, _pk_hsr*',
                cookieValidityPeriod: '13 Monate, 6 Monate, 30 Minuten, 30 Minuten, 30 Minuten',
                links: [
                  {
                    title: 'Matomo FAQ',
                    href: 'https://matomo.org/faq/general/faq_146/'
                  }
                ],
                onAccepted() {
                },
                onDenied() {
                }
              }
            ]
          },
          {
            id: 'essential2',
            label: 'Essenziell 2',
            description: 'Essenzielle Cookies ermöglichen grundlegende Funktionalität und sind für den einwandfreien Betrieb der Webseite unabdingbar.',
            cookies: [
              {
                id: 'session-cookie',
                name: 'Sitzungscookie',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              }, {
                id: 'session-cookie-7',
                name: 'Sitzungscookie 3',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              }
            ]
          },
          {
            id: 'essential3',
            label: 'Essenziell 3',
            description: 'Essenzielle Cookies ermöglichen grundlegende Funktionalität und sind für den einwandfreien Betrieb der Webseite unabdingbar.',
            cookies: [
              {
                id: 'session-cookie',
                name: 'Sitzungscookie',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              }, {
                id: 'session-cookie-6',
                name: 'Sitzungscookie 3',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              }
            ]
          },
          {
            id: 'essential4',
            label: 'Essenziell 4',
            description: 'Essenzielle Cookies ermöglichen grundlegende Funktionalität und sind für den einwandfreien Betrieb der Webseite unabdingbar.',
            cookies: [
              {
                id: 'session-cookie',
                name: 'Sitzungscookie',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              }, {
                id: 'session-cookie-5',
                name: 'Sitzungscookie 3',
                provider: 'Eigentümer der Webseite',
                purpose: 'Speichert als anonymer Nutzer die Artikel im Warenkorb und als angemeldeter Nutzer zusätzlich die Tatsache der Anmeldung',
                cookieName: 'SESSION',
                cookieValidityPeriod: '2 Stunden'
              }
            ]
          }
        ]
      }
    })
    expect(wrapper).not.null
  })
  afterEach(() => {
    localStorage.removeItem(window.Consents.storageKey)
  });
  it('should have some properties', () => {
    expect(window.Consents).not.null

    expect(window.Consents.storagePrefix).toBe('consent')
    expect(window.Consents.storageKey).toBe('consents')
    expect(window.Consents.ids).length(9)
    expect(window.Consents.hasAccepted).false
    expect(window.Consents.get('essential', 'session-cookie')).true
    expect(window.Consents.get('non-existing-category', 'session-cookie')).false
  })

  it('should set an existing key', function () {
    const categoryId = 'statistic'
    const cookieId = 'matomo'

    expect(isSaved()).false
    expect(window.Consents.get(categoryId, cookieId)).false

    window.Consents.set(categoryId, cookieId, true)

    expect(window.Consents.get(categoryId, cookieId)).true
    expect(isSaved()).true

    expect(window.Consents.hasAccepted).true
    expect(localStorage.getItem(window.Consents.storageKey)).not.null
  });

  it('should set an existing key and save the consent', function () {
    const categoryId = 'statistic'
    const cookieId = 'matomo'

    expect(isSaved()).false
    expect(window.Consents.get(categoryId, cookieId)).false

    window.Consents.set(categoryId, cookieId, true)

    expect(window.Consents.get(categoryId, cookieId)).true
    expect(window.Consents.hasAccepted).true
    expect(isSaved()).true

    wrapper.vm.acceptSelection()

    expect(window.Consents.hasAccepted).true
    expect(isSaved()).true
    checkConsentInStorage(categoryId, cookieId, true, false)
  });

  it("shouldn't set an existing key for a cookie of the 'essential' category", () => {
    expect(window.Consents.hasAccepted).false
    expect(window.Consents.get('essential', 'session-cookie')).true
    expect(isSaved()).false

    window.Consents.set('essential', 'session-cookie', false)

    expect(isSaved()).false
    expect(window.Consents.get('essential', 'session-cookie')).true
  })

  it("shouldn't be possible to set non-existing keys", () => {
    const categoryId = 'stidstic'
    const cookieId = 'matasdomo'
    expect(isSaved()).false

    window.Consents.set(null, null, true)
    window.Consents.set(undefined, undefined, true)
    window.Consents.set(null, 'cookie-id', true)
    window.Consents.set('category-id', null, true)
    window.Consents.set(categoryId, cookieId, true)

    expect(isSaved()).false
    expect(window.Consents.get(null, null)).false
    expect(window.Consents.get(undefined, undefined)).false
    expect(window.Consents.get(null, 'cookie-id')).false
    expect(window.Consents.get('category-id', null)).false
    expect(window.Consents.get(categoryId, cookieId)).false
  })

  it('should clear all set consents', function () {
    expect(window.Consents.hasAccepted).false
    expect(isSaved()).false

    wrapper.vm.acceptAll()

    expect(isSaved()).true
    expect(window.Consents.hasAccepted).true
    const category1 = 'statistic'
    const cookie11 = 'session-cookie-2'
    const cookie12 = 'session-cookie-3'
    const cookie13 = 'matomo'

    expect(window.Consents.get(category1, cookie11)).true
    expect(window.Consents.get(category1, cookie12)).true
    expect(window.Consents.get(category1, cookie13)).true

    window.Consents.clear()

    expect(isSaved()).false
    expect(window.Consents.get(category1, cookie11)).false
    expect(window.Consents.get(category1, cookie12)).false
    expect(window.Consents.get(category1, cookie13)).false
  });
})
