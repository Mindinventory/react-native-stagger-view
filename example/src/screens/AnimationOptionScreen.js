import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AnimationOptionScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.selectAnimContainer}>
          <Text style={styles.selectAnimText}>SELECT ANIMATION TYPE</Text>
        </View>
        <View style={{height: 50}}></View>
        <TouchableOpacity
          style={styles.animOptionStyle}
          onPress={() =>
            navigation.navigate('AnimationScreen', {
              animationType: 'FADE_IN_FAST',
            })
          }>
          <Text style={styles.animOptionText}>FADE-IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.animOptionStyle}
          onPress={() =>
            navigation.navigate('AnimationScreen', {
              animationType: 'SLIDE_LEFT',
            })
          }>
          <Text style={styles.animOtherOptionText}>SLIDE LEFT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.animOptionStyle}
          onPress={() =>
            navigation.navigate('AnimationScreen', {
              animationType: 'SLIDE_DOWN',
            })
          }>
          <Text style={styles.animOtherOptionText}>SLIDE DOWN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.animOptionStyle}
          onPress={() =>
            navigation.navigate('AnimationScreen', {
              animationType: 'EFFECTIVE',
            })
          }>
          <Text style={styles.animOtherOptionText}>EFFECTIVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.animOptionFlippedStyle}
          onPress={() =>
            navigation.navigate('AnimationScreen', {
              animationType: 'FLIPPED',
            })
          }>
          <Text style={styles.animOtherOptionText}>FLIPPED</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AnimationOptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingTop: 20,
    borderRadius: 10,
  },
  selectAnimContainer: {
    borderBottomWidth: 1.5,
  },
  selectAnimText: {
    fontSize: 16,
    marginStart: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  animOptionStyle: {
    marginStart: 16,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
  },
  animOptionFlippedStyle: {
    marginStart: 16,
  },
  animOptionText: {
    paddingBottom: 10,
    fontSize: 18,
    color: '#202020',
    fontWeight: '500',
  },
  animOtherOptionText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#202020',
  },
});
