<template>
  <div class="language-indicator-container">
      <span v-for="(lang, index) in langs" :key="lang.locale" class="language-indicator" @click="setLang(lang.locale , index === (langs.length - 1))" :title="lang.title">
        <span v-html="lang.flag"></span>
      </span>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const langs = [
  {
    locale: 'de',
    flag: '&#127465&#127466',
    title: 'German'
  },
  {
    locale: 'en',
    flag: '&#127468&#127463',
    title: 'English'
  },
  {
    locale: 'da',
    flag: '&#127465&#127472',
    title: 'Danish'
  },
  {
    locale: 'nl',
    flag: '&#127475&#127473',
    title: 'Dutch'
  },
  {
    locale: 'lb',
    flag: '&#127473&#127482',
    title: 'Luxembourgian'
  },
  {
    locale: 'ro',
    flag: '&#127479&#127476',
    title: 'Romanian'
  },
  {
    locale: 'hu',
    flag: '&#127469&#127482',
    title: 'Hungarian'
  },
  {
    locale: 'fr',
    flag: '&#127467&#127479',
    title: 'French'
  },
  {
    locale: 'pl',
    flag: '&#127477&#127473',
    title: 'Polish'
  },
  {
    locale: 'cs',
    flag: '&#127464&#127487',
    title: 'Czech'
  },
  {
    locale: 'it',
    flag: '&#127470&#127481',
    title: 'Italian'
  },
  {
    locale: 'hr',
    flag: '&#127469&#127479',
    title: 'Croatian'
  },
  {
    locale: 'sl',
    flag: '&#127480&#127470',
    title: 'Slovenian'
  },
  {
    locale: 'sk',
    flag: '&#127480&#127472',
    title: 'Slovakian'
  },
  {
    locale: 'es',
    flag: '&#127466&#127480',
    title: 'Spanish'
  },
  {
    locale: 'pt',
    flag: '&#127477&#127481',
    title: 'Portuguese'
  },
  {
    locale: 'et',
    flag: '&#127466&#127466',
    title: 'Estonian'
  },
  {
    locale: 'lv',
    flag: '&#127473&#127483',
    title: 'Latvian'
  },
  {
    locale: 'lt',
    flag: '&#127473&#127481',
    title: 'Lithuanian'
  },
  {
    locale: 'no',
    flag: '&#127475&#127476',
    title: 'Norwegian'
  },
  {
    locale: 'sv',
    flag: '&#127480&#127466',
    title: 'Swedish'
  },
  {
    locale: 'fi',
    flag: '&#127467&#127470',
    title: 'Finnish'
  },
  {
    locale: 'ru',
    flag: '&#127479&#127482',
    title: 'Russian'
  },
  {
    locale: 'uk',
    flag: '&#127482&#127462',
    title: 'Ukrainian'
  },
  {
    locale: 'el',
    flag: '&#127468&#127479',
    title: 'Greek'
  },
  {
    locale: 'tr',
    flag: '&#127481&#127479',
    title: 'Turkish'
  },
  {
    locale: 'bg',
    flag: '&#127463&#127468',
    title: 'Bulgarian'
  },
  {
    locale: 'sq',
    flag: '&#127462&#127473',
    title: 'Albanian'
  },
  {
    locale: 'hy',
    flag: '&#127462&#127474',
    title: 'Armenian'
  },
  {
    locale: 'zh',
    flag: '&#127464&#127475',
    title: 'Chinese'
  },
  {
    locale: 'hi',
    flag: '&#127470&#127475',
    title: 'Indian (Hindi)'
  },
  {
    locale: 'ar',
    flag: '&#127462&#127466',
    title: 'Arabian'
  },
  {
    flag: '&#8634;',
    title: 'Reset'
  }
]

function setLang(l = 'en', reset = false) {
  console.log(reset)
  if (reset) {
    window.Consents.clear()
    location.reload()
  }

  locale.value = l
}

</script>

<style>
  @import "/src/assets/css/global/common.css";
</style>

<style scoped>

  @media all and (max-width: 600px) {
    .language-indicator-container {
      width: max(80px, 10vw);
      opacity: 0.65;
      height: 100vh;
    }
  }
  @media all and (max-width: 1300px) {
    .language-indicator-container {
      opacity: 0.65;
    }
  }

  .language-indicator-container .language-indicator:last-child span {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 4px 0;
  }

  .language-indicator-container {
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 2;
    width: 30vw;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 16px;
  }

  .language-indicator {
    width: 60px;
    height: 60px;
    position: relative;
    display: inline-block;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background: lightblue;
    cursor: pointer;
    padding: 5px 7px;
    margin: 4px;
    font-weight: bold;
    font-size: 40px;
    user-select: none;
  }
</style>
