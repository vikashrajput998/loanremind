import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
export default function CategoriesList(props) {
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  const [data, setData] = useState([]);
  console.log(props.route.params, 'routes..');
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleAlign: 'center',
      headerTitle: "Loan Data",
      headerTintColor: '#000',
    });
  }, [props.navigation]);

  React.useEffect(() => {
    getInitialData();
    firestore()
      .collection('usersdata')
      .doc(firebaseAuth().currentUser.uid)
      .collection('data')
      .get()
      .then(querySnapshot => {
        const dataItems = [];
        querySnapshot.forEach(documentSnapshot => {
          dataItems.push({...documentSnapshot.data(), id: documentSnapshot.id});
        });
        setData(dataItems);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props, isFocused]);

  const renderItem = ({item, index, paid}) => {
    console.log(paid,'ispaid')
    return (
      <TouchableOpacity
        onLongPress={() => {
          Alert.alert('Delete Confirm', 'Are you sure want to delete?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                console.log(item.id, firebaseAuth().currentUser.uid);
                firestore()
                  .collection('usersdata')
                  .doc(firebaseAuth().currentUser.uid)
                  .collection('data')
                  .doc(item.id)
                  .delete()
                  .then(res => {
                    console.log(res, 'User deleted!');
                    props.navigation.goBack();
                  })
                  .catch(err => {
                    console.log(err);
                  });
                // firestore().collection()
              },
            },
          ]);
        }}
        onPress={() =>
          props.navigation.navigate('DetailsScreen', {
            indexValue: item.id,
            category: props.route.params.category,
          })
        }
        style={{
          width: width * 0.9,
          borderTopColor: paid ? '#41cc44' : "#ed4a2d",
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 3,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1
          },
          shadowRadius: 2,
          shadowOpacity: 1,
          // alignItems: 'center',
          borderTopWidth: 10,
          height: height * 0.2,
          backgroundColor: '#fff',
          // justifyContent: 'space-around',
          borderBottomRightRadius: height * 0.03,
          borderBottomLeftRadius: height * 0.03,
          marginBottom: 10,
        }}>
        <View style={{marginLeft: width * 0.1, paddingTop: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: height * 0.026}}>
            {item.name}
          </Text>
        </View>
        <View style={{marginLeft: width * 0.1, paddingTop: 10}}>
          <Text style={{fontSize: height * 0.023, color: 'gray'}}>
            Interest: {item.interest}
          </Text>
        </View>
        <View style={{marginLeft: width * 0.1, paddingTop: 10}}>
          <Text style={{fontSize: height * 0.023, color: 'gray'}}>
            Due Date: {item.duedate}
          </Text>
        </View>
        <View
          style={{
            marginRight: width * 0.05,
            paddingTop: 10,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: height * 0.023,
              color: 'gray',
              fontWeight: 'bold',
              color: paid ? '#41cc44' : '#ed4a2d',
            }}>
            Amount: {item.amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{height, width, backgroundColor: '#ddd'}}>
      {props.route.params.paid ? (
        <View
          style={{height: height * 0.92, width: width, alignItems: 'center'}}>
          {data
            .filter(e => !e.is_active)
            .filter(e => e.category === props.route.params.category).length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data
                .filter(e => e.is_active === false)
                .filter(e => e.category === props.route.params.category)}
              renderItem={(props) => renderItem({...props, paid: true})}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View
              style={{
                height: height * 0.3,
                width: width * 0.9,
                borderRadius: height * 0.04,
                borderWidth: 3,
                marginTop: height * 0.3,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: height * 0.03,
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: '#003',
                }}>
                No Loans to Pay
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{height: height * 0.92, width: width, alignItems: 'center'}}>
          {data
            .filter(e => e.is_active)
            .filter(e => e.category === props.route.params.category).length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data
                .filter(e => e.is_active)
                .filter(e => e.category === props.route.params.category)}
              renderItem={(props) => renderItem({...props, paid: false})}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View
              style={{
                height: height * 0.3,
                width: width * 0.9,
                borderRadius: height * 0.04,
                borderWidth: 3,
                marginTop: height * 0.3,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: height * 0.03,
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: '#003',
                }}>
                No Loans to Pay
              </Text>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AddForm', {
            category: props.route.params.category,
          });
        }}
        style={{
          width: height * 0.08,
          height: height * 0.08,
          borderRadius: height * 0.02,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1
          },
          shadowRadius: 2,
          shadowOpacity: 1,
          zIndex: 3,
          position: 'absolute',
          bottom: height * 0.15,
          right: 20,
          shadowColor: '#000',
          shadowOffset: {height: 1, width: 1},
          shadowOpacity: 0.5,
          backgroundColor: '#41cc44',
          shadowRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: height * 0.05,
            textAlign: 'center',
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}
