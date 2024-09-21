import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, Icon } from 'react-native-paper';

const ResultsFilters = ({ items }) => {
    const theme = useTheme();
    // lógica para el número de resultados (aquí o en la página anterior)

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.itemContainerL, { borderColor: theme.colors.primary }]}
                onPress={() =>  onPress &&  onPress('1234')}>
                <Icon
                    source="map-marker-outline"
                    color={theme.colors.primary}
                    size={16}
                    style={[styles.icon]}
                />
                <Text variant="bodySmall" style={[styles.subtitle, { color: theme.colors.primary }]}>
                    Mapa
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.itemContainerR, { borderColor: theme.colors.primary }]}
                onPress={() =>  onPress &&  onPress('1234')}>
                <Icon
                    source="tune-variant"
                    color={theme.colors.primary}
                    size={16}
                    style={[styles.icon]}
                />
                <Text variant="bodySmall" style={[styles.subtitle, { color: theme.colors.primary }]}>
                    Filtros
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    itemContainerL: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        borderRightWidth: 1,
    },
    itemContainerR: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
    },
    subtitle: {
        fontFamily: 'Lexend',
        marginLeft: 8,
    },
});

export default ResultsFilters;
