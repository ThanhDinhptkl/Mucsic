import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react-native";
import Slider from "@react-native-community/slider";

export default function PlayerScreen({ route, navigation }) {
  const { song } = route.params;
  const { title, image, audio } = song;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

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

  const onSliderValueChange = async (value) => {
    if (sound) {
      const newPosition = value * duration;
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(audio);
      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis);
          setPosition(status.positionMillis);
          setIsPlaying(status.isPlaying);
        }
      });
    };

    loadSound();

    return () => {
      sound && sound.unloadAsync();
    };
  }, [audio]);

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.albumArt} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={position / duration || 0}
        minimumTrackTintColor="#ff4081"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#ff4081"
        onValueChange={onSliderValueChange}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <SkipBack size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPause} style={styles.playPauseButton}>
          {isPlaying ? <Pause size={40} color="#fff" /> : <Play size={40} color="#fff" />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <SkipForward size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  albumArt: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 10,
  },
  timeText: {
    color: "#b3b3b3",
    fontSize: 14,
  },
  slider: {
    width: 300,
    height: 40,
    marginVertical: 10,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 220,
    marginTop: 30,
  },
  playPauseButton: {
    backgroundColor: "#ff4081",
    padding: 18,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ff4081",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  controlButton: {
    padding: 10,
    alignItems: "center",
  },
});
