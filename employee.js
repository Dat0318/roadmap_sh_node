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
