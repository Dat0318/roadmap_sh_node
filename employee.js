import axios from 'axios';
import clipboardy from 'clipboardy';

const EMPLOYEE_AD = true ? 'nganlt14' : 'd111a1t1t1d13'.replace(/1/g, ''),
  URL = 'https:1/1/1c1o1n1t1a1c1t1a1p1i.1v1i1n1g1r1o1u1p1.1n1e1t1/1a1p1i/'.replace(/1/g, '');

const getInfo = async (socket) => {
  try {
    const res = await axios.get(`${URL}/Employee?$filter=TenDangNhap+eq+${EMPLOYEE_AD}`),
      User = res?.data?.Total >= 1 ? res?.data?.Data[0] : null;

    if (User) {
      const roommate = await axios.post(`${URL}/Roommate`, {
          User,
          Next: 0,
          Take: 50,
        }),
        roommateInfo = roommate?.data?.Data.map((ele) => ({
          ...ele,
          NgayVao: new Date(Number(ele?.NgayVao?.replace(/\/Date\(|-0000\)\//g, ''))),
          NgaySinh: new Date(Number(ele?.NgaySinh?.replace(/\/Date\(|-0000\)\//g, ''))),
          NgayThayDoiTTGanNhat: new Date(
            Number(ele?.NgayThayDoiTTGanNhat?.replace(/\/Date\(|-0000\)\//g, ''))
          ),
        }));

      await clipboardy.write(JSON.stringify(roommateInfo));
    }
  } catch (error) {
    console.error(`Error: ${error.code} ${error.message}`);
  }
};

getInfo();

// const concurrencyRequest = async (urls, maxNum) => {
//   if (urls.length === 0) {
//     // Nếu danh sách URLs trống, giải quyết ngay lập tức với mảng kết quả trống
//     return Promise.resolve([]);
//   }

//   const results = []; // Mảng kết quả từ các yêu cầu
//   let index = 0; // Chỉ số của URL đang được xử lý
//   let count = 0; // Số lượng yêu cầu đã hoàn thành

//   async function request() {
//     if (index === urls.length) return; // Nếu đã xử lý tất cả các URL, thoát khỏi hàm

//     const i = index; // Lưu chỉ số để sử dụng trong async function
//     const url = urls[index++]; // Lấy URL và tăng chỉ số

//     try {
//       // Thực hiện yêu cầu fetch và lưu kết quả vào mảng
//       results[i] = await fetch(url);
//     } catch (err) {
//       // Nếu có lỗi, lưu lỗi vào mảng kết quả
//       results[i] = err;
//     } finally {
//       // Tăng biến đếm và kiểm tra hoàn thành tất cả các yêu cầu
//       if (++count === urls.length) {
//         console.log('Hoàn thành tất cả yêu cầu!', results);
//         Promise.resolve(results);
//       }

//       // Đặt thời gian chờ 1 giây và sau đó gọi lại hàm yêu cầu
//       setTimeout(request, 1000);
//     }
//   }

//   const times = Math.min(maxNum, urls.length); // Số lần yêu cầu tối đa có thể được thực hiện đồng thời
//   console.log(`:::001::`, times);

//   // Bắt đầu thực hiện yêu cầu đồng thời
//   Array.from({ length: times }, () => setTimeout(request, 1000));
// };

// const urls = [];
// for (let i = 1; i <= 21; i++) {
//   urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
// }
// concurrencyRequest(urls, 3);
