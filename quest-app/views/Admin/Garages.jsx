import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme, SegmentedButtons, Text } from 'react-native-paper';

import ListParkings from '../../components/ListParkings';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Snackbar from '../../components/Snackbar';

import { useUser } from '../../contexts/UserContext';

const GaragesScreen = ({ route }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, setUserName } = useUser();
    console.log('USUARIO: ', user);
    console.log('NOMBRE anidado: ', user.user.name);


    useEffect(() => {
        if (route.params?.showSuccessSnackbar) {
            setShowSuccessSnackbar(true);
        }
    }, [route.params?.showSuccessSnackbar]);

    const navigateToCreateNewGarage = () => {
        navigation.navigate('NewGarage');
    };

    const [value, setValue] = useState('parkings');
    useEffect(() => {
        setValue('parkings');
    }, []);

    useEffect(() => {
        fetch('http://192.168.31.239:3030/api/parkings')
            .then((res) => res.json())
            .then((data) => {
                setParkings(data.parkings);
                setLoading(false);
            })
            .catch(console.error);
    }, []);


    return (
        <View>

            <ScrollView contentContainerStyle={styles.tabContainer}>
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    checkedColor={theme.colors.text1}
                    activeColor={theme.colors.text1}
                    buttons={[
                        {
                            value: 'parkings',
                            label: 'Parkings',
                            style: {
                                backgroundColor: value === 'parkings' ? theme.colors.primary : theme.colors.surfaceVariant,
                                borderWidth: 0,
                            },
                            labelStyle: {
                                color: value === 'parkings' ? theme.colors.text1 : theme.colors.primary,
                            },

                        },
                        {
                            value: 'properties',
                            label: 'Propiedades',
                            style: {
                                backgroundColor: value === 'properties' ? theme.colors.primary : theme.colors.surfaceVariant,
                                borderWidth: 0,
                            },
                            labelStyle: {
                                color: value === 'properties' ? theme.colors.text1 : theme.colors.primary,
                            },
                        },
                    ]}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContents: 'space-between', marginTop: 24, marginBottom: 8 }}>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={{ color: theme.colors.primary }}>Tus parkings: </Text>
                        <Text variant="titleMedium" style={{ color: theme.colors.primary, fontFamily: 'LexendBold' }}>{user ? user.user.name : 'N/A'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigateToCreateNewGarage()} style={{ marginLeft: 'auto' }}>

                        <Button label="Agregar garaje"
                            icon="plus"
                            bgColor={theme.colors.surfaceVariant}
                            txColor={theme.colors.primary}
                            font='Lexend'
                            Bstyle="small"
                        />
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <View>
                        <Loader />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <ListParkings array={parkings} />
                    </View>
                )}
            </ScrollView>
            <View>
                <Snackbar
                    visible={showSuccessSnackbar}
                    text="¡Estacionamiento creado exitosamente!"
                    BgColor={theme.colors.success}
                    onDismiss={() => setShowSuccessSnackbar(false)}
                    style={{ paddingBottom: 0 }}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexGrow: 1,
        fontFamily: 'Lexend',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
    },
});
export default GaragesScreen;
