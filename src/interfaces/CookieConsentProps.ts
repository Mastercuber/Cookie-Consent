export interface Link {
    title: string,
    href: string
}

export interface Cookie {
    id: string,
    name: string,
    purpose: string,
    provider?: string,
    cookieName?: string,
    cookieValidityPeriod?: string,
    onAccepted?: Function,
    onDenied?: Function,
    privacyURL?: string,
    links?: Array<Link>,
    hosts?: string
}

export interface Category {
    id: string,
    label: string,
    description?: string,
    cookies?: Array<Cookie>
}

export interface RequiredLinksProps {
    privacy: Link,
    impress: Link
}

export interface Props {
    categories: Array<Category>,
    requiredLinks: RequiredLinksProps,
    links?: Array<Link>,
    useMetaCookie?: boolean,

    animationDuration?: string,
    minimizeAnimationDuration?: string,
    hideDuration?: string,
    storagePrefix?: string,
    storageConsentsKey?: string,
    maskContent?: boolean,
    maskColor?: string
}
export default Props
