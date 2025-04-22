import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Alert } from 'react-native';
import { BellRing, House, Library, Newspaper, Search } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      top: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: theme === 'light' ? '#fff' : '#333',
    },
    styleHinhAnh: {
      width: 30,
      height: 30,
    },
    inDam: {
      fontWeight: 'bold',
      fontSize: 25,
      color: theme === 'light' ? 'black' : 'white',
    },
    inDam1: {
      left: 10,
      fontWeight: 'bold',
      fontSize: 25,
      color: theme === 'light' ? 'black' : 'white',
    },
    mauNhat: {
      color: theme === 'light' ? 'gray' : '#ccc',
      fontSize: 15,
    },
    khoangCach: {
      marginTop: 70,
      paddingHorizontal: 10,
    },
    txtFeildContainer: {
      position: 'relative',
      marginTop: 20,
      paddingHorizontal: 10,
    },
    txtFeild: {
      height: 40,
      borderColor: theme === 'light' ? 'gray' : '#555',
      borderWidth: 1,
      paddingLeft: 40,
      borderRadius: 25,
      backgroundColor: theme === 'light' ? '#fff' : '#444',
      color: theme === 'light' ? 'black' : 'white',
    },
    searchIcon: {
      position: 'absolute',
      left: 20,
      top: 10,
      color: theme === 'light' ? 'gray' : '#ccc',
    },
    scrollView: {
      marginTop: 20,
    },
    itemContainer: {
      marginRight: 10,
    },
    itemImage: {
      width: 175,
      height: 225,
    },
    itemImage2: {
      width: 150,
      height: 150,
    },
    itemImage3: {
      width: 150,
      height: 150,
    },
    khoangCachData: {
      marginTop: 20,
      paddingHorizontal: 10,
    },
    khoangCach4: {
      flexDirection: 'row',
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginVertical: 1,
    },
    buttonSee: {
      color: '#ff1b6b',
    },
    followButton: {
      backgroundColor: '#ff1b6b',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginTop: 5,
    },
    followButtonText: {
      alignSelf: 'center',
      color: 'white',
      fontWeight: 'bold',
    },
    itemTitle: {
      marginTop: 5,
      fontSize: 14,
      color: theme === 'light' ? 'black' : 'white',
    },
    itemTitle1: {
      alignSelf: 'center',
      marginTop: 5,
      fontSize: 14,
      fontWeight: 'bold',
      color: theme === 'light' ? 'black' : 'white',
    },
    khoangCach5: {
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 20,
      backgroundColor: "#231b2e",
      justifyContent: 'space-between',
    },
    iconContainer: {
      alignItems: 'center',
    },
    icon: {
      color: 'white',
      fontSize: 30,
    },
    icon1: {
      left: 140,
      color: theme === 'light' ? 'black' : 'white',
      fontSize: 30,
    },
    iconTitle: {
      fontSize: 12,
      color: 'white',
    },
    languageButton: {
      fontSize: 16,
      color: theme === 'light' ? '#ff1b6b' : '#ff5b8b',
    },
  });

export default function HomeAudioListing() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('light');
  const [sortOrder, setSortOrder] = useState('default');
  const styles = getStyles(theme);

  // Tải favorites từ AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(new Set(JSON.parse(savedFavorites)));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  // Lưu favorites vào AsyncStorage
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify([...favorites]));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    };
    saveFavorites();
  }, [favorites]);

  const data = [
    { key: "1", image: require("../images/HomeAudioListing/Container26.png"), title: "Suggestion 1" },
    { key: "2", image: require("../images/HomeAudioListing/Container27.png"), title: "Suggestion 2" },
    { key: "3", image: require("../images/HomeAudioListing/Container31.png"), title: "Suggestion 3" },
  ];

  const data2 = [
    { key: "4", image: require("../images/HomeAudioListing/Container31.png"), title: "Daily chart-toppers update" },
    { key: "5", image: require("../images/HomeAudioListing/Container32.png"), title: "Daily chart-toppers update" },
    { key: "6", image: require("../images/HomeAudioListing/Container33.png"), title: "Daily chart-toppers update" },
  ];

  const data3 = [
    { key: "7", image: require("../images/HomeAudioListing/Image45.png"), title: "ME Jessica Gonzalez" },
    { key: "8", image: require("../images/HomeAudioListing/Image46.png"), title: "Magna nost Brian Thomas" },
    { key: "9", image: require("../images/HomeAudioListing/Image47.png"), title: "Magna nost Christopher Nolan" },
  ];

  const data4 = [
    { key: "10", image: require("../images/HomeAudioListing/Image39.png"), title: "Jennifer Wilson" },
    { key: "11", image: require("../images/HomeAudioListing/Image40.png"), title: "Elizabeth Hall" },
    { key: "12", image: require("../images/HomeAudioListing/Image41.png"), title: "Anthony Bourdain" },
    { key: "13", image: require("../images/ArtistProfile/Image63.png"), title: "Ryan Young" },
  ];

  // Lọc và sắp xếp dữ liệu
  const filteredData = data.filter(item =>
    item.title?.toLowerCase().includes(query.toLowerCase())
  );
  const filteredData2 = data2.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
  const filteredData3 = data3.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
  const filteredData4 = data4.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const sortData = (data) => {
    if (sortOrder === 'alphabetical') {
      return [...data].sort((a, b) => a.title?.localeCompare(b.title));
    }
    return data;
  };

  const sortedFilteredData = sortData(filteredData);
  const sortedFilteredData2 = sortData(filteredData2);
  const sortedFilteredData3 = sortData(filteredData3);
  const sortedFilteredData4 = sortData(filteredData4);

  const handleSuggestionPress = (item) => {
    navigation.navigate('SuggestionsDetails', { item });
  };

  const handleSeeAllCharts = () => {
    navigation.navigate('ChartsList', { data: sortedFilteredData2 });
  };

  const handleSeeAllAlbums = () => {
    navigation.navigate('AlbumsList', { data: sortedFilteredData3 });
  };

  const handleSeeAllArtists = () => {
    navigation.navigate('ArtistsList', { data: sortedFilteredData4 });
  };

  const handlePressItem = (item) => {
    navigation.navigate('PlaylistsDetails', { item });
  };

  const handlePressItem1 = (item) => {
    navigation.navigate('TrendingAlbums', { item });
  };

  const handleToggleFavorite = (itemKey) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      const isFavorited = newFavorites.has(itemKey);
      if (isFavorited) {
        newFavorites.delete(itemKey);
        Alert.alert(
          language === 'English' ? 'Removed from Favorites' : 'Đã xóa khỏi Yêu thích',
          language === 'English' ? 'Item removed successfully.' : 'Mục đã được xóa thành công.'
        );
      } else {
        newFavorites.add(itemKey);
        Alert.alert(
          language === 'English' ? 'Added to Favorites' : 'Đã thêm vào Yêu thích',
          language === 'English' ? 'Item added successfully.' : 'Mục đã được thêm thành công.'
        );
      }
      return newFavorites;
    });
  };

  const handleLanguageChange = () => {
    setLanguage(prevLang => prevLang === 'English' ? 'Vietnamese' : 'English');
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleToggleFavorite(item.key)}>
        <Text style={styles.buttonSee}>
          {favorites.has(item.key) ? '❤️' : '♡'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleToggleFavorite(item.key)}>
        <Text style={styles.buttonSee}>
          {favorites.has(item.key) ? '❤️' : '♡'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressItem(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage2} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleToggleFavorite(item.key)}>
        <Text style={styles.buttonSee}>
          {favorites.has(item.key) ? '❤️' : '♡'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderItem3 = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressItem1(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage3} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleToggleFavorite(item.key)}>
        <Text style={styles.buttonSee}>
          {favorites.has(item.key) ? '❤️' : '♡'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderItem4 = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', { artist: item })} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage3} />
      <Text style={styles.itemTitle1}>{item.title}</Text>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleToggleFavorite(item.key)}>
        <Text style={styles.buttonSee}>
          {favorites.has(item.key) ? '❤️' : '♡'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <Image source={require('../images/HomeAudioListing/Image36.png')} style={styles.styleHinhAnh} />
        <TouchableOpacity onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          <Text style={styles.languageButton}>
            {theme === 'light' ? (language === 'English' ? 'Dark Mode' : 'Chế độ Tối') : (language === 'English' ? 'Light Mode' : 'Chế độ Sáng')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLanguageChange}>
          <Text style={styles.languageButton}>{language}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <BellRing style={styles.icon1} />
        </TouchableOpacity>
      </View>

      <View style={styles.khoangCach}>
        <Text style={styles.mauNhat}>{language === 'English' ? 'Good morning' : 'Chào buổi sáng'}</Text>
      </View>

      <View style={styles.txtFeildContainer}>
        <Search style={styles.searchIcon} />
        <TextInput
          style={styles.txtFeild}
          placeholder={language === 'English' ? "What you want to listen to" : "Bạn muốn nghe gì"}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.khoangCach4}>
          <Text style={styles.inDam1}>{language === 'English' ? 'Suggestions for you' : 'Gợi ý cho bạn'}</Text>
          <TouchableOpacity onPress={() => setSortOrder(sortOrder === 'default' ? 'alphabetical' : 'default')}>
            <Text style={styles.buttonSee}>
              {sortOrder === 'default' ? (language === 'English' ? 'Sort A-Z' : 'Sắp xếp A-Z') : (language === 'English' ? 'Default' : 'Mặc định')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={sortedFilteredData}
          renderItem={renderSuggestionItem}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.khoangCachData}
        />

        <View style={styles.khoangCach4}>
          <Text style={styles.inDam}>{language === 'English' ? 'Charts' : 'Bảng xếp hạng'}</Text>
          <TouchableOpacity onPress={handleSeeAllCharts}>
            <Text style={styles.buttonSee}>{language === 'English' ? 'See all' : 'Xem tất cả'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sortedFilteredData2}
          renderItem={renderItem2}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.khoangCachData}
        />

        <View style={styles.khoangCach4}>
          <Text style={styles.inDam}>{language === 'English' ? 'Trending albums' : 'Album thịnh hành'}</Text>
          <TouchableOpacity onPress={handleSeeAllAlbums}>
            <Text style={styles.buttonSee}>{language === 'English' ? 'See all' : 'Xem tất cả'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sortedFilteredData3}
          renderItem={renderItem3}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.khoangCachData}
        />

        <View style={styles.khoangCach4}>
          <Text style={styles.inDam}>{language === 'English' ? 'Popular artists' : 'Nghệ sĩ phổ biến'}</Text>
          <TouchableOpacity onPress={handleSeeAllArtists}>
            <Text style={styles.buttonSee}>{language === 'English' ? 'See all' : 'Xem tất cả'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sortedFilteredData4}
          renderItem={renderItem4}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.khoangCachData}
        />
      </ScrollView>

      <View style={styles.khoangCach5}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeAudioListing')}>
            <House style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>{language === 'English' ? 'Home' : 'Trang chủ'}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AudioListingSearchResults')}>
            <Search style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>{language === 'English' ? 'Search' : 'Tìm kiếm'}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('FeedAudioListing')}>
            <Newspaper style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>{language === 'English' ? 'Feed' : 'Tin tức'}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MyLibrary')}>
            <Library style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>{language === 'English' ? 'Library' : 'Thư viện'}</Text>
        </View>
      </View>
    </>
  );
}