import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/action'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'
import Address from './screens/Address'
import Orders from './screens/Orders'
import Cart from './screens/Cart'
import Products from './screens/Products'
import Verify from './screens/Verify'
import ChangePassword from './screens/ChangePassword'
import ForgetPassword from './screens/ForgetPassword'
import ResetPassword from './screens/ResetPassword'
import Loader from "./components/Loader"


const Stack = createNativeStackNavigator()

const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const { isAuthenticated, loading } = useSelector(state => state.auth)

    return (
        loading ? <Loader /> : <NavigationContainer>

            <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
                <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
                <Stack.Screen name='profile' component={Profile} options={{ headerTitle: 'My Profile' }} />
                <Stack.Screen name='address' component={Address} options={{ headerTitle: 'My Addresses' }} />
                <Stack.Screen name='orders' component={Orders} options={{ headerTitle: 'My Orders' }} />
                <Stack.Screen name='cart' component={Cart} options={{ headerTitle: 'My Cart' }} />
                <Stack.Screen name='products' component={Products} options={{ headerTitle: 'Products' }} />
                <Stack.Screen name='verify' component={Verify} options={{ headerShown: false }} />
                <Stack.Screen name='changepassword' component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name='forgetpassword' component={ForgetPassword} options={{ headerShown: false }} />
                <Stack.Screen name='resetpassword' component={ResetPassword} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main