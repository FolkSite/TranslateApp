// @flow

'use strict';

import * as React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Input, Button} from '../components/index';
import ModalFilterPicker from 'react-native-modal-filter-picker';

type Props = {
    inputTitle: string,
    onInputChange: () => any,
    inputValue: string,
    outputTitle: string,
    outputValue: string,
    onOutputChange: () => any,
    buttonTitle: string,
    onPressButton: () => any,
    targetLang: string,
    buttonDisabled: boolean,
    onPressTargetLang: () => any,
    targetLangDisabled: boolean,
    langOptions: Array<{key: string, label: string}>,
    onLangSelect: (string) => any
}

type State = {
    langPickerVisible: boolean
}

export default class TranslateForm extends React.Component<Props, State> {

   constructor(props: Props) {
       super(props);
       this.state = {langPickerVisible: false}
   };

    onPressTargetLang = () => {
        this.setState({langPickerVisible: true});
    };

    onSelectLang = (lang: string) => {
        this.props.onLangSelect(lang);
        this.setState({langPickerVisible: false});
    };

    render() {
        const {
            inputTitle,
            inputValue,
            onInputChange,
            outputTitle,
            outputValue,
            onOutputChange,
            buttonTitle,
            onPressButton,
            targetLang,
            buttonDisabled,
            targetLangDisabled,
            langOptions
        } = this.props;

        const {langPickerVisible} = this.state;

        return (
            <ScrollView style={styles.container}>
                <Input
                    title={inputTitle}
                    value={inputValue}
                    multiline={true}
                    onChangeText={onInputChange}
                >
                </Input>
                <Button
                    title={buttonTitle}
                    onPress={onPressButton}
                    disabled={buttonDisabled}
                >
                </Button>
                <TouchableOpacity
                    onPress={this.onPressTargetLang}
                    disabled={targetLangDisabled}
                >
                    <Text style={styles.targetLang}>
                        {targetLang ? targetLang : '<не определен>'}
                    </Text>
                </TouchableOpacity>
                <Input
                    title={outputTitle}
                    value={outputValue}
                    multiline={true}
                    autoCorrect={false}
                    onChangeText={onOutputChange}
                >
                </Input>
                <ModalFilterPicker
                    visible={langPickerVisible}
                    onSelect={this.onSelectLang}
                    onCancel={() => {
                        this.setState({langPickerVisible: false})
                    }}
                    modal={{
                        onRequestClose: () => {
                            this.setState({langPickerVisible: false})
                        }
                    }}
                    options={langOptions}
                    cancelButtonText={'Отмена'}
                    noResultsText={'Нет совпадений'}
                />
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    targetLang: {
        color: '#000000',
        fontSize: 16
    }
});