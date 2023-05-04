Trong bài viết này, chúng ta sẽ nói về việc bổ sung các hiệu ứng chuyển tiếp cho các thành phần tương tác với người dùng. Các ví dụ trong bài viết này yêu cầu các trình duyệt web được cập nhật tới các phiên bản được phát hành gần đây.

## Thuộc tính transition

Thuộc tính [`transition`](https://www.w3schools.com/css/css3_transitions.asp) có thể giúp chúng ta dễ dàng bổ sung các hiệu ứng chuyển tiếp cho các thành phần tương tác với người dùng.

```css
transition: thuộc-tính thời-gian;
```

Ở đây chúng ta cũng cần lưu ý rằng không phải thuộc tính nào cũng hỗ trợ hiệu ứng chuyển tiếp. Bạn có thể xem danh sách đầy đủ của các thuộc tính có thể tạo hoạt ảnh chuyển tiếp tại đây - [Danh sách các thuộc tính hỗ trợ tạo hiệu ứng chuyển tiếp](https://www.w3schools.com/cssref/css_animatable.asp)

Hãy thử viết một ví dụ để xem thuộc tính `transition` hoạt động thực tế. Chúng ta sẽ mô phỏng đồi cỏ xuân có `background-color` chuyển tiếp mượt mà khi chúng ta thay đổi mùa.

```time.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Time</title>
      <link rel="stylesheet" href="time.css">
   </head>
   <body>
      <input id="spring" type="radio" name="season" checked> Spring |
      <input id="summer" type="radio" name="season"> Summer |
      <input id="fall"   type="radio" name="season"> Fall |
      <input id="winter" type="radio" name="season"> Winter

      <div class="field"></div>
   </body>
</html>
```

```time.css
.field {
   height: 320px;
   margin-top: 12px;

   transition: background-color 0.9s;
}

#spring:checked ~ .field {
   background-color: LimeGreen;
}

#summer:checked ~ .field {
   background-color: ForestGreen;
}

#fall:checked ~ .field {
   background-color: Yellow;
}

#winter:checked ~ .field {
   background-color: WhiteSmoke;
}
```

<p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="OJzPRwr" data-user="semiarthanoi" style="height: 480px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/semiarthanoi/pen/OJzPRwr">
  Time</a> by Semi Art (<a href="https://codepen.io/semiarthanoi">@semiarthanoi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Nếu như chúng ta muốn tạo hiệu ứng chuyển dịch với nhiều hơn 1 thuộc tính, cách đơn giản nhất là sử dụng từ khóa `all` thay cho tên của một thuộc tính cụ thể.

```css
transition: all 1s;
```

Thuộc tính `transition` còn có thể nhận thêm 2 giá trị nữa là:

- [`timing-function`](https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp) - kiểu phân bố thời gian chuyển tiếp.
- và thời gian trễ trước khi bắt đầu thể hiện hiệu ứng chuyển tiếp.

```css
transition: all 1s linear 0.5s;
```

Dòng code ví dụ vừa rồi sử dụng kiểu chuyển tiếp `linear` với tốc độ chuyển tiếp đều trong suốt thời gian chuyển tiếp `1s`, và thời gian trễ trước khi thể hiện hiệu ứng là `0.5s`.

## Hiệu ứng chuyển tiếp phức tạp

Thuộc tính `transition` còn cho phép chúng ta tạo ra hiệu ứng chuyển tiếp phức tạp hơn một chút. Lấy ví dụ là chúng ta muốn tạo ra những hiệu ứng chuyển tiếp với nhiều thuộc tính khác nhau. Việc này có thể thực hiện bằng cú pháp sau:

```css
transition: thuộc-tính-1 thời-gian-1 [độ-trễ-1], thuộc-tính-2 thời-gian-2 [độ-trễ-2], ...;
```

Trong trường hợp này, nếu cần sử dụng `timing-function` thì chúng ta cần chỉ định bằng thuộc tính [`transition-timing-function`](https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp).

```css
transition-timing-function: linear;
```

Hãy thử viết một ví dụ để triển khai một hiệu ứng hơi phức tạp một chút. Chúng ta sẽ tạo ra một khối có thể được mở rộng/thu gọn và có màu nền thay đổi với hiệu ứng chuyển tiếp.

```breath.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Breath</title>
      <link rel="stylesheet" href="breath.css">
   </head>
   <body>
      <input id="toggler" type="checkbox"> Expand/Collapse
      <div class="box"></div>
   </body>
</html>
```

```breath.css
.box {
   width: 100%;
   height: 300px;

   max-width: 100px;
   max-height: 100px;

   background-color: Crimson;

   transition: background-color 0.9s,
               max-width        0.6s 0.9s,
               max-height       0.3s 1.5s;

   transition-timing-function: linear;
}

#toggler:checked + .box {
   max-width: 100%;
   max-height: 300px;

   background-color: ForestGreen;
}
```

<p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="KKZwNwV" data-user="semiarthanoi" style="height: 480px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/semiarthanoi/pen/KKZwNwV">
  Breath</a> by Semi Art (<a href="https://codepen.io/semiarthanoi">@semiarthanoi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Xây dựng một slide ảnh đơn giản

Tới đây thì mình tin là bạn đã có thể hoàn thiện [thanh điều hướng responsive`](/article/0023)
mà chúng ta đã xây dựng trước đó thêm một chút. Đó là bổ sung thêm hiệu ứng chuyển tiếp khi người dùng thiết bị di động màn hình nhỏ mở/đóng danh sách liên kết.

[[HTML + CSS] Xây Dựng Thanh Điều Hướng Responsive](/article/view/0023/html-+-css-xây-dựng-thanh-điều-hướng-responsive)

Trước khi viết bài CSS về `transition` này thì mình dự định sẽ mời bạn cùng viết code cho một cái danh sách dạng sổ xuống `dropdown` mà chúng ta thường gặp trên bất kỳ trang web nào. Tuy nhiên thì cách xử lý ở đây không có gì khác lắm so với tính năng mở/đóng thanh điều hướng trên thiết bị di động màn hình nhỏ. Vì vậy nên khi viết tới đây mình đã nghĩ tới một thành phần khác cũng rất phổ biến trên các trang web đó là `slide` ảnh, còn hay được gọi với một cái tên khác là `carousel`.

Như thường lệ thì mình cũng di chuyển phần này tới một bài viết riêng để giữ cho nội dung ở đây được tập trung vào việc giới thiệu thuộc tính `transition`. Vì vậy nên bạn hãy duy trì Tab web hiện tại và mở thêm liên kết dưới đây để đi tới bài viết cho `carousel` nhé.

[[HTML + CSS] Xây Dựng Một Slide Ảnh Đơn Giản](/article/view/0029/html-+-css-xây-dựng-một-slide-ảnh-đơn-giản)

Bạn đã hoàn thành việc xây dựng `carousel` chưa? :D Có phần phức tạp hơn đôi chút so với xây dựng một thanh điều hướng phải không? :D

Ở bài viết tiếp theo thì chúng ta sẽ cùng thảo luận về việc tạo ra các hoạt ảnh tự động trong CSS. Cái này nghe thì khá giống với `transition` mà chúng ta vừa nói đến ở đây nhưng có phần linh động hơn và có lẽ là thú vị hơn. :D

[[CSS] Bài 16 - Sử Dụng Các Hoạt Ảnh Tự Tạo](/article/view/0030/css-bài-16---sử-dụng-các-hoạt-ảnh-tự-tạo)
