export interface Consent {
    accepted: boolean,
    partial: boolean,
    cookies: Array<Cookie>
}
export interface Cookie {
    accepted: boolean,
}

export interface Id {
    categoryId: number,
    cookieId: number
}
