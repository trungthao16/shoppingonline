const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Sử dụng cổng của Render cấp phát hoặc mặc định là 10000
const PORT = process.env.PORT || 10000;

// Cấu hình CORS để các client (React) có thể gọi API
app.use(cors());

// Giới hạn dung lượng body (hữu ích khi upload ảnh sản phẩm)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Route kiểm tra server
app.get('/', (req, res) => {
  res.json({ message: 'Server Shopping Online đang chạy thực tế!' });
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Các route API của bạn
app.use('/api/admin', require('./api/admin'));
app.use('/api/customer', require('./api/customer'));

// Lắng nghe cổng
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});