let times = 10000000;
/**
 * @param {*} cbRunHugeArrWithRonaldo callback trả về giá trị total
 */
// function runHugeArrWithRonaldo(items, cbRunHugeArrWithRonaldo) {
//   let total = 0;
//   const FIRST_ITEM_FOR_LOOP = 1;

//   function helpSplit(i, cbHelpSplit) {
//     total += i;
//     if (i == times) {
//       return cbHelpSplit(total);
//     }
//     // push to queue in event loop and next to blocking
//     setImmediate(helpSplit.bind(null, i + 1, cbHelpSplit)); // setImmediate giúp chuyển sang tick tiếp theo và đợi đến phase tiếp theo với giá trị i+1 và sẵn sàng nhận các external event(request) để xử lý (tham khảo: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
//   }

//   helpSplit(FIRST_ITEM_FOR_LOOP, cbRunHugeArrWithRonaldo);
// }
// runHugeArrWithRonaldo(times, (totalReuslt) => {
//   console.log(`done, total: ${totalReuslt}`);
// });

let total = 0,
  i = 1;
const chuck = 100000;

const sumFc = (start) => {
  if (i == times) {
    return total;
  }

  do {
    total += i;
    i++;
  } while (i < start + chuck);

  if (start + chuck < times) sumFc(start + chuck);
};

sumFc(1);

console.log('total: ', total);
