// @flow

'use strict';

import CountryLanguage from 'country-language';
import {getAvailableLangs, getTranslatedText} from "./TranslationApi";
import {getCountryCode} from "./GeocodingApi";
import type {AvailableLangsData, CountryLanguagesData, CountryCode} from "../commonTypes";

type GetLanguagesResult = {
    availableLangs: AvailableLangsData,
    countryLanguages: CountryLanguagesData
}

/*
Получение координат устройства
Обернем в промис для удобства работы
 */
const getPosition = () => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

/*
Получение языков по коду страны
Обернем в промис для удобства работы
 */
const getLangs = (code: CountryCode): Promise<{ languages: Array<any> }> => {
    return new Promise(function (resolve, reject) {
        CountryLanguage.getCountry(
            code,
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            }
        );
    });
};

/*
Функция получает языки, используемые в стране
 */
const getCountryLangs = async () => {

    let position;

    //1.Получим координаты устройства
    try {
        position = await getPosition();
    } catch (error) {
        console.log('get position failed ', error);
        return {ok: false, statusText: 'get position failed'}
    }
    //2.Получим код страны
    const countryInfo = await getCountryCode(position.coords);
    if (!countryInfo.ok) {
        return {ok: false, statusText: countryInfo.statusText}
    }

    //3.Получим коды языков, используемые в стране
    try {
        const {languages} = await getLangs(countryInfo.data);
        return {ok: true, data: languages.map((i) => i.iso639_1)}
    } catch (error) {
        console.log('Get country langs failed:', error);
        return {ok: false, statusText: 'Get country langs failed'}
    }

};

/*
Функция возвращает объект, содержащий доступные в api языки и языки, используемуе в текущей стране
 */
export const getLanguages = async (): Promise<GetLanguagesResult> => {

    //Возможно, получение доступных язков нужно выделить в отдельную функцию и вызывать при инициализации приложения

    const [availableLangs, countryLanguages] = await Promise.all([getAvailableLangs(), getCountryLangs()]);

    return {availableLangs, countryLanguages}


};

export const getTranslation = (textParams: { text: string, lang: string }): Promise<{ ok: boolean, data?: string, statusText?: string }> => {

    return getTranslatedText(textParams);

};
