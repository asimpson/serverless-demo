'use strict'
const globby = require('globby')
const shell = require('shelljs')
const path = require('path')

globby.sync('./dist/*.js')
.forEach(x => {
  const name = path.basename(x, '.js')
  shell.exec(`zip -j ${name} ${x}`)
})
