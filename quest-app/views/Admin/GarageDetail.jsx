import { View, Text } from 'react-native'
import React from 'react'

const GarageDetail = ({ route }) => {
    const { garageId } = route.params;

    return (
        <View>
            <Text>GarageDetail {garageId}</Text>
        </View>
    )
}

export default GarageDetail