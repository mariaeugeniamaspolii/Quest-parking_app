import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';

import  ListPropertiesItem from './ListPropertiesItem';

const images = [
    'https://static.fotocasa.es/images/anuncio/2022/12/10/176107782/2725572794.jpg?rule=web_412x257', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQ9hoRJBuh3uh0Mh9dMB4uEH0z-uBJfLCvLyYvi2M57J59Texkzqa2R0bZXoh-mGGotc&usqp=CAU', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tTgK72ezKLBajFqvtajbq8oJwI2SHjpyBJiJwzuMQCM9PXjYq61GjO1_CyESR2b9nc0&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmrivakTpYUd0DZNQ-3zHEyz2g-TA9fo2rMQCD8jvxmbS4vx62Fv0Fwf6IlGz9flRnA0&usqp=CAU',
    'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/93/48/6c/276569729.jpg',
    'https://img3.idealista.com/blur/WEB_LISTING-M/0/id.pro.es.image.master/c1/52/71/1179247723.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXazOP8IYeY9MiQa2IDymMprxYSYcHdsaQcbekgtRgDws3ZvMUd1PfKHnJDeytLH9Bc&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfQi5XfToyNnRMDDW5HQGBBbBedszuyxLKHDyFM0MJj28E8pF4o7xAbOt34A2n_TOC4hA&usqp=CAU'
]
const randomIndex = Math.floor(Math.random() * images.length);

const MyList = ({ }) => {
    const theme = useTheme();

    const navigation = useNavigation();
    const navigateToPropertyDetail = (propertyId, title ) => {
        navigation.navigate('PropertyDetail', { propertyId, title  });
    };

    return (
        <View>
            <Text variant="bodySmall" style={{ color: theme.colors.primary }}>Búsquedas sugeridas</Text>
            <ListPropertiesItem id="1" title="21 de septiembre 1122" subtitle="3.500" spec1="50 mt" spec2="Matutino" spec3="Grande" spec4="Vigilancia" avatar={images[0]} onPress={() => navigateToPropertyDetail("1", "21 y Williman")} />
            <ListPropertiesItem id="3" title="Durazno 3108" subtitle="2.800" spec1="100 mt" spec2="Matutino" spec3="Chico" spec4="Llaves"  avatar={images[7]} onPress={() => navigateToPropertyDetail("3", "21 y Williman")} />
            <ListPropertiesItem id="3" title="Durazno 2768" subtitle="3.100" spec1="150 mt" spec2="Matutino" spec3="Grande" spec4="Portero"  avatar={images[6]} onPress={() => navigateToPropertyDetail("3", "21 y Williman")} />
            <ListPropertiesItem id="4" title="Libertad 1520" subtitle="3.200" spec1="100 mt" spec2="Completo" spec3="Mediano" spec4="Vigilancia"  avatar={images[2]} onPress={() => navigateToPropertyDetail("4", "21 y Williman")} />
            <ListPropertiesItem id="2" title="26 de Marzo 2622" subtitle="4.000" spec1="300 mt" spec2="Completo" spec3="Mediano" spec4="Control"  avatar={images[5]} onPress={() => navigateToPropertyDetail("2", "21 y Williman")} />
            <ListPropertiesItem id="1" title="Cuareim 2507" subtitle="3.500" spec1="50 mt" spec2="Completo" spec3="Grande" spec4="Vigilancia" avatar={images[0]} onPress={() => navigateToPropertyDetail("1", "21 y Williman")} />
        </View>
    )
}

export default MyList;
