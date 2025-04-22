import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

export default function Songs() {
  const [searchText, setSearchText] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);

  const songs = [
    { id: '1', title: 'Lạc Trôi' },
    { id: '2', title: 'Em Gái Mưa' },
    { id: '3', title: 'Nơi Này Có Anh' },
    { id: '4', title: 'Có Chắc Yêu Là Đây' },
    { id: '5', title: 'Hãy Trao Cho Anh' },
  ];

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (song) => {
    setSelectedSong(song);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎶 Danh sách bài hát</Text>

      <TextInput
        style={styles.search}
        placeholder="Tìm bài hát..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={[
              styles.songItem,
              selectedSong?.id === item.id && styles.selectedSong,
            ]}
          >
            <Text style={styles.songText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 10 }}>Không tìm thấy bài hát nào.</Text>
        }
      />

      {selectedSong && (
        <Text style={styles.selectedText}>
          Đã chọn: <Text style={{ fontWeight: 'bold' }}>{selectedSong.title}</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  songItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  selectedSong: {
    backgroundColor: '#aed581',
  },
  songText: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});
