import React from 'react';
import {Dimensions, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AddForm from '../screens/AddForm';
import DrawerContent from '../components/DrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import CategoriesList from '../screens/CategoriesList';
import firebaseAuth from '@react-native-firebase/auth';
import DetailsScreen from '../screens/DetailsScreen';
import CategoriesScreen from '../screens/CategoriesScreen'
import AboutUs from '../screens/AboutUs'
import RateUs from '../screens/RateUs'
const {height, width} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



export default function index() {
  const [authState, setAuthState] = React.useState({
    isLoggedIn: false,
    loaded: false,
  });
  React.useEffect(() => {
    firebaseAuth().onAuthStateChanged(user => {
      if (!user) {
        setAuthState({...authState, isLoggedIn: false, loaded: true});
      } else {
        setAuthState({...authState, isLoggedIn: true, loaded: true});
      }
    });
  }, []);

  if (!authState.loaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!authState.isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }else{
    const HomeScreenDrawer = () => {
      if(firebaseAuth().currentUser){

        return (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            drawerStyle={{width: width * 0.7}}>
            <Drawer.Screen name="Categories" component={CategoriesScreen}/>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="AboutUs" component={AboutUs}/>
            <Drawer.Screen name="RateUs" component={RateUs}/>
          </Drawer.Navigator>
        );
      }else{
        return null
      }
    };

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeDrawer">
          <Stack.Screen
            name="HomeDrawer"
            component={HomeScreenDrawer}
            options={{headerShown: false, headerTitle: 'Categories'}}
          />
          <Stack.Screen name="AddForm" component={AddForm} />
          {/* <Drawer.Screen name="Categories" component={CategoriesScreen}/> */}
          <Stack.Screen name="DetailsScreen" component={DetailsScreen}  options={{headerTitle:'Details'}}/>
          <Stack.Screen name="CategoriesScreen" component={CategoriesList} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

