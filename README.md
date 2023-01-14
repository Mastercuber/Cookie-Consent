# Cookie Consent
This is an internationalized ([vue-i18n](https://vue-i18n.intlify.dev/)) Cookie Consent component for [vue 3](https://vuejs.org/).

The first category must be the `essentials` category. Only Cookies in this first category are accepted per default and can't be declined.

All Cookies of other categories are declined per default.

For each Cookie you can pass optional `onAccepted` and `onDenied` functions, to hand in some code, which will be executed after `save selection` or `save all` is clicked.

Translations for the passed categories and cookies must be provided, when switching a language.

Only the translation file for the current language value is fetched and further translations gets loaded, when switching the language with `vue-i18n`.

The `legacy` flag of i18n must be set to `false`:
```javascript
const i18n = createI18n({
  legacy: false
})
```

## Global Consents Object
Before the component gets mounted to the DOM, a global `Consents` object is attached to the `window` object and, therefore, can be globally accessed.

### Properties
* `Consents.hasAccepted`: has consent already been given?
* `Consents.ids`: an array of objects with 2 keys each (`categoryId` and `cookieId`)
* `Consents.storagePrefix`: with this property it's possible to change the prefix used for storing the individuell consents  
(default: `consent`) 
* `Consents.storageConsentsKey`: with this property the storage key of all consents can be customized  
(default: `consents`) (Cookie name and `localStorage` key)

### Functions
* `Consents.set(categoryId: number, cookieId: number, value: boolean): void`    
Set a consent
* `Consents.get(categoryId: number, cookieId: number): boolean`  
Receive the current consent for a Cookie
* `Consents.clear()`   
Remove the Consents from the `localStorage`, delete the Cookie and call all `onDenied()` functions
## Component properties
```typescript
interface Props {
  categories: Array<Category>;
  requiredLinks: RequiredLinksProps;
    
  links?: Array<Link>;
  useMetaCookie?: boolean; // false
  animationDuration?: string; // '1.5s'
  minimizeAnimationDuration?: string; // '1s'
  hideDuration?: string; // '1s'
  storagePrefix?: string; // 'consent'
  storageConsentsKey?: string; // 'consents'
  maskContent?: boolean; // true
  maskColor?: string; // '#47494E'
}
```
`categories` and the `privacy` and `imprint` links are required component properties.

To add more links to the bottom of the main component view, you can provide additional `links`.

By default, the consent is persisted to the localStorage. To also set a cookie, set `useMetaCookie` to true.

`animationDuration`, `minimizeAnimationDuration` and `hideDuration` can be set to change the default animation durations.

With `storagePrefix` and `storageConsentsKey` the keys for persistence can be changed.

By default, the content of the page gets masked when the consent appears. To disable the masking, set `maskContent` to false; to change the mask color, set a color with `maskColor`.
## Additional interfaces
```typescript
interface Category {
  id: string;
  label: string;
  description?: string;
  cookies?: Array<Cookie>;
}
interface RequiredLinksProps {
  privacy: Link;
  impress: Link;
}
interface Link {
  title: string;
  href: string;
}
interface Cookie {
  id: string;
  name: string;
  purpose: string;
  provider?: string;
  cookieName?: string;
  cookieValidityPeriod?: string;
  onAccepted?: Function;
  onDenied?: Function;
  privacyURL?: string;
  links?: Array<Link>;
  hosts?: string;
}
```
## Use component
Import the CSS Style Declarations and the component with 
``` javascript
import '@avensio/cookie-consent/style.css'
import CookieConsent from '@avensio/cookie-consent'
```
For component properties see [here](#component-properties)

Full Usage Example:
```vue
<script setup>
import '@avensio/cookie-consent/style.css'
import CookieConsent from '@avensio/cookie-consent'

const obj = {
  requiredLinks: {
    privacy: {
      title: 'Privacy',
      href: '/privacy'
    },
    impress: {
      title: 'Imprint',
      href: '/imprint'
    }
  },
  categories: [
    {
      id: 'essential',
      label: 'Essential',
      description: 'Essential Cookies are needed for the website to function properly.',
      cookies: [
        {
          id: 'session-cookie',
          name: 'Session Cookie',
          provider: 'Owner of the Website',
          purpose: 'Saves as anynomous user the items in the shopping card and as authenticated user also additional infos',
          cookieName: 'SESSION',
          cookieValidityPeriod: '2 hours'
        }
      ]
    }
  ]
}
</script>

<template>
  <CookieConsent :categories="obj.categories" :required-links="obj.requiredLinks" />
</template>
```
## Language Codes (ISO-639-1)
The language codes are listed in [IANA Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (see also [IANA Protocols (Language Tags)](https://www.iana.org/protocols) and taken from [Wikipedia | List of ISO-639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

Every translation block of this Cookie-Consent is named after the appropriate [ISO-639-1](https://en.wikipedia.org/wiki/ISO_639-1) code.

* Arabic ar
* Bulgarian bg
* Czech cs
* Danish da
* German de
* Greek el
* English en
* Spanish es
* Estonian et
* Finnish fi
* French fr
* Indian (Hindi) hi
* Croatian hr
* Hungarian hu
* Armenian hy
* Italian it
* Luxembourgian lb
* Lithuanian lt
* Latvian lv
* Dutch nl
* Norwegian no
* Polish pl
* Portuguese pt
* Romanian ro
* Russian ru
* Slovakian sk
* Slovenian sl
* Albanian sq
* Swedish sv
* Turkish tr
* Ukrainian uk
* Chinese zh

In sum 32 languages are supported, mostly from the EU and some others like arabic, indian, russian and chinese.

The source language for the translations is German. All translations were made with [google translate](https://translate.google.com/) and [deepl](https://www.deepl.com). For some translations also [Leo](https://dict.leo.org) was used.
