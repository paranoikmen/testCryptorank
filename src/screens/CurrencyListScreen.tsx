import React, {useCallback, useDeferredValue, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Currency, SortOrder} from '../types/types';
import {getCurrencies} from '../api/api';
import {useNavigation} from '@react-navigation/native';

const CurrencyListScreen = ({route}) => {
  const {onChangeCurrency} = route.params;
  const navigation = useNavigation()

  const [offset, setOffset] = useState<number>(0);
  const [sort, setSort] = useState<SortOrder>(SortOrder.Rank);

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const deferredQuery = useDeferredValue(searchTerm);

  const fetchCurrencies = useCallback(async () => {
    try {
      const fetchedCurrencies = await getCurrencies({
        limit: 10,
        offset,
        symbols: searchTerm,
        sort,
      });
      console.log(searchTerm);
      setCurrencies(fetchedCurrencies.data);
    } catch (error) {
      console.error(error);
    }
  }, [currencies, offset, searchTerm, sort]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, [offset, sort]);

  useEffect(() => {
    if (deferredQuery === searchTerm) {
      setOffset(0);
      setSort(SortOrder.Rank);
      fetchCurrencies();
    }
  }, [deferredQuery, searchTerm]);

  const handleSort = () => {
    setOffset(0);
    setSort(sortType => {
      switch (sortType) {
        case SortOrder.Rank:
          return SortOrder.RankDescending;
        case SortOrder.RankDescending:
          return SortOrder.Price;
        case SortOrder.Price:
          return SortOrder.PriceDescending;
        case SortOrder.PriceDescending:
          return SortOrder.Rank;
        default:
          return SortOrder.Rank;
      }
    });
  };

  const nextPage = () => {
    setOffset(prevState => prevState + 10);
  };

  const prevPage = () => {
    setOffset(prevState => prevState - 10);
  };

  return (
    <View>
      <Text style={styles.text}>Select Currency</Text>
      <TextInput
        style={styles.text}
        placeholderTextColor={'grey'}
        placeholder="Search for a currency..."
        onChangeText={text => setSearchTerm(text)}
      />
      <TouchableOpacity style={styles.margins} onPress={() => handleSort()}>
        <Text style={styles.text}>{sort}</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.margins}
        data={currencies}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onChangeCurrency(item);
                navigation.goBack();
              }}>
              <Text style={styles.text}>{item.symbol}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.buttonsContainer}>
        {!offset || (
          <TouchableOpacity style={styles.button} onPress={() => prevPage()}>
            <Text style={styles.text}>{'<'}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={() => nextPage()}>
          <Text style={styles.text}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  margins: {
    marginTop: 15,
  },
  item: {
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrencyListScreen;
