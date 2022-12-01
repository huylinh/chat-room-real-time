1. Chạy lệnh npm i để cài đặt các package
2. Chạy lệnh npx sequelize-cli db:create để tạo db
3. Chạy lệnh npx sequelize-cli db:migrate để tạo bảng
4. Chạy lệnh npx sequelize-cli db:seed:all để fake dữ liệu
5. Chạy lệnh npm start để chạy chương trình
   Giao diện sẽ ở route "/"

- Về api:

* GET /api : render ra views => có thể cung cấp cho nhóm khác sử dụng

* GET /api/chat : Lấy tất cả dữ liệu có trong bảng.
  Giá trị trả về: messages: [
  {
  id_user,
  name,
  to,
  message,
  time,
  },
  ...
  ]
* GET /api/chat/:id : Lấy tất cả dữ liệu của một user gửi cho admin gửi hoặc admin gửi cho user
  Giá trị trả về: messages: [
  {
  id_user,
  name,
  to,
  message,
  time,
  },
  ...
  ]
* GET /api/user : Lấy tất cả tên và id của người dùng đã gửi message cho admin hoặc admin đã gửi message
  Giá trị trả về: users: [
  {
  id_user,
  name,
  },
  ...
  ]

* PUT /api/chat update trạng thái seen của message
  Input: body: {
  id_user,
  seen
  }

* POST /api/chat : Insert dữ liệu người dùng nhập trong ô chat vào database
  Input: body: {
  id,
  name,
  to,
  message,
  time
  }

* POST /api/chat/all : Phát message đến tất cả người dùng => có thể cung cấp cho nhóm khác sử dụng
  Input: body: {
  message,
  }
