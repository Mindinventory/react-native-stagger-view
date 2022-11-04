import type { MutableRefObject } from 'react';
import type {
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type AnimationType =
  | 'FADE_IN_FAST'
  | 'SLIDE_LEFT'
  | 'SLIDE_DOWN'
  | 'EFFECTIVE'
  | 'FLIPPED'
  | 'NONE';

export type ListRenderItem<T> = (
  info: ListRenderItemInfo<T>
) => React.ReactElement;

export interface ListRenderItemInfo<T> {
  item: T;
  i: number;
}

export interface StaggeredListELement extends StaggeredListStyles {
  LoadingView?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export interface StaggeredListStyles {
  style?: StyleProp<ViewStyle>;
  ListHeaderComponentStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface StaggeredListStyles {
  style?: StyleProp<ViewStyle>;
  ListHeaderComponentStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface StaggeredListProps<T>
  extends Omit<ScrollViewProps, 'refreshControl' | 'onScroll'>,
    StaggeredListELement {
  innerRef?: MutableRefObject<ScrollView>;
  refreshing?: RefreshControlProps['refreshing'];
  onEndReachedThreshold?: number;
  animationType: AnimationType;
  loading?: boolean;
  keyPrefix?: string;
  numColumns?: number;
  horizontal?: boolean;
  onEndReached?: () => void;
  onRefresh?: RefreshControlProps['onRefresh'];
  renderItem: ListRenderItem<T>;
  data: ReadonlyArray<T> | null | undefined;
}
