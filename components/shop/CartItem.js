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

const CartItem = (props) => {
  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <View style={styles.cartItem}>
        {/* <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.imageUrl }} />
        </View> */}
        <View style={styles.itemData}>
          <Text style={styles.quantity}>{props.quantity} </Text>
          <Text style={styles.mainText}>{props.title}</Text>
        </View>
        <View style={styles.itemData}>
          <Text style={styles.mainText}>
            {props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
          </Text>
          {props.deletable && (
            <TouchableOpacity
              onPress={props.onRemove}
              style={styles.deleteButton}
            >
              <Ionicons
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                size={23}
                color='red'
              />
            </TouchableOpacity>
          )}
        </View>
        {/* <View> */}
        {/* <Image style={styles.image} source={{ uri: props.imageUrl }} /> */}
        {/* </View> */}
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
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
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
