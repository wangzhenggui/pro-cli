const Table = require('cli-table');

const tips = require('./tips');

const table = new Table({
  head: ['name', 'description',],
  style: {
    head: ['cyan']
  }
});

module.exports = (config) => {
  const keys = Object.keys(config);

  if(keys.length) {
    keys.forEach((key) => {
      table.push(
        [`${key}`, config[key].description]
      );
    });
    const list = table.toString();
    if (list) {
      tips.info('模板列表是: ')
      console.log(`${list}\n`);
    } else {
      tips.fail('暂无可用模板!');
    }
  } else {
    tips.fail('暂无可用模板!');
  }
};