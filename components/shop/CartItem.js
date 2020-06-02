import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CartItem = (props) => {
  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <View style={styles.cartItem}>
        {!props.deletable && (
          <View style={styles.itemData}>
            <Text style={styles.quantity}>{props.quantity} </Text>
            <Text style={styles.mainText}>{props.title}</Text>
          </View>
        )}
        {props.deletable && (
          <View style={styles.itemData}>
            <Text style={styles.title}>{props.title}</Text>

            <TouchableOpacity
              onPress={props.onRemove}
              style={styles.deleteButton}
            >
              <Ionicons
                name={Platform.OS === 'android' ? 'md-remove' : 'ios-remove'}
                size={23}
                color={Colors.primary}
              />
            </TouchableOpacity>

            <View style={styles.quantityContainer}>
              <Text style={styles.quantity}>{props.quantity}</Text>
            </View>

            <TouchableOpacity
              onPress={props.onIncrease}
              style={styles.deleteButton}
            >
              <Ionicons
                name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                size={23}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.itemData}>
          <Text style={styles.mainText}>
            {props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
          </Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: props.imageUrl,
          }}
        />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    width: 25,
    height: 25,
    borderColor: '#888',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    marginRight: 20,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
