请创建一个完整的小程序前端原型，包含所有页面和基本交互，使用HTML+TailwindCSS实现，要求如下：

### 设计规范
- **主题**：白色为主色调 (#FFFFFF)，辅以茶园绿(#3A7D54)作为强调色
- **布局**：移动优先，最大宽度414px，底部固定导航栏
- **样式**：简洁明了，表达功能即可，无需精细设计
- **字体**：系统默认字体，适当加粗标题

### 页面结构
需要创建以下5个页面：
1. 隐私协议弹窗（启动时显示）
2. 首页（含Banner和订阅入口）
3. 订阅中心（核心功能页）
4. 购物袋页面
5. 个人中心页面

### 隐私协议弹窗要求
- 半透明黑色背景蒙层
- 居中白色卡片
- 标题："隐私政策协议"
- 滚动内容区域（占位文案）
- 两个按钮："不同意并退出"(灰色)、"同意并继续"(绿色)
- 同意后自动关闭弹窗并显示首页

### 首页要求
- **顶部Banner**：占屏幕80%高度，背景淡绿色，显示宣传文案
- **订阅入口**：位于Banner下方，绿色按钮"开启订阅"
- **品牌故事**：可折叠区域，标题"绿邮件的长期主义"
- **购买流程图**：四个步骤的图标展示（选茶、定制、支付、收件）
- **底部导航栏**：首页(激活状态)、订阅、购物袋、我的

### 订阅中心要求
- **模式选择标签**：三个选项（盲盒订阅、偏好订阅、自定义订阅）
- **内容区域**：根据选择展示不同内容
  - 盲盒订阅：季节选择卡片（春/夏）
  - 偏好订阅：茶类标签可标记喜欢/排除（❤️/❌）
- **价格阶梯**：四种订阅周期（月/季/半年/年）
- **底部双按钮**："加入购物袋"、"立即购买"

### 购物袋页面要求
- **商品列表**：复选框、商品名称、价格、数量调节器
- **删除功能**：每个商品有删除按钮
- **促销提示**："再加¥32享包邮!"文案
- **结算区域**：固定底部，显示总价和"立即下单"按钮

### 个人中心要求
- **用户信息区**：头像、昵称
- **功能网格**：列表布局（我的订单、收货地址、专属客服、优惠券、茶园故事、设置）
- **品牌声明**：底部小字"每笔订单5%投入茶园保护基金"

### 交互要求
- **页面切换**：通过底部导航栏切换主要页面
- **折叠效果**：品牌故事可展开/收起
- **状态反馈**：按钮悬停/点击状态变化
- **订阅模式切换**：标签切换时内容区域更新
- **购物袋操作**：商品选择、数量修改、删除

### 输出要求
- 每个页面一个单独的 html 页面, 页面之间可以跳转
- 使用TailwindCSS（通过CDN引入）
- 包含Font Awesome图标
- 基本JavaScript实现页面切换和简单交互
- 响应式设计，在移动设备上显示良好
- css 和 js 可以共用.



# 修改 1:

## 1. 首页

- 底部添加品牌理念和简介
    它是如何运作的
    绿邮件团队
    绿邮件的团队会在全国各产区采购符合标准的茶。会包含西湖龙井，祁门红茶，福鼎白茶等名茶，同时包含径山茶，漳平水仙，舒城小兰花等小众但优质的茶。
    订阅制
    每月会邮寄约40g不同风味的茶叶，一张明信片包含此款茶叶的冲泡方法，和关于茶叶的历史
    您的茶山邮递员
    请把他当作您茶生活的向导，为您提供商品货架上找不到的喝茶体验，带您云游中国美丽茶山。

                            订阅式茶生活
                      每月发现一种不同风味的中国茶

                            每份绿邮件会包含
    一款中国不同产区的优质茶叶
    一张来自产区的明信片

    一则品评寄语，茶叶故事
    您有一封来自茶山的邮件，请查收!

    绿邮件的长期主义
    • 以高于市场的价格采购，确保优质茶农长期收益  
    • 毛利率严格控制在15~20%，拒绝暴利
    • 反对高抽成电商平台与价格战内卷，专注产品与可持续增长  
    • 设立茶园保护基金，反哺茶园生态发展  （如果您或您的企业坚守茶产业的底线却在市场中难以为继请与我们联系）

- 顶部为轮播图, 占满屏幕宽度

## 2. 我的页面
  1. 修改为列表, 弃用九宫格布局
  2. 移除头像下面的会员相关信息


1. 设计 `我的订单` 页面, 展示订单列表. 点击 `我的` 页面中的 `我的订单` 跳转进入
2. 设计 `收货地址` 页面, 展示收货地址列表. 点击 `我的` 页面中的 `收货地址` 跳转进入
3. 设计 `专属客服` 页面, 展示一个客户二维码, 点击 `我的` 页面中的 `专属客服` 跳转进入
3. 设计 `优惠券` 页面, 展示一个客户邀请链接, 点击 `我的` 页面中的 `优惠券` 跳转进入


1. 设计 `新增收货地址` 页面, 新增收货地址表单. 在 `我的` 页面中的 `收货地址` 底部 `新增收货地址` 按钮点击跳转进入
2. 设计 `订单详情` 页面, 展示订单详情. 在 `我的` 页面中的 `我的订单` 列表中点击 `查看详情` 跳转进入
3. 暂时隐藏 `我的` 页面中的 `茶园故事` `设置` 和 `我的积分` 选项.
4. 暂时隐藏 `我的页面` 底部 `眉笔订单5%投入 xxx 基金` 字样