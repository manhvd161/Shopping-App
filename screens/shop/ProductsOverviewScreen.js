import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const userProducts = useSelector((state) => state.products.userProducts);
  console.log(userProducts);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const totalProductOnCart = useSelector((state) => state.cart.quantityCart);
  console.log(useSelector((state) => state.cart.items));

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    props.navigation.setParams({ totalProductOnCart });
  }, [totalProductOnCart]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Đã có lỗi xảy ra!</Text>
        <Button title='Thử lại' onPress={loadProducts} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Không có sản phẩm nào được tìm thấy!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() =>
            selectItemHandler(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            color={Colors.primary}
            title='Xem chi tiết'
            onPress={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          />
          {itemData.item.ownerId !== userId ? (
            <Button
              color={Colors.primary}
              title='Thêm vào giỏ'
              onPress={() => dispatch(cartActions.addToCart(itemData.item))}
            />
          ) : (
            <Text style={{ color: Colors.primary, fontSize: 18 }}>
              Sản phẩm của tôi
            </Text>
          )}
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  const totalProductOnCart = navData.navigation.getParam('totalProductOnCart');
  return {
    headerTitle: 'Tất cả sản phẩm',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={styles.quantityCart}>{totalProductOnCart}</Text>
          </View>
        </View>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityCart: {
    color: Colors.primary,
    marginRight: -6,
  },
});

export default ProductsOverviewScreen;
