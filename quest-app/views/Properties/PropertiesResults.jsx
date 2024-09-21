import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const PropertyDetailScreen = ({ route }) => {
    const { propertyId } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.tabContainer}>
            {/* Display details for the selected property */}
            <Text>{`Details for Property ID ${propertyId}`}</Text>
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

export default PropertyDetailScreen;
