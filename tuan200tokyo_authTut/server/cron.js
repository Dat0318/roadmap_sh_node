import cron from 'node-cron';
import { CronJob } from 'cron';

var valid = cron.validate('59 * * * *'),
  invalid = cron.validate('60 * * * *'),
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

var task = cron.schedule(
  '5 * * * * *',
  () => {
    console.log('running a task every minute', new Date());
  },
  {
    scheduled: true,
    timezone,
  }
);

var job = new CronJob(
  '5 * * * * *',
  function () {
    console.log('You will see this message every second');
  },
  null,
  true,
  timezone
);

//  # ┌────────────── Giây (không bắt buộc)
//  # │ ┌──────────── Phút
//  # │ │ ┌────────── Giờ
//  # │ │ │ ┌──────── Ngày trong tháng
//  # │ │ │ │ ┌────── Tháng
//  # │ │ │ │ │ ┌──── Ngày trong tuần
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *
