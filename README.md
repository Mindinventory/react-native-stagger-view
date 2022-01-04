# react-native-stagger-view

A **@mindinventory/react-native-stagger-view** package is used to show listing with the Staggered, It works like a normal Flatlist with included refreshing, loading, header, footer, renderItem, loaderView, custom style of header footer and container but it's managed dynamic height of the Item just you need give Item height in its style.

https://user-images.githubusercontent.com/48902198/148036163-c8270a2c-b8f9-4a46-af19-77303110a70f.mp4

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
  * Android
  * Ios

### Usage

```js
import StaggeredList from 'react-native-stagger-view';
...

<StaggeredList
   data={imageURL}
   contentContainerStyle={styles.contentContainer}
   showsVerticalScrollIndicator={false}
   renderItem={({item}) => renderChildren(item)}
   loading={isLoading}
   LoadingView={
     <View style={styles.activityIndicatorWraper}>
        <ActivityIndicator color={'white'} size={'large'} />
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

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| innerRef | ```MutableRefObject<ScrollView>``` | ScrollView ref to be forwarded to the underlying scrollView. | undefined |
| keyPrefix | string | Unique key for each item. |  |
| loading | boolean | if true, the loadingView will be shown on top of the list. | false |
| refreshing | ```RefreshControlProps['refreshing']``` | Add pull to refresh in the list. |  |
| onRefresh | ```RefreshControlProps['onRefresh']``` | Callback function when user pull to refresh. |  |
| onEndReached | ```() => void``` | callback in scrollView onEndReached. |  |
| onEndReachedThreshold | number | Threshold in pixels (virtual, not physical) for calling onEndReached. It calls onEndReached if you scrolled to this pixels from the bottom. |  |
| style | ```StyleProp<ViewStyle>``` | style object for the listing. |  |
| data | T[] | Items to be rendered. |  |
| renderItem | ```({item: T, i: number}) => ReactElement``` | Takes an item from data and renders it into the list. |  |
| LoadingView | ```ComponentType<any>``` | Rendered while loading. |  |
| ListHeaderComponent | ```ComponentType<any>``` | Rendered at the top of all the items. | null |
| ListEmptyComponent | ```ComponentType<any>``` | Rendered when the list is empty.  | null |
| ListFooterComponent | ```ComponentType<any>``` | Rendered at the bottom of all the items. | null |
| ListHeaderComponentStyle | ```StyleProp<ViewStyle>``` | Style of the header. |  |
| contentContainerStyle | ```StyleProp<ViewStyle>``` | Style of the content container style of the main scrollView. |  |
| containerStyle | ```StyleProp<ViewStyle>``` | Style of main scrollView. |  |
| numColumns | number | Multiple columns can only be rendered. | 2 |
  

### Changelog
**Version: 1.0.0**
  * Initial Build

### LICENSE!

@mindinventory/react-native-stagger-view is [MIT-licensed](https://github.com/Mindinventory/rn-top-navbar/blob/master/LICENSE).

### Let us know!

We’d be really happy if you send us links to your projects where you use our component. Just send an email to sales@mindinventory.com And do let us know if you have any questions or suggestion regarding our work.
