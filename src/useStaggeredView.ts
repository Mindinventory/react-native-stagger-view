import { useState } from 'react';
import type { NativeScrollEvent } from 'react-native';
import { stageredStyles } from './stageredView.styles';
import type { StaggeredListProps } from './staggeredView.props';

export function useStaggeredView<T>(props: StaggeredListProps<T>) {
  const {
    animationType = 'NONE',
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
    loading,
    LoadingView,
    numColumns = 2,
    style,
  } = props;

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const { stageredViewStyles } = stageredStyles(
    props.horizontal,
    props.numColumns
  );

  const isCloseToBottom = (
    { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
    onEndReachedThre: number
  ): boolean => {
    const paddingToBottom = contentSize.height * onEndReachedThre;

    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    props.onRefresh?.();
    setIsRefreshing(false);
  };

  return {
    animationType,
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
    numColumns,
    onEndReachedThreshold,
    onEndReached,
    onRefresh,
    stageredViewStyles,
    style,
    refreshing,
    renderItem,
  };
}
