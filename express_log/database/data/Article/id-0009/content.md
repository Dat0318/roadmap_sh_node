Chúng ta đã biết rằng mỗi phần tử HTML đều là một `container` có chứa nội dung. Chúng ta cũng đã thử thiết lập kích thước của một vài `container` trong bài trước. Hãy cùng thảo luận thêm một chút về các kiểu `container` hiển thị trong CSS.

## Các kiểu container hiển thị phổ biến trong CSS

Ở bài trước, chúng ta đã thiết lập kích thước của các `div` sử dụng thuộc tính `width` và `height`. Nhưng nếu như bạn thử làm điều tương tự với một phần tử được tạo ra bởi các thẻ `<a></a>`, thì bạn sẽ thấy rằng không có tác dụng. Đó là bởi vì kiểu `container` hiển thị của phần tử `<a></a>` không cho phép chúng ta thiết lập kích thước của `container` này.

Có 3 kiểu `container` hiển thị phổ biến -

- Các `block` container
- Các `inline` container
- Các `inline-block` container

Mặc định thì các `block` container luôn chiếm 100% độ rộng của `container` chứa bên ngoài. Chúng ta có thể thiết lập kích thước của các `block` container sử dụng các thuộc tính `width` và `height`. Ví dụ điển hình là các tiêu đề, các đoạn văn, các `div`, `nav`, v.v...

Các `inline` container thì lại không chiếm dụng không gian. Chúng luôn cố gắng duy trì kích thước nhỏ nhất có thể - chỉ vừa đủ bao quanh nội dung chứa bên trong. Các trình duyệt web đối xử với các container này như là các từ trong một văn bản (mỗi container được xem là một từ); Và chúng ta sẽ Không thể thiết lập kích thước của các container này bằng các thuộc tính nói trên. Ví dụ điển hình là các liên kết `<a></a>`, các phần tử `<span></span>`, v.v...

Các `inline-block` container là trường hợp đặc biệt, chúng được thiết lập các kích thước `width` và `height` mặc định để vừa đủ bao quanh nội dung chứa bên trong; Và được các trình duyệt web xem như các từ trong một văn bản - giống với các `inline` container. Đồng thời, chúng ta cũng có thể thiết lập kích thước của các container này bằng các thuộc tính CSS như đối với các khối `block` container.

## Thay đổi kiểu container hiển thị

Đôi khi chúng ta muốn cung cấp trải nghiệm sử dụng tốt hơn cho người dùng thiết bị di động bằng cách tăng kích thước cho các phần tử `<a></a>`. Như vậy người dùng sẽ không phải cố gắng chạm vài lần vào màn hình để mở một liên kết.

Để làm được điều này thì CSS có một thuộc tính gọi là `display` cho phép chúng ta thay đổi kiểu container của các phần tử HTML. Hãy tạo ra một vài liên kết trông giống như các nút nhấn. :D

```which.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Which is Which?</title>
      <link rel="stylesheet" href="which.css">
   </head>
   <body>
      <a class="btn btn-primary" href="#"></a>
      <a class="btn btn-success" href="#"></a>
      <a class="btn btn-warning" href="#"></a>
   </body>
</html>
```

```which.css
.btn {
   display: inline-block;
   height: 50px;
   width: 150px;
}

.btn-primary {
   background-color: RoyalBlue;
}

.btn-success {
   background-color: LimeGreen;
}

.btn-warning {
   background-color: Gold;
}
```

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="ZEvGEqm" data-user="semiarthanoi" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/semiarthanoi/pen/ZEvGEqm">
  Which</a> by Semi Art (<a href="https://codepen.io/semiarthanoi">@semiarthanoi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Bên cạnh 3 giá trị `block`, `inline`, và `inline-block`, thuộc tính `display` có thể được sử dụng với nhiều giá trị khác nhau đem lại tiện ích theo những cách khác nữa. Một vài giá trị sẽ yêu cầu các trình duyệt web được cập nhật mới nhất để hỗ trợ tốt. Đây là liên kết tham khảo trong trường hợp bạn muốn tìm hiểu nhiều hơn - [thuộc tính display](https://www.w3schools.com/cssref/pr_class_display.asp).

## Viết chú thích trong code CSS

Giống với HTML, chúng ta có thể viết chú thích trong code CSS. Các chú thích sẽ được bỏ qua khi trình duyệt đọc code CSS.

Một chú thích trong CSS có thể được viết bằng cách sử dụng một cặp `/*` và `*/` để bao quanh `/* thứ gì đó */`.

Chúng ta cũng có thể sử dụng các chú thích để nhanh chóng ngắt một khối code CSS mà không cần xóa hay di chuyển đi nơi khác.

Bài viết về các kiểu container hiển thị của chúng ta đến đây là kết thúc. Trong bài tiếp theo, chúng ta sẽ nói về các thuộc tính `background`.

[[CSS] Bài 5 - Các Thuộc Tính Background](/article/view/0010/css-bài-5---các-thuộc-tính-background)
