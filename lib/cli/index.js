#!/usr/bin/env node

const program = require('commander')
const packageMsg = require('../../package.json')

program.version(packageMsg.version)

program
  .command('init')
  .description('初始化项目')
  .action(() => {
    require('../cmd/init')()
  })

program
  .command('add')
  .description('添加新的项目模块')
  .action(() => {
    require('../cmd/add')()
  })

program
  .command('list')
  .description('查看项目列表')
  .action(() => {
    require('../cmd/list')()
  })

program
  .command('delete')
  .description('删除项目列表')
  .action(() => {
    require('../cmd/delete')()
  })

program.parse(process.argv);

if(!program.args.length){
  program.help()
}