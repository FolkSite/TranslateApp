// @flow

'use strict';

import {TRANSLATE_API_ADDRESS, TRANSLATE_API_TOKEN} from "./constants";
import {fetchData} from "../utils";
import type {AvailableLangs, AvailableLangsData} from "../../commonTypes";

type getLangsResponse = {
    langs: AvailableLangs
}
type apiLangsResult = {
    ok: boolean,
    data?: getLangsResponse,
    statusText?: string
}
type apiTransResult = {
    ok: boolean,
    data?: { code: number, text: Array<string> },
    statusText?: string
}
type translateTextResult = {
    ok: boolean,
    data?: string,
    statusText?: string
}
type textParam = {
    lang: string,
    text: string
}

export const getAvailableLangs = async (): Promise<AvailableLangsData> => {

    let result;

    const params = {
        'key': TRANSLATE_API_TOKEN,
        'ui': 'ru'
    };

    const apiResult: apiLangsResult = await fetchData(TRANSLATE_API_ADDRESS + '/getLangs', params);

    if (apiResult.ok && apiResult.data) {
        result = {ok: true, data: apiResult.data.langs}
    } else {
        result = {ok: false, statusText: apiResult.statusText}
    }

    return result;

};

export const getTranslatedText = async (textParams: textParam): Promise<translateTextResult> => {

    let result;

    const params = {
        'key': TRANSLATE_API_TOKEN,
        'lang': textParams.lang,
        'text': textParams.text
    };

    const apiResult: apiTransResult = await fetchData(TRANSLATE_API_ADDRESS + '/translate', params);

    if (apiResult.ok && apiResult.data && apiResult.data.code === 200) {
        result = {ok: true, data: apiResult.data.text[0]}
    } else {
        result = {ok: false, statusText: apiResult.statusText}
    }

    return result;

};
