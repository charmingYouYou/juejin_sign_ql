const axios = require('axios')
const crypto = require('crypto')
const dayjs = require('dayjs')


class FeishuBot {
    constructor(options = {}) {
        this.text = ''
        this.webhook = options.webhook
        this.secret = options.secret
        this.timestamp = new Date().getTime()
        this.sign = this.signFn(this.secret, `${this.timestamp}\n${this.secret}`)
    }

    signFn(secret, content) {
        // 加签
        return crypto
            .createHmac('sha256', secret)
            .update(content)
            .digest()
            .toString('base64')
    }

    send(data) {
        let p
        // 没有这两个参数则静默失败
        if (!this.webhook || !this.secret) {
            p = Promise.resolve({
                errcode: -1,
                errmsg: 'webhook和secret不能为空',
            })
        } else {
            p = axios({
                url: this.webhook,
                method: 'POST',
                data,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            }).then((res) => {
                return res.data
            })
        }
        return p
    }

    sendMessage(msg) {
        if(this.timer){
            clearTimeout(this.timer)
            this.timer = null
        }
        this.text += `${dayjs().format('HH:mm:ss')} ${msg}\n`
        this.timer = setTimeout(() => {
            this.send({
                timestamp: this.timestamp,
                sign: this.sign,
                msg_type: 'text',
                content: {
                    text: this.text,
                }
            }).then(() => {
                this.text = ''
            })
        }, 1000)
    }
}

module.exports = FeishuBot
