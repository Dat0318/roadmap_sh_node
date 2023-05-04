Trong bài viết này, chúng ta sẽ cùng tìm hiểu về tiêu chuẩn cấu trúc của một đường dẫn URL được sử dụng để gửi yêu cầu từ các trình duyệt web tới máy chủ. Phần kiến thức này nhằm chuẩn bị nền tảng cho tác vụ phân tích và điều hướng các yêu cầu được gửi tới từ các trình duyệt web. Nhờ đó chúng ta sẽ có thể phân chia các các vụ xử lý về các tuyến `route` và giảm tải code tập trung ở hàm tiếp nhận sự kiện trung tâm.

## Đường Dẫn URL Tiêu Chuẩn

Ngay ở phần đầu của trang tài liệu về [module URL](https://nodejs.org/dist/latest-v16.x/docs/api/url.html#url-strings-and-url-objects) do NodeJS cung cấp, chúng ta được giới thiệu với một ví dụ về dạng đầy đủ nhất của một đường dẫn URL được NodeJS hỗ trợ phân tích bởi `class URL` như sau:

```url.txt
https://username:password@sub.example.com:8080/p/a/t/h?query=string#hash
```

Trong đó thì chúng ta có các thành phần được liệt kê với ý nghĩa riêng biệt thế này:

- `https` - tên giao thức truyền tải nội dung
- `username:password` - tên người dùng và mật khẩu để truy xuất nội dung
- `sub.example.com` - tên miền
- `8000` - cổng mạng
- `/p/a/t/h` - đường dẫn tới điểm xử lý yêu cầu
- `query=string` - cặp thông tin truy vấn ở dạng `key=value`
- `hash` - vị trí đặc định trong nội dung gửi trả

NodeJS có nói thêm là đoạn `username:password` không có trong tiêu chuẩn của WHATWG - một tổ chức duy trì tiêu chuẩn của các công nghệ web để có sự nhất trí giữa các nhà phát triển phần mềm. Tức là `class URL` của NodeJS vẫn sẽ hỗ trợ làm việc với dạng URL có hai thành tố này và có thể tách lấy thông tin để làm việc. Tuy nhiên trong các ứng dụng web được viết trên nền tảng khác, chúng ta có thể sẽ không nhìn thấy dạng thức này. Vậy chúng ta sẽ tạm bỏ qua và chỉ quan tâm tới các thành tố còn lại.

## Điểm cuối nhận yêu cầu Endpoint

Những thành tố có ý nghĩa nhiều nhất đối với chúng ta lúc này, khi đang xây dựng một trang blog đơn giản, đó là đoạn tính từ `/p/a/t/h` trở đi. Đoạn `/p/a/t/h` là mô tả đường dẫn tới một điểm đích đến cuối `endpoint`, nơi mà yêu cầu bắt đầu được xử lý chi tiết. Thông thường thì chúng ta sẽ thấy trên nhiều trang web sử dụng mô tả chung là `đối tượng dữ liệu` đang muốn truy xuất và `thao tác` đang muốn thực hiện. Ví dụ như của Viblo -

```url.txt
https://viblo.asia/posts/GrLZDrWE5k0/edit
```

Ở đây chúng ta có đoạn `/posts/GrLZDrWE5k0/edit` mô tả một `endpoint` để yêu cầu xem thông tin của một bài viết `post`, có tên định danh lưu trữ để phân biệt với các bài viết khác là `GrLZDrWE5k0`, và giao diện mà chúng ta yêu cầu là giao diện chỉnh sửa bài viết `edit`. Các thành phần này có thể được tách ra từ chuỗi đường dẫn mà chúng ta nhận được từ `object request` như sau:

```nodejs-blog/test.js
const url = require("url");

// giả định `url` tách ra từ `object request`
var requestURL = "https://viblo.asia/posts/GrLZDrWE5k0/edit"
var objectURL = url.parse(requestURL);
console.log(objectURL.pathname);
// kết quả: "/posts/GrLZDrWE5k0/edit"

var partials = objectURL.pathname.slice(1, Infinity).split("/");
console.log(partials);
// ["posts", "GrLZDrWE5k0", "edit"]
```

![](https://images.viblo.asia/6f12e6a4-c024-4ba1-b70e-67d33fcbd3b0.png)

## Các cặp thông tin truy vấn thêm

Ngoài việc sử dụng các tham số như trên, chúng ta còn có thể mô tả cho máy chủ ý nghĩa của một yêu cầu truy vấn dữ liệu bằng các cặp thông tin truy vấn ở dạng `khóa=giá trị`, và được mô tả trong dạng thức chuẩn của URL trong phần đầu bài viết chính là đoạn `query=string`.

```url.txt
https://username:password@sub.example.com:8080/p/a/t/h?query=string#hash
```

Các cặp thông tin truy vấn được bắt đầu từ sau ký tự `?` để phân tách với tham số cuối cùng của phần đường dẫn `path`, và được viết nối tiếp nhau bởi ký hiệu `&` trong trường hợp chúng ta sử dụng nhiều cặp thông tin như vậy.

```nodejs-blog/test.js
const url = require("url");

var requestURL = "https://www.youtube.com/watch?v=ZVEi0S1F854&list=PLJtb6nn4nHOkoy9Z_cVJAmQ5eHWp5dbGu";

var objectURL = url.parse(requestURL);
console.log(objectURL.search);
// kết quả: "?v=ZVEi0S1F854&list=PLJtb6nn4nHOkoy9Z_cVJAmQ5eHWp5dbGu"

var queries = objectURL.search.slice(1, Infinity).split("&");
console.log(queries);
// [ 'v=ZVEi0S1F854', 'list=PLJtb6nn4nHOkoy9Z_cVJAmQ5eHWp5dbGu' ]
```

## Các tham số Hash

Các cặp thông tin truy vấn `query=string` được gắn ngay sau các `path` còn được gọi là các tham số `url`, bên cạnh đó thì chúng ta còn có các tham số `hash` được khởi đầu bằng ký hiệu `#`.

Các tham số `hash` sẽ rất hữu dụng trong trường hợp chúng ta muốn sử dụng một thư viện JavaScript ở mặt tiền `front-end` để truy xuất thông tin của một phần nội dung và gửi phản hồi; Hoặc khi viết một phần mềm vận hành giao diện ở phía trình duyệt web và gửi yêu cầu truy vấn thêm dữ liệu để điều chỉnh giao diện web mà không cần tải lại trang đơn đang hiển thị.

```nodejs-blog/test.js
const url = require("url");

var requestURL = "https://nodejs.org/dist/latest-v16.x/docs/api/url.html#urlhash";

var objectURL = url.parse(requestURL);
console.log(objectURL.hash);
// kết quả: "#urlhash"
```

## Kết thúc bài viết

Như vậy là chúng ta có thể lựa chọn sử dụng các `path` và các cặp thông tin truy vấn `query` để mô tả một yêu cầu khi gửi tới máy chủ web.

Về việc chọn lựa phương thức mô tả như thế nào thì thực sự lại không có tiêu chuẩn chung. Bạn có thể để ý cách mà Viblo mô tả trên URL là hướng trọng tâm vào đối tượng dữ liệu với `/post` đầu tiên rồi tới bản ghi `/post-id` rồi tới thao tác muốn thực hiện `/edit`; Trong khi đó YouTube lại chọn cách mô tả hướng trọng tâm vào thao tác `/watch` rồi sau đó mô tả các thông tin thêm như `video-id` và `playlist-id` bằng các cặp thông tin truy vấn. Điều này hoàn toàn phụ thuộc ở quá trình thiết kế các lộ trình xử lý yêu cầu `route` khi viết code `server`.

Khi sử dụng một số `framework` bạn sẽ có thể tìm thấy trong các tài liệu hoặc các bộ code ví dụ về quy ước chung mà cộng đồng đó sử dụng. Vì vậy nên trong trường hợp chúng ta muốn đảm bảo code viết ra có thể được dễ dàng chia sẻ và chỉnh sửa, thì tốt nhất là chúng ta cứ thuận theo tài liệu được cung cấp hoặc cộng đồng mà mình đang tham gia thôi. :D

(Chưa đăng tải) [[NodeJS] Bài 7 - Từ Từ Để Xem Chúng Ta Cần Học Thêm Gì Tiếp Theo Đã. Học Theo Cách Tự Nhiên Mà! 😄](#)
