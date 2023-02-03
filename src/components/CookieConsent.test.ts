import { shallowMount, VueWrapper } from '@vue/test-utils'
import CookieConsent from '@/components/CookieConsent.vue'
import { createI18n } from 'vue-i18n'
import { expect, SpyInstance, vi } from "vitest"
import * as TestUtils from './TestUtils'
import {
  checkAllConsentsDenied,
  checkConsent,
  checkAllConsentsAccepted,
  checkConsentInStorage,
  isSaved,
  checkAllConsentsInStorageAccepted,
  checkAllConsentsInStorageDenied,
  checkCategoryConsents,
  checkStorageCategoryConsents
} from './TestUtils'


const i18n = createI18n({
  legacy: false,
  locale: 'de'
})
let wrapper: VueWrapper

const handler = {
  has(target, p) {
    return p in target._store
  }
}
localStorage = new Proxy(localStorage, handler as ProxyHandler<Storage>)
describe('Cookie Consent Tests', () => {
  let acceptSpy: SpyInstance
  let denySpy: SpyInstance
  beforeEach(() => {
    const props = {
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
    wrapper = TestUtils.wrapper.value = shallowMount(CookieConsent, {
      global: {plugins: [i18n]},
      props
    })
    expect(wrapper).not.null
    acceptSpy = vi.spyOn(props.categories[1].cookies[2], 'onAccepted')
    denySpy = vi.spyOn(props.categories[1].cookies[2], 'onDenied')
    const spy = vi.spyOn<Document>(document, 'getElementById')
    spy.mockImplementation(id => {
      return {
        ...wrapper.vm.$el.querySelectorAll(`#${id}`),
        classList: {
          remove: () => {
          },
          add: () => {
          }
        }
      }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.removeItem(window.Consents.storageKey)
  })

  it('should have some containers and properties', () => {
    expect(wrapper.vm.$el.querySelector('#container')).not.null
    expect(wrapper.vm.$el.querySelector('#overlay')).not.null
    expect(wrapper.vm.$el.querySelector('#link-container')).not.null

    expect(wrapper.vm.$props.categories).length(5)
  })

  it('should set consent for one cookie to accepted', async () => {
    checkAllConsentsDenied();
    expect(isSaved()).false

    wrapper.vm.showDetails({
      preventDefault: () => {
      }
    })

    await new Promise(resolve => {
      setTimeout(() => {

        expect(acceptSpy).toHaveBeenCalledTimes(0)
        expect(denySpy).toHaveBeenCalledTimes(0)

        wrapper.vm.toggleConsent({
          target: {
            classList: {
              toggle(str = '') {
                return true
              }
            }
          }
        }, 1, 0)

        checkConsent(1, 0, true, false)
        expect(acceptSpy).toHaveBeenCalledTimes(0)
        expect(denySpy).toHaveBeenCalledTimes(0)
        expect(isSaved()).false

        wrapper.vm.acceptSelection()

        expect(isSaved()).true
        checkConsentInStorage('statistic', 'session-cookie-2', true, false)
        expect(acceptSpy).toHaveBeenCalledTimes(0)
        expect(denySpy).toHaveBeenCalledTimes(1)

        resolve()
      }, 1000)
    })
  })

  it('should set consent for spied cookie to accepted', async () => {
    checkAllConsentsDenied()
    expect(isSaved()).false

    wrapper.vm.showDetails({
      preventDefault: () => {
      }
    })

    await new Promise(resolve => {
      setTimeout(() => {

        expect(acceptSpy).toHaveBeenCalledTimes(0)
        expect(denySpy).toHaveBeenCalledTimes(0)

        wrapper.vm.toggleConsent({
          target: {
            classList: {
              toggle(str = '') {
                return true
              }
            }
          }
        }, 1, 2)

        expect(isSaved()).false
        checkConsent(1, 2, true, false)
        expect(acceptSpy).toHaveBeenCalledTimes(0)
        expect(denySpy).toHaveBeenCalledTimes(0)

        wrapper.vm.acceptSelection()

        expect(isSaved()).true
        checkConsentInStorage('statistic', 'matomo', true, false)
        expect(acceptSpy).toHaveBeenCalledTimes(1)
        expect(denySpy).toHaveBeenCalledTimes(0)

        resolve()
      }, 1000)
    })
  });

  it('should set consent for one cookie to declined', async () => {
    checkAllConsentsDenied()

    wrapper.vm.showDetails({
      preventDefault: () => {
      }
    })

    await new Promise(resolve => {
      setTimeout(() => {
        expect(acceptSpy).toHaveBeenCalledTimes(0)
        expect(denySpy).toHaveBeenCalledTimes(0)
        expect(isSaved()).false

        wrapper.vm.acceptAll()

        checkAllConsentsAccepted()
        expect(isSaved()).true
        checkAllConsentsInStorageAccepted()
        expect(acceptSpy).toHaveBeenCalledTimes(1)
        expect(denySpy).toHaveBeenCalledTimes(0)

        wrapper.vm.toggleConsent({
          target: {
            classList: {
              toggle(str = '') {
                return false
              }
            }
          }
        }, 1, 2)

        checkConsent(1, 2, false, true)
        checkAllConsentsInStorageAccepted()

        wrapper.vm.acceptSelection()

        checkConsent(1, 2, false, true)
        checkConsentInStorage('statistic', 'matomo', false, true)
        expect(acceptSpy).toHaveBeenCalledTimes(1)
        expect(denySpy).toHaveBeenCalledTimes(1)
        resolve()
      }, 1000)
    })
  })

  it('should set consent for one category to accepted', () => {
    checkAllConsentsDenied()
    expect(isSaved()).false

    wrapper.vm.toggleConsent({
      target: {
        classList: {
          toggle(str = '') {
            return true
          }
        }
      }
    }, 1)

    expect(isSaved()).false
    checkCategoryConsents(1, true, false)

    wrapper.vm.acceptSelection()

    expect(isSaved()).true
    checkStorageCategoryConsents('statistic', true, false)
  })

  it('should set consent for one category to declined', () => {
    checkAllConsentsDenied()
    expect(isSaved()).false

    expect(acceptSpy).toHaveBeenCalledTimes(0)
    expect(denySpy).toHaveBeenCalledTimes(0)

    wrapper.vm.toggleConsent({
      target: {
        classList: {
          toggle(str = '') {
            return true
          }
        }
      }
    }, 1)

    expect(isSaved()).false
    checkCategoryConsents(1, true, false)

    wrapper.vm.toggleConsent({
      target: {
        classList: {
          toggle(str = '') {
            return false
          }
        }
      }
    }, 1)

    expect(isSaved()).false
    checkAllConsentsDenied()

    wrapper.vm.acceptSelection()

    expect(isSaved()).true
    checkAllConsentsInStorageDenied()
  })

  it('should not set consent to declined for cookies of the essentials category', async () => {
    expect(wrapper.vm.consents[0].cookies[0].accepted).true
    expect(wrapper.vm.consents[0].cookies[1].accepted).true

    wrapper.vm.toggleConsent({
      target: {
        classList: {
          toggle(str = '') {
            return false
          }
        }
      }
    }, 0, 0)

    expect(wrapper.vm.consents[0].cookies[0].accepted).true
    expect(wrapper.vm.consents[0].cookies[1].accepted).true
  })

  it("should save consents in localStorage when consent is given", function () {
    expect(isSaved()).false
    checkAllConsentsDenied()

    wrapper.vm.acceptAll()

    expect(acceptSpy).toHaveBeenCalledTimes(1)
    expect(denySpy).toHaveBeenCalledTimes(0)

    expect(isSaved()).true
    checkAllConsentsAccepted()
    checkAllConsentsInStorageAccepted()
  });
})
