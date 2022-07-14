import { readdir, stat } from 'fs/promises'

const listFilesByDir = async (dir) => {
	const fileList = []
  await dfs(dir, fileList)
	return fileList
}

const dfs = async (dir, arr) => {
  const files = await readdir(dir);
  for (let file of files) {
    const curPath = `${dir}/${file}`;
    const statObj = await stat(curPath)
    if (statObj.isDirectory()) {
      await dfs(curPath, arr)
    } else {
      arr.push(curPath)
    }
  }
}

export default listFilesByDir
