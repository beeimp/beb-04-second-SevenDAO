# 이미지:버전
FROM node:16-alpine

# Client 디렉토리 생성
WORKDIR /usr/src/app/client

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY ./client/package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY ./client .

# 빌드
RUN npm run build

# 백그라운드로 실행
RUN nohup npm run start &

# Server 디렉토리 생성
WORKDIR /usr/src/app/server

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY ./server/package*.json ./

# 앱 소스 추가
COPY ./server .

# 실행
CMD ["npm", "run", "start"]

EXPOSE 3000