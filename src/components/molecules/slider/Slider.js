import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Button,
  TouchableNativeFeedback,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const Slider = ({...props}) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    let isActive = true;
    const filterMovie = props.listMovies.slice(1, 5).map(movie => {
      return movie;
    });

    if (isActive) {
      setEntries(filterMovie);
    }
    return () => {
      isActive = false;
    };
  }, [props.listMovies]);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableNativeFeedback
        onPress={() =>
          props.navigation.navigate('Details', {
            itemId: item.id,
          })
        }>
        <View key={index} style={styles.item}>
          <ParallaxImage
            source={{
              uri: `https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/${item.backdrop_path}`,
            }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />

          <View style={styles.contentDetails}>
            <Text style={styles.title} numberOfLines={2}>
              {item.original_title}
            </Text>
            <Text style={styles.link}>voir les details</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 190}
        data={entries}
        currentScrollPosition={1}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingBottom: 20,
  },
  item: {
    width: '100%',
    height: '100%',
    padding: 0,
    position: 'relative',
  },
  contentDetails: {
    position: 'absolute',
    padding: 20,
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 10,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
