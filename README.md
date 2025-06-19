# Embedded-Camera 📸

이 프로젝트는 React Native 기반의 카메라 앱과 Python 서버를 연동하여 **실시간 사진 촬영 → 서버 전송 → 이미지 저장** 기능을 구현한 프로젝트입니다.  
내장형 디바이스 및 IoT 환경에서의 영상 처리 기능을 실습 및 시연하기 위한 목적을 가지고 있습니다.

---

## 📦 주요 기능

- React Native 앱에서 사진 촬영
- WebSocket을 통해 Python 서버에 이미지 실시간 전송
- Pillow(PIL)를 사용한 이미지 디코딩 및 저장 처리
- 서버 응답 메시지 처리

---

## 🛠️ 기술 스택

### 📱 클라이언트 (모바일)
- **React Native (Expo)**
- **expo-camera**
- **WebSocket API**

### 🖥️ 서버 (백엔드)
- **Python 3**
- **WebSocket (`websockets` 라이브러리)**
- **Pillow (이미지 디코딩 및 저장)**

---

