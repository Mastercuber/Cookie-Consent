import type {Category, Cookie, Props} from "../interfaces/CookieConsentProps";
import {nextTick, onBeforeMount, onMounted, reactive, ref, unref, watchEffect} from "vue";
import {Consent} from "../interfaces/Consent";
import Consents from "./Consents";
import {useI18n} from "vue-i18n";

export function useCookieConsent(props: Props) {
  const {t, locale, fallbackLocale} = useI18n()
  const i18n = useI18n()
  // Data
  const consents: Array<Consent> = reactive([])
  const isMainContainerVisible = ref(true)
  const isMinimized = ref(false)
  const showConsent = ref(false)
  const blurOverlayReverse = ref(false)
  const detailsCards = ref([])
  const isInfoOpen = ref(false)
  const supportedLanguages = [
    'ar',
    'sq',
    'hy',
    'bg',
    'zh',
    'cs',
    'de',
    'da',
    'et',
    'es',
    'fi',
    'fr',
    'en',
    'el',
    'hr',
    'hu',
    'hi',
    'it',
    'lt',
    'lb',
    'lv',
    'nl',
    'no',
    'pl',
    'pt',
    'ro',
    'ru',
    'sl',
    'sk',
    'sv',
    'tr',
    'uk'
  ]
  /*const currentTab = ref('cookies')*/

  const metaCookie = ref<Cookie>({
    id: t('metaCookieTitles.id'),
    name: t('metaCookieTitles.name'),
    provider: t('metaCookieTitles.provider'),
    purpose: t('metaCookieTitles.purpose'),
    cookieValidityPeriod: t('metaCookieTitles.cookieValidityPeriod'),
  })
  // @ts-ignore
  if (!(props.storageConsentsKey in localStorage)) showConsent.value = true


  function getCookieCountForCategory(category: Category) {
    const count = category.cookies && Array.isArray(category.cookies) ? category.cookies.length : 0
    return count.toLocaleString(unref(locale))
  }

  function setTransformToWidthAndHeight() {
    let currentWidth, currentHeight

    if (unref(isMainContainerVisible)) {
      currentWidth = getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-width')
      currentHeight = getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-height')
    } else {
      currentWidth = getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-details-width')
      currentHeight = getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-details-height')
    }

    document.documentElement.style.setProperty('--transform-current-width', currentWidth)
    document.documentElement.style.setProperty('--transform-current-height', currentHeight)
  }

  function setTransformToXY(container: HTMLElement) {
    let containerWidth
    let offsetTop = window.innerHeight / 4

    if (unref(isMainContainerVisible)) {
      containerWidth = +getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-width').replace('px', '')
    } else {
      containerWidth = +getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-details-width').replace('px', '')
    }
    const offsetLeft = window.innerWidth / 2 - containerWidth / 2
    // Ohne diese Zeile funktioniert im Firefox die Minimierungsanimation nicht mehr immer... Warum auch immer..
    // Auch nicht wenn der Parameter ganz entfernt wird! -.-
    offsetTop = container.offsetTop || offsetTop

    const x = window.innerWidth - offsetLeft - 45 - containerWidth / 2
    const y = window.innerHeight - offsetTop - 60

    document.documentElement.style.setProperty('--transform-minimize-x', `${x}px`)
    document.documentElement.style.setProperty('--transform-minimize-y', `${y}px`)
  }

  function setCategoryConsent(event: Event, index: number) {
    consents[index].partial = false
    consents[index].accepted = (<HTMLInputElement>event.target).checked

    for (let i = 0; i < consents[index].cookies.length; i++) {
      consents[index].cookies[i].accepted = (<HTMLInputElement>event.target).checked
    }
  }

  function maximize(event: Event) {
    event.preventDefault()

    setTransformToWidthAndHeight()
    showConsent.value = true

    nextTick(() => {
      const overlay = <HTMLElement>document.getElementById('overlay')
      const container = <HTMLElement>document.getElementById('container')

      setTransformToXY(container)

      overlay.classList.remove('blur-overlay')

      isMinimized.value = false
      blurOverlayReverse.value = true

      container.classList.add('maximize')
    })
  }

  function minimize(event: Event) {
    event.preventDefault()

    setTransformToWidthAndHeight()

    const container = <HTMLElement>document.getElementById('container')
    const overlay = <HTMLElement>document.getElementById('overlay')

    overlay.classList.remove('blur-overlay-reverse')
    container.classList.remove('transform-to-details')
    container.classList.remove('transform-to-main')
    container.classList.remove('maximize')

    setTransformToXY(container)

    overlay.classList.add('blur-overlay')
    container.classList.add('minimize')

    const animationDuration = getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-minimize-animation-duration')

    setTimeout(() => {
      showConsent.value = false
      isMinimized.value = true
    }, +animationDuration.replace('s', '') * 1000 - 50)
  }

  function hideConsent() {
    setTransformToWidthAndHeight()

    const container = <HTMLElement>document.getElementById('container')
    const overlay = <HTMLElement>document.getElementById('overlay')
    overlay.classList.remove('blur-overlay-reverse')

    setTransformToXY(container)

    overlay.classList.add('blur-overlay')
    container.classList.add('hide-consent')

    const animationDuration = getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-hide-duration')

    setTimeout(() => {
      showConsent.value = false
      overlay.classList.remove('blur-overlay')
      container.classList.remove('hide-consent')
    }, +animationDuration.replace('s', '') * 1000 - 50)
  }

  function showMain(event: Event) {
    event.preventDefault()

    const container = <HTMLElement>document.getElementById('container')
    const opacityContainer = <HTMLElement>document.getElementById('cookie-consent-opacity-container')

    opacityContainer.classList.remove('transform-opacity-to-details')
    opacityContainer.classList.add('transform-opacity-to-main')
    container.classList.remove('transform-to-details')
    container.classList.remove('maximize')
    container.classList.add('transform-to-main')

    const animationDuration = getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-animation-duration')

    setTimeout(() => {
      isMainContainerVisible.value = true
    }, +animationDuration.replace('s', '') / 2 * 1000)
  }

  function showDetails(event: Event) {
    event.preventDefault()

    const container = <HTMLElement>document.getElementById('container')
    const opacityContainer = <HTMLElement>document.getElementById('cookie-consent-opacity-container')

    opacityContainer.classList.remove('transform-opacity-to-main')
    opacityContainer.classList.add('transform-opacity-to-details')
    container.classList.remove('transform-to-main')
    container.classList.remove('maximize')
    container.classList.add('transform-to-details')

    const animationDuration = getComputedStyle(document.documentElement).getPropertyValue('--cookie-consent-animation-duration')

    setTimeout(() => {
      isMainContainerVisible.value = false
    }, +animationDuration.replace('s', '') / 2 * 1000)
  }

  function acceptSelection() {
    hideConsent()

    const obj: { [key: string]: boolean } = {}

    for (let i = 1; i < unref(consents).length; i++) {
      for (let j = 0; j < unref(consents)[i].cookies.length; j++) {
        const cookieConsent = unref(consents)[i].cookies[j]
        // @ts-ignore
        const cookie: Cookie = props.categories[i].cookies[j]
        // @ts-ignore
        const key = `${props.storagePrefix}-${props.categories[i].id}-${cookie.id}`

        if (cookieConsent.accepted) {
          obj[key] = true

          if ('onAccepted' in cookie && typeof cookie.onAccepted === 'function') {
            cookie.onAccepted()
          }
        } else {
          obj[key] = false

          if ('onDenied' in cookie && typeof cookie.onDenied === 'function') {
            cookie.onDenied()
          }
        }
      }
    }

    localStorage.setItem(<string>props.storageConsentsKey, JSON.stringify(obj))

    if (props.useMetaCookie) setMetaCookie(obj)
  }

  function setMetaCookie(obj: { [key: string]: boolean }) {
    const expireDate = new Date()
    expireDate.setFullYear(expireDate.getFullYear() + 1)
    document.cookie = `${props.storageConsentsKey}=${JSON.stringify(obj)};samesite=Lax;secure=true;expires=${expireDate}`
  }

  function acceptAll() {
    hideConsent()

    for (const consent of unref(consents)) {
      consent.accepted = true
      consent.partial = false

      for (const cookieConsent of consent.cookies) {
        cookieConsent.accepted = true
      }
    }

    const obj: { [key: string]: boolean } = {}

    for (let i = 1; i < props.categories.length; i++) {
      // @ts-ignore
      for (let j = 0; j < props.categories[i].cookies.length; j++) {
        // @ts-ignore
        const cookie = props.categories[i].cookies[j]
        // @ts-ignore
        const key = `${props.storagePrefix}-${props.categories[i].id}-${cookie.id}`
        obj[key] = true

        if ('onAccepted' in cookie && typeof cookie.onAccepted === 'function') {
          cookie.onAccepted()
        }
      }
    }
    // @ts-ignore
    localStorage.setItem(props.storageConsentsKey, JSON.stringify(obj))
    if (props.useMetaCookie) setMetaCookie(obj)
  }

  function toggleCookieInformation(event: Event) {
    event.preventDefault()
    const parent = (<HTMLElement>event.target).parentElement

    if (parent) {
      const tableContainer = <HTMLElement>parent.querySelector('.table-container')

      if (tableContainer) {
        const tables = tableContainer.querySelectorAll('table')
        const currentHeight = +tableContainer.style.height.replace('px', '')
        let height = 0

        if (currentHeight === 0) {
          if (tables.length > 1) {
            height -= 4 * (tables.length - 1)
          }
          // @ts-ignore
          for (const table of tables) {
            height += table.offsetHeight + 7
          }
          tableContainer.style.height = `${height}px`
        } else {
          tableContainer.style.height = '0'
        }
      }
    }
  }

  function toggleConsent(event: Event, categoryIndex: number, cookieIndex?: number) {
    // @ts-ignore
    const added = event.target.classList.toggle('active')

    // when no cookie index is available, a category was toggled
    if (!cookieIndex && cookieIndex !== 0) {
      if (added) {
        unref(consents)[categoryIndex].partial = false
        unref(consents)[categoryIndex].accepted = true

        for (let i = 0; i < unref(consents)[categoryIndex].cookies.length; i++) {
          unref(consents)[categoryIndex].cookies[i].accepted = true
        }
      } else {
        unref(consents)[categoryIndex].partial = false
        unref(consents)[categoryIndex].accepted = false

        for (let i = 0; i < unref(consents)[categoryIndex].cookies.length; i++) {
          unref(consents)[categoryIndex].cookies[i].accepted = false
        }
      }

      return
    }

    const cookieDetailsCard = <HTMLElement>unref(detailsCards)[categoryIndex]
    // when the return value from toggling is false, then also deactivate the category
    if (!added) {
      const binarySliders = cookieDetailsCard.querySelectorAll('.table-container .binary-slider')

      // Ist die Rückgabe vom anfänglichen Umschalten false, dann prüfen ob alle anderen Schalter deaktiviert sind
      const res = []
      // @ts-ignore
      for (const slider of binarySliders) {
        res.push(slider.classList.contains('active'))
      }

      // Sind alle anderen Cookies deaktiviert, dann auch die Kategorie deaktivieren
      unref(consents)[categoryIndex].partial = res.includes(true)

      unref(consents)[categoryIndex].accepted = false
      unref(consents)[categoryIndex].cookies[cookieIndex].accepted = false

    } else {
      const binarySliders = cookieDetailsCard.querySelectorAll('.table-container .binary-slider')

      unref(consents)[categoryIndex].cookies[cookieIndex].accepted = true

      // Ist die Rückgabe vom anfänglichen Umschalten true, dann prüfen, ob alle anderen Schalter aktiviert sind.
      const res = []
      // @ts-ignore
      for (const slider of binarySliders) {
        res.push(slider.classList.contains('active'))
      }

      // Sind alle anderen Cookies aktiviert, dann auch die Kategorie aktivieren
      if (!res.includes(false)) {
        unref(consents)[categoryIndex].partial = false
        unref(consents)[categoryIndex].accepted = true
      } else {
        unref(consents)[categoryIndex].partial = true
      }
    }
  }

  function clearSite(event: Event) {
    event.preventDefault()
    window.Consents.clear()
  }

  function toggleInfo() {
    isInfoOpen.value = !isInfoOpen.value
  }

  function loadTranslation(cc: string) {
    cc = cc.substring(0, 2)
    if (supportedLanguages.includes(cc)) {
      import(`../locales/${cc}.json`).then(res => {
        i18n.mergeLocaleMessage(cc, res.default)
      })
    } else if (supportedLanguages.includes(unref(fallbackLocale).toString())) {
      import(`../locales/${unref(fallbackLocale)}.json`).then(res => {
        i18n.mergeLocaleMessage(unref(fallbackLocale).toString(), res.default)
      })
    } else {
      import(`../locales/en.json`).then(res => {
        i18n.mergeLocaleMessage('en', res.default)
      })
    }
  }


// lifecycle hooks
  onBeforeMount(() => {
    // @ts-ignore
    Consents(unref(metaCookie), props, consents)

    document.documentElement.style.setProperty('--cookie-consent-animation-duration', props.animationDuration || '0.7s')
    document.documentElement.style.setProperty('--cookie-consent-minimize-animation-duration', props.minimizeAnimationDuration || '1s')
    document.documentElement.style.setProperty('--cookie-consent-hide-duration', props.hideDuration || '1s')


    watchEffect(() => {
      const cc = unref(locale)?.substring(0, 2)
      loadTranslation(cc);
    })
  })

  onMounted(() => {
  })

  return {
    consents,
    links: props.links,
    categories: props.categories,
    detailsCards,
    toggleInfo,
    toggleConsent,
    toggleCookieInformation,
    clearSite,
    getCookieCountForCategory,
    setCategoryConsent,
    acceptSelection,
    acceptAll,
    minimize,
    maximize,
    showMain,
    showDetails,
    isInfoOpen,
    isMainContainerVisible,
    isMinimized,
    showConsent,
    blurOverlayReverse
  }
}
