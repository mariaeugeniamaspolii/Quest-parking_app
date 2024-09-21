import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeProvider, useNavigation } from '@react-navigation/native';
import BottomSheet, { BottomSheetTextInput, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { Text, List, useTheme, SegmentedButtons, Icon } from 'react-native-paper';

import ListProperties from '../../components/ListProperties';
import CBottomSheet from '../../components/BottomSheet';
import Button from '../../components/Button';


const PropertiesScreen = () => {
    const theme = useTheme();

    const [value, setValue] = React.useState('rent');
    useEffect(() => {
        setValue('rent');
    }, []);

    const bottomSheetRef = useRef(null);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    const handleSheetClose = () => {
        bottomSheetRef.current?.close();
        setBottomSheetVisible(false);
    };
    const handleSheetOpen = () => {
        bottomSheetRef.current?.expand();
        setBottomSheetVisible(true);
    };

    // const handleSheetOpen = () => bottomSheetRef.current?.expand();
    // const snapSheetToIndex = (index) => bottomSheetRef.current?.snapToIndex(index);

    // const renderBackdrop = useCallback(
    //     (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    //     []
    // );
    // // callbacks
    // const handleSheetChanges = useCallback((index: number) => {
    //     console.log('handleSheetChanges', index);
    // }, []);

    const navigation = useNavigation();

    const navigateToPropertyDetail = (propertyId) => {
        navigation.removeListener
        navigation.navigate('PropertyDetail', { propertyId });
    };

    return (
        <View style={{ flexGrow: 1, }}>
            <View style={{ backgroundColor: theme.colors.primary, paddingLeft: 16, paddingRight: 16 }}>
                <TouchableOpacity
                    style={[styles.itemContainerR, { borderColor: theme.colors.text1 }]}
                    onPress={() => (bottomSheetVisible ? handleSheetClose() : handleSheetOpen())}>
                    <Icon
                        source="tune-variant"
                        color={theme.colors.text1}
                        size={16}
                        style={[styles.icon]}
                    />
                    <Text variant="bodySmall" style={[styles.subtitle, { color: theme.colors.text1 }]}>
                        Filtros
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tabContainer}>
                <ScrollView style={styles.container}>

                    {/* Render your list of properties */}
                    <ListProperties/>
                </ScrollView>
                <CBottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snaps={['98%']}

                    content={
                        <View style={styles.bottomSheetContent}>
                            <Text variant="bodyLarge" style={{ color: theme.colors.primary, marginBottom: 24 }}>
                                Filtra tu búsqueda
                            </Text>
                            <SegmentedButtons
                                value={value}
                                onValueChange={setValue}
                                checkedColor={theme.colors.text1}
                                activeColor={theme.colors.text1}
                                buttons={[
                                    {
                                        value: 'rent',
                                        label: 'Alquilar',
                                        style: {
                                            backgroundColor: value === 'rent' ? theme.colors.primary : theme.colors.surfaceVariant,
                                            borderWidth: 0,
                                        },
                                        labelStyle: {
                                            color: value === 'rent' ? theme.colors.text1 : theme.colors.primary,
                                        },

                                    },
                                    {
                                        value: 'buy',
                                        label: 'Comprar',
                                        style: {
                                            backgroundColor: value === 'buy' ? theme.colors.primary : theme.colors.surfaceVariant,
                                            borderWidth: 0,
                                        },
                                        labelStyle: {
                                            color: value === 'buy' ? theme.colors.text1 : theme.colors.primary,
                                        },
                                    },
                                ]}
                            />
                            <View style={{ flexDirection: 'row', backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.primary, borderWidth: 1, borderRadius: 16, paddingVertical: 24, paddingHorizontal: 16, marginVertical: 24 }}>
                                <TouchableOpacity onPress={console.log("filter 1")} style={{ marginEnd: 8 }}>
                                    <Button label="filtro 1"
                                        icon="close-circle-outline"
                                        mode="outlined"
                                        bgColor="transparent"
                                        txColor={theme.colors.primary}
                                        font='Lexend'
                                        Bstyle="small"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={console.log("filter 2")} style={{ marginEnd: 8 }} >
                                    <Button label="filtro 2"
                                        icon="close-circle-outline"
                                        mode="outlined"
                                        bgColor="transparent"
                                        txColor={theme.colors.primary}
                                        font='Lexend'
                                        Bstyle="small"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={console.log("filter 3")} style={{ marginEnd: 8 }} >
                                    <Button label="filtro 3"
                                        icon="close-circle-outline"
                                        mode="outlined"
                                        bgColor="transparent"
                                        txColor={theme.colors.primary}
                                        font='Lexend'
                                        Bstyle="small"
                                    />
                                </TouchableOpacity>
                            </View>
                            <List.AccordionGroup style={{ marginVertical: 20,backgroundColor: theme.colors.text1 }}>
                                <List.Accordion title="Ubicación" id="1" style={{backgroundColor: theme.colors.text1}}>
                                    <List.Item title="Item 1" />
                                </List.Accordion>
                                <List.Accordion title="Rango de precio" id="2" style={{backgroundColor: theme.colors.text1}}>
                                    <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 24, padding: 16 }}>
                                        <BottomSheetTextInput placeholder='min' style={[styles.input, { borderWidth: 1, borderColor: theme.colors.surfaceVariant, marginEnd: 12 }]} />
                                        <BottomSheetTextInput placeholder='max' style={[styles.input, { borderWidth: 1, borderColor: theme.colors.surfaceVariant }]} />
                                    </View>
                                </List.Accordion>
                                <List.Accordion title="Distancia máxima" id="3" style={{backgroundColor: theme.colors.text1}}>
                                    <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 24, padding: 16 }}>
                                        <BottomSheetTextInput type='number' placeholder='cuadras' style={[styles.input, { borderWidth: 1, borderColor: theme.colors.surfaceVariant, marginEnd: 12 }]} />
                                    </View>
                                </List.Accordion>
                            </List.AccordionGroup>
                            <TouchableOpacity style={{ position: 'absolute', bottom: 16, width: '100%' }} >
                                <Button label='Ver los resultados' />
                            </TouchableOpacity>

                        </View>
                    }></CBottomSheet>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
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
    itemContainerR: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingVertical: 24,
        marginLeft: 'auto',
    },
    subtitle: {
        fontFamily: 'Lexend',
        marginLeft: 8,
    },
});

export default PropertiesScreen;
