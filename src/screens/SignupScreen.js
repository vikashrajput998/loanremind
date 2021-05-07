import React from 'react';
import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function SignupScreen(props) {
  const [auth, setAuth] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);
  const register = () => {
    if (!auth.name || !auth.email || !auth.password) {
      alert('please fill all details');
    } else {
      firebaseAuth()
        .createUserWithEmailAndPassword(auth.email, auth.password)
        .then(res => {
          firestore()
            .collection('users')
            .doc(firebaseAuth().currentUser.uid)
            .set({
              name: auth.name,
              email: auth.email,
            });
        })
        .catch(err => {
          console.log(err, 'err');
        });
    }
  };
  return (
    <View style={{height: height, width: width}}>
      <View
        style={{
          height: height * 0.6,
          justifyContent: 'space-around',
          width: width,
          backgroundColor: '#fff',
        }}>
        <View style={{marginLeft: width * 0.1}}>
          <Text style={{fontSize: height * 0.04, fontWeight: 'bold'}}>
            SignUp
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: width * 0.1}}>
          <Text style={{fontSize: height * 0.023}}>
            already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text
              style={{
                color: '#6beb34',
                fontSize: height * 0.023,
                fontWeight: 'bold',
              }}>
              Click Here
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            elevation: 3,
            borderRadius: height * 0.01,
            height: height * 0.07,
            width: width * 0.8,
            marginLeft: width * 0.1,
          }}>
          <TextInput
            placeholder="Name"
            onChangeText={text => setAuth({...auth, name: text})}
            value={auth.name}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            elevation: 3,
            borderRadius: height * 0.01,
            height: height * 0.07,
            width: width * 0.8,
            marginLeft: width * 0.1,
          }}>
          <TextInput
            placeholder="Email"
            onChangeText={text => setAuth({...auth, email: text})}
            value={auth.email}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            elevation: 3,
            borderRadius: height * 0.01,
            height: height * 0.07,
            width: width * 0.8,
            marginLeft: width * 0.1,
          }}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setAuth({...auth, password: text})}
            value={auth.password}
          />
        </View>
        <TouchableOpacity
          onPress={() => register()}
          // disabled={!auth.name && !auth.email && !auth.password}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#6beb34',
            elevation: 3,
            borderRadius: height * 0.01,
            height: height * 0.07,
            width: width * 0.8,
            marginLeft: width * 0.1,
          }}>
          <Text
            style={{fontSize: height * 0.03, fontWeight: 'bold'}}
            onPress={() => register()}>
            SignUp
          </Text>
        </TouchableOpacity>
        <View></View>
        <View></View>
      </View>
      <View
        style={{
          height: height * 0.4,
          justifyContent: 'center',
          width: width,
          backgroundColor: '#6beb34',
        }}>
        <Text
          style={{
            fontSize: height * 0.034,
            marginLeft: width * 0.1,
            fontWeight: 'bold',
          }}>
          Never miss to pay{'\n'}We are here to remind.
        </Text>
      </View>
    </View>
    // <View
    //   style={{
    //     height: height * 0.7,
    //     width,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
    //   <View
    //     style={{
    //       width: width * 0.7,
    //       height: height * 0.1,
    //       backgroundColor: '#2a7',
    //     }}>
    //     <Text>Name</Text>
    //     <TextInput
    //       style={{
    //         backgroundColor: '#fff',
    //         padding: 10,
    //         width: width * 0.68,
    //         alignSelf: 'center',
    //       }}
    //       onChangeText={text =>
    //         setAuth({
    //           ...auth,
    //           name: text,
    //         })
    //       }
    //       placeholder="Name.."
    //     />
    //   </View>
    //   <View
    //     style={{
    //       width: width * 0.7,
    //       height: height * 0.1,
    //       backgroundColor: '#2a7',
    //     }}>
    //     <Text>Email</Text>
    //     <TextInput
    //       onChangeText={text => setAuth({...auth, email: text})}
    //       style={{
    //         backgroundColor: '#fff',
    //         padding: 10,
    //         width: width * 0.68,
    //         alignSelf: 'center',
    //       }}
    //       placeholder="Email.."
    //     />
    //   </View>
    //   <View
    //     style={{
    //       width: width * 0.7,
    //       height: height * 0.1,
    //       backgroundColor: '#2a7',
    //     }}>
    //     <Text>Password</Text>
    //     <TextInput
    //       onChangeText={text => setAuth({...auth, password: text})}
    //       style={{
    //         backgroundColor: '#fff',
    //         padding: 10,
    //         width: width * 0.68,
    //         alignSelf: 'center',
    //       }}
    //       placeholder="Password.."
    //     />
    //   </View>
    //   <View>
    //     <TouchableOpacity
    //       onPress={() => register()}
    //       style={{
    //         height: height * 0.06,
    //         width: width * 0.4,
    //         backgroundColor: '#259',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         margin: 4,
    //       }}>
    //       <Text style={{color: '#fff', fontSize: height * 0.03}}>Submit</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={() => props.navigation.navigate('Login')}
    //       style={{
    //         height: height * 0.06,
    //         width: width * 0.4,
    //         backgroundColor: '#959',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         margin: 4,
    //       }}>
    //       <Text style={{color: '#fff', fontSize: height * 0.03}}>Login</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
}
