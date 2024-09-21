import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import CBottomSheet from '../../components/BottomSheet';
import Button from '../../components/Button';
import HorizontalSwiper from '../../components/HorizontalSwiper';

import Loader from "../../components/Loader";

const ParkingsScreen = ({ route }) => {
    const parkingId = route.params.parkingId;
    const theme = useTheme();

    const [parking, setParking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://192.168.31.239:3030/api/parkings/${parkingId}`)
            .then((res) => res.json())
            .then((data) => {
                setParking(data.parking);
                setLoading(false);
            })
            .catch(console.error);
    },[]);

    return (
        <View style={styles.tabContainer}>
            <View style={styles.container}>
                <Text>{`Map for Parking ${parking.name}`}</Text>
            </View>
            <CBottomSheet
    index={1}
    snaps={['22%', '50%', '74%']}
    enablePanDownToClose={false}
    content={
        <View style={styles.bottomSheetContent}>
            {loading ? (
                <View>
                    <Loader />
                </View>
            ) : (
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text variant="headlineSmall" style={{ color: theme.colors.primary, marginBottom: 12, fontFamily: "LexendBold" }}>
                            {parking.name}
                        </Text>
                        <Text variant="titleMedium" style={[styles.title, { fontFamily: 'LexendBold', color: theme.colors.primary }]}>
                            ${parking.hourPrice}
                        </Text>
                    </View>
                    <View style={styles.details}>
                        <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                            {parking.slots} cupos
                        </Text>
                        <View style={[styles.line, { backgroundColor: theme.colors.secondary }]} />
                        <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                            ${parking.monthPrice} / mes
                        </Text>
                    </View>
                    <HorizontalSwiper array={parking.images} />
                    <View style={{ marginVertical: 24 }}>
                        <Text variant="titleMedium" style={{ fontFamily: 'LexendBold', color: theme.colors.primary }}>
                            Descripción
                        </Text>
                        <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                            El parking cuenta con más de 20 años de experiencia brindándo el mejor servicio para todos. Equipado con seguridad y vigilancia 24h.
                        </Text>
                    </View>
                </>
            )}
        </View>
    }
></CBottomSheet>
            <Button label='Reservar estacionamiento' icon='sign-direction' font='Lexend' style={{ position: 'absolute', bottom: 16, right: 16 }} />

        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexGrow: 1,
        paddingTop: 24,
    },
    container: {
        padding: 16,
    },
    bottomSheetContent: {
        flex: 1,
        paddingTop: 4,
    },
    input: {
        padding: 8,
        width: 100,
        borderRadius: 8
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },
    line: {
        width: 1,
        height: '70%',
        marginHorizontal: 8,
    },
});


export default ParkingsScreen;
