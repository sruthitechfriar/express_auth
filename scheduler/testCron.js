import cron from "node-cron";

const testCron = () => {
  cron.schedule("*/5000000 * * * * ", function () {
    console.log("---------------------");
    console.log("running a task every 5000000 minutes");
  });
};
export { testCron };

 