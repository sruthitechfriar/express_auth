import cron from "node-cron";

const sendEmail = () => {
  cron.schedule("*/5 * * * * *", function () {
    console.log("---------------------");
    console.log("running a task every 5 seconds");
  });
};
export { sendEmail };

 