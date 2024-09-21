import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, Avatar, Icon } from 'react-native-paper';

const ListItem = ({ title, subtitle, onPress, slots, rate, avatar }) => {
    const theme = useTheme();
    const displayRate = rate === undefined ? 'new' : rate;

    return (
        <TouchableOpacity
            style={[{
                borderBottomColor: theme.colors.surfaceVariant, paddingTop: 16,
                paddingBottom: 16,
                borderBottomWidth: 1,
            }]}
            onPress={() => onPress && onPress('1234')}>

            <View style={styles.container}>
                <Avatar.Image size={60} source={{ uri: avatar[0] }} style={[styles.image, { backgroundColor: theme.colors.surfaceVariant }]} />
                <View style={[styles.textContainer]}>
                    <Text variant="titleLarge" style={[styles.title, { fontWeight: 'bold', color: theme.colors.primary }]}>
                        {title}
                    </Text>
                    <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.secondary }]}>
                        {subtitle}
                    </Text>
                    <View style={styles.detailContainer}>

                        <View
                            style={[styles.itemContainerL, { borderColor: theme.colors.primary }]}
                            onPress={() => onPress && onPress('1234')}>
                            <Text variant="bodySmall" style={[styles.detailInfo, { color: theme.colors.primary }]}>
                                600mt
                            </Text>
                        </View>

                        <View
                            style={[styles.itemContainerM, { borderColor: theme.colors.primary }]}
                            onPress={() => onPress && onPress('1234')}>
                            <Text variant="bodySmall" style={[styles.detailInfo, { color: theme.colors.primary }]}>
                                {slots} cupos
                            </Text>
                        </View>

                        <View
                            style={[styles.itemContainerR]}
                            onPress={() => onPress && onPress('1234')}>
                            <Text variant="bodySmall" style={[styles.detailInfo, { color: theme.colors.primary }]}>
                                Lavado
                            </Text>
                        </View>

                    </View>
                </View>
                <View style={[styles.itemContainer, { borderColor: theme.colors.primary }]} />
                <Icon
                    source="star"
                    color={theme.colors.secondary}
                    size={20}
                    style={[styles.icon]}
                />
                <Text variant="bodySmall" style={[styles.rank, { color: theme.colors.secondary }]}>
                    {displayRate}
                </Text>
            </View>



        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'start',
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontFamily: 'Lexend',
        marginTop: 8,
    },
    rank: {
        marginLeft: 8,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 24,
    },
    itemContainerL: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        borderRightWidth: 1,
    },
    itemContainerM: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        paddingLeft: 16,
        borderRightWidth: 1,
    },
    itemContainerR: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
    },
    detailInfo: {
        fontFamily: 'Lexend',
    },
});

export default ListItem;
