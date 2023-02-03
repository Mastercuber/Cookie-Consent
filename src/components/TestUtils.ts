import { expect } from 'vitest'
import {ref, unref, Ref} from "vue";
import {VueWrapper} from "@vue/test-utils";

export let wrapper: Ref<VueWrapper> = ref() as Ref<VueWrapper>

export function checkCategoryConsents(categoryIndex: number, value: boolean, othersValue: boolean) {
  for (let i=1; i < wrapper.value.vm.consents.length; i++) {
    for (const consent of wrapper.value.vm.consents[i].cookies) {
      if (i === categoryIndex) {
        expect(consent.accepted).toEqual(value)
      } else expect(consent.accepted).toEqual(othersValue)
    }
  }
}

export function checkStorageCategoryConsents(categoryId: string, value: boolean, othersValue: boolean) {
  const storageObject = JSON.parse(localStorage.getItem(window.Consents.storageKey))

  for (const key in storageObject) {
    if (key.startsWith(`consent-${categoryId}`)) {
      expect(storageObject[key]).toEqual(value)
    } else expect(storageObject[key]).toEqual(othersValue)
  }
}

export function checkAllConsentsDenied() {
  expect(unref(wrapper).vm.consents[1].cookies[0].accepted).false
  expect(unref(wrapper).vm.consents[1].cookies[1].accepted).false
  expect(unref(wrapper).vm.consents[1].cookies[2].accepted).false
  expect(unref(wrapper).vm.consents[2].cookies[0].accepted).false
  expect(unref(wrapper).vm.consents[2].cookies[1].accepted).false
  expect(unref(wrapper).vm.consents[3].cookies[0].accepted).false
  expect(unref(wrapper).vm.consents[3].cookies[1].accepted).false
  expect(unref(wrapper).vm.consents[4].cookies[0].accepted).false
  expect(unref(wrapper).vm.consents[4].cookies[1].accepted).false
}

export function checkAllConsentsAccepted() {
  expect(unref(wrapper).vm.consents[1].cookies[0].accepted).true
  expect(unref(wrapper).vm.consents[1].cookies[1].accepted).true
  expect(unref(wrapper).vm.consents[1].cookies[2].accepted).true
  expect(unref(wrapper).vm.consents[2].cookies[0].accepted).true
  expect(unref(wrapper).vm.consents[2].cookies[1].accepted).true
  expect(unref(wrapper).vm.consents[3].cookies[0].accepted).true
  expect(unref(wrapper).vm.consents[3].cookies[1].accepted).true
  expect(unref(wrapper).vm.consents[4].cookies[0].accepted).true
  expect(unref(wrapper).vm.consents[4].cookies[1].accepted).true
}

/**
 * @param categoryIndex
 * @param cookieIndex
 * @param value the value of the cookie
 * @param othersValue the value for all other cookies
 */
export function checkConsent(categoryIndex: number, cookieIndex: number, value: boolean, othersValue: boolean) {
  expect(unref(wrapper).vm.consents[categoryIndex].cookies[cookieIndex].accepted).toEqual(value)

  for (let i=1; i < unref(wrapper).vm.consents.length; i++) {
    for (let j=0; j < unref(wrapper).vm.consents[i].cookies.length; j++) {
      if (categoryIndex === i && cookieIndex === j) continue
      expect(unref(wrapper).vm.consents[i].cookies[j].accepted).toEqual(othersValue)
    }
  }
}

export function isSaved() {
  return window.Consents.storageKey in localStorage
}

export function checkAllConsentsInStorageAccepted() {
  const consents = JSON.parse(localStorage.getItem(window.Consents.storageKey))

  for (const key in consents) {
    expect(consents[key]).true
  }
}

export function checkAllConsentsInStorageDenied() {
  const consents = JSON.parse(localStorage.getItem(window.Consents.storageKey))

  for (const key in consents) {
    expect(consents[key]).false
  }
}

export function checkConsentInStorage(categoryId: string, cookieId: string, value: boolean, othersValue: boolean) {
  const key = `consent-${categoryId}-${cookieId}`
  const consents = JSON.parse(localStorage.getItem(window.Consents.storageKey))

  for (const _key in consents) {
    if (_key === key) expect(consents[key]).toEqual(value)
    else expect(consents[_key]).toEqual(othersValue)
  }
}