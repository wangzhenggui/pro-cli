const co = require('co')
const prompt = require('co-prompt')
const ora = require('ora')
const exec = require('child_process').exec
const templates = require('../../template.json')
const tips = require('../tips')

const spinner = ora('正在生成...');

const afterDownload = (err, projectName) => {
  spinner.stop()
  if (err) {
    tips.fail('初始化失败，请稍后重试。')
    process.exit()
  }
  tips.suc('初始化完成')
  tips.info(`cd ${projectName} && npm install`)
}

const download = (err, projectName) => {
  if(err) {
    tips.fail('网络异常，请稍后重试')
    process.exit()
  }
  deleteGitFileCmd = `cd ${projectName} && rm -rf .git`
  exec(deleteGitFileCmd, (err) => {
    afterDownload(err, projectName)
  })
}

const initProject = ({ url, branch, projectName }) => {
  const gitCmd = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`
  spinner.start()
  exec(gitCmd, (err) => {
    download(err, projectName)
  })
}

module.exports = () => {
  co(function *(){
    const templateName = yield prompt('请选择需要下载的模版名称:')
    const projectName = yield prompt('项目名称:')
    if(!templates[templateName]) {
      tips.fail('当前模版不存在')
      process.exit()
    }
    return new Promise((resolve) => {
      resolve({
        projectName,
        ...templates[templateName]
      })
    }).then(initProject)
  })
}