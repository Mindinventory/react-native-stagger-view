import type { MutableRefObject, ReactElement } from 'react';
import React from 'react';
import type { Animated } from 'react-native';
import type { AnimationType } from '..';
import { EffectiveAnimation } from './effectiveAnimation';
import { FadeInFastAnimation } from './fadeInFastAnimation';
import { FlipedAnimation } from './flipedAnimation';
import { SlideDownAnimation } from './slideDownAnimation';
import { SlideLeftAnimation } from './slideLeftAnimation';

export const Animations = ({
  item,
  index,
  animationType,
  value,
  numColumns,
}: {
  item: ReactElement;
  index: number;
  animationType: AnimationType;
  value: MutableRefObject<Animated.Value>;
  numColumns: number;
}) => {
  return (
    <>
      {animationType === 'FADE_IN_FAST' ? (
        <FadeInFastAnimation index={index} item={item} value={value} />
      ) : animationType === 'SLIDE_LEFT' ? (
        <SlideLeftAnimation index={index} item={item} numColumns={numColumns} />
      ) : animationType === 'SLIDE_DOWN' ? (
        <SlideDownAnimation
          index={index}
          item={item}
          animationType={animationType}
        />
      ) : animationType === 'FLIPPED' ? (
        <FlipedAnimation
          index={index}
          item={item}
          animationType={animationType}
        />
      ) : animationType === 'EFFECTIVE' ? (
        <EffectiveAnimation
          index={index}
          item={item}
          animationType={animationType}
        />
      ) : (
        item
      )}
    </>
  );
};
