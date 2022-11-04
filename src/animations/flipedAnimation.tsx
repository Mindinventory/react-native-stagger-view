import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import type { AnimationType } from '..';

export const FlipedAnimation = ({
  item,
  index,
  animationType,
}: {
  item: ReactElement;
  index: number;
  animationType: AnimationType;
}) => {
  const rotateAnimateValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(rotateAnimateValue, {
      toValue: 1,
      duration: 500,
      delay: index * 50,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [animationType, index, rotateAnimateValue]);

  return (
    <View>
      <Animated.View
        style={{
          transform: [
            {
              rotateX: rotateAnimateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['90deg', '360deg'],
              }),
            },
          ],
        }}
      >
        {item}
      </Animated.View>
    </View>
  );
};
