// PlayerScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Play, Pause } from "lucide-react-native";

export default function PlayerScreen({ route, navigation }) {
  const { title, image, audio } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(audio);
      setSound(sound);
    };
    loadSound();

    return () => {
      sound && sound.unloadAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.albumArt} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={playPause} style={styles.playPauseButton}>
        {isPlaying ? <Pause size={50} /> : <Play size={50} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#231b2e",
    justifyContent: "center",
    alignItems: "center",
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  playPauseButton: {
    backgroundColor: "#ff1b6b",
    padding: 15,
    borderRadius: 50,
  },
});
