import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseStorage from '@react-native-firebase/storage';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useIsFocused} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
export default function DrawerContent(props) {
  const [active, setActive] = React.useState('Home');
  const [image, setImage] = React.useState(null);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const handleLogout = () => {
    firebaseAuth().signOut();
  };

  React.useLayoutEffect(() => {
    getInitialData();
    const imageRef =
      firebaseAuth().currentUser &&
      firebaseStorage().ref(`post/${firebaseAuth().currentUser.uid}/profile`);
    // let imageRef = firebase.storage().ref('/' + imageName);

    imageRef &&
      imageRef
        .getDownloadURL()
        .then(url => {
          console.log(url);
          setImage(url);
          //from url you can fetched the uploaded image easily
          // this.setState({profileImageUrl: url});
        })
        .catch(e => setImage(null));
  }, [isFocused, props]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        <View style={styles.profileImageContainer}>
          {/* <FontAwesome5 name="user-circle" size={height * 0.1} /> */}
          {image === null ? (
            <FontAwesome5 name="user-circle" size={height * 0.1} />
          ) : (
            <Image
              style={{
                width: height * 0.16,
                height: height * 0.16,
                borderRadius: height * 0.1,
              }}
              source={{uri: image}}
            />
          )}
        </View>
        <View style={styles.drawerNavigationContainer}>
          <View style={styles.drawerItemsContainer}>
            {/* <TouchableOpacity
              // style={[
              //   {
              //     ...styles.drawerItem,
              //     backgroundColor: active === 'Home' ? '#898' : '#fff',
              //   },
              // ]}
              onPress={() => {
                props.navigation.navigate('Home');
                setActive('Home');
              }}>
              <Text>Home</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                borderTopWidth: 4,
                borderTopColor: '#77ee33',
                width: width * 0.6,
                alignItems: 'center',
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowRadius: 1,
                shadowOpacity: 1,
                paddingVertical: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
              }}
              // style={[
              //   {
              //     ...styles.drawerItem,
              //     backgroundColor: active === 'Profile' ? '#898' : '#fff',
              //   },
              // ]}
              onPress={() => {
                props.navigation.navigate('Profile');
                setActive('Profile');
              }}>
              <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderTopWidth: 4,
                borderTopColor: '#77ee33',
                width: width * 0.6,
                alignItems: 'center',
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowRadius: 1,
                shadowOpacity: 1,
                paddingVertical: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
              }}
              onPress={() => {
                props.navigation.navigate('Categories');
                setActive('Categories');
              }}>
              <Text>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderTopWidth: 4,
                borderTopColor: '#77ee33',
                width: width * 0.6,
                alignItems: 'center',
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowRadius: 1,
                shadowOpacity: 1,
              
                paddingVertical: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
              }}
              onPress={() => {
                props.navigation.navigate('AboutUs');
                setActive('Categories');
              }}>
              <Text>AboutUs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderTopWidth: 4,
                borderTopColor: '#77ee33',
                width: width * 0.6,
                alignItems: 'center',
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowRadius: 1,
                shadowOpacity: 1,
                paddingVertical: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
              }}
              onPress={() => {
                props.navigation.navigate('RateUs');
                setActive('Categories');
              }}>
              <Text>Rate Us</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => handleLogout()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {marginTop: height * 0.05},
  profileImageContainer: {
    height: height * 0.14,
    marginBottom: 20,
    width: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerNavigationContainer: {
    height: height * 0.7,
    justifyContent: 'space-between',
  },
  drawerItemsContainer: {
    width: width * 0.7,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  drawerItem: {
    width: width * 0.7,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    width: width * 0.7,
    alignItems: 'center',
    backgroundColor: 'darkred',
    height: height * 0.06,
    justifyContent: 'center',
  },
  logoutText: {color: 'white', fontWeight: 'bold'},
});
