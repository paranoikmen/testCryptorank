import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Currency} from '../../types/types';
import Input from '../input/Input';
import {convertCurrency} from '../../utils/converCurrency';

type ConverterProps = {
  data: Currency[];
};
const Converter = ({data}: ConverterProps) => {
  const [value, setValue] = useState(1);

  const [firstCurrency, setFirstCurrency] = useState(data[0]);
  const [secondCurrency, setSecondCurrency] = useState(data[1]);

  const handleSwitchCurrency = () => {
    const temp = firstCurrency;
    setFirstCurrency(secondCurrency);
    setSecondCurrency(temp);
  };

  const handleChangeFirstInput = value => {
    setValue(value.replace(/([^(\d|\.)])*/g, ''));
  };

  const test = inputValue => {
    const numericValue = Number(inputValue);
    return numericValue > 1
      ? numericValue.toFixed(2)
      : numericValue.toPrecision(2);
  };

  return (
    <SafeAreaView>
      <View>
        <Input
          onChangeText={handleChangeFirstInput}
          onChangeCurrency={setFirstCurrency}
          value={value}
          currency={firstCurrency}
        />
      </View>
      <View style={styles.switchButtonContainer}>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => handleSwitchCurrency()}>
          <Text style={styles.text}>↑↓</Text>
        </TouchableOpacity>
      </View>
      <Input
        onChangeCurrency={setSecondCurrency}
        value={
          firstCurrency
            ? test(convertCurrency(value, firstCurrency, secondCurrency))
            : 0
        }
        currency={secondCurrency}
        editable={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  switchButtonContainer: {
    alignItems: 'center',
  },
  switchButton: {
    backgroundColor: 'green',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});

export default Converter;
