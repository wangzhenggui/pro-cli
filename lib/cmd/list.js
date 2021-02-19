const templates = require('../../template.json')
const table = require('../table')

module.exports = () => {
  table(templates);
  process.exit();
}