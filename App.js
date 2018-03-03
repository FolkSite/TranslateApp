// @flow

'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Translate from './js/translate/index';

type Props = {};

export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <Translate>
                </Translate>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
