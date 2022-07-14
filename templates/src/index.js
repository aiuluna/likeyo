const tty = require('node:tty');
const ttys = require('ttys');

const stdin = ttys.stdin;
const stdout = ttys.stdout;

stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf-8')

stdout.write("------------\n")
stdout.write("------------\n")
stdout.write("------------\n")
stdout.write("------------\n")
stdout.write("------------\n")
stdout.write("------------\n")

const signs = '─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┣┤┫┼╋╌╍╭╮╯╰'


function up(n = 1) {
    stdout.write('\033[' + n + 'A')
}
function down(n = 1) {
    stdout.write('\033[' + n + 'B')
}
function right(n = 1) {
    stdout.write('\033[' + n + 'C')
}
function left(n = 1) {
    stdout.write('\033[' + n + 'D')
}


function getChar() {
    return new Promise(resolve => {
        stdin.once('data', (key) => {
            resolve(key)
        })
    })
}

(async function () {
    while (true) {
        let bytes = (await getChar()).split('').map(char => char.charCodeAt(0))
        if (bytes[0] === 27 && bytes[1] === 91) {
            if (bytes[2] === 65) {
                up()
            } else if (bytes[2] === 66) {
                down()
            } else if (bytes[2] === 67) {
                right()
            } else {
                left()
            }
            stdout.write('*')
            left()
        }
        if (bytes[0] === 27 && bytes.length === 1) process.exit(0)
    }
})()
