import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import ProductDisplay from '../components/ProductDisplay';

const Products = () => {
  const [product, setProduct] = useState()

  const route = useRoute();
  const { type } = route.params;

  const getAllProducts = async (type) => {
    try {
      const response = await axios.get(`https://quickpick.onrender.com/api/v1/product/${type}`);
      console.log(response.data.products)
      setProduct(response.data.products);

    } catch (error) {
      setProduct(null);
    }
  };


  useEffect(() => {
    getAllProducts(type);
  }, [])

  return (
    <View>
      <Text style={{margin:18, fontSize:22}}>{type}</Text>
      {
        product ? (
          product.map((e, i) => {
            return <ProductDisplay key={i} product={e} />
          })
        ) : (
          <Text>No products found</Text>
        )
      }
    </View>
  )
}

export default Products
