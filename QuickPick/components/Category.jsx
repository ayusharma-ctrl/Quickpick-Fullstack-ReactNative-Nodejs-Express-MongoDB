import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Category = ({ name }) => {
    const navigation = useNavigation()

    return (
        <View>
            <Text onPress={() => navigation.navigate("products", { type: `${name}` })} style={{ backgroundColor: 'orange', height: 60, width: 170, borderRadius: 10, padding: 10, margin: 15, elevation: 5, textAlign: 'center' }}>{name}</Text>
        </View>
    )
}

export default Category