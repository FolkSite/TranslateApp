// @flow

'use strict';

import * as React from 'react';
import {View, StyleSheet, Button} from 'react-native';

type Props = {
    title: string,
    onPress: () => any
}

export default class MyButton extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View
                style={styles.button}
            >
                <Button
                    {...this.props}
                >
                </Button>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 10
    }
});
