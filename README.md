## 掘金每日自动签到、抽奖、沾喜气、挖矿-青龙版

### 使用方式

- 在青龙中执行

  - github

    ```shell
    ql repo https://github.com/charmingYouYou/juejin_sign_ql.git "juejin" "icon" "game|autoGame"
    ```

  - gitee(若github源拉取失败, 可修改为国内gitee源)

    ```shell
    ql repo https://gitee.com/charmingyouyou/juejin_sign_ql.git "juejin" "icon" "game|autoGame"
    ```

- 在青龙依赖管理中安装依赖

  - axios
  - jsonwebtoken

- 青龙中环境变量配置

  ```javascript
  JUEJIN_COOKIE // 掘金cookie (与JUEJIN_INFO二选一必填)
  JUEJIN_INFO // 掘金多用户配置(与JUEJIN_COOKIE二选一必填)
  JUEJIN_USER_ID // 掘金用户userId (可选)
  JUEJIN_ALL_IN // 是否全部抽奖 true/false (可选)
  ```

  > Tips:
  >
  > 1. `JUEJIN_INFO`多用户配置与`JUEJIN_COOKIE`&`JUEJIN_USER_ID`单用户配置二选一即可
  > 2. `JUEJIN_USER_ID`自动玩游戏需要此参数，在掘金首页打开控制台输入这行代码`window.__NUXT__.state.auth.user.id`就可以得到
  > 3. `JUEJIN_INFO`配置规则为: cookie`|=|`userId, 多用户则在青龙配置多个同名`JUEJIN_INFO`环境变量即可
  >    * 举例说明: 小明的cookie为xxxx, userId为yyyy; 那么环境变量的值填写为xxxx|=|yyyy
  >    * 如果不需要挖矿玩游戏可不填写userId

- 推送通知环境变量(目前提供`微信server酱`、`pushplus(推送加)`、`iOS Bark APP`、`telegram机器人`、`钉钉机器人`、`企业微信机器人`、`iGot`等通知方式)
  
  > 条件有限,目前仅自测企业微信应用消息推送正常,如有异常,请提issue
  
  |       Name        |                             归属                             |  属性  | 说明                                                         |
  | :---------------: | :----------------------------------------------------------: | :----: | ------------------------------------------------------------ |
  |    `PUSH_KEY`     |                       微信server酱推送                       | 非必须 | server酱的微信通知[官方文档](http://sc.ftqq.com/3.version)，已兼容 [Server酱·Turbo版](https://sct.ftqq.com/)   |
  |    `BARK_PUSH`    | [BARK推送](https://apps.apple.com/us/app/bark-customed-notifications/id1403753865) | 非必须 | IOS用户下载BARK这个APP,填写内容是app提供的`设备码`，例如：https://api.day.app/123 ，那么此处的设备码就是`123`，再不懂看 [这个图](icon/bark.jpg)（注：支持自建填完整链接即可） |
  |   `BARK_SOUND`    | [BARK推送](https://apps.apple.com/us/app/bark-customed-notifications/id1403753865) | 非必须 | bark推送声音设置，例如`choo`,具体值请在`bark`-`推送铃声`-`查看所有铃声` |
  |   `BARK_GROUP`    | [BARK推送](https://apps.apple.com/us/app/bark-customed-notifications/id1403753865) | 非必须 | bark推送消息分组，例如`jd_scripts` |
  |  `TG_BOT_TOKEN`   |                         telegram推送                         | 非必须 | tg推送(需设备可连接外网),`TG_BOT_TOKEN`和`TG_USER_ID`两者必需,填写自己申请[@BotFather](https://t.me/BotFather)的Token,如`10xxx4:AAFcqxxxxgER5uw` , [具体教程](https://github.com/zero205/JD_tencent_scf/edit/main/backUp/TG_PUSH.md) |
  |   `TG_USER_ID`    |                         telegram推送                         | 非必须 | tg推送(需设备可连接外网),`TG_BOT_TOKEN`和`TG_USER_ID`两者必需,填写[@getuseridbot](https://t.me/getuseridbot)中获取到的纯数字ID, [具体教程](https://github.com/zero205/JD_tencent_scf/edit/main/backUp/TG_PUSH.md) |
  |  `DD_BOT_TOKEN`   |                           钉钉推送                           | 非必须 | 钉钉推送(`DD_BOT_TOKEN`和`DD_BOT_SECRET`两者必需)[官方文档](https://developers.dingtalk.com/document/app/custom-robot-access) ,只需`https://oapi.dingtalk.com/robot/send?access_token=XXX` 等于`=`符号后面的XXX即可 |
  |  `DD_BOT_SECRET`  |                           钉钉推送                           | 非必须 | (`DD_BOT_TOKEN`和`DD_BOT_SECRET`两者必需) ,密钥，机器人安全设置页面，加签一栏下面显示的SEC开头的`SECXXXXXXXXXX`等字符 , 注:钉钉机器人安全设置只需勾选`加签`即可，其他选项不要勾选,再不懂看 [这个图](icon/DD_bot.png) |
  |    `QYWX_KEY`     |                         企业微信机器人推送                         | 非必须 | 密钥，企业微信推送 webhook 后面的 key [详见官方说明文档](https://work.weixin.qq.com/api/doc/90000/90136/91770) |
  |     `QYWX_AM`     |                       企业微信应用消息推送                     | 非必须 | corpid,corpsecret,touser,agentid,素材库图片id [参考文档1](http://note.youdao.com/s/HMiudGkb) [参考文档2](http://note.youdao.com/noteshare?id=1a0c8aff284ad28cbd011b29b3ad0191)<br>素材库图片填0为图文消息, 填1为纯文本消息         |
  |  `IGOT_PUSH_KEY`  |                           iGot推送                           | 非必须 | iGot聚合推送，支持多方式推送，确保消息可达。 [参考文档](https://wahao.github.io/Bark-MP-helper ) |
  | `PUSH_PLUS_TOKEN` |                         pushplus推送                         | 非必须 | 微信扫码登录后一对一推送或一对多推送下面的token(您的Token) [官方网站](http://www.pushplus.plus/) |
  | `PUSH_PLUS_USER`  |                         pushplus推送                         | 非必须 | 一对多推送的“群组编码”（一对多推送下面->您的群组(如无则新建)->群组编码）注:(1、需订阅者扫描二维码 2、如果您是创建群组所属人，也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送)，只填`PUSH_PLUS_TOKEN`默认为一对一推送 |
  |  `TG_PROXY_HOST`  |                      Telegram 代理的 IP                      | 非必须 | 代理类型为 http。例子：http代理 http://127.0.0.1:1080 则填写 127.0.0.1 |
  |  `TG_PROXY_PORT`  |                     Telegram 代理的端口                      | 非必须 | 例子：http代理 http://127.0.0.1:1080 则填写 1080             |

### 如何更新

* 在青龙中定时任务添加一条任务
  * 名称: update_juejin_sign
  * 命令: 同上方拉取命令相同`ql repo ...`
  * 定时规则: 0 0 * * 1
* 保存后手动运行即可
