import { shallowMount } from '@vue/test-utils'
import CookieConsent from '@/components/CookieConsent.vue'
import { createI18n } from 'vue-i18n'
import {expect} from "vitest";


const i18n = createI18n({
  legacy: false,
  locale: 'de'
})

describe('Global Consents Object Tests', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = shallowMount(CookieConsent, {
      global: { plugins: [i18n] },
      props: {
        lang: 'de',
        useMetaCookie: true,

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
                onAccept() {
                },
                onDeny() {
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
  it('should have some properties', () => {
    expect(window.Consents).not.null

    expect(window.Consents.storagePrefix).toBe('consent')
    expect(window.Consents.storageConsentsKey).toBe('consents')
    expect(window.Consents.ids).length(9)
    expect(window.Consents.hasAccepted).false
    expect(window.Consents.get('essential', 'session-cookie')).false
    expect(window.Consents.get('non-existing-category', 'session-cookie')).false
  })

  it('shouldn\'t set an existing key, when consent isn\'t given', () => {
    expect(window.Consents.hasAccepted).false
    expect(window.Consents.get('essential', 'session-cookie')).false
    window.Consents.set('essential', 'session-cookie', true)
    expect(window.Consents.get('essential', 'session-cookie')).false
  })

  it('should not be possible to set non existing keys', () => {
    window.Consents.set('stidstic', 'matasdomo', true)
    expect(window.Consents.get('stidstic', 'matasdomo')).false
  })
})
