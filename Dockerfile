# 基于 Node.js 的官方镜像
FROM node:lts-alpine

# 安装 Yarn
RUN apk add --no-cache yarn

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN yarn global add serve

# 打开容器的 80 端口
EXPOSE 80

# 运行应用
CMD ["serve", "-s", "dist", "-l", "80"]
