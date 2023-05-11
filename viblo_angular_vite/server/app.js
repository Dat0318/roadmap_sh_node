import puppeteer from 'puppeteer';

let DOMAIN = 'https://demo.tutorialzine.com/2009/09/simple-ajax-website-jquery';
let URL = DOMAIN + '/demo.html';

const captureScreen = async () => {
  // mở trình duyệt
  const browser = await puppeteer.launch({ headless: false });
  // Mở 1 page mới
  const page = await browser.newPage();
  // đi đến trang 24h
  await page.goto('https://24h.com.vn');
  // chụp ảnh màn hình và lưu lại với tên 24h.png
  await page.screenshot({ path: '24h.png' });
  // Lưu ảnh màn hình thành file pdf
  await page.pdf({ path: 'hn.pdf', format: 'A4' });

  // tắt trình duyệt
  await browser.close();
};
const openLinkInBrowser = async () => {
  // mở trình duyệt
  const browser = await puppeteer.launch({ headless: false });
  // Mở 1 page mới
  const page = await browser.newPage();
  // đi đến trang 24h
  await page.goto('https://24h.com.vn');
  await page.setViewport({ width: 1280, height: 720 });

  // tắt trình duyệt
  await browser.close();
};

const runJsInBrowser = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://24h.com.vn');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });
  console.log('Dimensions:', dimensions);
  await browser.close();
};

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.goto(URL);

    const articles = await page.evaluate(() => {
      let titles = document.querySelectorAll('div.colLeft span.news-title a');
      let ar_title = [];
      titles.forEach((item) => {
        ar_title.push({
          href: item.getAttribute('href').trim(),
          title: item.getAttribute('title').trim(),
        });
      });
      return ar_title;
    });

    console.log(ar_title);

    let i = 0;
    await Promise.all(
      articles.map((item) => {
        return browser.newPage().then(async (page) => {
          await page.goto(URL + item.href);

          let title = await page.evaluate(() => {
            return document.querySelector('p.baiviet-sapo').innerText;
          });

          i++;
          console.log(i + ': ', title);
          // await page.close();
        });
      })
    );

    // chứa danh sách những promise
    const promises = [];
    for (let i = 0; i < articles.length; i++) {
      promises.push(await getTitle(articles[i].href, page, i));
    }

    await browser.close();
  } catch (error) {
    console.log('Catch : ' + error);
  }
})();

async function getTitle(link, page, key) {
  await page.goto(URL + link, {
    // Set timeout cho page
    timeout: 3000000,
  });
  // Chờ 2s sau khi page được load để tránh overload
  await page.waitFor(2000);

  let title = await page.evaluate(() => {
    let header = document.querySelector('p.baiviet-sapo');
    if (header === null) {
      header = document.querySelector('div.imageTitle a');
    }
    return header.innerText;
  });

  console.log('Page ID Spawned', key, title);
  return page;
}

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(URL);

    await page.click('#navigation > li:nth-child(3) > a');
    await page.waitForSelector('div#pageContent img');

    const imgUrl = await page.evaluate(() => {
      return document.querySelector('div#pageContent img').getAttribute('src');
    });
    console.log(imgUrl);

    const options = {
      url: DOMAIN + '/' + imgUrl,
      dest: 'images',
    };
    const { filename, image } = await download.image(options);

    browser.close();
  } catch (error) {
    console.log('Catch : ' + error);
  }
})();

async function submitFormRequest(req) {
  if (params.type_request == TYPE_REQUEST_LE) {
    await page.waitFor(500);
    await page.select(
      'select[name="request_leave[leave_type_id]"]',
      params.type_request.toString()
    );
    elementTime = 'request_leave_early';
  }

  await page.waitFor(500);
  await page.type('#' + elementTime, params.date);
  await page.waitFor(500);
  await page.keyboard.press('Tab');
  await page.waitFor(500);
  await page.type(
    '#request_leave_compensation_attributes_compensation_from',
    params.compensation_date
  );
  await page.waitFor(500);

  await page.type('#new_request_leave textarea', params.reason);
  await page.waitFor(500);

  await page.click('#new_request_leave input[name=commit]');

  // check valid time
  let timeInvalid = await page
    .waitForSelector('.showSweetAlert', { timeout: 500 })
    .then(async function (e) {
      return await page.evaluate(() => {
        return document.querySelector('.showSweetAlert p').innerText;
      });
    })
    .catch(async function (e) {
      return true;
    });

  if (typeof timeInvalid == 'string') {
    throw new Error(timeInvalid);
  }

  await page.waitForNavigation();
  let url_edit = await page
    .waitForSelector('#request_leave_search', { timeout: 2000 })
    .then(async function (e) {
      return Promise.resolve(
        await page.evaluate(() => {
          return document
            .querySelector('.list-request-leaves tr:nth-child(1) td:last-child a.btn-warning')
            .getAttribute('href');
        })
      );
    })
    .catch(async function (e) {
      const errorSubmitForm = await page.evaluate(() => {
        let ulError = document.querySelector('#error_explanation ul');
        let messError = 'Error when create request. Please try again after few minutes !';
        if (ulError !== null) {
          messError = ulError.innerText;
        }

        return messError;
      });
      throw new Error(errorSubmitForm);
    });
}
