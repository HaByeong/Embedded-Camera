from fastapi import FastAPI
from pydantic import BaseModel
import base64
import cv2
import numpy as np
from ultralytics import YOLO
import os

# 🚨 작업 디렉토리를 현재 경로로 고정 (.app 내부 접근 방지)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

# YOLO 모델 로드
model = YOLO("best.pt")  # ← 모델 파일은 이 파일과 같은 폴더에 있어야 함

# 요청 바디 스키마
class ImageRequest(BaseModel):
    image: str  # base64 문자열

app = FastAPI()

@app.post("/predict")
def predict_image(req: ImageRequest):
    try:
        # base64 → 이미지 디코딩
        img_data = base64.b64decode(req.image)
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # YOLO 예측
        results = model(img)
        names = results[0].names
        classes = [names[int(cls)] for cls in results[0].boxes.cls]

        print(f"Detected classes: {classes}")

        if "불법주정차" in classes:
            return {"result": "불법 주정차입니다"}
        else:
            return {"result": "불법 주정차가 아닙니다"}

    except Exception as e:
        return {"result": f"예측 중 오류 발생: {str(e)}"}
