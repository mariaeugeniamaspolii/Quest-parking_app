import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import SearchBar from '../../components/SearchBar';
import  ListSugested from '../../components/ListSugested';
import MenuCards from '../../components/MenuCards';

const HomeScreen = () => {

    return (
        <ScrollView contentContainerStyle={styles.tabContainer}>
            < ListSugested/>
            <MenuCards />
        </ScrollView>
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
export default HomeScreen;