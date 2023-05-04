var express = require('express');
var router = express.Router();

router.get('/:id', async (request, response) => {
  var { id } = request.params;
  /* Truy vấn dữ liệu từ database với id nhận được*/
  /* Nếu có bản ghi phù hợp thì render giao diện xem bài viết */
  /* Nếu không tìm thấy thì render giao diện thông báo lỗi */
});

module.exports = router;
