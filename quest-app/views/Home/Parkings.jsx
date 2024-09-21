import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, List, useTheme } from 'react-native-paper';

import ListParkings from '../../components/ListParkings';
import Loader from '../../components/Loader';

const ParkingsScreen = ({ }) => {
    const theme = useTheme();

    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <View style={styles.tabContainer}>
            {loading ? (
                <View>
                    <Loader />
                </View>
            ) : (
                <View style={styles.container}>
                    <ListParkings array={parkings}/>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexGrow: 1,
        // paddingTop: 24,
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
