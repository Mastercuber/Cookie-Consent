<template>
  <div id="cookie-consent">
    <div
        class="settings-icon-container"
        :title="t('generalLabels.title')"
        @click="maximize($event)"
    >
      <span class="settings-icon"/>
    </div>
    <div
        v-if="showConsent"
        id="overlay"
        class="w-full h-full fixed top-0 left-0"
        :class="{ 'hidden': isMinimized, 'blur-overlay-reverse': blurOverlayReverse }"
    >
      <div
          id="container"
          :dir="locale === 'ar' ? 'rtl' : 'ltr'"
          class="rounded py-2 px-4 text-center bg-white relative w-[var(--cookie-consent-width)] h-[var(--cookie-consent-height)] overflow-x-hidden overflow-y-auto mx-auto my-[8vh] sm:my-[25vh]"
      >
        <div id="cookie-consent-opacity-container">
          <div v-if="isMainContainerVisible">
            <header>
              <div class="relative z-10">
                <span
                    class="cookie-consent-info font-bold"
                    :title="t('generalLabels.info.title')"
                    @click="toggleInfo()"
                ></span>
                <div
                    class="rounded w-full h-max bg-blue-200 absolute top-[32px] left-[3px]"
                    :class="{ 'cookie-consent-info-hide': !isInfoOpen }"
                >
                  <span class="absolute arrow-up top-[-4px] left-[5px]"/>
                  <p
                      class="text-[13px] px-2 text-left my-1 mx-0"
                      style="line-height: 1.2"
                  >
                    {{ t('generalLabels.info.text') }}
                  </p>
                </div>
              </div>
              <a
                  rel="nofollow"
                  href="#"
                  class="minimizer"
                  :title="t('generalLabels.minimize')"
                  @click="minimize($event)"
              />
              <a
                  rel="nofollow"
                  href="#"
                  class="clear-site"
                  :title="t('generalLabels.clearSite')"
                  @click="clearSite($event)"
              />
              <div class="inline-flex h-[45px] mt-6">
                <span class="select-none text-[36px]">&#127850;</span>
                <h4 class="select-none font-bold mt-[10px]">
                  {{ t('generalLabels.title') }}
                </h4>
              </div>
              <hr class="mt-5 mb-2 mx-0 rounded-b-2xl">
              <p>{{ t('generalLabels.description.main') }}</p>
              <hr class="mt-2 mb-3.5 rounded-t-2xl">
            </header>

            <div class="categories">
              <div
                  v-for="(category, index) in categories"
                  :key="category.id"
                  class="relative inline-flex" :class="{'ml-4': index > 0}"
              >
                <div class="relative w-[20px] h-[20px] flex checkbox-container">
                  <input
                      :id="`cookie-consent-checkbox-${category.id}`"
                      type="checkbox"
                      :checked="consents[index].accepted"
                      :disabled="index === 0"
                      class="m-0"
                      @change="setCategoryConsent($event, index)"
                  >
                  <span
                      v-if="index > 0 && consents[index].partial"
                      class="checkbox-partial-indicator"
                  />
                  <span
                      v-if="index > 0 && !consents[index].partial && !consents[index].accepted"
                      class="checkbox-none-indicator"
                  />
                </div>
                <label
                    :for="`cookie-consent-checkbox-${category.id}`"
                    class="ml-2 rtl:mr-2 select-none hover:text-orange-400"
                >{{ category.label }}</label>
              </div>

              <div>
                <button
                    class="btn"
                    @click="acceptAll()"
                >
                  {{ t('generalLabels.button.acceptAll') }}
                </button>
                <button
                    class="btn"
                    @click="acceptSelection()"
                >
                  {{ t('generalLabels.button.acceptSelection') }}
                </button>
              </div>
            </div>

            <div
                id="link-container"
                class="bg-white rounded-t-lg sticky pb-3 -bottom-2"
            >
              <div class="my-[6px] rounded-lg">
                <a
                    rel="nofollow"
                    href="#"
                    class="font-bold shadow-green-700 hover:shadow-[0_0_10px_green] text-[var(--cookie-consent-settings-color)] w-full h-full p-0.5 block"
                    @click="showDetails($event)"
                >{{
                    t('generalLabels.individualSettings')
                  }}</a>
              </div>
              <a
                  class="hover:text-orange-400"
                  rel="nofollow"
                  href="#"
                  @click="showDetails($event)"
              ><b>{{ t('generalLabels.cookieDetails') }}</b></a>
              <a
                  rel="nofollow"
                  :href="t('generalLabels.requiredLinks.privacy.href')"
              ><b>{{
                  t('generalLabels.requiredLinks.privacy.title')
                }}</b></a>
              <a
                  rel="nofollow"
                  :href="t('generalLabels.requiredLinks.impress.href')"
              ><b>{{
                  t('generalLabels.requiredLinks.impress.title')
                }}</b></a>
              <a
                  v-for="link in links"
                  :key="link.title"
                  rel="nofollow"
                  :href="link.href"
              ><b>{{ link.title }}</b></a>
            </div>
          </div>

          <div
              v-else
              id="details-container"
              class="text-left"
          >
            <header>
              <a
                  rel="nofollow"
                  href="#"
                  class="absolute right-10 font-bold pt-[5px] pb-[10px] pl-[16px] pr-[12px]"
                  @click="showMain($event)"
              >{{ t('generalLabels.details.back') }}</a>
              <a
                  rel="nofollow"
                  href="#"
                  class="minimizer"
                  :title="t('generalLabels.minimize')"
                  @click="minimize($event)"
              ><span>-</span></a>
              <div class="inline-flex h-[45px] mt-[20px] rtl:mt-[30px]">
                <span class="select-none text-[36px]">&#127850;</span>
                <h4 class="select-none font-bold mt-[10px]">
                  {{ t('generalLabels.title') }}
                </h4>
              </div>
              <hr class="my-2 mx-0 rounded-b-2xl">
              <p class="text-center">
                {{ t('generalLabels.description.details') }}
              </p>
              <hr class="mt-2 mb-3.5 rounded-t-2xl">
              <div>
                <button @click="acceptAll()">
                  {{ t('generalLabels.button.acceptAll') }}
                </button>
                <button @click="acceptSelection()">
                  {{ t('generalLabels.button.acceptSelection') }}
                </button>
              </div>
              <!--              <div>
                <div class="w-full tab-container">
                  <div class="w-1/2 h-[45px] text-center inline-block cursor-pointer" :class="{ 'active-tab': currentTab === 'cookies' }" @click="currentTab = 'cookies'"><span>Cookies</span></div>
                  <div class="w-1/2 h-[45px] text-center inline-block cursor-pointer" :class="{ 'active-tab': currentTab === 'fonts' }" @click="currentTab = 'fonts'"><span>Fonts</span></div>
                </div>
                <hr class="mb-2 p-0 m-0 rounded-b-2xl hover:cursor-pointer"/>
              </div>-->
            </header>

            <div
                v-for="(category, categoryIndex) in categories"
                :key="category.id"
                :ref="el => { detailsCards[categoryIndex] = el }"
                class="cookie-details-card w-full rounded relative px-3 my-4 mx-2"
            >
              <div
                  v-if="categoryIndex > 0"
                  class="rtl:right-auto rtl:left-0 inline-flex absolute right-0 top-0"
              >
                <span
                    class="select-none mt-[12px] rtl:mt-[6px]"
                    :class="{ 'hidden': !consents[categoryIndex].accepted }"
                >{{
                    t('generalLabels.binarySliderLabels.accepted')
                  }}</span>
                <span
                    class="select-none mt-[12px] rtl:mt-[6px]"
                    :class="{ 'hidden': consents[categoryIndex].accepted || consents[categoryIndex].partial }"
                >{{
                    t('generalLabels.binarySliderLabels.declined')
                  }}</span>
                <span
                    class="select-none mt-[12px] rtl:mt-[6px]"
                    :class="{ 'hidden': !consents[categoryIndex].partial }"
                >{{
                    t('generalLabels.binarySliderLabels.partial')
                  }}</span>
                <div>
                  <div
                      :id="`cookie-consent-details-checkbox-${category.id}`"
                      class="binary-slider m-[8px]"
                      :class="{ active: consents[categoryIndex].accepted, partial: consents[categoryIndex].partial }"
                      @click="toggleConsent($event, categoryIndex)"
                  >
                    <span class="binary-slider-circle"/>
                  </div>
                </div>
              </div>
              <div class="label-container pt-4">
                <h5 class="mt-2 mb-1 ltr:before:content-[''] ltr:before:border-2 ltr:before:border-solid ltr:before:border-black ltr:before:mr-4 rtl:border-r-4 rtl:border-solid rtl:border-black rtl:text-right rtl:pr-2 font-bold">
                  {{ category.label }} ({{ getCookieCountForCategory(category) }})
                </h5>
              </div>

              <p>{{ category.description }}</p>
              <a
                  rel="nofollow"
                  href="#"
                  class="text-center block font-bold"
                  @click="toggleCookieInformation($event)"
              >{{ t('generalLabels.showCookieInformation') }}</a>

              <div class="table-container h-0 transition-all duration-700 overflow-hidden">
                <table
                    v-for="(cookie, cookieIndex) in category.cookies"
                    :key="cookie.cookieName"
                >
                  <tr v-if="categoryIndex > 0">
                    <td>{{ t('cookieLabels.accept') }}</td>
                    <td>
                      <div class="table-binary-slider-container">
                        <div
                            class="binary-slider"
                            :class="{ 'active': consents[categoryIndex].cookies[cookieIndex].accepted }"
                            @click="toggleConsent($event, categoryIndex, cookieIndex)"
                        >
                          <span class="binary-slider-circle"/>
                        </div>
                        <div
                            class="select-none mt-0 ml-2 rtl:mr-2 rtl:-mt-[8px]"
                            :class="{ '!hidden': !consents[categoryIndex].cookies[cookieIndex].accepted }"
                        >
                          {{ t('generalLabels.binarySliderLabels.accepted') }}
                        </div>
                        <div
                            class="select-none mt-0 ml-2 rtl:mr-2 rtl:-mt-[8px]"
                            :class="{ '!hidden': consents[categoryIndex].cookies[cookieIndex].accepted }"
                        >
                          {{ t('generalLabels.binarySliderLabels.declined') }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ t('cookieLabels.name') }}</td>
                    <td v-if="categoryIndex === 0 && cookieIndex === 0 && useMetaCookie">
                      {{ t('metaCookieTitles.name') }}
                    </td>
                    <td v-else>
                      {{ cookie.name }}
                    </td>
                  </tr>
                  <tr>
                    <td>{{ t('cookieLabels.provider') }}</td>
                    <td v-if="categoryIndex === 0 && cookieIndex === 0 && useMetaCookie">
                      {{ t('metaCookieTitles.provider') }}
                    </td>
                    <td v-else>
                      {{ cookie.provider }}
                    </td>
                  </tr>
                  <tr>
                    <td>{{ t('cookieLabels.purpose') }}</td>
                    <td v-if="categoryIndex === 0 && cookieIndex === 0 && useMetaCookie">
                      {{ t('metaCookieTitles.purpose') }}
                    </td>
                    <td
                        v-else
                        style="white-space: pre-line"
                    >
                      {{ cookie.purpose }}
                    </td>
                  </tr>
                  <tr v-if="'privacyURL' in cookie">
                    <td>{{ t('cookieLabels.privacy') }}</td>
                    <td>
                      <a
                          rel="nofollow"
                          :href="cookie.privacyURL"
                      >{{ cookie.privacyURL }}</a>
                    </td>
                  </tr>
                  <tr v-if="'hosts' in cookie">
                    <td>{{ t('cookieLabels.hosts') }}</td>
                    <td v-if="categoryIndex === 0 && cookieIndex === 0 && useMetaCookie">
                      {{ t('metaCookieTitles.hosts') }}
                    </td>
                    <td v-else>
                      {{ cookie.hosts }}
                    </td>
                  </tr>
                  <tr v-if="'cookieName' in cookie">
                    <td>{{ t('cookieLabels.cookieName') }}</td>
                    <td v-if="categoryIndex === 0 && cookieIndex === 0 && useMetaCookie">
                      consents
                    </td>
                    <td v-else>
                      <i>{{ cookie.cookieName }}</i>
                    </td>
                  </tr>
                  <tr v-if="'cookieValidityPeriod' in cookie">
                    <td>{{ t('cookieLabels.cookieValidityPeriod') }}</td>
                    <td v-if="categoryIndex === 0 && cookieIndex === 0 && useMetaCookie">
                      {{
                        t('metaCookieTitles.cookieValidityPeriod')
                      }}
                    </td>
                    <td v-else>
                      {{ cookie.cookieValidityPeriod }}
                    </td>
                  </tr>
                  <tr v-if="'links' in cookie && cookie.links && cookie.links.length > 0">
                    <td>{{ t('cookieLabels.links') }}</td>
                    <td>
                      <a
                          v-for="link in cookie.links"
                          :key="link.title"
                          rel="nofollow"
                          :href="link.href"
                          target="_blank"
                      >{{ link.title || link.href }}</a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCookieConsent} from "./CookieConsentComposable"
import {useI18n} from "vue-i18n";
import {withDefaults} from "vue";
import type { Props } from '../interfaces/CookieConsentProps'

const {t, locale} = useI18n({})

// Props
const props = withDefaults(defineProps<Props>(), {
  useMetaCookie: false,
  attachGlobal: false,
  animationDuration: '1.5s',
  minimizeAnimationDuration: '1s',
  hideDuration: '1s',
  storagePrefix: 'consent',
  storageKey: 'consents',
  maskContent: true,
  maskColor: '#47494E'
})

const overlayBackgroundColor = props.maskContent ? props.maskColor : 'transparent'

const {
  toggleConsent,
  toggleInfo,
  toggleCookieInformation,
  getCookieCountForCategory,
  setCategoryConsent,
  acceptAll,
  acceptSelection,
  minimize,
  maximize,
  showMain,
  showDetails,
  clearSite,
  isInfoOpen,
  isMainContainerVisible,
  isMinimized,
  showConsent,
  blurOverlayReverse,
  links,
  categories,
  consents,
  detailsCards
} = useCookieConsent(props)

</script>

<style>
:root {
  --cookie-consent-border-color: darkgray;
  --cookie-consent-animation-duration: 1s;
  --cookie-consent-transition-duration: 0.4s;
  --cookie-consent-minimize-animation-duration: 1s;
  --cookie-consent-hide-duration: 1s;
  --cookie-consent-width: 350px;
  --cookie-consent-height: 450px;
  --cookie-consent-details-width: 600px;
  --cookie-consent-details-height: 450px;
  --cookie-consent-settings-color: green;
  --cookie-consent-minimizer-hover-color: dodgerblue;
}

@media all and (max-width: 600px) {
  :root {
    --cookie-consent-details-width: 350px;
  }
}
</style>

<style scoped>
@import '/src/assets/css/index.css';
@import "/src/assets/css/all.css";

.tab-container .active-tab {
  border-bottom: 3px solid var(--cookie-consent-border-color);
  color: orange;
}

.tab-container .active-tab span {
  display: inline-block;
  height: 1rem;
  vertical-align: middle;
  font-weight: 600;
}

.tab-container div span {
  display: inline-block;
  vertical-align: middle;
  padding-top: 0.5rem;
  height: 1rem;
}

hr {
  border: 2px solid var(--cookie-consent-border-color);
}

p {
  user-select: none;
}

#overlay {
  perspective: 1000px;
  transform-style: preserve-3d;
  background: v-bind(overlayBackgroundColor);
}

#container {
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  transform: translateZ(0);
  backface-visibility: hidden;
}

.cookie-details-card > a {
  margin-bottom: 8px;
}

#link-container > a::before {
  content: '__';
  font-size: 0.9rem;
  color: white;
  background: url('../assets/img/link.svg') no-repeat;
}

#link-container > a:not(:last-child)::after {
  content: ' | ';
  font-weight: bold;
  font-size: 20px;
  color: #333333;
}

#link-container a {
  text-decoration: none;
}

#link-container > div > a {
  color: var(--cookie-consent-settings-color);
}

#link-container > div {
  border: 1px solid var(--cookie-consent-settings-color);
  border-left: 6px solid var(--cookie-consent-settings-color);
  border-right: 6px solid var(--cookie-consent-settings-color);
}

header > div h4, header > div h5 {
  padding-inline-start: 8px;
}

.cookie-details-card {
  box-shadow: 0 0 6px gray;
}

.cookie-details-card:hover {
  box-shadow: 0 0 12px #47494E;
}

.cookie-details-card {
  background: rgba(45, 45, 45, 0.08);
  box-sizing: border-box;
  width: auto;
}

.btn {
  width: 100%;
}

#details-container {
  padding-bottom: 4px;
}

#details-container > header button {
  margin-left: 10px;
}
</style>
