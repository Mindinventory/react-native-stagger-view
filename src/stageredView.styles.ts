import { StyleSheet } from 'react-native';

export const stageredStyles = (
  horizontal: boolean | undefined | null,
  numColumns: number | undefined
) => {
  return {
    stageredViewStyles: StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: horizontal ? 'column' : 'row',
      },
      list: {
        flex: 1 / (numColumns ?? 2),
        flexDirection: horizontal ? 'row' : 'column',
      },
      scrollView: {
        flex: 1,
        alignSelf: 'stretch',
      },
    }),
  };
};
