# Sử dụng Node.js làm base image
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và yarn.lock (nếu có)
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Mở cổng 1337
EXPOSE 1337

# Khởi động ứng dụng
CMD ["npm", "run", "start"]
