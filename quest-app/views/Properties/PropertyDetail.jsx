import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import CBottomSheet from '../../components/BottomSheet';
import Button from '../../components/Button';
import HorizontalSwiper from '../../components/HorizontalSwiper';


const PropertyDetailScreen = ({ route }) => {
    const theme = useTheme();
    const { propertyId } = route.params;

    const bottomSheetRef = useRef(null);
    const handleSheetClose = () => bottomSheetRef.current?.close();
    const handleSheetOpen = () => bottomSheetRef.current?.expand();
    const snapSheetToIndex = (index) => bottomSheetRef.current?.snapToIndex(index);

    const imagesArray = [
        'https://static.fotocasa.es/images/anuncio/2022/12/10/176107782/2725572794.jpg?rule=web_412x257', 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXazOP8IYeY9MiQa2IDymMprxYSYcHdsaQcbekgtRgDws3ZvMUd1PfKHnJDeytLH9Bc&usqp=CAU',
    ];

    return (
        <View style={styles.tabContainer}>
            <View style={styles.container}>
                <Text>{`Map for Property ID ${propertyId}`}</Text>
            </View>
            <CBottomSheet
                index={1}
                ref={bottomSheetRef}
                snaps={['22%', '50%', '98%']}
                enablePanDownToClose={false}
                content={
                    <View style={styles.bottomSheetContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Text variant="headlineSmall" style={{ color: theme.colors.primary, marginBottom: 12, fontFamily: "LexendBold" }}>
                                21 de Septiembre 1122
                            </Text>
                            <Text variant="titleMedium" style={[styles.title, { fontFamily: 'LexendBold', color: theme.colors.primary }]}>
                                3.500
                            </Text>

                        </View>
                        <View style={styles.details}>
                            <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                                50 mt
                            </Text>
                            <View style={[styles.line, { backgroundColor: theme.colors.secondary }]} />
                            <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                                Matutino
                            </Text>
                            <View style={[styles.line, { backgroundColor: theme.colors.secondary }]} />
                            <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                                Grande
                            </Text>
                            <View style={[styles.line, { backgroundColor: theme.colors.secondary }]} />
                            <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                                Vigilancia
                            </Text>
                        </View>
                        <HorizontalSwiper array={imagesArray} />
                        <View style={{marginVertical: 24}}>

                        <Text variant="titleMedium" style={{ fontFamily: 'LexendBold', color: theme.colors.primary }}>
                            Descripción
                        </Text>
                        <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
                            Garaje en edificio seguro con vigilancia y portero con fácil acceso.
                        </Text>
                        </View>

                    </View>
                }></CBottomSheet>
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


export default PropertyDetailScreen;
