Trong các bài trước, chúng ta đã trang trí một vài container sử dụng thuộc tính `background-color`. Tuy nhiên vẫn còn nhiều cách khác nữa để khiến các container trông đẹp mắt hơn. Hãy cùng thảo luận thêm về các thuộc tính `background`.

## Thiết lập hình nền cho một container

Chúng ta sẽ thiết lập hình nền của một container sử dụng thuộc tính `background-image`; Và đây là cú pháp của thuộc tính này -

```background.css
background-image: url(đường-dẫn-tới-tệp-ảnh);
```

Dạng của đường dẫn tới tệp ảnh sẽ tùy thuộc vào việc ảnh mà bạn sử dụng được lưu trữ cục bộ hay trên một trang web khác đâu đó trên internet. Trong code ví dụ phía bên dưới, chúng ta sẽ sử dụng một tấm ảnh đang được lưu trữ tại [ImgUr.com](https://i.imgur.com/sp2xQEy.png).

```nice.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>A Nice Day</title>
      <link rel="stylesheet" href="nice.css">
   </head>
   <body>
      <section class="card">
         <h2 class="card-msg">A nice daaay !</h2>
      </section>
   </body>
</html>
```

```nice.css
.card {
   display: inline-block;
   width: 320px;
   height: 600px;

   /* color is used in case browser cannot load image */
   background-color: Crimson;

   /* use image as background */
   background-image: url(https://bit.ly/3i8gJzS);
}

.card-msg {
   text-align: center;
   color: White;
}
```

<p class="codepen" data-height="720" data-default-tab="result" data-slug-hash="dyJoyrG" data-user="semiarthanoi" style="height: 720px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/semiarthanoi/pen/dyJoyrG">
  Nice</a> by Semi Art (<a href="https://codepen.io/semiarthanoi">@semiarthanoi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Chúng ta đã sử dụng một tấm hình có một cánh đồng trải dài. Nhưng một phần của tấm hình lại bị ẩn đi vì kích thước của container nhỏ hơn rất nhiều so với kích thước của ảnh nền. Hãy cùng sửa lại trong phần tiếp theo.

## Điều chỉnh kích thước của ảnh nền

Việc điều chỉnh kích thước ảnh nền có thể được thực hiện bằng cách sử dụng thuộc tính `background-size`.
Thuộc tính `background-size` có thể được sử dụng với 1 trong 2 giá trị thông minh - `cover` và `container`. Cả 2 giá trị này sẽ đều cố gắng tự động điều chỉnh kích thước của hình nền để phù hợp với kích thước của container.

Trong đó, `background-size: cover;` sẽ giúp đảm bảo rằng hình nền luôn lấp kín diện tích của container; Còn `background-size: container` sẽ giúp đảm bảo rằng hình nền luôn được hiển thị đầy đủ trong container.

Hãy thử nhân đôi container mà chúng ta đang có và dùng thử cả 2 giá trị này để so sánh kết quả hiển thị.

```nice.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Another Nice Day</title>
      <link rel="stylesheet" href="nice.css">
   </head>
   <body>
      <section class="card bg-cover">
         <h2 class="card-msg">A nice daaay !</h2>
      </section>

      <section class="card bg-contain">
         <h2 class="card-msg">Another nice daaay !</h2>
      </section>
   </body>
</html>
```

```nice.css
.card {
   display: inline-block;
   width: 320px;
   height: 600px;

   background-color: Crimson;
   background-image: url(https://bit.ly/3i8gJzS);
}

.card-msg {
   text-align: center;
   color: White;
}

.bg-cover {
   background-size: cover;
}

.bg-contain {
   background-size: contain;
}
```

<p class="codepen" data-height="720" data-default-tab="result" data-slug-hash="BaJNaEm" data-user="semiarthanoi" style="height: 720px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/semiarthanoi/pen/BaJNaEm">
  Another</a> by Semi Art (<a href="https://codepen.io/semiarthanoi">@semiarthanoi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Như bạn đã thấy thì hình nền ở container thứ 2 có cùng độ rộng với container nhưng có chiều cao nhỏ hơn. Và theo mặc định thì trình duyệt web sẽ tự động hiển thị lặp lại hình nền để lấp đầy diện tích của container.

Để điều khiển tính năng hiển thị lặp hình nền, chúng ta có thuộc tính `background-repeat` có thể được sử dụng với 1 trong 3 giá trị sau: `repeat-x`, `repeat-y`, và `no-repreat`. Bạn có thể thử sử dụng thuộc tính này với container thứ 2 để xem cách hoạt động. :D

`P/s:` Thuộc tính `background-size` cũng có thể được sử dụng với một cặp giá trị chỉ `độ dài`. Giá trị đầu tiên sẽ là `width` (chiều rộng) và giá trị thứ 2 sẽ là `height` (chiều cao). Ví dụ:

```css
background-size: 500px 300px;
```

## Thiết lập vị trí của hình nền

Thông thường thì chúng ta sẽ muốn đảm bảo hình nền luôn che phủ hết diện tích của container. Vì vậy nên sẽ có một phần của hình nền bị ẩn đi. Thuộc tính `background-position` có thể giúp chúng ta thiết lập vị trí của hình nền để đảm bảo phần đẹp nhất của tấm hình sẽ được hiển thị; Và đây là các giá trị mặc định của `background-position` -

```css
background-position: left top;
```

Giá trị đầu tiên là vị trí theo phương ngang và có thể nhận một trong các khóa sau - `left` (bên trái), `center` (chính giữa), `right` (bên phải), hoặc một giá trị chỉ định `độ dài`.

Giá trị thứ 2 là vị trí theo phương dọc và có thể nhận một trong các khóa sau - `top` (phía trên), `center` (chính giữa), `bottom` (phía dưới), hoặc một giá trị chỉ định `độ dài`.

Hãy chỉnh sửa lại ví dụ trước đó một chút để xem `background-position` hoạt động như thế nào.

```nice.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>A Perfect Day</title>
      <link rel="stylesheet" href="nice.css">
   </head>
   <body>
      <section class="card bg-left-top">
         <h2 class="card-msg">A</h2>
      </section>

      <section class="card bg-center-top">
         <h2 class="card-msg">perfect</h2>
      </section>

      <section class="card bg-right-top">
         <h2 class="card-msg">daaay !</h2>
      </section>
   </body>
</html>
```

```nice.css
.card {
   display: inline-block;
   width: 320px;
   height: 600px;

   background-color: Crimson;
   background-image: url(https://bit.ly/3i8gJzS);
   background-size: cover;
}

.card-msg {
   text-align: center;
   color: White;
}

.bg-left-top {
   background-position: left top;
}

.bg-center-top {
   background-position: center top;
}

.bg-right-top {
   background-position: right top;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/KKZpKLx)

Bài viết về các thuộc tính `background` của chúng ta đến đây là kết thúc. Ngoài những thuộc tính mà chúng ta đã nói đến ở trên, CSS còn một vài thuộc tính khác nữa để làm việc với `background` mà mình đã không mang vào bài viết này. Đây là danh sách tất cả các thuộc tính `background` trong trường hợp bạn muốn tìm hiểu thêm -

- [`background-color`](https://www.w3schools.com/cssref/pr_background-color.asp)
- [`background-image`](https://www.w3schools.com/cssref/pr_background-image.asp)
- [`background-position`](https://www.w3schools.com/cssref/pr_background-position.asp)
- [`background-size`](https://www.w3schools.com/cssref/css3_pr_background-size.asp)
- [`background-repeat`](https://www.w3schools.com/cssref/pr_background-repeat.asp)
- [`background-origin`](https://www.w3schools.com/cssref/css3_pr_background-origin.asp)
- [`background-clip`](https://www.w3schools.com/cssref/css3_pr_background-clip.asp)
- [`background-attachment`](https://www.w3schools.com/cssref/pr_background-attachment.asp)
- [`background`](https://www.w3schools.com/cssref/css3_pr_background.asp) - Đây là dạng ngắn để viết gộp tất cả mọi thiết lập liên quan đến background trong 1 dòng.

[[CSS] Bài 6 - Các Thuộc Tính Border](/article/view/0011/css-bài-6---các-thuộc-tính-border)
