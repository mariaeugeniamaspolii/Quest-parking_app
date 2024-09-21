import * as React from 'react';
import { Searchbar, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const SearchBar = ({ placeholder, additionalStyles, propValue, LColor: propLColor, BgColor: propBgColor }) => {
    const theme = useTheme();

    const LColor = propLColor || theme.colors.primary;
    const BgColor = propBgColor || theme.colors.surfaceVariant;

    const [searchQuery, setSearchQuery] = React.useState(propValue || '');

    React.useEffect(() => {
        if (propValue !== undefined) {
            setSearchQuery(propValue);
        }
    }, [propValue]);

    const onChangeSearch = query => {
        if (propValue === undefined) {
            setSearchQuery(query);
        }
    };

    return (
        <Searchbar
            placeholder={placeholder}
            placeholderTextColor={theme.colors.secondary}
            onChangeText={onChangeSearch}
            value={propValue !== undefined ? propValue : searchQuery}
            iconColor={LColor}
            inputStyle={{ color: LColor }}
            style={{ backgroundColor: BgColor, ...additionalStyles }}
        />
    );
};

export default SearchBar;
