import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { register } from '../redux/action';

const Register = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const registerHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("phone", phone);
        myForm.append("password", password);

        dispatch(register(myForm));
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
            }}
        >

            <View style={{ width: "70%" }}>
                <TextInput
                    style={Styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <Button
                disabled={
                    !email || !password || !name || !phone
                }
                style={Styles.btn}
                onPress={registerHandler}
            >
                <Text style={{ color: "#fff" }}>Register</Text>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text
                    style={{
                        color: "#900",
                        height: 30,
                        margin: 20,
                    }}
                >
                    Have an Account, Login
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register



const Styles = StyleSheet.create({

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },

    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
    },
})