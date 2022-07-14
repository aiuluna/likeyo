import { createWriteStream } from 'fs'
import { Buffer } from 'buffer'
import { readFile, mkdir } from 'fs/promises'

const copyTpl = async (
	templatePath,
	destinationPath,
	replaceObj,
	overtime = 0
) => {
	if (overtime >= 3) return

	const template = await readFile(templatePath, 'utf8')

	const replaced = template.replace(/<%=([^%]+)%>/g, (match, key) => {
		return replaceObj[key.trim()]
	})

	const writeStream = createWriteStream(destinationPath, 'utf8')
	writeStream.write(Buffer.from(replaced, 'utf8'))
	writeStream.end()
	writeStream.on('error', async (err) => {
		if (err.errno === -2) {
			const lastPath = destinationPath.substring(
				0,
				destinationPath.lastIndexOf('/')
			)
			await mkdir(lastPath, { recursive: true })
			await copyTpl(templatePath, destinationPath, replaceObj, overtime++)
		} else {
			console.log(err)
		}
	})
}

export default copyTpl
