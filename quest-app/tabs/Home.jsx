import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../views/Home/Home';
import ParkingsScreen from '../views/Home/Parkings';
import ParkingDetailScreen from '../views/Home/ParkingDetail';

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


const HomeTab = () => {
    const Stack = createStackNavigator();
    const theme = useTheme();
    const navigation = useNavigation();

    const navigateToParking = (parkingId) => {
        navigation.removeListener
        navigation.navigate('Parkings', { parkingId });
    };
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    header: () => (
                        // TODO NOTE: HACERLO COMPONENTE
                        // TODO NOTE: SACARLE EL FONDO AL HEADER
                        <View style={{ paddingTop: 56, paddingLeft: 16, paddingRight: 16 }}>
                            <SearchBar placeholder="¿A dónde vas?" />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Parkings"
                component={ParkingsScreen}
                options={{
                    headerStyleInterpolator: forFade,
                    header: () => (
                        <View style={{ paddingTop: 56, paddingLeft: 16, paddingRight: 16 }}>
                            <SearchBar placeholder="" propValue="Casa" />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="ParkingDetail"
                component={ParkingDetailScreen}
                title=''
                options={({ navigation }) => ({
                    headerStyle: { backgroundColor: 'transparent' },
                    headerTitle: '',
                    headerStyleInterpolator: forFade,
                    header: () => <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop:56 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'white', borderRadius: 20, padding: 16 }}>
                            <Icon
                                source="arrow-left"
                                color={theme.colors.primary}
                                size={16}
                                style={{ padding: 16 }}
                            />
                        </TouchableOpacity>
                    </View>,
                })}
            />
        </Stack.Navigator>
    );
};

export default HomeTab;