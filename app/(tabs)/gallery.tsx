import { useState } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

import { ThemedView } from '@/components/ThemedView';

export default function GalleryScreen() {
  const [uris, setUris] = useState<string[]>([]);

  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUris(result.assets.map((asset) => asset.uri));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Button title="Select Images" onPress={pickImages} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {uris.map((uri) => (
          <Image key={uri} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
});

