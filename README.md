# [react-native-stagger-view](https://www.npmjs.com/package/@mindinventory/react-native-stagger-view)

A **@mindinventory/react-native-stagger-view** package is used to show listing with the Staggered, It works like a normal Flatlist with included refreshing, loading, header, footer, renderItem, loaderView, custom style of header footer and container but it's managed dynamic height of the Item just you need give Item height in its style.

<a href="https://www.mindinventory.com/?utm_source=gthb&utm_medium=repo&utm_campaign=react-native-stagger-view"><img src="https://user-images.githubusercontent.com/48902198/148067650-1949d1f0-b446-4ebc-b378-384e66fd7b8e.png"></a>

### Animations

![Fade In](https://user-images.githubusercontent.com/88423352/160378928-a2e472c6-df2f-4e11-9566-cd1e32e67a3e.gif)
![Slide-Left](https://user-images.githubusercontent.com/88423352/160379456-33f6202c-4184-4ecd-852b-a85c099faf71.gif)
![Slide-Down](https://user-images.githubusercontent.com/88423352/160379469-37adc7e9-9ebf-4a46-a895-0ecaf7c226ec.gif)
![Effective](https://user-images.githubusercontent.com/88423352/160378368-563dc457-54e6-421d-94c6-534e3bd9e9cc.gif)
![Flipped](https://user-images.githubusercontent.com/88423352/160379485-809a22e8-82f8-4016-aa57-0d1553f54e15.gif)


### Installation

using npm:

```
npm install @mindinventory/react-native-stagger-view
```

using yarn:

```
yarn add @mindinventory/react-native-stagger-view
```

### Supported platform

- Android
- Ios

### Usage

```js
import StaggeredList from '@mindinventory/react-native-stagger-view';
...

<StaggeredList
            data={imageURL}
            animationType={'FADE_IN_FAST'}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderChildren(item)}
            isLoading={isLoading}
            LoadingView={
              <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator color={'black'} size={'large'} />
              </View>
            }
          />

 const renderChildren = item => {
    return (
      <View style={getChildrenStyle()} key={item.id}>
        <View style={styles.avatarImage}>
          <Image
            onError={() => {}}
            style={styles.img}
            source={{
              uri: item.url,
            }}
            resizeMode={'cover'}
          />
        </View>
      </View>
    );
  };

const getChildrenStyle = () => {
    return {
      width: (SCREEN_WIDTH - 18) / 2,
      height: Number(Math.random() * 20 + 12) * 10,
      backgroundColor: 'gray',
      margin: 4,
      borderRadius: 18,
    };
  };
```

### Documentation

| Prop                     | Type                                                                                 | Description                                                                                                                                 | Default   |
| ------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| animationType            | `FADE_IN_FAST` OR `SLIDE_LEFT` OR `SLIDE_DOWN` OR `EFFECTIVE` OR `FLIPPED` OR `NONE` | Appying Animation to list or default NONE item.                                                                                             |           |
| innerRef                 | `MutableRefObject<ScrollView>`                                                       | ScrollView ref to be forwarded to the underlying scrollView.                                                                                | undefined |
| innerRef                 | `MutableRefObject<ScrollView>`                                                       | ScrollView ref to be forwarded to the underlying scrollView.                                                                                | undefined |
| keyPrefix                | string                                                                               | Unique key for each item.                                                                                                                   |           |
| loading                  | boolean                                                                              | if true, the loadingView will be shown on top of the list.                                                                                  | false     |
| refreshing               | `RefreshControlProps['refreshing']`                                                  | Add pull to refresh in the list.                                                                                                            |           |
| onRefresh                | `RefreshControlProps['onRefresh']`                                                   | Callback function when user pull to refresh.                                                                                                |           |
| onEndReached             | `() => void`                                                                         | callback in scrollView onEndReached.                                                                                                        |           |
| onEndReachedThreshold    | number                                                                               | Threshold in pixels (virtual, not physical) for calling onEndReached. It calls onEndReached if you scrolled to this pixels from the bottom. |           |
| style                    | `StyleProp<ViewStyle>`                                                               | style object for the listing.                                                                                                               |           |
| data                     | T[]                                                                                  | Items to be rendered.                                                                                                                       |           |
| renderItem               | `({item: T, i: number}) => ReactElement`                                             | Takes an item from data and renders it into the list.                                                                                       |           |
| LoadingView              | `ComponentType<any>`                                                                 | Rendered while loading.                                                                                                                     |           |
| ListHeaderComponent      | `ComponentType<any>`                                                                 | Rendered at the top of all the items.                                                                                                       | null      |
| ListEmptyComponent       | `ComponentType<any>`                                                                 | Rendered when the list is empty.                                                                                                            | null      |
| ListFooterComponent      | `ComponentType<any>`                                                                 | Rendered at the bottom of all the items.                                                                                                    | null      |
| ListHeaderComponentStyle | `StyleProp<ViewStyle>`                                                               | Style of the header.                                                                                                                        |           |
| contentContainerStyle    | `StyleProp<ViewStyle>`                                                               | Style of the content container style of the main scrollView.                                                                                |           |
| containerStyle           | `StyleProp<ViewStyle>`                                                               | Style of main scrollView.                                                                                                                   |           |
| numColumns               | number                                                                               | Multiple columns can only be rendered.                                                                                                      | 2         |

### Changelog

**Version: 1.1.0**

- Initial Build

### LICENSE!

@mindinventory/react-native-stagger-view is [MIT-licensed](https://github.com/Mindinventory/react-native-stagger-view/blob/main/LICENSE).

### Let us know!

We’d be really happy if you send us links to your projects where you use our component. Just send an email to sales@mindinventory.com And do let us know if you have any questions or suggestion regarding our work.

## 📌 Credits :

This project is made possible by the community surrounding it and especially the wonderful people. Rendering a list is basically clone form this repo [GitHub Repo](https://github.com/hyochan/react-native-masonry-list/)
