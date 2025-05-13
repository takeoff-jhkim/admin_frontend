FROM node:18

WORKDIR /app

# 먼저 package.json, lock 파일 복사 후 설치
COPY package*.json ./
RUN npm install

# 나머지 소스 복사
COPY . .

CMD ["npm", "run", "dev", "--", "--host"]
