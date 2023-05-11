import path from 'path';
import mysql from 'mysql';
import express from 'express';
import serveStatic from 'serve-static';
import storage from 'node-persist';
import yargs from 'yargs';
import * as url from 'url';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy } from 'passport-local';
import session from 'express-session';

storage.initSync();
storage.initSync({
  dir: 'path/to/save',
  ttl: false,
});

// storage.init().then(promise);
// storage.init({
//   dir : "path/to/save",
//   ttl : false
// }).then(function(){
//   // Gọi các hàm setItem, getItem
// });

passport.use(
  new localStrategy((username, password, done) => {
    //các tên - name trường cần nhập, đủ tên trường thì Done
    if (username == 'user') {
      //kiểm tra giá trị trường có name là username
      if (password == 12345) {
        // kiểm tra giá trị trường có name là password
        return done(null, username); //trả về username
      } else {
        return done(null, false); // chứng thực lỗi
      }
    } else {
      return done(null, false); //chứng thực lỗi
    }
  })
);
passport.serializeUser((username, done) => {
  done(null, username);
});
passport.deserializeUser((name, done) => {
  //tại đây hứng dữ liệu để đối chiếu
  if (name == 'user') {
    //tìm xem có dữ liệu trong kho đối chiếu không
    return done(null, name);
  } else {
    return done(null, false);
  }
});

const __filename = url.fileURLToPath(import.meta.url),
  __dirname = url.fileURLToPath(new URL('.', import.meta.url));

var app = express(),
  con = mysql.createConnection({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'your_database',
  });
var { argv } = yargs; // lấy hết các tham số vào biến argv
console.log(argv);

con.connect(function (err) {
  if (err) throw err;
  var sql = 'SELECT * FROM tasks';
  con.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
  });
});

app.use(serveStatic(path.join(__dirname, 'public')));
app.set('views', './server/views'); //khai báo thư mục chứa giao diện là folder views
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize()); //Dòng này để thông báo sử dụng passport nhé
app.use(
  session({
    secret: 'something',
    cookie: {
      maxAge: 1000 * 50 * 5, //đơn vị là milisecond
    },
  })
);
app.use(passport.session());

app.get('/public/home.html', function (req, res) {
  var sql = 'SELECT * FROM tasks';
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/', function (req, res) {
  res.redirect('/public/index.html');
});

app.route('/api/say_hello').get(function (req, res) {
  res.send('Hello');
});

app.route('/api/tasks').get(function (req, res) {
  console.log('request tasks list');
  var sql = 'SELECT * FROM tasks';
  con.query(sql, function (err, results) {
    if (err) throw err;
    var taskList = [];
    var labels = {
      'TO DO': 'info',
      DOING: 'primary',
      PENDING: 'warning',
      DONE: 'success',
    };
    _.forEach(Object.keys(labels), function (label) {
      var tasks = _.filter(results, function (task) {
        return task.label === label;
      });
      taskList.push({
        label: label,
        class: labels[label],
        dragging: false,
        tasks: _.map(tasks, function (task) {
          return {
            id: task.id,
            name: task.name,
            selected: false,
          };
        }),
      });
    });
    res.send(taskList);
  });
});

app
  .route('/login')
  .get((req, res) => res.render('login'))
  .post(
    passport.authenticate('local', {
      //chọn phương thức check là local => npm install passport-local
      failureRedirect: '/login', //nếu check không đúng thì redirect về link này
      successRedirect: '/loginOK', // login success
    })
  );

app.get('/loginOK', (req, res) => res.send('Thành công'));

app.get('/secret', (req, res) => {
  if (req.isAuthenticated()) {
    //trả về true nếu đã đăng nhập rồi
    res.send('Đã đăng nhập');
  } else {
    res.redirect('/login');
  }
});

app.listen(3000, function () {
  console.log('Node server running @ http://localhost:3000');
});
