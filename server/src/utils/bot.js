const Telegraf = require('telegraf');
const HttpsProxyAgent = require('https-proxy-agent');

const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: {
    agent: new HttpsProxyAgent({ host: process.env.PROXY_HOST, port: process.env.PROXY_PORT }),
  },
});

const sendMessageBot = async (message) => {
  try {
    await bot.telegram.sendMessage(
      process.env.CHAT_ID_BOT,
      message,
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendMessageBot,
};
