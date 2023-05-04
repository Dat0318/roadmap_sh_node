Hãy tạm bỏ qua mọi thắc mắc về các yếu tố kĩ thuật để tạo ra một website. Chúng ta vẫn thường online và sử dụng các trang web hàng ngày - như đọc tin tức, viết blog (nhật ký), v.v... Chúng ta có thể xuất phát từ một trang đơn bất kỳ của một website nào đó ví dụ như [https://viblo.asia/newest](https://viblo.asia/newest), rồi sau đó có thể mở xem các trang đơn khác như các bài viết hướng dẫn, câu hỏi, v.v...

> Một website có thể được hiểu đơn giản là một tập các trang web đơn cùng được đặt ở một nơi nào đó trên internet mà mọi người có thể mở và xem được.  
> _\_Một người sử dụng máy tính_

Vì vậy nên, để học cách tạo ra một website, chúng ta có thể bắt đầu đơn giản với việc học cách tạo ra một `trang web đơn` như đã nói.

## Làm thế nào để tạo ra một trang web đơn?

Trình duyệt web - phần mềm mà chúng ta sử dụng để vào web hàng ngày - về cơ bản là một chương trình duyệt tài liệu giúp chúng ta truy xuất và trình bày các tệp `file` tài liệu - chính là các trang web đơn được đăng tải đâu đó trên internet.

Nó khá giống với trường hợp một tệp tài liệu có tên là `bai-viet.docx` có thể được mở và xem bởi phần mềm [Microsoft Word](https://en.wikipedia.org/wiki/Microsoft_Word) hay [LibreOffice Writer](https://en.wikipedia.org/wiki/LibreOffice_Writer) - Các trình duyệt web được thiết kế để dành riêng cho việc trình bày các tệp tài liệu đặc biệt được gọi là các tệp văn bản HTML và các tệp này có tên ở dạng `bai-viet.html`.

> Một trang web đơn chỉ là một tệp văn bản - có thể được mở và trình bày bởi các trình duyệt web.  
> _\_Một người sử dụng máy tính_

Các tệp HTML có thể được tạo ra bằng cách sử dụng một trình soạn thảo văn bản đơn giản như [Notepad](https://en.wikipedia.org/wiki/Microsoft_Notepad) hoặc một ứng dụng nào đó tương tự. Hãy thử tạo ra một tệp HTML ngay trên chiếc máy tính mà bạn đang sử dụng -

- Đầu tiên bạn mở ứng dụng Notepad lên.
- Gõ vào một nội dung khoảng vài từ.
- Lưu tệp với tên `trang-don-cua-toi.html`.
- Rồi sau đó nhấn đúp chuột để mở tệp vừa lưu.

`Ảnh chụp màn hình`
![một tệp HTML](https://images.viblo.asia/a9a17183-9a4a-47d0-9d2e-fc52f24b201d.png)

Như vậy là bạn vừa mới tạo ra một trang web đơn rồi đấy. Và nếu như bạn đặt trang đơn này ở đâu đó trên internet mà mọi người có thể mở xem được, thì bạn đã có được trang web đầu tiên của mình.

Bạn có thể thử đổi lại tên trang web đơn của bạn thành `index.html` và đăng tải miễn phí lên [Github Pages](https://pages.github.com/) để mọi người có thể xem trang của bạn ngay bây giờ. Việc đó chỉ tiêu tốn có vài phút thôi. Nhưng sau đó hãy nhớ quay trở lại đây để tiếp tục Series của chúng ta nhé. :D

## Làm thế nào để bổ sung hình ảnh, các nút nhấn, v.v... ?

Như bạn đã biết thì các trình duyệt web là các phần mềm trình chiếu tài liệu tuyệt vời. Chúng ta hoàn toàn có thể `nhờ` các trình duyệt web thể hiện bất kỳ kiểu nội dung nào mà chúng ta mong muốn. Tuy nhiên, để nhờ vả được các trình duyệt web làm đúng như mong muốn thì chúng ta cần nói ngôn ngữ mà các trình duyệt web ưa chuộng - đó là `HTML` - một ngôn ngữ đánh dấu đơn giản.

> HTML là chỉ một ngôn ngữ đơn giản, được thiết kế để giúp chúng ta nói chuyện được với các trình duyệt web.  
> _\_Một người sử dụng máy tính_

Hãy thử thay đổi nội dung trang web đơn của chúng ta một chút. Lần này chúng ta sẽ đặt vào đó 1 tiêu đề, 1 đoạn nội dung, và 1 nút nhấn:

- Sao chép đoạn nội dung sau vào trang web đơn của bạn.
- Lưu tệp lại một lần nữa với tên mới là `index.html`.
- Làm mới lại Tab đang mở trang đơn đó trên trình duyệt web của bạn.

```index.html
<h1>Chào bạn :D</h1>

<p>Đây là trang web cá nhân của tôi.</p>

<button>Đọc bài viết</button>
```

`Ảnh chụp màn hình`
![bổ sung các thẻ HTML](https://images.viblo.asia/2b759d83-57a8-4bb5-bd86-1b01e7e6e83d.png)

Đó chính là HTML. Chúng ta chỉ đơn giản là bao quanh các đoạn nội dung bằng các cặp thẻ `đánh dấu` và bằng cách nào đó thì các trình duyệt web đã có thể hiểu được chúng ta muốn hiển thị `cái gì`.

- `button` có ý nghĩa rõ ràng là một nút nhấn.
- `p` là ký hiệu để đánh dấu một `paragraph` - tức là một đoạn nội dung văn bản.
- `h1` có nghĩa là `heading level 1` - tiêu đề cấp 1 của trang web đơn.

HTML còn được thiết kế với rất nhiều thẻ khác nữa để chúng ta có thể đặt bất kỳ nội dung nào vào một trang web. Việc chúng ta cần làm là chỉ cần thử qua một lượt từng thẻ HTML và làm mới tab hiện tại trên trình duyệt web để biết cách sử dụng.

> Việc học HTML chỉ đơn giản là thử dùng các thẻ HTML và làm mới Tab trên trình duyệt web.  
> _\_Một người sử dụng máy tính_

Tuy nhiên, việc phải gõ những ký hiệu `<>` lặp đi lặp lại nhiều lần thì dường như có phần hơi bất tiện và đem lại trải nghiệm học tập không tốt lắm.

## Làm thế nào để học HTML thuận lợi hơn?

Bạn biết đấy, chúng ta đang sống trong một thế giới thân thiện và cởi mở. Những lập trình viên tuyệt vời luôn cố gắng chia sẻ những công cụ miễn phí rất hữu ích để giúp đỡ cộng đồng. Bạn có thể tải về trình soạn thảo code [Atom](https://atom.io/) - một món quà tuyệt vời nữa của [Github](https://github.com/) và hoàn toàn miễn phí -

- 1 nhấp chuột để tải về.
- 1 nhấp chuột nữa để cài đặt.
- Và sau đó chúng ta sẽ có thể viết code như một nhà ảo thuật (chứ không phải là một coder nữa).

Hãy dành ra một vài phút để cài đặt Atom trên chiếc máy tính mà bạn đang sử dụng và chúng ta sẽ cùng nhau xem ứng dụng này tuyệt như thế nào. Ngay sau khi bạn đã cài đặt xong, hãy mở bài viết tiếp theo liên kết dưới đây để tiếp tục hành trình của chúng ta nhé.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/eaw2Za2SUy4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> Hope is a tree  
> sitting on a mountain  
> where the grass  
> don't grow.  
> _\_Coins in a fountain_

[[HTML] Bài 2 - Cách Chèn Ảnh & Các Liên Kết](/article/view/0002/html-bài-2---hiển-thị-ảnh-&-các-liên-kết)
