import React, {Dispatch, ReactElement, SetStateAction} from 'react';
import {Icon, IconElement, Input} from '@ui-kitten/components';
import {StyleSheet, View, ViewProps} from 'react-native';

type SearchBarProps = {
  searchText: string;
  onChangeText: Dispatch<SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps): ReactElement<View> => {
  const {searchText, onChangeText} = props;

  const renderSearchIcon = (props: ViewProps | undefined): ReactElement<IconElement> => (
    <Icon name='search-outline' {...props} />
  );

  const renderCancelIcon = (props: ViewProps | undefined): ReactElement<IconElement> => (
    <Icon
      name='close-outline'
      {...props}
      onPress={() => onChangeText('')}
    />
  );

  return (
    <View style={styles.container}>
      <Input
        value={searchText}
        placeholder='Search TV series...'
        onChangeText={nextValue => onChangeText(nextValue)}
        size='large'
        style={styles.input}
        accessoryLeft={renderSearchIcon}
        accessoryRight={renderCancelIcon}
      />
    </View>
  );

};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  input: {
    borderColor: '#ccc',
    margin: 10,
    backgroundColor: '#fff'
  }
});