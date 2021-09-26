#!/usr/bin/env node

const {program} = require('commander')
const execa = require('execa')


function start() {
    console.log('lazy CLI')

    program
        .command('se [gitType]')
        .description('switch git email')
        .option('-e,-email [email]', "input the email which is not in preset")
        .action(async (gitType='', options) => {
            console.log('switch email...')
            const emailDict = {
                'gitlab': 'hanyuanlin@dm-ai.com',
                'github': '690051834@qq.com'
            }

            if (!gitType) {
                const {stdout} = await execa('git', ['config', '--global', 'user.email'])
                const email = stdout
                console.log('current email: ', email)
                const nextEmail = email === emailDict['gitlab'] ? emailDict['github'] : emailDict['gitlab']
                const {stdout: stdout2} = await execa('git', ['config', '--global', 'user.email', `${nextEmail}`])
                console.log('email switch to: ',nextEmail)
                console.log(stdout2)
            }




        })

    // 解析指令
    program.parse(process.argv)
}

start()