function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = []; // Lưu trữ tất cả các tác vụ không đồng bộ
  const executing = []; // Lưu trữ các tác vụ không đồng bộ đang được thực thi
  const enqueue = function () {
    if (i === array.length) {
      return Promise.resolve();
    }
    const item = array[i++]; // Nhận một mục nhiệm vụ mới
    console.log('Nhan thang nay de thuc thi:::', item);
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    let r = Promise.resolve();

    if (poolLimit <= array.length) {
      // Khi nhiệm vụ đã hoàn thành, hãy xóa nhiệm vụ đã hoàn thành khỏi mảng nhiệm vụ đang được thực thi
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        r = Promise.race(executing);
      }
    }

    // Sau khi tác vụ nhanh hơn trong danh sách tác vụ được thực thi, tác vụ cần làm mới sẽ nhận được từ mảng
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}

const timeout = (i) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('::::Giai quyet xong thang nay:::::', i);
      resolve(i);
    }, i)
  );

async function asyncCall() {
  await asyncPool(2, [1000, 4000, 3000, 2000], timeout).then((results) => {
    console.log('results::', results);
  });
}

asyncCall();
