import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {getLists} from '../services/listsMovies';
import Slider from '../components/molecules/slider/Slider';

const HomeScreen = ({navigation}) => {
  const [firstMovies, setFirstMovies] = useState([]);
  const [ListMovies, setListMovies] = useState([]);

  useEffect(() => {
    let isActive = true;
    getLists('99').then(response => {
      if (isActive) {
        setFirstMovies(response.data.items[0]);
        setListMovies(response.data.items);
      }
      return () => {
        isActive = false;
      };
    });
  }, []);

  const image = {
    uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${firstMovies.backdrop_path}`,
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerPoster}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.backPoster}>
          <Text style={styles.title}>{firstMovies.original_title}</Text>
          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate('Details', {
                itemId: firstMovies.id,
              })
            }>
            voir les details
          </Text>
        </ImageBackground>
      </View>

      <Slider listMovies={ListMovies} navigation={navigation} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    moviesList: state.moviesList,
  };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  containerPoster: {
    width: '100%',
    height: '60%',
    position: 'relative',
  },
  backPoster: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    marginTop: 140,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
