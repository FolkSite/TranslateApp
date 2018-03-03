// @flow

'use strict';

import {GEOCODER_API_ADDRESS, GEOCODER_API_KEY} from "./constants";
import {fetchData} from "../utils";
import type {CountryCode} from "../../commonTypes";

type apiResult = {
    ok: boolean,
    data?: { countryCode: CountryCode },
    statusText?: string
}

export const getCountryCode = async (position: { latitude: number, longitude: number }) => {

    let result;

    const params = {
        'lat': position.latitude,
        'lng': position.longitude,
        'username': GEOCODER_API_KEY
    };

    const apiResult: apiResult = await fetchData(GEOCODER_API_ADDRESS, params);

    if (apiResult.ok && apiResult.data && apiResult.data.countryCode) {
        result = {ok: true, data: apiResult.data.countryCode}
    } else {
        console.log('get country failed ', apiResult);
        result = {ok: false, statusText: apiResult.statusText}
    }

    return result;

};