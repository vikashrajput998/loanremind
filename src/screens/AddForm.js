import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
export default function AddForm(props) {
  const [formState, setFormState] = useState({
    name: '',
    amount: '',
    date: '',
    phno: '',
    category: props.route.params.category,
    is_active: true,
    interest: '',
    notes: '',
    duedate: '',
  });
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDueDatePickerVisible, setIsDueDatePickerVisible] = React.useState(
    false,
  );
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setFormState({...formState, date: moment(date).format('DD-MM-YYYY')});
    hideDatePicker();
  };

  const showdueDatePicker = () => {
    setIsDueDatePickerVisible(true);
  };

  const hidedueDatePicker = () => {
    setIsDueDatePickerVisible(false);
  };

  const handledueDateConfirm = date => {
    setFormState({...formState, duedate: moment(date).format('DD-MM-YYYY')});
    hidedueDatePicker();
  };

  React.useEffect(() => {
    if (props.route.params.hasOwnProperty('details')) {
      setFormState(props.route.params.details);
    }
  }, []);
  console.log(props.route.params, 'in Add');

  const handleSubmit = () => {
    if (props.route.params.hasOwnProperty('docId')) {
      firestore()
        .collection('usersdata')
        .doc(firebaseAuth().currentUser.uid)
        .collection('data')
        .doc(props.route.params.docId)
        .update(formState)
        .then(res => {
          console.log('updated');
          setFormState({
            name: '',
            amount: '',
            date: '',
            phno: '',
            category: props.route.params.category,
            is_active: true,
            interest: '',
            notes: '',
            duedate: '',
          });
          props.navigation.goBack();
        })
        .catch(err => {
          console.log(err, 'failed to update');
        });
    } else {
      console.log(
        'userdata',
        firebaseAuth().currentUser.uid,
        props.route.params,
      );
      firestore()
        .collection('usersdata')
        .doc(firebaseAuth().currentUser.uid)
        .collection('data')
        .add(formState)
        .then(res => {
          console.log(res);
          setFormState({
            name: '',
            amount: '',
            date: '',
            phno: '',
            category: props.route.params.category,
            is_active: true,
            interest: '',
            notes: '',
            duedate: '',
          });
          props.navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitle: 'Add Loan',
      headerTitleAlign: 'center',
      headerStyle: {backgroundColor: '#46eb34'},
      headerTintColor: '#000',
    });
  }, [props.navigation]);
  return (
    <KeyboardAwareScrollView style={{height, width}}>
      <View
        style={{
          marginTop: 10,
          height: height * 0.82,
          width: width * 0.95,
          alignSelf: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#CCCCCC',
          borderRadius: 20,
          borderWidth: 5,
          borderColor: '#46eb34',
          shadowColor: '#46eb34',
          shadowOffset: {width: 7, height: 7},
          shadowOpacity: 3,
          elevation: 5,
        }}>
        {/* <Text
          style={{color: '#fff', textAlign: 'center', fontSize: height * 0.03}}>
          {moment(new Date()).format('DD-MM-YYYY')}
        </Text> */}
        <View
          style={{
            marginTop: 15,
            alignItems: 'flex-start',
            // justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#ddd',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            height: height * 0.09,
            width: width * 0.87,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: -10,
              color: '#000',
              backgroundColor: '#CCCCCC',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'black',
              width: width * 0.3,
            }}>
            Member Name
          </Text>
          <TextInput
            placeholder="enter name"
            value={formState.name}
            onChangeText={text => setFormState({...formState, name: text})}
            style={{
              marginTop: 5,
              alignSelf: 'center',
              height: height * 0.06,
              width: width * 0.8,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 3,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 15,
            alignItems: 'flex-start',
            // justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#ddd',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            height: height * 0.09,
            width: width * 0.87,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: -10,
              color: '#000',
              backgroundColor: '#CCCCCC',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'black',
              width: width * 0.3,
            }}>
            AMOUNT
          </Text>
          <TextInput
            value={formState.amount}
            placeholder="enter amount"
            onChangeText={text => setFormState({...formState, amount: text})}
            style={{
              marginTop: 5,
              alignSelf: 'center',
              height: height * 0.06,
              width: width * 0.8,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 3,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 15,
            alignItems: 'flex-start',
            // justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#ddd',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            height: height * 0.09,
            width: width * 0.87,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: -10,
              color: '#000',
              backgroundColor: '#CCCCCC',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'black',
              width: width * 0.3,
            }}>
            GIVEN DATE
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.83,
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor:'pink'
            }}>
            <TextInput
              placeholder="Select date"
              value={formState.date}
              editable={false}
              style={{
                marginTop: 5,
                marginLeft: 10,
                alignSelf: 'center',
                height: height * 0.06,
                width: width * 0.7,
                backgroundColor: '#fff',
                borderRadius: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 3,
              }}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <FontAwesome name="calendar" size={height * 0.03} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{height: height * 0.08,alignItems:'flex-end',justifyContent:'center',borderRadius: 10, borderWidth: 3, borderColor: "#ffa"}}>
                    <Text style={{fontWeight:'bold',padding:1, color:'#fff'}}>DURATION</Text>
                    <TextInput style={{height: height * 0.05, width: width * 0.8, backgroundColor:'#fff'}}/>
                </View> */}
        <View
          style={{
            marginTop: 15,
            alignItems: 'flex-start',
            // justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#ddd',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            height: height * 0.09,
            width: width * 0.87,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: -10,
              color: '#000',
              backgroundColor: '#CCCCCC',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'black',
              width: width * 0.3,
            }}>
            PHONE.NO
          </Text>
          <TextInput
            onChangeText={text => setFormState({...formState, phno: text})}
            value={formState.phno}
            placeholder="Enter ph no"
            style={{
              marginTop: 5,
              alignSelf: 'center',
              height: height * 0.06,
              width: width * 0.8,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 3,
            }}
          />
        </View>

        <View></View>

        <View
          style={{
            marginTop: 15,
            alignItems: 'flex-start',
            // justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#ddd',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            height: height * 0.09,
            width: width * 0.87,
          }}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: -10,
              color: '#000',
              backgroundColor: '#CCCCCC',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'black',
              width: width * 0.3,
              fontWeight: 'bold',
            }}>
            DUE DATE
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.83,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Select date"
              value={formState.duedate}
              editable={false}
              style={{
                marginTop: 5,
                marginLeft: 10,
                alignSelf: 'center',
                height: height * 0.06,
                width: width * 0.7,
                backgroundColor: '#fff',
                borderRadius: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 3,
              }}
            />
            <TouchableOpacity onPress={showdueDatePicker}>
              <FontAwesome name="calendar" size={height * 0.03} color= "black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
            alignItems: 'flex-start',
            // justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#ddd',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            height: height * 0.09,
            width: width * 0.87,
          }}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: -10,
              color: '#000',
              backgroundColor: '#CCCCCC',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'black',
              width: width * 0.38,
              fontWeight: 'bold',
            }}>
            MONTHLY INTEREST
          </Text>
          <TextInput
            onChangeText={text => setFormState({...formState, interest: text})}
            value={formState.interest}
            placeholder="Enter interest"
            style={{
              marginTop: 5,
              alignSelf: 'center',
              height: height * 0.06,
              width: width * 0.8,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 3,
            }}
          />
        </View>

        <View
          style={{
            marginTop: 15,
            alignItems: 'flex-start',
            // justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#ddd',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'black',
            height: height * 0.09,
            width: width * 0.87,
          }}>
          <Text style={{marginLeft: 10,
              marginTop: -10,
              color: '#000',
              backgroundColor: '#CCCCCC',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'black',
              width: width * 0.38,
              fontWeight: 'bold',}}>
            Notes
          </Text>
          <TextInput
            onChangeText={text => setFormState({...formState, notes: text})}
            value={formState.notes}
            placeholder="Enter notes"
            style={{
              marginTop: 5,
              alignSelf: 'center',
              height: height * 0.06,
              width: width * 0.8,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 3,
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: height * 0.12,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            width: width * 0.65,
            height: height * 0.07,
            borderBottomWidth: 3,
            borderTopWidth: 3,
            backgroundColor: '#46eb34',
            borderRadius: height * 0.02,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: height * 0.03,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isDueDatePickerVisible}
        mode="date"
        onConfirm={handledueDateConfirm}
        onCancel={hidedueDatePicker}
      />
    </KeyboardAwareScrollView>
  );
}
