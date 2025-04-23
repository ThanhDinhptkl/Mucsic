import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet,
  TouchableOpacity, TextInput, RefreshControl,
  Animated, Easing, Alert, ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChartsList = ({ route }) => {
  const { data, favorites = new Set(), toggleFavorite, deleteItems } = route.params;
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('alphabetical');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const animatedValues = data.reduce((acc, item) => ({
    ...acc,
    [item.key]: new Animated.Value(0)
  }), {});

  const handleSortChange = (option) => setSortOption(option);

  const filteredData = data
    .filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'alphabetical') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'favorites') {
        return favorites.has(b.key) - favorites.has(a.key);
      }
      return 0;
    });

  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleSelectItem = (key) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(key)) {
      newSelectedItems.delete(key);
    } else {
      newSelectedItems.add(key);
    }
    setSelectedItems(newSelectedItems);
    Animated.timing(animatedValues[key], {
      toValue: newSelectedItems.has(key) ? 1 : 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const clearSearch = () => setSearchText('');
  const loadMoreItems = () => {
    if (filteredData.length > page * itemsPerPage) {
      setPage(page + 1);
    }
  };

  const handleDelete = () => {
    if (selectedItems.size === 0) {
      ToastAndroid.show('No items selected for deletion', ToastAndroid.SHORT);
      return;
    }

    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${selectedItems.size} item${selectedItems.size > 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteItems?.([...selectedItems]);
              ToastAndroid.show('Items deleted successfully', ToastAndroid.SHORT);
              setSelectedItems(new Set());
              if (page > Math.ceil(filteredData.length / itemsPerPage)) {
                setPage(page - 1);
              }
            } catch (error) {
              ToastAndroid.show('Failed to delete items', ToastAndroid.SHORT);
              console.error('Deletion error:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => {
    const scale = animatedValues[item.key].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.98],
    });
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity onPress={() => toggleSelectItem(item.key)}>
          <View style={[styles.itemContainer, selectedItems.has(item.key) && styles.selectedItem]}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.description && (
                <Text style={styles.itemDescription}>{item.description}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item.key)} style={styles.favoriteButton}>
              <Icon name={favorites.has(item.key) ? 'heart' : 'heart-o'} size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {selectedItems.size > 0 && (
        <Text style={styles.selectionText}>
          {selectedItems.size} item{selectedItems.size > 1 ? 's' : ''} selected
        </Text>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search charts..."
          placeholderTextColor="#a0a0a0"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={() => handleSortChange('alphabetical')} style={styles.sortButton}>
          <Text style={sortOption === 'alphabetical' ? styles.sortButtonActiveText : styles.sortButtonText}>Alphabetical</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSortChange('favorites')} style={styles.sortButton}>
          <Text style={sortOption === 'favorites' ? styles.sortButtonActiveText : styles.sortButtonText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {filteredData.length > 0 ? (
        <FlatList
          data={paginatedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6b46c1']} />}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <Text style={styles.noDataText}>No charts found. Please try another search.</Text>
      )}

      {filteredData.length > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => setSelectedItems(new Set(filteredData.map(item => item.key)))}
            style={[styles.actionButton, { marginRight: 10 }]}
          >
            <Text style={styles.actionButtonText}>Select All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedItems(new Set())}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>Deselect All</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedItems.size > 0 && (
        <>
          <TouchableOpacity onPress={() => setSelectedItems(new Set())} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Clear Selection</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Text style={styles.actionButtonText}>Delete Selected</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2d3748',
  },
  selectionText: {
    textAlign: 'center',
    color: '#718096',
    marginBottom: 10,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBar: {
    height: 48,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButton: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#6b46c1',
    borderRadius: 12,
    transform: [{ scale: 1 }],
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  sortButton: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6b46c1',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
  },
  sortButtonText: {
    color: '#6b46c1',
    fontSize: 14,
  },
  sortButtonActiveText: {
    color: '#fff',
    fontWeight: '600',
    backgroundColor: '#6b46c1',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    transition: 'all 0.3s ease',
  },
  selectedItem: {
    backgroundColor: '#e6fffa',
    borderWidth: 1,
    borderColor: '#38b2ac',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
  },
  itemDescription: {
    color: '#718096',
    marginVertical: 5,
    fontSize: 14,
  },
  favoriteButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#6b46c1',
    borderRadius: 12,
    transform: [{ scale: 1 }],
  },
  noDataText: {
    textAlign: 'center',
    color: '#718096',
    fontSize: 16,
    marginTop: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  actionButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#6b46c1',
    borderRadius: 12,
    alignSelf: 'center',
    transform: [{ scale: 1 }],
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#e53e3e',
  },
});

export default ChartsList;