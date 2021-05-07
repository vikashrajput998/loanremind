import React, {useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import firebaseAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {View, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function CategoriesScreen(props) {
  const [data, setData] = React.useState([]);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  useLayoutEffect(() => {
    props.navigation.setOptions({
      // headerTitleAlign: 'center',
      headerTitle: '',
      headerStyle: {
            shadowOpacity: 0,
            elevation: 0
      },
      // headerStyle: {
      //   height: height * 0.1,
      // },
      headerShown: true,
    });
  }, [props.navigation]);

  React.useEffect(() => {
    getInitialData();
    if (firebaseAuth().currentUser) {
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
  // console.log(data)
  // const paid = data.filter((e) => !e.is_active)
  // const notPaid = data.filter((e) => e.is_active)
  // console.log(paid, notPaid)
  const renderItem = ({item, index}) => {
    // if (
    //   data.filter(e => e.category === item).length ===
    //   data.filter(e => e.category === item && e.is_active === true).length
    // ) {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('CategoriesScreen', {
            category: item,
            paid: false,
          })
        }
        style={{
          height: height * 0.1,
          margin: 7,
          width: width * 0.3,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: height * 0.02,
          // marginBottom: height * 0.01,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1
          },
          shadowRadius: 2,
          shadowOpacity: 1,
          padding: 3,
          backgroundColor: '#fff',
          borderBottomWidth: 7,
          borderRightWidth: 4,
          borderBottomColor: '#ed4a2d',
          borderRightColor: '#ed4a2d',
        }}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
    // }
  };

  const renderPaidItem = ({item, index}) => {
    if (data.filter(e => e.category === item && e.is_active === false).length) {
      return (
        <TouchableOpacity
          // onPress={() => props.navigation.navigate('Home', {category: item})}
          onPress={() =>
            props.navigation.navigate('CategoriesScreen', {
              category: item,
              paid: true,
            })
          }
          style={{
            height: height * 0.1,
            margin: 7,
            width: width * 0.3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: height * 0.02,
            // marginBottom: height * 0.01,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 1
            },
            shadowRadius: 2,
            shadowOpacity: 1,
            padding: 3,
            backgroundColor: '#fff',
            borderBottomWidth: 7,
            borderRightWidth: 4,
            borderBottomColor: '#6beb34',
            borderRightColor: '#6beb34',
          }}>
          <Text>{item}</Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={{height, width, backgroundColor: '#ddd'}}>
      <View style={{height: height * 0.08, paddingLeft: width * 0.05, marginBottom: height * 0.01, backgroundColor:"#fff"}}>
       <Text style={{fontWeight:'bold', fontSize: height * 0.04}}>Categories</Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: width * 0.02,
          }}>
          <View
            style={{
              height: height * 0.02,
              width: height * 0.02,
              borderRadius: height * 0.05,
              backgroundColor: '#ed4a2d',
            }}></View>
          <Text
            style={{
              marginLeft: width * 0.05,
              fontWeight: 'bold',
              fontSize: height * 0.03,
            }}>
            Not Paid
          </Text>
        </View>
        <FlatList
          numColumns={3}
          contentContainerStyle={{justifyContent: 'center'}}
          // contentContainerStyle={{flexDirection:'column', justifyContent:'space-between'}}
          keyExtractor={(item, index) => index.toString()}
          data={[
            'Education Loans',
            'Vehicle Loans',
            'Business Loans',
            'Property Loans',
            ' Home Loans',
            'Credit Cards',
            'Personal Loans',
            ' Wedding Loans',
            'Home renovation Loans',
            'Travel Loans',
            'Medical Loans',
            'Debt Consolidation Loans',
            'Any Other Loans',
          ]}
          renderItem={renderItem}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: width * 0.02,
          }}>
          <View
            style={{
              height: height * 0.02,
              width: height * 0.02,
              borderRadius: height * 0.05,
              backgroundColor: '#6beb34',
            }}></View>
          <Text
            style={{
              marginLeft: width * 0.05,
              fontWeight: 'bold',
              fontSize: height * 0.03,
            }}>
            Paid
          </Text>
        </View>
        <FlatList
          numColumns={3}
          contentContainerStyle={{justifyContent: 'center'}}
          // contentContainerStyle={{flexDirection:'column', justifyContent:'space-between'}}
          keyExtractor={(item, index) => index.toString()}
          data={[
            'Education Loans',
            'Vehicle Loans',
            'Business Loans',
            'Property Loans',
            ' Home Loans',
            'Credit Cards',
            'Personal Loans',
            ' Wedding Loans',
            'Home renovation Loans',
            'Travel Loans',
            'Medical Loans',
            'Debt Consolidation Loans',
            'Any Other Loans',
          ]}
          renderItem={renderPaidItem}
        />
      </View>
    </View>
  );
}
