import * as fs from 'react-native-fs';

export const captureImageToBase64 = async (originalPath: string) => {
  try {
    const targetPath = `${fs.DocumentDirectoryPath}/captured.jpg`;

    // 원본 이미지를 앱 내부 디렉토리로 복사
    await fs.copyFile(originalPath, targetPath);

    // 복사된 안전한 경로에서 base64 읽기
    const base64 = await fs.readFile(targetPath, 'base64');
    return base64;
  } catch (err) {
    console.error('이미지 인코딩 오류:', err);
    throw err;
  }
};
