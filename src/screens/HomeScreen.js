import React, {useState, useEffect, useLayoutEffect, createRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
export default function HomeScreen(props) {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const getInitialData = async () => {};
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitle: "Loan Remind",
      headerStyle: {
        backgroundColor: '#eb3489',
      },
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
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.renderContainer}
        onPress={() =>
          props.navigation.navigate('DetailsScreen', {
            indexValue: item.id,
            category: props.route.params.category,
          })
        }>
        <View style={styles.renderTopViewContainer}>
          <View>
            <Icon name="calendar-today" size={height * 0.05} />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: height * 0.03}}>{item.duedate}</Text>
          </View>
        </View>
        <View style={styles.devider}></View>
        <View style={styles.renderBottomContainer}>
          <Text style={styles.renderBottomText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pinkView}>
        <View style={styles.titleView}>
          {
            props.route.params ?
          data
            .filter(e => e.is_active)
            .filter(e => e.category === props.route.params.category).length ? (
            <FlatList
              contentContainerStyle={{alignItems: 'center'}}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={data.filter(e => e.is_active).filter((e) => e.category === props.route.params.category)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: height * 0.03, color: '#fff'}}>
                {' '}
                No Data
              </Text>
            </View>
          )
          :
          <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: height * 0.03, color: '#fff'}}>
            {' '}
            No Data
          </Text>
        </View>

        }
        </View>
      </View>
      <View style={styles.whiteView}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            props.navigation.navigate('AddForm', {
              category: props.route.params.category,
            })
          }>
          <View>
            <Icon name="add" size={height * 0.04} />
          </View>
          <View>
            <Text style={styles.buttonText}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            props.navigation.navigate('CategoriesList', {
              category: props.route.params.category,
            })
          }>
          <View>
            <Icon name="menu" size={height * 0.04} />
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('CategoriesScreen', {
                category: props.route.params.category,
              })
            }>
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  pinkView: {
    height: height * 0.6,
    width,
    backgroundColor: '#eb3489',
    justifyContent: 'center',
    borderBottomRightRadius: height * 0.2,
  },
  whiteView: {
    height: height * 0.3,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    width: width * 0.7,
    height: height * 0.35,
    borderRadius: height * 0.05,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#078278',
  },
  buttonContainer: {
    width: width * 0.8,
    alignSelf: 'center',
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f8a',
    marginTop: height * 0.02,
  },
  buttonText: {fontWeight: 'bold', fontSize: height * 0.04},
  renderContainer: {
    width: width * 0.7,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    height: height * 0.2,
    backgroundColor: '#ffa',
    alignItems: 'center',
  },
  renderTopViewContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  devider: {
    backgroundColor: '#000',
    height: 1,
    width: width * 0.45,
    alignSelf: 'center',
  },
  renderBottomContainer: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderBottomText: {color: '#f67', fontWeight: 'bold', fontSize: 22},
});
