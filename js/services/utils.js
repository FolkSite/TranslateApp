// @flow

'use strict';

/*
Общие служебные функции
 */

export const fetchData = async (url: string, params: {}) => {

    let serverResponse;
    let result;

    if (params) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(params);
    }

    console.log('connecting... ', url);

    try {
        serverResponse = await fetch(url);
    } catch (error) {
        const statusText = error.message + ': ' + url;
        console.log(statusText);
        result = {ok: false, statusText}
    }

    if (serverResponse && !serverResponse.ok) {
        const statusText = 'Server request error: ' + serverResponse.status;
        console.log('Server request error', serverResponse);
        result = {ok: false, statusText}
    }

    if (!result) {
        result = await parseJSON(serverResponse);
    }

    return result;
};

const queryParams = (params) => {

    return Object.keys(params)
        .map(i => encodeURIComponent(i) + '=' + encodeURIComponent(params[i]))
        .join('&');

};

const parseJSON = async (response: Response) => {

    let result;

    try {
        const data = await response.json();
        result = {'ok': true, data: data}
    } catch (error) {
        const statusText = error.message + ': ' + response;
        console.log(error.message, response);
        result = {'ok': false, statusText};
    }

    return result;

};
