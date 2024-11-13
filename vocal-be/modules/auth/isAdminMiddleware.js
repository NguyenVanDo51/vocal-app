const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

const isAdminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Authorization: Bearer <token>
    try {
      jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403); // Token không hợp lệ
        }
        if (user.email !== "nguyenvando510@gmail.com") {
          return res.sendStatus(403); // Token không hợp lệ
        }

        req.user = user; // Gán user vào request để các route khác có thể dùng
        next();
      });
    } catch {
      res.sendStatus(401); // Không tìm thấy token
    }
  } else {
    res.sendStatus(401); // Không tìm thấy token
  }
};

module.exports = isAdminMiddleware;
