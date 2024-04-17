import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Converter from '../components/Converter/Converter';
import {getCurrencies} from '../api/api';

const ConverterScreen = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCurrencies({limit: 2});
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <View>{data ? <Converter data={data?.data} /> : <Text>load</Text>}</View>
  );
};

export default ConverterScreen;
