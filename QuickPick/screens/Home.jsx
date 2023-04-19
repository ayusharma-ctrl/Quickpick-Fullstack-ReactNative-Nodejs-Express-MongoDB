import { View, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Badge } from 'react-native-paper'
import Category from '../components/Category'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Home = () => {
    const [quantity, setQuantity] = useState(0);
    const navigation = useNavigation()
    const { user } = useSelector(state => state.auth)

    const getCart = async() => {
        try{
            const { data} = await axios.get("https://quickpick.onrender.com/api/v1/user/cart");
            // console.log(data.cart)
            const totalQuantity = data.cart.reduce((quan,item)=>{
                return quan + item.quantity
            }, 0)
            // console.log(totalQuantity)
            setQuantity(totalQuantity);
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getCart()
    },[])

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignItems: 'center' }}>

                    <TouchableOpacity>
                        <Icon class="material-icons-round" size={32}>
                            menu
                        </Icon>
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: 26,
                        textAlign: 'center',
                    }}>QuickPick</Text>

                    <View>

                        <TouchableOpacity onPress={() => navigation.navigate("cart")} style={{ flexDirection: 'row', justifyContent: 'center' }} >
                            <Icon class="material-icons-round" size={30}>
                                shopping_cart
                            </Icon>
                            <Badge size={18} style={{ marginLeft: -10, alignSelf: 'baseline' }}>{quantity}</Badge>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={{paddingLeft:10}}>
                            <Icon class="material-icons-round" size={26}>
                                person
                            </Icon>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={{ margin: 20, backgroundColor: 'powderblue', padding: 20, borderRadius: 15, elevation: 5 }}>
                    <Text style={{ fontSize: 18, marginBottom: 15 }}>Hi {user.name}!</Text>
                    <Text onPress={() => navigation.navigate("profile")} style={{ fontSize: 15, marginBottom: 5 }}>
                        My Profile </Text>
                    <Text onPress={() => navigation.navigate("orders")} style={{ fontSize: 15, marginBottom: 5 }}>My Orders</Text>
                    <Text onPress={() => navigation.navigate("address")} style={{ fontSize: 15, marginBottom: 5 }}>My Addresses</Text>
                </View>

                <Text style={{ fontSize: 20, margin: 20 }}>Categories</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 5 }}>
                    {
                        categoryNames.map((e, i) => {
                            return <Category key={i} name={e} />
                        })
                    }
                </View>

            </SafeAreaView>
        </View>
    )
}

export default Home

const categoryNames = ["All", "Fruits & Vegetables", "Dairy & Bakery", "Staples", "Snacks", "Beverages", "Personal Care", "Home Care"]