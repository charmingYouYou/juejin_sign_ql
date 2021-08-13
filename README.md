## 掘金每日自动签到，自动抽奖

本项目使用`Github Action`来部署自动签到程序，无需自己购买服务器，安全可靠且方便。

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

### 时间修改

本程序默认是在北京时间凌晨 2 点去执行，如果需要修改签到时间，可以修改`.github/workflows/check_in.yml`文件中的`cron`字段，该字段文档可以[查看这里](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)。
