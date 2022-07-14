#!/usr/bin/env node

import process from 'process'
import { spawn } from 'child_process'

import chalk from 'chalk'

import copyTpl from './utils/copyTpl.js'
import listFilesByDir from './utils/listFilesByDir.js'

const prompting = async () => {
	const prompts = [
		{
			type: 'input',
			name: 'name',
			message: 'What is the name of your project?',
			default: 'my-project',
		},
		{
			type: 'input',
			name: 'description',
			message: 'What is the description of your project?',
			default: 'A project created with likeyo',
		},
		{
			type: 'input',
			name: 'author',
			message: 'What is the author of your project?',
			default: 'Your Name',
		},
	]

	const result = {}

	function* generator() {
		for (const prompt of prompts) {
			yield () => {
				return new Promise((resolve, reject) => {
					process.stdout.write(`${prompt.message} `)
					process.stdin.once('data', (data) => {
						const value = data.toString('utf8').trim()
						if (value) {
							resolve({ [prompt.name]: value })
						} else {
							resolve({ [prompt.name]: prompt.default })
						}
					})
				})
			}
		}
	}

	const g = generator()

	while (true) {
		const ans = await g.next()
		if (ans.done) {
			break
		}
		Object.assign(result, await ans.value())
	}
	return result

	// [...ask()].reduce(async (acc, curr) => {
	//   return acc.then(curr)
	// }, Promise.resolve())
}

const writing = async (data) => {
	// 获取当前目录下的文件列表
	const tplDir = new URL('./templates', import.meta.url).pathname
	const files = await listFilesByDir(tplDir)

	for (let file of files) {
		const idx = file.indexOf('templates')
		const destinationPath = `.${file.substring(idx + 'templates'.length)}`
		await copyTpl(file, destinationPath, data)
	}
}

const installing = async () => {
	return new Promise((resolve) => {
		const yarnInstall = spawn('yarn')
		yarnInstall.stdout.on('data', (data) => {
			process.stdout.write(data)
		})
		yarnInstall.stderr.on('data', (err) => {
			process.stderr.write(err)
		})
		yarnInstall.on('close', (code) => {
      if (code) {
        console.log(chalk.blue(`child process exited with code ${code}\r\n`))
      }
			resolve()
		})
	})
}

;(async () => {
	const answers = await prompting()
	await writing(answers)
	await installing()
  console.log(chalk.green.underline.bold('\r\nproject init success!\r\n'))
	process.exit(0)
})()
