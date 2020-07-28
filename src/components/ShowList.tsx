import React, {ReactElement, useEffect, useState} from 'react';
import {useSearchApi} from '../api';
import {
  ListRenderItemInfo,
  View,
  ViewProps
} from 'react-native';
import {ShowDetailsInterface, ShowInterface} from '../interfaces/show';
import {
  Avatar,
  AvatarElement,
  Divider,
  Icon,
  IconElement,
  List,
  ListItem,
} from '@ui-kitten/components';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../App';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import SearchBar from './SearchBar';


type ShowListScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'ShowList'
  >;

type ShowListScreenRouteProp = RouteProp<
  StackParamList, 'ShowList'
  >;

type Props = {
  navigation: ShowListScreenNavigationProp;
  root: ShowListScreenRouteProp;
};

const ShowList: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const [searchText, setSearchText] = useState<string>('');
  const searchResults = useSearchApi(`http://api.tvmaze.com/search/shows?q=${searchText}`);

  useEffect(() => {
    navigation.setOptions({
      title: `TV Series${(searchText.trim() !== '' ? `: ${searchText}` : '')}`
    });
  }, [searchText]);

  const renderListItem = (item: ListRenderItemInfo<ShowInterface>) => {
    const {item : {show}} = item;

    return <ListItem
      key={show.id}
      title={show.name}
      description={show.type}
      accessoryRight={renderItemIcon}
      accessoryLeft={() => renderItemImage(show)}
      onPress={() => navigation.navigate('DetailsScreen', show)}
    />
  };

  const renderItemImage = (item: ShowDetailsInterface): ReactElement<AvatarElement> => {
    return <Avatar
      source={{uri: item.image ?
          item.image.medium :
          'https://via.placeholder.com/210x295'}}
    />
  };

  const renderItemIcon = (props: ViewProps | undefined): ReactElement<IconElement> => (
    <Icon name='chevron-right-outline' {...props} />
  );

  return <View>
    <SearchBar
      searchText={searchText}
      onChangeText={setSearchText}
    />
    <List
      data={searchResults}
      renderItem={renderListItem}
      ItemSeparatorComponent={Divider}
    />
  </View>;
}

export default ShowList;