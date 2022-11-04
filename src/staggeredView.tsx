import React, { useRef } from 'react';
import {
  Animated,
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { useStaggeredView } from './useStaggeredView';
import { Animations } from './animations/Animations';
import type { StaggeredListProps } from './staggeredView.props';

const StaggeredList = <T extends unknown>(props: StaggeredListProps<T>) => {
  const value = useRef(new Animated.Value(0));

  const { ...propsWithoutStyle } = props;
  const {
    animationType = 'NONE',
    containerStyle,
    contentContainerStyle,
    data,
    isRefreshing,
    isCloseToBottom,
    innerRef,
    keyPrefix,
    loading,
    LoadingView,
    ListHeaderComponent,
    ListEmptyComponent,
    ListFooterComponent,
    ListHeaderComponentStyle,
    numColumns = 2,
    onEndReachedThreshold,
    onEndReached,
    onRefresh,
    stageredViewStyles,
    style,
    refreshing,
    renderItem,
  } = useStaggeredView(props);

  return (
    <ScrollView
      {...propsWithoutStyle}
      ref={innerRef}
      style={[stageredViewStyles.scrollView, containerStyle]}
      contentContainerStyle={contentContainerStyle}
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControl
          refreshing={!!(refreshing || isRefreshing)}
          onRefresh={onRefresh}
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
      {data?.length === 0 && ListEmptyComponent ? (
        React.isValidElement(ListEmptyComponent) ? (
          ListEmptyComponent
        ) : (
          <ListEmptyComponent />
        )
      ) : (
        <View style={[stageredViewStyles.container, style]}>
          {Array.from(Array(numColumns), (_, num) => {
            return (
              <View
                key={`${keyPrefix}-${num.toString()}`}
                style={[stageredViewStyles.list, style]}
              >
                {data
                  ? data
                      ?.map((el, index) => {
                        if (index % numColumns === num) {
                          return (
                            <Animations
                              index={index}
                              key={`keyPrefix-${(index * 1).toString()}`}
                              item={renderItem({ item: el, i: index })}
                              value={value}
                              numColumns={numColumns}
                              animationType={animationType}
                            />
                          );
                        }
                        return null;
                      })
                      .filter((e) => !!e)
                  : null}
              </View>
            );
          })}
        </View>
      )}
      {loading && LoadingView}
      {ListFooterComponent}
    </ScrollView>
  );
};

export default StaggeredList;
