import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
export default function DetailsScreen(props) {
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  //   React.useEffect(() => {
  //     getInitialData();
  //   }, [props, isFocused]);
  const [details, setDetails] = React.useState({
    name: '',
    phno: '',
    amount: '',
    date: '',
  });

  const handleDelete = () => {
    firestore()
      .collection('usersdata')
      .doc(firebaseAuth().currentUser.uid)
      .collection('data')
      .doc(props.route.params.indexValue)
      .update({
        is_active: false,
      })
      .then(() => {
        console.log('User updated!');
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err, 'error');
      });
  };
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
    });
  }, [props.navigation]);

  React.useEffect(() => {
    getInitialData();
    const {indexValue} = props.route.params;
    firestore()
      .collection('usersdata')
      .doc(firebaseAuth().currentUser.uid)
      .collection('data')
      .doc(props.route.params.indexValue)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data(), 'abcdkd');
        setDetails(querySnapshot.data());
        // const dataItems = [];
        // querySnapshot.forEach(documentSnapshot => {
        //   dataItems.push(documentSnapshot.data());
        // });
        // setDetails(dataItems.filter((e) =>e.is_active)[indexValue]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props, isFocused]);
  return (
    <View style={{height, width, backgroundColor: '#ddd'}}>
      <View style={{marginTop: height * 0.01}}>
        <View style={styles.viewBack}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            Category: {details.category}
          </Text>
        </View>
        <View style={styles.viewBack}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            Name: {details.name}
          </Text>
        </View>
        <View style={styles.viewBack}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            Date: {details.date}
          </Text>
        </View>
        <View style={styles.viewBack}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            amount: {details.amount}
          </Text>
        </View>
        <View style={styles.viewBack}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            interest: {details.interest}
          </Text>
        </View>
        <View style={styles.viewBack}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            notes: {details.notes}
          </Text>
        </View>
        <View style={styles.viewBack}>
          <Text
            style={{
              fontSize: height * 0.024,
              fontWeight: 'bold',
              color: '#232',
              textAlign: 'center',
            }}>
            Ph.no: {details.phno}
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          width: width,
          height: height * 0.05,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('AddForm', {
              details: details,
              docId: props.route.params.indexValue,
            })
          }
          style={{
            height: height * 0.06,
            width: width * 0.4,
            backgroundColor: '#343',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: height * 0.03}}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={{
            height: height * 0.06,
            width: width * 0.4,
            backgroundColor: 'darkred',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: height * 0.03}}>Paid</Text>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('AddForm', {
            details: details,
            docId: props.route.params.indexValue,
          })
        }
        style={{
          width: width * 0.9,
          marginTop: height * 0.03,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1
          },
          shadowRadius: 2,
          shadowOpacity: 1,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 3,
          alignSelf: 'center',
          height: height * 0.06,
          backgroundColor: '#41cc44',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: height * 0.03}}>
          UPDATE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete()}
        style={{
          width: width * 0.9,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1
          },
          shadowRadius: 2,
          shadowOpacity: 1,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 3,
          marginTop: height * 0.03,
          alignSelf: 'center',
          height: height * 0.06,
          backgroundColor: '#41cc44',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: height * 0.03}}>PAID</Text>
      </TouchableOpacity>

      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBack: {
    width: width,
    height: height * 0.08,
    borderTopColor: '#41cc44',
    marginBottom: height * 0.02,
    backgroundColor: '#fff',
    borderRadius: height * 0.05,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderTopWidth: 4,
    justifyContent: 'center',
  },
});
