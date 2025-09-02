import { useState } from 'react';
import { Button, Modal, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

import { ThemedView } from '@/components/ThemedView';

export default function GalleryScreen() {
  const [uris, setUris] = useState<string[]>([]);
  const [selectedUri, setSelectedUri] = useState<string | null>(null);

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
          <Pressable key={uri} onPress={() => setSelectedUri(uri)}>
            <Image source={{ uri }} style={styles.image} />
          </Pressable>
        ))}
      </ScrollView>
      <Modal
        visible={selectedUri !== null}
        transparent
        onRequestClose={() => setSelectedUri(null)}>
        <Pressable style={styles.modalContainer} onPress={() => setSelectedUri(null)}>
          {selectedUri && (
            <Image source={{ uri: selectedUri }} style={styles.fullImage} contentFit="contain" />
          )}
        </Pressable>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '90%',
  },
});

