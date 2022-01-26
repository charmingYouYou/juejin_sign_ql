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
  JUEJIN_COOKIE // 掘金cookie (必填)
  JUEJIN_ALL_IN // 是否全部抽奖 true/false (可选)
  JUEJIN_USER_ID // 掘金用户userId (可选, 自动玩游戏需要此参数，在掘金首页打开控制台输入这行代码`window.__NUXT__.state.auth.user.id`就可以得到)
  ```

### 如何更新

* 在青龙中定时任务添加一条任务
  * 名称: update_juejin_sign
  * 命令: 同上方拉取命令相同`ql repo ...`
  * 定时规则: 0 0 * * 1
* 保存后手动运行即可
