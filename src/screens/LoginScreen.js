import React from 'react';
import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
export default function LoginScreen(props) {
  const [auth, setAuth] = React.useState({email: '', password: ''});
  const [signupAuth, setSignupAuth] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginView, setLoginView] = React.useState(true);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);

  const register = () => {
    if (!signupAuth.name || !signupAuth.email || !signupAuth.password) {
      alert('please fill all details');
    } else {
      firebaseAuth()
        .createUserWithEmailAndPassword(signupAuth.email, signupAuth.password)
        .then(res => {
          firestore()
            .collection('users')
            .doc(firebaseAuth().currentUser.uid)
            .set({
              name: signupAuth.name,
              email: signupAuth.email,
            });
        })
        .catch(err => {
          if (err.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Invalid Email',
              text2: 'Please enter a valid email',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {},
              onPress: () => {},
            });
          }
          if (err.code === 'auth/weak-password') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Weak Password',
              text2: 'Please provide a strong password',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {},
              onPress: () => {},
            });
          }
          if (err.code === 'auth/email-already-in-use') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Email Already Registered',
              text2: 'Please provide a different mail id',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {},
              onPress: () => {},
            });
          }
          console.log(err.code, 'err');
        });
    }
  };
  const handleSubmit = () => {
    // if (!auth.email || !auth.password) {
    //   alert('please fill all details');
    // } else {
    console.log('logintriggered');
    firebaseAuth()
      .signInWithEmailAndPassword(auth.email, auth.password)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.code, 'err');
        if (err.code === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Invalid Email',
            // text2: 'Please provide a different mail id',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
        }
        if (err.code === 'auth/user-not-found') {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'User Not found',
            // text2: 'Please provide a different mail id',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
        }
        if (err.code === 'auth/wrong-password') {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Wrong password',
            // text2: 'Please provide a different mail id',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
          });
        }
      });
    // }
  };
  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require('../assets/bg2.jpg')}
        style={{height, width, zIndex: 0}}>
        <View
          style={{
            height: height * 0.13,
            zIndex: 0,
            
          }}></View>

        <View
          style={{
            height: height * 0.06,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: width * 0.8,
            borderRadius: height * 0.05,
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontSize: height * 0.03,
              color: '#000',
              fontWeight: 'bold',
            }}>
            {loginView ? 'Login' : 'Signup'}
          </Text>
        </View>
        <View
          style={{
            height: height * 0.1,
            zIndex: 0,
            
          }}></View>
        <View
          style={{
            width: width,
            height: height * 0.05,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: height * 0.01,
            
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: height * 0.05,
              justifyContent: 'space-around',
              alignItems: 'center',
              width: width * 0.6,
              backgroundColor: '#41cc44',
              borderRadius: height * 0.03,
            }}>
            <TouchableOpacity
              onPress={() => setLoginView(true)}
              style={
                loginView
                  ? {
                      width: '50%',
                      backgroundColor: '#fff',
                      borderRadius: height * 0.02,
                      height: height * 0.05,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      width: '50%',
                      height: height * 0.05,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }>
              <Text
                style={
                  loginView
                    ? {fontWeight: 'bold', fontSize: height * 0.025}
                    : {}
                }>
                Existing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLoginView(false)}
              style={
                !loginView
                  ? {
                      width: '50%',
                      backgroundColor: '#fff',
                      borderRadius: height * 0.02,
                      height: height * 0.05,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      width: '50%',
                      height: height * 0.05,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }>
              <Text
                style={
                  !loginView
                    ? {fontWeight: 'bold', fontSize: height * 0.025}
                    : {}
                }>
                New
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loginView ? (
          <View
            style={{
              height: height * 0.4,
              width: width * 0.9,
              alignSelf: 'center',
              alignItems: 'center',
               justifyContent: 'space-evenly',
              position: 'relative',
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowRadius: 2,
              shadowOpacity: 1,
              backgroundColor: '#fff',
              borderTopWidth: 5,
              borderTopColor: '#41cc44',
            }}>
              <View
              style={{
                marginTop: 5,
                width: width * 0.6,
                height: height * 0.05,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                borderTopWidth: 3,
                borderBottomWidth: 3,
              }}>
              <Text
                style={{
                  padding: 7,
                  width: width * 0.6,
                  height: height * 0.05,
                  fontSize: height * 0.025,
                  // alignSelf:'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  // backgroundColor:'yellow'
                  color: '#41cc44',
                }}>
                Enter Your Email
              </Text>
            </View>
            <View style={styles.searchSection}>
              <EntypoIcon
                style={styles.searchIcon}
                name="mail"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setAuth({...auth, email: text})}
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                marginTop: 5,
                width: width * 0.6,
                height: height * 0.05,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                borderTopWidth: 3,
                borderBottomWidth: 3,
              }}>
              <Text
                style={{
                  padding: 7,
                  width: width * 0.6,
                  height: height * 0.05,
                  fontSize: height * 0.025,
                  // alignSelf:'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  // backgroundColor:'yellow'
                  color: '#41cc44',
                }}>
                Enter Your Password
              </Text>
            </View>
            <View style={styles.searchSection}>
              <EntypoIcon
                style={styles.searchIcon}
                name="key"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                onChangeText={text => setAuth({...auth, password: text})}
                underlineColorAndroid="transparent"
              />
            </View>
            <View />

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                height: height * 0.07,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowRadius: 2,
                shadowOpacity: 1,
                position: 'absolute',
                bottom: -height * 0.04,
                left: width * 0.1,
                zIndex: 10,
                width: width * 0.7,
                backgroundColor: '#41cc44',
              }}>
              <Text style={{fontSize: height * 0.023, fontWeight: 'bold'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              height: height * 0.4,
              width: width * 0.9,
              alignSelf: 'center',
              alignItems: 'center',
              // justifyContent: 'space-evenly',
              position: 'relative',
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowRadius: 2,
              shadowOpacity: 1,
              backgroundColor: '#fff',
              borderTopWidth: 4,
              borderTopColor: '#41cc44',
            }}>
            <View
              style={{
                marginTop: 10,
                width: width * 0.6,
                height: height * 0.04,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                borderTopWidth: 3,
                borderBottomWidth: 3,
              }}>
              <Text
                style={{
                  padding: 7,
                  width: width * 0.6,
                  height: height * 0.05,
                  fontSize: height * 0.025,
                  // alignSelf:'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  // backgroundColor:'yellow'
                  color: '#41cc44',
                }}>
                Enter Your User Name
              </Text>
            </View>
            <View style={styles.searchSection}>
              <EntypoIcon
                style={styles.searchIcon}
                name="text"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.input}
                placeholder="User Name"
                onChangeText={text =>
                  setSignupAuth({...signupAuth, name: text})
                }
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: width * 0.6,
                height: height * 0.04,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                borderTopWidth: 3,
                borderBottomWidth: 3,
              }}>
              <Text
                style={{
                  padding: 7,
                  width: width * 0.6,
                  height: height * 0.05,
                  fontSize: height * 0.025,
                  // alignSelf:'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  // backgroundColor:'yellow'
                  color: '#41cc44',
                }}>
                Enter Your Email
              </Text>
            </View>
            <View style={styles.searchSection}>
              <EntypoIcon
                style={styles.searchIcon}
                name="mail"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text =>
                  setSignupAuth({...signupAuth, email: text})
                }
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                marginTop: 10,
                width: width * 0.6,
                height: height * 0.04,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                borderTopWidth: 3,
                borderBottomWidth: 3,
              }}>
              <Text
                style={{
                  padding: 7,
                  width: width * 0.6,
                  height: height * 0.05,
                  fontSize: height * 0.025,
                  // alignSelf:'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  // backgroundColor:'yellow'
                  color: '#41cc44',
                }}>
                Enter Your Password
              </Text>
            </View>
            <View style={styles.searchSection}>
              <EntypoIcon
                style={styles.searchIcon}
                name="key"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                onChangeText={text =>
                  setSignupAuth({...signupAuth, password: text})
                }
                underlineColorAndroid="transparent"
              />
            </View>
            <View />

            <TouchableOpacity
              onPress={() => register()}
              style={{
                height: height * 0.07,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowRadius: 2,
                shadowOpacity: 1,
                position: 'absolute',
                bottom: -height * 0.04,
                left: width * 0.1,
                zIndex: 10,
                width: width * 0.7,
                backgroundColor: '#41cc44',
              }}>
              <Text style={{fontSize: height * 0.023, fontWeight: 'bold'}}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Toast ref={ref => Toast.setRef(ref)} />
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    // marginTop: 2,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    width: width * 0.8,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 5,
    borderTopColor: '#41cc44',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

// <View style={{height: height, width: width}}>
//   <View
//     style={{
//       height: height * 0.6,
//       justifyContent: 'space-around',
//       width: width,
//       backgroundColor: '#fff',
//     }}>
//     <View style={{marginLeft: width * 0.1}}>
//       <Text style={{fontSize: height * 0.04, fontWeight: 'bold'}}>
//         Login
//       </Text>
//     </View>
//     <View style={{flexDirection: 'row', marginLeft: width * 0.1}}>
//       <Text style={{fontSize: height * 0.023}}>
//         Don't have an account?
//       </Text>
//       <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
//         <Text
//           style={{
//             color: '#6beb34',
//             fontSize: height * 0.023,
//             fontWeight: 'bold',
//           }}>
//           Click Here
//         </Text>
//       </TouchableOpacity>
//     </View>
//     <View
//       style={{
//         borderWidth: 1,
//         elevation: 3,
//         borderRadius: height * 0.01,
//         height: height * 0.07,
//         width: width * 0.8,
//         marginLeft: width * 0.1,
//       }}>
//       <TextInput
//         placeholder="Email"
//         onChangeText={text => setAuth({...auth, email: text})}
//         value={auth.email}
//       />
//     </View>
//     <View
//       style={{
//         borderWidth: 1,
//         elevation: 3,
//         borderRadius: height * 0.01,
//         height: height * 0.07,
//         width: width * 0.8,
//         marginLeft: width * 0.1,
//       }}>
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         onChangeText={text => setAuth({...auth, password: text})}
//         value={auth.password}
//       />
//     </View>
//     <TouchableOpacity
//      onPress={() => handleSubmit()}
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#6beb34',
//         elevation: 3,
//         borderRadius: height * 0.01,
//         height: height * 0.07,
//         width: width * 0.8,
//         marginLeft: width * 0.1,
//       }}>
//       <Text
//         style={{fontSize: height * 0.03, fontWeight: 'bold'}}
//        >
//         Login
//       </Text>
//     </TouchableOpacity>
//     <View></View>
//     <View></View>
//   </View>
//   <View
//     style={{
//       height: height * 0.4,
//       justifyContent: 'center',
//       width: width,
//       backgroundColor: '#6beb34',
//     }}>
//     <Text
//       style={{
//         fontSize: height * 0.034,
//         marginLeft: width * 0.1,
//         fontWeight: 'bold',
//       }}>
//       Never miss to pay{'\n'}We are here to remind.
//     </Text>
//   </View>
// </View>
