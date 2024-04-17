import React from 'react';
import {Currency} from '../../types/types';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type InputType = {
  currency: Currency;
  value: string | number;
  onChangeText: (e) => void;
  editable?: boolean;
};

const Input = ({
  currency,
  value,
  onChangeText,
  onChangeCurrency,
  editable,
}: InputType) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <TextInput
        keyboardType="numeric"
        value={value}
        defaultValue={value.toString()}
        onBlur={() => {
          const numericValue = Number(value);
          onChangeText(
            numericValue > 1
              ? numericValue.toFixed(2)
              : numericValue.toPrecision(2),
          );
        }}
        onChangeText={e => onChangeText(e)}
        editable={editable}
        style={styles.text}
        placeholderTextColor={'black'}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CurrencyListScreen', {
            onChangeCurrency,
          })
        }>
        <Text style={styles.text}>symbol:</Text>
        <Text style={styles.text}>{currency?.symbol?.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'black',
  },
});

export default Input;
