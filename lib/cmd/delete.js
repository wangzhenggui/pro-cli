const co = require('co')
const prompt = require('co-prompt')
const fs = require('fs')
const templates = require('../../template.json')
const tips = require('../tips')
const table = require('../table')

const writeFile = (err) => {
  if (err) {
    console.log(err)
    tips.fail('请重新运行!')
    process.exit()
  }
  tips.suc('模版删除成功!');
  table(templates);
  process.exit();
}
const templateProcess = ({ templateName }) => {
  if(!templates[templateName]) {
    tips.fail('模版不存在')
    process.exit()
  } else {
    delete templates[templateName]
    fs.writeFile(__dirname + '/../../template.json', JSON.stringify(templates), 'utf-8', writeFile);
  }
}
module.exports = () => {
  co(function *(){
    const templateName = yield prompt('请输入要删除模版的名称:')
    const sureDelete = yield prompt('确认删除吗？(y/n)')
    if(sureDelete === 'n') process.exit()
    return new Promise((resolve) => {
      resolve({
        templateName
      })
    }).then(templateProcess)
  })
}