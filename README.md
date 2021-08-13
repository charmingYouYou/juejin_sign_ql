## 掘金每日自动签到，自动抽奖

本项目使用`Github Action`来部署自动签到程序，无需自己购买服务器，安全可靠且方便。另外支持钉钉机器人通知，中了大奖第一时间便可知晓。

### 使用方式

1. `fork`本项目。

![Fork项目](./statics/imgs/fork.png)

2. 依次点击【Setting】、【Secrets】、【New repository secret】。

![New repository secret](./statics/imgs/secrets.png)

3. 把 Name 设置为`COOKIE`这个字符串，Value 设置为`自己掘金的Cookie`。

![action-secrets](./statics/imgs/action-secrets.jpg)

4. 掘金的 Cookie 可以在掘金打开开发者工具，然后依次点击【Network】、【Fetch/XHR】（或者【XHR】）、【任一 Name】查看是否有`cookie`字段，如果没有可以换一个接口试试，找到后复制`cookie`的值，粘贴到上面 Value 处，并点击【Add secret】。

![get_cookie](./statics/imgs/get_cookie.png)

5. 第二天查看是否已经签到成功，如果中实物奖品请尽量及时填写收货地址。

### 抽奖时间修改

本程序默认是在北京时间凌晨 2 点去执行，如果需要修改签到时间，可以修改`.github/workflows/check_in.yml`文件中的`cron`字段，该字段文档可以[查看这里](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)。

### 接入钉钉机器人

抽奖结果可以在`掘金`和`Github Action`上查看，但是有的时候我们需要更加实时的查看中奖信息，这个时候考虑接入钉钉机器人，具体如下：

1. 创建一个打卡群。点击钉钉右上角的加号，再点击【发起群聊】，选择一个非公司的群，如【考试群】。

![建群](./statics/imgs/dingtalk1.png)

2. 输入喜欢的群名称，然后点击【创建】。

![创建](./statics/imgs/dingtalk2.png)

3. 在群内点击右上角设置按钮，然后依次点【智能群助手】、【添加机器人】、【自定义】、【添加】。

![添加机器人](./statics/imgs/dingtalk3.png)

4. 给机器人起一个名字，然后点【加签】，并复制秘钥的内容（秘钥有点长，要复制输入框内的所有内容）。

![加签](./statics/imgs/dingtalk4.png)

5. 在 Github 的 Secrets 中在添加一个变量，Name 是`DINGTALK_SECRET`，Value 是刚才复制的内容（操作过程可以参考上面【使用方式】第 2、3 步）。

![添加DINGTALK_SECRET](./statics/imgs/dingtalk5.png)

6. 完成后复制`Webhook`的内容。

![复制Webhook](./statics/imgs/dingtalk6.png)

7. 在 Github 的 Secrets 中在添加一个变量，Name 是`DINGTALK_WEBHOOK`，Value 是刚才复制的内容。

![添加DINGTALK_WEBHOOK](./statics/imgs/dingtalk7.png)

8. 返回钉钉完成即可，由于我们是凌晨签到的，如果害怕大半夜推送打扰到自己，可以把群设置成消息免打扰。
