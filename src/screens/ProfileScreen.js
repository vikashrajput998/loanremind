import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseStorage from '@react-native-firebase/storage';
import {Tooltip} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import {useIsFocused} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
export default function ProfileScreen(props) {
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      headerStyle: {
        backgroundColor: '#6beb34',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTitle: '',
    });
  }, [props.navigation]);

  const [profileInfo, setProfileInfo] = React.useState({
    name: '',
    email: '',
  });

  const uploadImage = async uri => {
    const uploadUri = uri.path;
    const response = await fetch(uploadUri);
    const childPath = `post/${firebaseAuth().currentUser.uid}/profile`;
    const blob = await response.blob();
    // const task = firebaseStorage().ref().child(childPath).delete()
    const task = firebaseStorage().ref().child(childPath).put(blob);
    const taskProgress = snapshot => {
      console.log(snapshot.bytesTransferred);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(resSnap => {
        // savePostData(resSnap);
        setImage(resSnap);
      });
    };

    const taskError = snapshot => {
      console.log(snapshot);
    };
    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  useLayoutEffect(() => {
    getInitialData();
    const imageRef =
      firebaseAuth().currentUser &&
      firebaseStorage().ref(`post/${firebaseAuth().currentUser.uid}/profile`);
    // let imageRef = firebase.storage().ref('/' + imageName);
 
   imageRef && imageRef
      .getDownloadURL()
      .then(url => {
        console.log(url);
        setImage(url);
        //from url you can fetched the uploaded image easily
        // this.setState({profileImageUrl: url});
      })
      .catch(e => setImage(null));
  }, [isFocused, props]);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image.path);
        uploadImage(image);
      })
      .catch(err => {
        cosnole.log(err);
      });
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
    });
  }, [props]);
  React.useEffect(() => {
    getInitialData();
    if (firebaseAuth().currentUser) {
      firestore()
        .collection('users')
        .doc(firebaseAuth().currentUser.uid)
        .onSnapshot(documentSnapshot => {
          setProfileInfo(documentSnapshot.data());
        });
      firestore()
        .collection('usersdata')
        .doc(firebaseAuth().currentUser.uid)
        .collection('data')
        .get()
        .then(querySnapshot => {
          const dataItems = [];
          querySnapshot.forEach(documentSnapshot => {
            dataItems.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setData(dataItems);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props, isFocused]);

  return (
    <View style={{height, width}}>
      <View
        style={{
          height: height * 0.2,
          width: height * 0.2,
          alignItems: 'center',
          zIndex: 13,
          justifyContent: 'center',
          backgroundColor: '#fff',
          elevation: 3,
          position: 'absolute',
          top: height * 0.17,
          left: width * 0.3,
          borderRadius: height * 0.3,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1
          },
          shadowRadius: 2,
          shadowOpacity: 1,
        }}>
        {image === null ? (
          <Icon name="user-circle" size={height * 0.1} />
        ) : (
          <Image
            style={{
              width: height * 0.2,
              height: height * 0.2,
              borderRadius: height * 0.1,
            }}
            source={{uri: image}}
          />
        )}
      </View>
      <View
        style={{
          height: height * 0.25,
          width,
          backgroundColor: '#6beb34',
          borderBottomRightRadius: height * 0.1,
          borderBottomLeftRadius: height * 0.1,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: height * 0.04,
            marginTop: height * 0.05,
            marginLeft: height * 0.03,
          }}>
          Profile
        </Text>
      </View>
      <TouchableOpacity
        style={{position: 'absolute', top: height * 0.07, right: width * 0.1}}
        onPress={() => pickImage()}>
        <Icon name="edit" size={height * 0.04} />
      </TouchableOpacity>
      <View style={{height: height * 0.7, width, zIndex: 0}}>
        <View
          style={{
            width: width * 0.98,
            alignSelf: 'center',
            justifyContent: 'space-around',
            height: height * 0.7,
            borderRadius: height * 0.1,
            position: 'absolute',
            zIndex: 0,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 1
            },
            shadowRadius: 2,
            shadowOpacity: 1,
            backgroundColor: '#fff',
          }}>
            <View></View>
            <View></View>

            <View  style={{height: height * 0.04}}></View>
            <View></View>
            <View style={{borderBottomWidth: 8,width: width * 0.9, alignSelf:'center', borderBottomColor:'#6beb34'}}></View>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1
              },
              shadowRadius: 2,
              shadowOpacity: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              borderTopWidth: 6,
              borderTopColor: '#6beb34',
            }}>
            <Text style={{fontSize: height * 0.024, fontWeight: 'bold'}}>
              User Name: {profileInfo.name}
            </Text>
          </View>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1
              },
              shadowRadius: 2,
              shadowOpacity: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              borderTopWidth: 4,
              borderTopColor: '#6beb34',
            }}>
            <Text style={{fontSize: height * 0.024, fontWeight: 'bold'}}>
              Email ID: {profileInfo.email}
            </Text>
          </View>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1
              },
              shadowRadius: 2,
              shadowOpacity: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              borderTopWidth: 4,
              borderTopColor: '#6beb34',
            }}>
            <Text style={{fontSize: height * 0.024, fontWeight: 'bold'}}>
              Currency Used: $
            </Text>
          </View>

          {/* <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              borderTopWidth: 4,
              borderTopColor: '#6beb34',
            }}>
            <Text style={{fontSize: height * 0.024, fontWeight: 'bold'}}>
              Change password:
              <Text style={{fontWeight: 'bold', color: '#783783'}}>Change</Text>
            </Text>
          </View> */}
            <View style={{borderBottomWidth: 8,width: width * 0.9, alignSelf:'center', borderBottomColor:'#6beb34'}}></View>
        <View></View>
        <View></View>
          <View></View>
          <View></View>
        </View>
      </View>
      {/* <View style={styles.profileImageContainer}>
        <Icon name="user-circle" size={height * 0.1} />
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.userName}>{profileInfo.name}</Text>
      </View>
      <View style={styles.summary}>
        <View
          style={{
            height: height * 0.6,
            padding: height * 0.02,
            width: width * 0.95,
            justifyContent: 'space-around',
            borderRadius: height * 0.1,
            backgroundColor: '#77ee33',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: width * 0.7,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: height * 0.03}}>Collected</Text>
            <Text style={{fontSize: height * 0.03}}>:</Text>
            <Text style={{fontSize: height * 0.03}}>{data.filter((e) => !e.is_active).length}</Text>
          </View>
          <View
            style={{
              width: width * 0.7,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: height * 0.03}}>Pending</Text>
            <Text style={{fontSize: height * 0.03}}>:</Text>
            <Text style={{fontSize: height * 0.03}}>{data.filter((e) => e.is_active).length}</Text>
          </View>
          <View
            style={{
              width: width * 0.9,
              padding: 10,
              alignSelf: 'center',
              backgroundColor: '#232',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: height * 0.03, color: '#fff'}}>Total</Text>
            <Text style={{fontSize: height * 0.03, color: '#fff'}}>:</Text>
            <Text style={{fontSize: height * 0.03, color: '#fff'}}>{data.length}</Text>
          </View>
        </View>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  profileImageContainer: {
    height: height * 0.14,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: height * 0.04,
    color: '#fff',
  },
  userNameContainer: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    backgroundColor: '#728',
  },
  summary: {
    height: height * 0.7,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
