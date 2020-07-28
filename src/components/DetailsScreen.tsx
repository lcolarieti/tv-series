import React, {ReactElement, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Linking, Alert, ScrollView} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {StackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {Avatar, Card, Divider} from '@ui-kitten/components';
import HTML from 'react-native-render-html';

type ShowListScreenNavigationProp = StackNavigationProp<
  StackParamList, 'DetailsScreen'
  >;

type ShowListScreenRouteProp = RouteProp<
  StackParamList, 'DetailsScreen'
  >;

type Props = {
  navigation: ShowListScreenNavigationProp;
  route: ShowListScreenRouteProp;
};

const DetailsScreen: React.FC<Props> = (props: Props) => {
  const {route: {params: show}, navigation} = props;

  useEffect(() => {
    navigation.setOptions({title: show.name});
  }, []);

  const createText = (label: string | undefined, value: string | Array<string>): ReactElement<View> => (
    value ?
      <View style={styles.infoTextWrap}>
        {label && <Text style={styles.infoTextLabel}>{label}:</Text>}
        {!(value instanceof Array) && <Text>{value}</Text>}
        {value instanceof Array && <Text>{value.join(' / ')}</Text>}
      </View> :
      <></>
  );

  const createLink = (label: string, url: string) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      supported ? await Linking.openURL(url) : Alert.alert(`Don't know how to open this URL: ${url}`);
    }, [url]);
    return <View style={styles.infoTextWrap}>
      <Text style={styles.infoTextLabel}>{label}:</Text>
      <Text onPress={handlePress}>{url}</Text>
    </View>;
  };

  return <View>
    <ScrollView>
      <Card>
        <View style={styles.headerWrap}>
          <Avatar
            size='giant'
            source={{uri: show.image ?
                show.image.medium :
                'https://via.placeholder.com/210x295'}}
          />
          <Text style={styles.headerText}>{show.name}</Text>
          {show.summary !== '' && <HTML html={show.summary}/>}
        </View>
        <Divider />
        {createText('Type', show.type)}
        {createText('Language', show.language)}
        {createText('Genres', show.genres)}
        {createText('Premiered', show.premiered)}
        {createLink('Official site', show.officialSite)}
        {createText('Rating', show.rating?.average?.toString())}

      </Card>
    </ScrollView>
  </View>
};

export default DetailsScreen;

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  headerText: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 20
  },
  infoTextLabel: {
    fontWeight: 'bold',
    marginRight: 5
  },
  infoTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10
  }
});