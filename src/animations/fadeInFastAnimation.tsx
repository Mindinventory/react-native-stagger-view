import React, { MutableRefObject, ReactElement, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export const FadeInFastAnimation = ({
  item,
  index,
  value,
}: {
  item: ReactElement;
  index: number;
  value: MutableRefObject<Animated.Value>;
}) => {
  var itemPerIndex = 1;
  const movedByPosition = (1 - 1 / itemPerIndex) * index;

  // Fade In fast
  useEffect(() => {
    var fadeInDuration = 1000;
    var delayInDuration = 1000;
    var durationPerItem = 150;
    value.current.setValue(0);
    Animated.timing(value.current, {
      toValue: fadeInDuration + 1,
      useNativeDriver: true,
      delay: delayInDuration,
      duration: fadeInDuration * durationPerItem,
      easing: Easing.linear,
    }).start();
  }, [value]);

  return (
    <Animated.View
      style={{
        opacity: value.current.interpolate({
          outputRange: [0, 0, 1, 1],
          inputRange:
            index === 0
              ? [-1, 0, 1, 2]
              : [
                  index - 1 - movedByPosition,
                  index - movedByPosition,
                  index + 1 - movedByPosition,
                  index + 2 - movedByPosition,
                ],
          extrapolate: 'clamp',
        }),
      }}
    >
      {item}
    </Animated.View>
  );
};
