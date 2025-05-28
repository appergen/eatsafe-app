import { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { View, Text, StyleSheet, Animated, Pressable, Alert } from 'react-native';
import { useGlobalSearchParams, Redirect } from 'expo-router';
import { faker } from '@faker-js/faker';
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import axios from 'axios';
import { LoaderSpinner } from '@/components/LoaderSpinner';

const HEADER_HEIGHT = 100;

export default function ModalScreen() {
  const modalRef = useRef<Modalize>(null);
  const { code } = useGlobalSearchParams();
  const [product, setProduct] = useState<any>(null);

  console.log('ModalScreen params:', code);

  const createNotFoundAlert = () =>
    Alert.alert('Produit non trouvé', 'Ler produit que vous cherchez n\'a pas été trouvé.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


  useEffect(() => {
    console.log('ModalScreen mounted');

    if (!code) {
      return;
    }

    const controller = new AbortController();

    axios.get(`https://world.openfoodfacts.org/api/v3/product/${code}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      timeout: 5000, // 5 seconds timeout
    })
      .then(({ data }) => {
        console.log('Product data fetched successfully');

        if (!data || data.status === 'failure' || data.result?.id === 'product_not_found') {
          console.error('Product not found or API error:', data);
          
          setProduct({
            id: 'not_found'
          });
          createNotFoundAlert();
          return;
        }

        console.log({
          id: data.product.id,
          name: data.product.product_name_fr,
          brand: data.product.brand ?? data.product.brands_tags?.[0],
          imageUrl: data.product.image_url,
          allergens: data.product?.allergens_tags.map((tag: string) => tag.split(':')[1])
        });

        if (!data.product) {
          console.error('No product data found');
          return;
        }

        setProduct({
          id: data.product.id,
          name: data.product.product_name_fr,
          brand: data.product.brands_tags?.[0] ?? data.product.brands,
          imageUrl: data.product.image_url,
          allergens: data.product?.allergens_tags.map((tag: string) => tag.split(':')[1])
        });
      })
      .catch((err) => {
        console.error('Error fetching product data:', err);

        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
          return;
        }
        setProduct({
          id: 'not_found'
        });
        createNotFoundAlert();
        
        return;
      })

    return () => {
      console.log('ModalScreen unmounted');
      controller.abort();
    }
  }, [code])

  if (!code) {
    return;
  }

  if (!product) {
    return (
      <View style={{
        zIndex: 1000,
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <LoaderSpinner size={70} color="#62B55C" />
      </View>
    )
  }

  if (product.id === 'not_found') {
    return <Redirect href="/" />
  }

  return (
    <Modalize
      ref={modalRef}
      alwaysOpen={HEADER_HEIGHT + 100}
      modalTopOffset={60}
      panGestureEnabled={true}
      closeOnOverlayTap={true}
      handlePosition='inside'
      handleStyle={{
        backgroundColor: '#ccc',
        width: 40,
        height: 5,
        borderRadius: 2,
        alignSelf: 'center',
      }}
      modalStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      overlayStyle={{
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}
      scrollViewProps={{
        showsVerticalScrollIndicator: true
      }}
    >
      <View style={{
        padding: 16,
      }}>
        <Animated.View style={styles.coverContainer}>
            <Animated.Image
              style={styles.cover}
              src={product.imageUrl}
            />
        </Animated.View>

        <Animated.View
          style={styles.contentHeader}
        >
          <Text style={styles.contentTitle}>{product.name}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
        </Animated.View>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  contentHeader: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 10,

    gap: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    height: HEADER_HEIGHT,
    paddingHorizontal: 30,
    paddingLeft: 190,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  brand: {
    fontSize: 14,
    color: '#666',
  },
  coverContainer: {
    zIndex: 100,
    width: 130,
    height: 130,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    marginLeft: 16,
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    resizeMode: 'contain',
  }
});