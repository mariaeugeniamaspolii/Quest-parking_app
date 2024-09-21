import React from 'react';
import { View } from 'react-native';
import { Text, useTheme, List } from 'react-native-paper';

import Results from './Results';


const ResultsBar = ({ list,  onPress }) => {
    const theme = useTheme();

    return (
        <View>
            <Results/>

        </View>
    )
}

export default ResultsBar;
