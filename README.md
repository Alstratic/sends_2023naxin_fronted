# sends_naxin_fronted

华侨大学桑梓网络创新实验室招聘网站与2023纳新网站

前端部分

基于vue2.0 axios element_ui

**注意：提交时不要提交到master分支，提交到什么分支详见当天的commit日志，见下**

**7月29日已提交**

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run serve
```

### Compiles and minifies for production

```
pnpm run build
```

### Lints and fixes files

```
pnpm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 7.24 commit

- 完善了相关路由跳转：

```
'/homepage'  主页面 
'/interview' 面试页面
'/Applications' 申请页面
'/Applications_details' 申请详情页面
'/Examine_page'	考核页面
'/Orgnization_details' 组织详情页面
'/Position_detailes' 职位详情页面
'/login' 登录页面
```

- homepage页面开了个头，把navigator写好了，（但是登录之后按钮消失切换成用户头像的逻辑还没好）
- 开工第一天 规范了下文档 部分内容开了个小头
- **现已push至homepage branch 提交时也请提交至相同分支**

## 7.26 commit

- 完善了homepage的相关开发
- 包括轮播图的雏形以及热门职位的组件 但暂时还没有封装完毕
- 目前还没有拿到数据测试 所以数据是写死了的
- **现已push至homepage branch 提交时也请提交至相同分支**

## 7.28 commit

- 用mock.js模拟数据（现在热门职位下面的卡片里的数据就是模拟的）
- 重构了下前面写的，调用然后重新封装了卡片的组件
- 之后打算把单个组件写好 然后就只是布局就好了 这样可能会更快些
- **现已push至homepage branch 提交时也请提交至相同分支（如果是做的其它页面，就提交到新的分支）**

## 7.29 commit

- homepage页面基本结束啦 （其实是热门组织先暂时不用做）
- 重构了一下卡片 现在移动端最多同时展示3个 PC端与策划界面一致
- 都是用的mockdata数据
- **现已push至homepage branch 提交时也请提交至相同分支（如果是做的其它页面，就提交到新的分支）**
