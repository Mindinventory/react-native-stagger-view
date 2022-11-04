import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

export const SlideLeftAnimation = ({
  item,
  index,
  numColumns,
}: {
  item: ReactElement;
  index: number;
  numColumns: number;
}) => {
  const ref = useRef(new Animated.Value(0)).current;
  const translateX = ref.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width / numColumns, 0],
  });
  useEffect(() => {
    Animated.spring(ref, {
      toValue: 1,
      delay: index * 4,
      useNativeDriver: true,
    }).start();
  }, [ref, index]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX,
          },
        ],
      }}
    >
      {item}
    </Animated.View>
  );
};
