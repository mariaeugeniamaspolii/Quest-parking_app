import React from 'react';
import { View } from 'react-native';
import { Text, useTheme, List, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import  ListSugestedItem from './ListSugestedItem';

const MyList = ({ list,  onPress }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const navigateToParkings = (parkingId) => {
        navigation.removeListener
        navigation.navigate('Parkings', { parkingId });
    };

    return (
        <View>
            <Text variant="bodySmall" style={{ color: theme.colors.primary }}>Búsquedas sugeridas</Text>
            <ListSugestedItem title="Casa" subtitle="dirección" avatar=""  onPress={() => navigateToParkings("1")} />
            <ListSugestedItem title="Loving Lovingson" subtitle="dirección" avatar=""  onPress={() => navigateToParkings("2")} />
            <ListSugestedItem title="Trabajo" subtitle="dirección" avatar=""  onPress={() => navigateToParkings("3")} />
            <ListSugestedItem title="Garaje de Tito" subtitle="dirección" avatar=""  onPress={() => navigateToParkings("4")} />
            <View style={{flexDirection: 'row', marginVertical: 16}}>
                <Button icon="plus-circle-outline" labelStyle={{ fontSize: 24, color: theme.colors.secondary }}></Button>
                <Text variant="bodyMedium" style={{color: theme.colors.primary, lineHeight: 28}}>Nuevo destino</Text>
            </View>
        </View>
    )
}

export default MyList;
