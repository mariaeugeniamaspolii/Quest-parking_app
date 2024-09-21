import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GaragesScreen from '../views/Admin/Garages';
import GarageDetailScreen from '../views/Admin/GarageDetail';
import NewGarageScreen from '../views/Admin/NewGarage';

import SearchBar from '../components/SearchBar';


const forFade = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
    ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });
    return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
    };
};

const AdminTab = () => {
    const Stack = createStackNavigator();
    const navigation = useNavigation();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Garages"
                component={GaragesScreen}
                options={{
                    header: () => (
                        <View style={{ paddingTop: 56, paddingLeft: 16, paddingRight: 16 }}>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="GarageDetail"
                component={GarageDetailScreen}
                options={{
                    headerStyleInterpolator: forFade,
                    header: () => (
                        <View style={{ paddingTop: 56, paddingLeft: 16, paddingRight: 16 }}>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="NewGarage"
                component={NewGarageScreen}
                options={{
                    headerStyleInterpolator: forFade,
                    header: () => (
                        <View style={{ paddingTop: 56, paddingLeft: 16, paddingRight: 16 }}>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default AdminTab;