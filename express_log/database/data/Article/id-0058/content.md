Như vậy là song song với việc hoàn thiện dần kiến thức căn bản về JavaScript, chúng ta đang bắt đầu một Sub-Series mới của "Tự Học Lập Trình Web Một Cách Thật Tự Nhiên" đó là `NodeJS`. Mặc dù ở bài viết trước trong Sub-Series JavaScript thì chúng ta cũng đã nói sơ qua NodeJS là cái gì rồi, tuy nhiên thì mình vẫn muốn giới thiệu lại một chút ở bài viết mở đầu của Sub-Series này - để dành cho trường hợp ai đó chợt ghé qua và tham gia cùng chúng ta tại đây. :D

## NodeJS Là Cái Gì? Tại Sao Chúng Ta Cần Sử Dụng Nó?

NodeJS là một môi trường chạy JavaScript được triển khai ngay trên nền hệ điều hành máy tính (Windows, Linux, Mac) mà chúng ta đang sử dụng, thay vì được nhúng trong một trình duyệt web có nhiều tính năng truy xuất hệ thống bị giới hạn. Với NodeJS, chúng ta có thể viết code JavaScript để tạo ra các phần mềm có khả năng sử dụng tất cả những công cụ tài nguyên mà hệ điều hành có thể cung cấp:

- Tạo ra, lưu trữ, chỉnh sửa, và xóa các tệp dữ liệu trên máy tính.
- Tương tác với các phần mềm khác trong cùng máy tính, ví dụ như chương trình quản lý cơ sở dữ liệu, chương trình cửa sổ dòng lệnh, hoặc bất cứ phần mềm nào khác có cung cấp giao diện lập trình cho phép gửi/nhận yêu cầu tương tác.
- Tương tác với các thiết bị khác trong cùng mạng máy tính, và cả những thiết bị khác nữa qua mạng internet.
- Điều khiển các thiết bị phần cứng như webcam, bàn phím, chuột máy tính, và các thiết bị ngoại vi khác có cung cấp giao diện lập trình hỗ trợ.

Ở thời điểm hiện tại thì với mục đích mà chúng ta khởi đầu Series này là tự động hóa công việc tạo ra các trang web đơn có giao diện tương đồng, hay có thể hiểu là để hoàn thiện công việc xây dựng một website sau khi chúng ta đã có khả năng xây dựng được các giao diện web theo ý muốn; Do đó chúng ta sẽ chỉ cần quan tâm tới 3 cái gạch đầu dòng đầu tiên mà NodeJS đem lại. Giờ thì chúng ta bắt đầu nhé. :D

## Cài đặt NodeJS và chạy câu lệnh JavaScript đầu tiên

Và điểm đến đầu tiên của chúng ta là trang chủ của NodeJS - [NodeJS.org](https://nodejs.org/en/).

![](https://images.viblo.asia/ab044945-f50c-4941-84e2-8625338ce83c.png)

Bộ cài đặt NodeJS được đặt ngay ở giao diện trang chủ với 2 lựa chọn:

- LTS - Long Term Support - được hiểu lơ mơ là phiên bản được hỗ trợ dài hạn về mặt kỹ thuật và có độ ổn định rất cao. Thường được sử dụng để chạy trên các server triển khai các trang web dịch vụ.
- Current là phiên bản mới nhất của NodeJS có độ ổn định thấp hơn so với LTS, tuy nhiên lại có những tính năng mới mà LTS không có.

Chúng ta chỉ vừa mới bắt đầu mò mẫm học về NodeJS vì vậy nên có lẽ là phiên bản nào cũng như nhau thôi. Bạn cứ chọn bừa một cái để tải về và cài đặt. Mình thì chọn LTS. :D

![](https://images.viblo.asia/7b15eb56-022f-41db-8122-4b9ee4505561.png)

Sau khi tải về tệp cài đặt và thực hiện một pha click đúp, chúng ta đang ở giao diện cài đặt của NodeJS. Không có tùy chỉnh nâng cao nào mà chúng ta cần phải quan tâm ở thời điểm này, vì vậy nên sẽ chỉ có `Next`, `Next`, và... `Next`, cho đến khi tiến trình cài đặt hoàn tất. :D

<p class="codepen" data-height="420" data-default-tab="result" data-slug-hash="jOYMamR" data-user="semiarthanoi" style="height: 420px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/semiarthanoi/pen/jOYMamR">
  NodeJS</a> by Semi Art (<a href="https://codepen.io/semiarthanoi">@semiarthanoi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Sau khi đã thực hiện cài đặt xong. Bạn mở cửa sổ dòng lệnh của hệ điều hành; Nếu là Windows như mình đang sử dụng trong máy ảo thì có CMD, nếu là Mac thì có Terminal, còn nếu bạn đang không dùng 2 hệ điều hành kia thì chắc chắn là biết rõ cái cửa sổ dòng lệnh Terminal nó nằm ở đâu rồi. :D

![](https://images.viblo.asia/5a89fd51-a0b7-4d83-a2ef-b74e55977fe0.png)

Bây giờ chúng ta sẽ gõ vào một vài lệnh để kiểm tra như thế này:

```CMD.io
node -v
:: kết quả: v16.14.2

npm -v
:: kết quả: 8.5.0
```

```Terminal.io
node -v
# kết quả: v16.14.2

npm -v
# kết quả: 8.5.0
```

![](https://images.viblo.asia/5e309fd2-7eaf-4600-a01a-743d4f69ade9.png)

Sau khi đã chắc chắn quá trình cài đặt thành công và không có lỗi lầm gì, chúng ta đã có thể chạy câu lệnh JavaScript đầu tiên mà chúng ta đã từng chạy trên trình duyệt web. Việc cần làm là tạo ra một tệp `learn.js` đặt trên màn hình `Desktop`.

```Desktop/learn.js
console.log(2022);
```

![](https://images.viblo.asia/ad6918a3-9647-4ba8-8885-afe5f371cc65.png)

Sau đó ở cửa sổ dòng lệnh, chúng ta cần di chuyển tới thư mục `Desktop` để có thể nhìn thấy tệp JavaScript.

```CMD-Terminal.io
cd Desktop
```

Và chạy câu lệnh JavaScript đầu tiên. :D

```CMD.io
node learn.js
:: kết quả: 2022
```

```Terminal.io
node learn.js
# kết quả: 2022
```

![](https://images.viblo.asia/fdb9d943-1713-44be-a5e6-b87ea0acf1bb.png)

## Kết thúc bài giới thiệu mở đầu

Giống với bài viết đầu tiên về JavaScript, chúng ta đã có một phần định nghĩa sơ lược về NodeJS và khởi chạy dòng lệnh đầu tiên để làm tiền đề cho những kiến thức mới và dự định xây dựng website ở phía trước. Tuy nhiên thì mình có một lưu ý nhỏ cần nói về những đoạn code ví dụ mà chúng ta sẽ sử dụng trong các bài viết sắp tới.

Do kiến thức về ngôn ngữ JavaScript của chúng ta đang được cập nhật dần dần với các bài viết tiếp theo trong Series JavaScript được thực hiện song song; Những ví dụ trong Series NodeJS ở đây sẽ có thể có sự thay đổi dần về cú pháp lệnh JavaScript cơ bản và phương cách xử lý dữ liệu với các hàm mới do ngôn ngữ JavaScript cung cấp. Tức là những gì mà Series JavaScript đã cập nhật thì mình sẽ mặc định là bạn đã đọc xong bài viết mới và biết về những cú pháp mới hay các hàm xử lý mới để áp dụng ở đây. :D

Trong trường hợp khác, nếu bạn không phải là người theo dõi Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên mà mình đang thực hiện từ đầu, thì mình sẽ mặc định là bạn đã có nền kiến thức về ngôn ngữ JavaScript đầy đủ, và bạn có thể bỏ qua đoạn lưu ý này. :D

Hẹn gặp lại bạn trong bài viết tiếp theo.

[[NodeJS] Bài 2 - Khởi Tạo Một Máy Chủ Web](/article/view/0059/nodejs-bài-2---khởi-tạo-một-máy-chủ-web)
