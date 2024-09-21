import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, Avatar } from 'react-native-paper';
import imageSource from '../assets/images/icon.png';

const ListItem = ({ title, subtitle,  onPress }) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            style={[styles.container, { borderBottomColor: theme.colors.surfaceVariant }]}
            onPress={() =>  onPress &&  onPress('1234')}>
            <Avatar.Image size={40} style={[styles.image, { backgroundColor: theme.colors.surfaceVariant }]} />
            <View style={[styles.textContainer]}>
                <Text variant="titleMedium" style={[styles.title, { fontSize: 18 , fontFamily: 'LexendBold', color: theme.colors.primary }]}>
                    {title}
                </Text>
                <Text variant="bodySmall" style={[styles.subtitle, {  color: theme.colors.secondary }]}>
                    {subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    image: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
    },
});

export default ListItem;
