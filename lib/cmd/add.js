const co = require('co')
const fs = require('fs')
const prompt = require('co-prompt')
const templates = require('../../template.json')
const tips = require('../tips')
const table = require('../table')

const writeFile = (err) => {
  if (err) {
    console.log(err)
    tips.fail('请重新运行!')
    process.exit()
  }
  table(templates);
  tips.suc('新模板添加成功!');
  process.exit();
}

const templateProcess = (result) => {
  const { templateName, gitUrl, branchName, desc } = result
  if (!templates[templateName]) {
    templates[templateName] = {};
    templates[templateName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); // 过滤unicode字符
    templates[templateName]['branch'] = branchName;
    templates[templateName]['description'] = desc;
  } else {
    tips.fail('模板已经存在!');
    process.exit();
  };

  // 把模板信息写入templates.json
  fs.writeFile(__dirname + '/../../template.json', JSON.stringify(templates), 'utf-8', writeFile);
}

module.exports = () => {
  co(function *() {
    const templateName = yield prompt('模版名称:')
    const gitUrl = yield prompt('Git https 链接:')
    const branchName = yield prompt('Git 分支名称:')
    const desc = yield prompt('模版描述:')
    return new Promise((resolve) => {
      resolve({
        templateName,
        gitUrl,
        branchName,
        desc
      })
    }).then(templateProcess)
  })
}