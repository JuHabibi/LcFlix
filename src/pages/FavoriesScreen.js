import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';

const FavoriesScreen = ({favoritesFilm}) => {
  return (
    <View style={styles.container}>
      <Text>favories</Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FavoriesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
