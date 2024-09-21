import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ListParkingsItem from './ListParkingsItem';


const MyList = ({ array }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const navigateToParkingDetail = (parkingId) => {
        navigation.navigate('ParkingDetail', { parkingId });
    };

    return (
        <>
            <ScrollView>
                {array.map(({ _id, name, address, slots, ratings, images }) => {

                    return (
                        <ListParkingsItem
                            key={_id}
                            title={name}
                            slots={slots}
                            subtitle={address.name}
                            rate={ratings.rate}
                            avatar={images}
                            onPress={() => navigateToParkingDetail(_id)}
                        />
                    );
                })}
            </ScrollView>
        </>
    )
}

export default MyList;
