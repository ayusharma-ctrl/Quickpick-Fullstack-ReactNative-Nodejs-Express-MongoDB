import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout, updateProfile } from '../redux/action'
import mime from "mime"
import Loader from '../components/Loader'

const Profile = ({ navigation, route }) => {

    const { user, loading } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        loading ? <Loader /> : (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View style={{ width: "70%", margin:6 }}>
                    <Text style={{margin:6}}>Name: {user.name}</Text>
                    <Text style={{margin:6}}>Email: {user.email}</Text>
                    <Text style={{margin:6}}>Contact: {user.phone}</Text>
                </View>

                <Button
                    buttonColor='rgb(170,150,80)'
                    onPress={() => navigation.navigate("changepassword")}
                    style={{margin:10}}
                >
                    Change Password
                </Button>

                <Button
                    buttonColor='rgb(250,150,250)'
                    onPress={logoutHandler}
                    style={{margin:6}}
                >
                    Logout
                </Button>

                {
                    user.verified ? null : <Button
                        onPress={() => navigation.navigate("verify")}
                    >
                        Verify
                    </Button>
                }

            </View>
        )
    )
}

export default Profile

const Styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 25,
    },
    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
    },
});