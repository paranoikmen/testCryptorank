import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';

const FilterButton = ({values}: any[]) => {
  const [value, setValue] = useState(values[0]);

  return (
    <TouchableOpacity onPress={() => setValue()}>
      <Text>{value}</Text>
    </TouchableOpacity>
  );
};

export default FilterButton;
