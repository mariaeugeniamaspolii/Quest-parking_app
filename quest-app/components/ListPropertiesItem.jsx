import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, useTheme, Avatar } from 'react-native-paper';

const ListItem = ({ title, subtitle, onPress, avatar, spec1, spec2, spec3, spec4 }) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            style={[styles.container, { borderBottomColor: theme.colors.surfaceVariant }]}
            onPress={() => onPress && onPress('1234')}>
            <Image style={{ width: 120, aspectRatio: 1, borderRadius: 12, marginRight: 16, }} source={{ uri: avatar }} />
            <View style={[styles.textContainer]}>
                <>
                    <Text variant="titleMedium" style={[styles.title, { color: theme.colors.primary }]}>
                        {title}
                    </Text>
                    <Text variant="titleMedium" style={[styles.title, { fontFamily: 'LexendBold', color: theme.colors.primary }]}>
                        {subtitle}
                    </Text>
                </>
                <View style={styles.details}>
                    <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                        {spec1}
                    </Text>
                    <View style={[styles.line, { backgroundColor: theme.colors.secondary }]} />
                    <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                        {spec2}
                    </Text>
                    <View style={[styles.line, { backgroundColor: theme.colors.secondary }]} />
                    <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                        {spec3}
                    </Text>
                    <View style={[styles.line, { backgroundColor: theme.colors.secondary }]} />
                    <Text variant="bodySmall" style={[styles.detail, { color: theme.colors.secondary }]}>
                        {spec4}
                    </Text>
                </View>
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
        flexGrow: 1,
        justifyContent: 'space-between',
        // height: 100
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 16,
    },
    line: {
        width: 1,
        height: '70%',
        marginHorizontal: 8,
    },
});

export default ListItem;
