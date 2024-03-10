/* eslint-disable prettier/prettier */
// server.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Giả sử bạn có một danh sách người dùng
const users = [
    { id: 1, phone: '123456789', password: 'password123' },
    { id: 2, phone: '987654321', password: 'password456' },
];

app.post('/api/login', (req, res) => {
    const { phone, password } = req.body;
    // Tìm người dùng trong danh sách
    const user = users.find(user => user.phone === phone && user.password === password);
    if (user) {
        // Nếu tìm thấy, tạo token JWT và gửi lại cho người dùng
        const token = jwt.sign({ userId: user.id }, 'secretKey');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Đăng nhập không thành công' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
