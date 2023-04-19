import { View, Text, Image } from 'react-native'
import React from 'react'
import axios from 'axios'

const ProductDisplay = ({ product }) => {

    const addToCart = async(productID) => {
        try{
            const { data } = await axios.post(`https://quickpick.onrender.com/api/v1/user/cart/${productID}`);
            // console.log(data)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <View style={{ margin: 10, padding: 10, backgroundColor: 'powderblue', elevation: 5, borderRadius: 10 }}>
            <Text>{product.pname}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Image source={{ uri: product.pimage[0].url }} style={{ width: 100, height: 100, margin: 5 }}></Image>
                <View style={{ flexDirection: 'column', padding:5 }}>
                    <Text>Price: Rs. {product.pprice}</Text>
                    <Text onPress={()=>{addToCart(product._id)}} style={{backgroundColor:'red', padding:4, marginTop:5, borderRadius:6, elevation:5}}>Add to cart</Text>
                </View>
            </View>
        </View>
    )
}

export default ProductDisplay