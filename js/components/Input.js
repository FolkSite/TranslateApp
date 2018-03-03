// @flow

'use strict';

import * as React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

type Props = {
    title?: string
}

type State = {
    sourceText: string,
    result: string
}

export default class Input extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.title ?
                    (
                        <Text
                            style={styles.Title}
                        >
                            {this.props.title}
                        </Text>
                    )
                    : null}
                <TextInput
                    style={styles.InputField}
                    multiline={true}
                    {...this.props}
                >
                </TextInput>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 4
    },
    Title: {
        marginBottom: 4
    },
    InputField: {
        fontSize: 14,
        borderWidth: 1,
        borderRadius: 4
    }
});