import {
  Animated,
  Dimensions,
  Easing,
  NativeScrollEvent,
  RefreshControl,
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import React, { MutableRefObject, ReactElement, memo, useState, Key, useEffect, useRef } from "react";

export type AnimationType = 'FADE_IN_FAST' | 'SLIDE_LEFT' | 'SLIDE_DOWN' | 'EFFECTIVE' | 'FLIPPED' | 'NONE';

interface Props<T>
extends Omit<ScrollViewProps, "refreshControl" | "onScroll"> {
animationType: AnimationType,
innerRef?: MutableRefObject<ScrollView | undefined>;
keyPrefix?: string;
loading?: boolean;
refreshing?: RefreshControlProps["refreshing"];
onRefresh?: RefreshControlProps["onRefresh"];
onEndReached?: () => void;
onEndReachedThreshold?: number;
style?: StyleProp<ViewStyle>;
data: T[];
renderItem: ({ item: T, i: number }) => ReactElement;
LoadingView?: React.ComponentType<any> | React.ReactElement | null;
ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
ListHeaderComponentStyle?: StyleProp<ViewStyle>;
contentContainerStyle?: StyleProp<ViewStyle>;
containerStyle?: StyleProp<ViewStyle>;
numColumns?: number;
}

function StaggeredList<T>(props: Props<T>): ReactElement {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const value = useRef(new Animated.Value(0));

  const {
    animationType =  'NONE',
    keyPrefix,
    refreshing,
    data,
    innerRef,
    ListHeaderComponent,
    ListEmptyComponent,
    ListFooterComponent,
    ListHeaderComponentStyle,
    containerStyle,
    contentContainerStyle,
    renderItem,
    onEndReachedThreshold,
    onEndReached,
    onRefresh,
    loading,
    LoadingView,
    numColumns = 2,
    horizontal,
  } = props;

  const { style, ...propsWithoutStyle } = props;

  // Fade In fast
  useEffect(() => {
    if(animationType == 'FADE_IN_FAST'){
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
    }
  }, [animationType]);

  const FadeInFastAnimation = ({item,index}: { item: ReactElement,index:number}) => {
    var itemPerIndex = 1;
    const movedByPosition = (1 - 1 / itemPerIndex) * index;
    return (
      <Animated.View
      style={{
        opacity: value.current.interpolate({
          outputRange: [0, 0, 1, 1],
          inputRange:
            index === 0
              ? [-1, 0, 1, 2]
              : [index - 1 - movedByPosition, index - movedByPosition, index + 1 - movedByPosition, index + 2 - movedByPosition],
          extrapolate: 'clamp',
        }),
      }}>
        {item}
      </Animated.View>
    );
  };

  const SlideLeftAnimation = ({item,index}: { item: ReactElement,index:number}) => {
    const SlideLeftAnimation = useRef(new Animated.Value(0)).current;
    const translateX = SlideLeftAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get('window').width/(numColumns), 0],
    });
    useEffect(() => {
      Animated.spring(SlideLeftAnimation, {
        toValue: 1,
        delay: index * 4,
        useNativeDriver: true,
      }).start();
    }, [animationType]);

  return <Animated.View style={{
    transform: [
      {
        translateX,
      },
    ],
  }}>{item}</Animated.View>;
  };

  const SlideDownAnimation = ({item,index}: { item: ReactElement,index:number}) => {
    const slideRightAnimatedValue = useRef(new Animated.Value(0)).current;
    const translateY = slideRightAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get('window').height,0],
    });
    useEffect(() => {
      Animated.spring(slideRightAnimatedValue, {
        toValue: 1,
        delay: index * 10,
        useNativeDriver: true,
      }).start();
    }, [animationType]);

  return <Animated.View style={{
    transform: [
      {
        translateY,
      },
    ],
  }}>{item}</Animated.View>;
  };

  const FlipedAnimation = ({item,index}: { item: ReactElement,index:number}) => {
    const rotateAnimateValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(rotateAnimateValue, {
        toValue:  1,
        duration: 500,
        delay: index * 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, [animationType]);
  
    return (
      <View>
        <Animated.View style={{transform: [
          {
            rotateX:  rotateAnimateValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['90deg', '360deg'],
            }),
          },
        ]}}>{item}</Animated.View>
      </View>
    );
  };

  const EffectiveAnimation = ({item,index}: { item: ReactElement,index:number}) => {
  const yAxis = useRef(new Animated.Value(0)).current;

  const translateY = yAxis.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
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
  }, [animationType]);
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

  return <Animated.View style={[
    {
      transform: [{ translateY }, { scaleX }, { scaleY }],
    },
  ]}>{item}</Animated.View>
  };

  const RenderItem = ({item,index}: { item: ReactElement,index:number}) => {
    return(
    <>{ 
      animationType == 'FADE_IN_FAST' 
      ? <FadeInFastAnimation index={index} item = {item}/> :
      animationType == 'SLIDE_LEFT'? <SlideLeftAnimation index={index} item = {item}/>:
      animationType == 'SLIDE_DOWN'? <SlideDownAnimation index={index} item = {item}/>:
      animationType == 'FLIPPED'? <FlipedAnimation index={index} item = {item}/>:
      animationType == 'EFFECTIVE'? <EffectiveAnimation index={index} item = {item}/>:
      {item}
      }
    </>
      );
  };

  return (
    <ScrollView
      {...propsWithoutStyle}
      ref={innerRef}
      style={[{ flex: 1, alignSelf: "stretch" }, containerStyle]}
      contentContainerStyle={contentContainerStyle}
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControl
          refreshing={!!(refreshing || isRefreshing)}
          onRefresh={() => {
            setIsRefreshing(true);
            onRefresh?.();
            setIsRefreshing(false);
          }}
        />
      }
      scrollEventThrottle={16}
      onScroll={({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
        if (isCloseToBottom(nativeEvent, onEndReachedThreshold || 0.1)) {
          onEndReached?.();
        }
      }}
    >
      <View style={ListHeaderComponentStyle}>{ListHeaderComponent}</View>
      {data.length === 0 && ListEmptyComponent ? (
        React.isValidElement(ListEmptyComponent) ? (
          ListEmptyComponent
        ) : (
          <ListEmptyComponent />
        )
      ) : (
        <View
          style={[
            {
              flex: 1,
              flexDirection: horizontal ? "column" : "row",
            },
            style,
          ]}
        >
          {Array.from(Array(numColumns), (_, num) => {
            return (
              <View
                key={`${keyPrefix}-${num.toString()}`}
                style={{
                  flex: 1 / numColumns,
                  flexDirection: horizontal ? "row" : "column",
                }}
              >
                {data
                  .map((el, index) => {
                    if (index % numColumns === num) {
                      return (
                        <RenderItem 
                        index={index}
                        key={`keyPrefix-${(index*1).toString()}`}
                        item={renderItem({ item: el, i:index })} />
                      );
                    }
                    return null;
                  })
                  .filter((e) => !!e)}
              </View>
            );
          })}
        </View>
      )}
      {loading && LoadingView}
      {ListFooterComponent}
    </ScrollView>
  );
}

const isCloseToBottom = (
  { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
  onEndReachedThreshold: number
): boolean => {
  const paddingToBottom = contentSize.height * onEndReachedThreshold;

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default memo(StaggeredList);