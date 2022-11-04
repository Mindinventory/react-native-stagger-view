import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import type { AnimationType } from '..';

export const EffectiveAnimation = ({
  item,
  index,
  animationType,
}: {
  item: ReactElement;
  index: number;
  animationType: AnimationType;
}) => {
  const yAxis = useRef(new Animated.Value(0)).current;

  const translateY = yAxis.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  const width = useRef(new Animated.Value(0)).current;
  const scaleX = width.interpolate({
    inputRange: [0, 0.67, 1],
    outputRange: [1, 0.5, 1],
  });

  const height = useRef(new Animated.Value(0)).current;
  const scaleY = height.interpolate({
    inputRange: [0, 0.67, 1],
    outputRange: [1, 0.5, 1],
  });

  useEffect(() => {
    Animated.parallel([
      Animated.spring(yAxis, {
        toValue: 1,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.spring(width, {
        toValue: 1,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.spring(height, {
        toValue: 1,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animationType, height, index, width, yAxis]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY }, { scaleX }, { scaleY }],
        },
      ]}
    >
      {item}
    </Animated.View>
  );
};
