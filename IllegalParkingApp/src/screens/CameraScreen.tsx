import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { captureImageToBase64 } from '../utils/image';

export default function CameraScreen() {
  const cameraRef = useRef<Camera>(null);

  const device = useCameraDevice('back'); // ← 최신 방식 (useCameraDevices ❌)
  const { hasPermission, requestPermission } = useCameraPermission();
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto();
      const base64 = await captureImageToBase64(photo.path);
      await sendToServer(base64);
    } catch (error) {
      Alert.alert('촬영 오류', '사진을 찍을 수 없습니다.');
    }
  };

  const sendToServer = async (base64: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      Alert.alert('서버 오류', '서버에 연결할 수 없습니다.');
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.loading}>
        <Text>카메라를 준비 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <Button title="사진 찍기 및 분석" onPress={takePhoto} />
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { flex: 1 },
  result: { fontSize: 20, textAlign: 'center', margin: 10 },
});
