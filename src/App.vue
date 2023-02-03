<template>
  <div style="position: relative; z-index: 1;">
    <LanguageFlags style="position: absolute; z-index: 2;"/>
    <CookieConsent ref="cookie-consent" :use-meta-cookie="true" :required-links="obj.requiredLinks" :categories="obj.categories" :attach-global="true" style="position: absolute; z-index: 1;" />
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import CookieConsent from '@/components/CookieConsent.vue'
import { ref } from "vue";
import LanguageFlags from "@/components/LanguageFlags.vue";

let lang = ref('en')

const obj = {
  lang: 'en',

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
        },{
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
        },{
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
        },{
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
        },{
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
</script>

<style>

</style>
