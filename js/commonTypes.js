// @flow

export type CountryCode = string

//Доступные к переводу языки. Ключ - код страны, значение - наименование
export type AvailableLangs = { [CountryCode]: string }
//Ok - признак успешного получения данных, statusText - описание ошибки, в случае неудачи
export type AvailableLangsData = { ok: boolean, data?: AvailableLangs, statusText?: string }
//Массив кодов языков, используемых в стране
export type CountryLanguages = Array<CountryCode>
//Ok - признак успешного получения данных, statusText - описание ошибки, в случае неудачи
export type CountryLanguagesData = { ok: boolean, data?: CountryLanguages, statusText?: string }