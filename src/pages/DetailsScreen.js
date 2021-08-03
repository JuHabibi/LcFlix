import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {getDetailsMovies} from '../services/listsMovies';

const DetailsScreen = ({route, navigation, favoritesFilm, dispatch}) => {
  const [detailsMovies, setDetailsMovies] = useState([]);

  useEffect(() => {
    const {itemId} = route.params;
    let isActive = true;
    getDetailsMovies(itemId).then(response => {
      if (isActive) {
        setDetailsMovies(response.data);
      }
      return () => {
        isActive = false;
      };
    });
  }, []);

  const toggleFavorite = () => {
    const action = {type: 'TOGGLE_FAVORITE', value: detailsMovies};
    dispatch(action);
  };

  const image = {
    uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${detailsMovies.backdrop_path}`,
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backPoster}>
        <View style={styles.mask}>
          <Text style={styles.title}>{detailsMovies.original_title}</Text>
          <Text
            onPress={() => navigation.navigate('Favories')}
            style={styles.description}>
            {detailsMovies.overview}
          </Text>
          <Text onPress={() => toggleFavorite()} style={styles.description}>
            Ajouter aux favoris
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const mapStateToProps = state => ({
  favoritesFilm: state.favoritesFilm,
});
export default connect(mapStateToProps)(DetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#240b36',
  },
  backPoster: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    marginTop: 'auto',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
  },
  description: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingTop: 30,
  },
});
