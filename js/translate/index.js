// @flow

'use strict';

import * as React from 'react';
import {View} from 'react-native';
import {TranslateForm} from '../components';
import {getLanguages, getTranslation} from '../services';
import type {CountryCode, AvailableLangsData} from "../commonTypes";

type Props = {}

type State = {
    sourceText: string, //Исходный текст
    resultText: string, //Перведенный текст
    availableLangs: AvailableLangsData, //Поддерживаемые языки
    targetLang: CountryCode, //Язык на который будет переведен исходный текст
    isLangFetching: boolean, //Признак опредедления языка
    isResultFetching: boolean //Признак получения результата перевода
}

export default class Translate extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            sourceText: '',
            resultText: '',
            targetLang: '',
            availableLangs: {ok: false, data: {}},
            isLangFetching: false,
            isResultFetching: false
        }
    };

    componentDidMount() {

        this.setState(
            () => {
                return {isLangFetching: true}
            },
            this.getLanguagesHandle)
    };


    render() {

        const {
            sourceText,
            resultText,
            targetLang,
            isLangFetching,
            isResultFetching,
            availableLangs
        } = this.state;

        return (
            <View>
                <TranslateForm
                    inputTitle={'Исходный текст:'}
                    onInputChange={(sourceText) => this.setState({sourceText})}
                    inputValue={sourceText}
                    outputTitle={'Перевод:'}
                    outputValue={resultText}
                    onOutputChange={(resultText) => this.setState({resultText})}
                    buttonTitle={isResultFetching ? 'Получение результата...' : 'Перевести'}
                    buttonDisabled={isResultFetching}
                    onPressButton={this.onPressTranslate}
                    targetLang={isLangFetching ? 'Определение языка...' : availableLangs.data && availableLangs.data[targetLang]}
                    targetLangDisabled={isLangFetching}
                    onLangSelect={
                        (targetLang) => {
                            this.setState({targetLang})
                        }
                    }
                    langOptions={this.getLangOptions()}
                >
                </TranslateForm>
            </View>
        )
    }

    getLanguagesHandle = async () => {

        const response = await getLanguages();

        /*
        Получим доступные к переводу языки и языки, используемые в текущей стране
        Возможно, лучшим решением будет получать список доступных языков при инициализации приложения.
        Текущий вариант подойдет лучше, если в приложеннии будут использоваться еще какие-то сервисы, не связанные
        с переводом.
         */
        const {availableLangs, countryLanguages} = response;

        let targetLang = '';

        //Из массива полученных языков установим доступный к переводу
        if (countryLanguages.ok && countryLanguages.data && availableLangs.ok) {
            countryLanguages.data.some(
                (i) => {
                    if (availableLangs.data && availableLangs.data[i]) {
                        targetLang = i;
                        return true;
                    }
                }
            );
        }

        this.setState({isLangFetching: false, availableLangs, targetLang});

    };

    onPressTranslate = () => {

        const {targetLang, sourceText} = this.state;

        if (targetLang && sourceText) {

            this.setState(
                () => {
                    return {isResultFetching: true}
                },
                this.getResultTextHandle);
        }

    };

    getResultTextHandle = async () => {

        const {sourceText, targetLang} = this.state;
        const result = await getTranslation({text: sourceText, lang: targetLang});
        if (result.ok && result.data) {
            this.setState({resultText: result.data, isResultFetching: false});
        } else {
            this.setState({resultText: sourceText, isResultFetching: false});
        }

    };


    getLangOptions = () => {

        let result;
        const {availableLangs: {data}} = this.state;
        if (data) {
            result = Object.keys(data)
                .map(
                    (i) => {
                        return {key: i, label: data[i]}
                    })
                .sort(
                    (a, b) => {
                        return a.label > b.label ? 1 : -1
                    }
                )
        } else {
            result = [];
        }

        return result;

    };
};
