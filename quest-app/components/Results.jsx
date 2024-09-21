import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import ResultsFilters from './ResultsFilters';

const Results = ({ items }) => {
    const theme = useTheme();
    //logica para num de resultados (aca o en la pag anterior)

    const num= 8;

    return (
        <View style={styles.container}>
            <Text variant="bodySmall" style={{ fontFamily: 'Lexend', color: theme.colors.secondary }}>{num} Resultados</Text>
            <ResultsFilters />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
});

export default Results;
