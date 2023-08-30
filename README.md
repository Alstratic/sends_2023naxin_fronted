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

## 	7.26 commit

- 完善了homepage的相关开发
- 包括轮播图的雏形以及热门职位的组件 但暂时还没有封装完毕
- 目前还没有拿到数据测试 所以数据是写死了的
- **现已push至homepage branch 提交时也请提交至相同分支**

## 7.28 commit

- 用mock.js模拟数据（现在热门职位下面的卡片里的数据就是模拟的）
- 重构了下前面写的，调用然后重新封装了卡片的组件
- 之后打算把单个组件写好 然后就只是布局就好了 这样可能会更快些
- **现已push至homepage branch 提交时也请提交至相同分支（如果是做的其它页面，就提交到新的分支）**
----
## 	7.29 commit
- homepage页面基本结束啦 （其实是热门组织先暂时不用做）
- 重构了一下卡片 现在移动端最多同时展示3个 PC端与策划界面一致
- 都是用的mockdata数据
- 在HotPositionCard的style加了scoped，其他没动
- 完成了职业详情页POsition_detailes，该页面用媒体查询，rem，百分比等实现自适应布局
- 加了组件positionCard，为推荐职位卡片
- 利用mock.js模拟数据的推荐职位，但是推荐职位的卡片数先写死成两个，还要职位详情的内容也先写死。
  ### 7.29 master合并说明
- 页面的路径我移动到 `src/view` 中去了 为了跟封装的组件更好的区分，所以从`component`中移走了
- 我把你的`PositionCard`跟我的组件结合了一下，又统一成了`HotPositionCard`组件，在你那个职位详情页面的相关调用也帮你统一过来了，放在`component`文件下
- 由于文件夹改动，路由也变动了一些，我都帮你改了一下，现在应该没问题了
- 现在`view/userview`中的`homepage`和`Position_detail`都展示的没问题（在我这里），我统一合并到master分支上了。我接下来去做全部职位那个页面了。
- **master branch 提交时也请提交至相同分支（如果是做的其它页面，就提交到新的分支）**

## 	7.30 commit

- 职位详情页面和组织详情页面完成。
- 将导航头部放置组件CHeader.但是导航的选项的路由跳转后回退有点问题
## 	7.31 commit

- 申请表正在做ing,做完更新该分支。

- 记录相关进度如下：

  ```
  用户端
  '/homepage'  主页面 √
  
  '/interview' 面试报名-面试报名上传-面试报名提交  开发中ing？
  '/interview_lists' 面试列表 ×
  '/interview_details' 面试详情 ×
  
  '/Applications' 申请列表页面 ×
  '/Applications_details' 申请详情页面 ×
  
  '/Examine_page'	考核页面 ×
  '/Examinepage_details' 考核详情页面 ×
  
  '/All_Positions' 全部职位页面 开发中ing
  '/Position_detailes' 职位详情页面 √
  '/Position_collection' 职位收藏 ×
  
  'All_Oragnizations' 全部组织页面 ×
  '/Orgnization_details' 组织详情页面 √
  
  '/login' 登录页面 （不用额外做页面，直接微信统一认证）×
  
  管理端（还没开始）
  '/homepage' 首页仪表盘
  
  '/Position_list' 职位列表
  '/Position_information' 职位信息
  '/Position_post' 职位发布
  
  '/Application_approval' 申请审批
  
  '/Interview_list' 面试列表
  '/Interview_assignment' 面试安排
  
  '/Examine_check' 考核批阅
  '/Examine_post' 考核发布
  ```

  

## 8.1commit

- 申请表已经做完，由于后端接口还没有，axios请求先注释起来，有个问题一直没解决就是提示框的宽度有点大，还改不了，但是能实现自适应。其他地方没什么问题了。

- 记录相关进度如下：

```
用户端
'/homepage'  主页面 √

'/interview' 面试报名-面试报名上传-面试报名提交  √
'/interview_lists' 面试列表 ×
'/interview_details' 面试详情 ×

'/Applications' 申请列表页面 ×
'/Applications_details' 申请详情页面 ×

'/Examine_page'	考核页面 ×
'/Examinepage_details' 考核详情页面 ×

'/All_Positions' 全部职位页面 开发中ing
'/Position_detailes' 职位详情页面 √
'/Position_collection' 职位收藏 ×

'All_Oragnizations' 全部组织页面 ×
'/Orgnization_details' 组织详情页面 √

'/login' 登录页面 （不用额外做页面，直接微信统一认证）×

管理端（还没开始）
'/homepage' 首页仪表盘

'/Position_list' 职位列表
'/Position_information' 职位信息
'/Position_post' 职位发布

'/Application_approval' 申请审批

'/Interview_list' 面试列表
'/Interview_assignment' 面试安排

'/Examine_check' 考核批阅
'/Examine_post' 考核发布
```
## 8-2commit(sh)

- 申请详情和、面试详情和考核详情写好了。有些地方还是先写死
- 修改了上传文件的格式限制（zip）,以formDate传
- 代码有很多冗余，内容卡片的组件还没有封装。

记录相关进度如下：

```
用户端
'/homepage'  主页面 √

'/interview' 面试报名-面试报名上传-面试报名提交  √
'/interview_lists' 面试列表 ×
'/interview_details' 面试详情 √

'/Applications' 申请列表页面 ×
'/Applications_details' 申请详情页面 √

'/Examine_page'	考核页面 ×
'/Examinepage_details' 考核详情页面 √

'/All_Positions' 全部职位页面 开发中ing
'/Position_detailes' 职位详情页面 √
'/Position_collection' 职位收藏 ×

'All_Oragnizations' 全部组织页面 ×
'/Orgnization_details' 组织详情页面 √

'/login' 登录页面 （不用额外做页面，直接微信统一认证）×

管理端（还没开始）
'/homepage' 首页仪表盘

'/Position_list' 职位列表
'/Position_information' 职位信息
'/Position_post' 职位发布

'/Application_approval' 申请审批

'/Interview_list' 面试列表
'/Interview_assignment' 面试安排

'/Examine_check' 考核批阅
'/Examine_post' 考核发布
```
## 	8.2 commit

- `All_Positions`全部职位筛选器应该没什么问题了，这个页面接近尾声了，不过临时传来需求要把多选改成单选，明天再看着改改

- 全部组织页面暂时不用做

- 做完全部职位之后明天我可能会开始做申请列表那部分

  ```
  用户端
  '/homepage'  主页面 √
  
  '/interview' 面试报名-面试报名上传-面试报名提交  √
  '/interview_lists' 面试列表 ×
  '/interview_details' 面试详情 ×
  
  '/Application' 申请列表页面 ×
  '/Application-list' 申请列表页面 ×
  '/Applications_details' 申请详情页面 ×
  
  '/Examine_page'	考核页面 ×
  '/Examinepage_details' 考核详情页面 ×
  
  '/All_Positions' 全部职位页面 开发中ing
  '/Position_detailes' 职位详情页面 √
  '/Position_collection' 职位收藏 ×
  
  'All_Oragnizations' 全部组织页面 ×
  '/Orgnization_details' 组织详情页面 √
  
  '/login' 登录页面 （不用额外做页面，直接微信统一认证）×
  
  管理端（还没开始）
  '/homepage' 首页仪表盘
  
  '/Position_list' 职位列表
  '/Position_information' 职位信息
  '/Position_post' 职位发布
  
  '/Application_approval' 申请审批
  
  '/Interview_list' 面试列表
  '/Interview_assignment' 面试安排
  
  '/Examine_check' 考核批阅
  '/Examine_post' 考核发布
  ```

## 8-4

- 用file-saver库先写好文件下载功能。
- 修改了文档修改的部分

## 8-5

搭好了组织端框架


## 8.7 commit

- 打算把导航栏的登录先写好，目前已经完成了`Login_nav`的组件化，可能有点小问题，明天写好
- 继续做申请列表那些，应该这两天就能做好



## 8.12 commit

记录进度如下：

```
用户端
'/homepage'  主页面 √

'/interview' 面试报名-面试报名上传-面试报名提交  √
'/interview_lists' 搭框架ing
'/interview_details' 面试详情 ×
面试报名提交？

'/Application_list' 申请列表页面 80%

'/Collection_list'	收藏列表页面 搭框架ing

'/Examine_list'	搭框架ing
'/Examinepage_details' 考核详情页面 ×
考核提交页面？

'/All_Positions' 全部职位页面 80%
'/Position_detailes' 职位详情页面 √
'/Position_collection' 职位收藏 搭框架ing

'/All_Oragnizations' 全部组织页面 暂时不用
'/Orgnization_details' 组织详情页面 √

'/login' 登录页面 （微信统一认证）×

管理端（框架搭好了？）
'/homepage' 首页仪表盘

'/Position_list' 职位列表
'/Position_information' 职位信息
'/Position_post' 职位发布

'/Application_approval' 申请审批

'/Interview_list' 面试列表
'/Interview_assignment' 面试安排

'/Examine_check' 考核批阅
'/Examine_post' 考核发布
```

## 	8.14commit

- 登录在做，遇到了点问题，查了查好像要进行网页授权，个人的公众号权限不够，明天试试桑梓的公众号能不能授权成功

- ```
  用户端
  '/homepage'  主页面 √
  
  '/interview' 面试报名-面试报名上传-面试报名提交  √
  '/interview_lists' 搭框架ing
  '/interview_details' 面试详情 ×
  面试报名提交？
  
  '/Application_list' 申请列表页面 80%
  
  '/Collection_list'	收藏列表页面 搭框架ing
  
  '/Examine_list'	搭框架ing
  '/Examinepage_details' 考核详情页面 ×
  考核提交页面？
  
  '/All_Positions' 全部职位页面 80%
  '/Position_detailes' 职位详情页面 √
  '/Position_collection' 职位收藏 搭框架ing
  
  '/All_Oragnizations' 全部组织页面 暂时不用
  '/Orgnization_details' 组织详情页面 √
  
  '/login' 登录页面 （微信统一认证）ing
  
  管理端（框架搭好了？）
  '/homepage' 首页仪表盘
  
  '/Position_list' 职位列表
  '/Position_information' 职位信息
  '/Position_post' 职位发布
  
  '/Application_approval' 申请审批
  
  '/Interview_list' 面试列表
  '/Interview_assignment' 面试安排
  
  '/Examine_check' 考核批阅
  '/Examine_post' 考核发布
  ```

<<<<<<< HEAD
=======
  

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f388a8f638fce61905a8d9568fe3e0a1cb0591ca

>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
## 8-15 commit

- 改好了申请列表Application_list和面试列表Interview_list布局。全部组织和首页还没改。

- 申请列表和面试列有个bug是点击两次tag，就不选中了。

  ```
  用户端
  '/homepage'  主页面 √
  
  '/interview' 面试报名-面试报名上传-面试报名提交  √
  '/interview_lists' 搭框架ing
  '/interview_details' 面试详情 √
  面试报名提交？√
  
  '/Application_list' 申请列表页面 80%
  
  '/Collection_list'	收藏列表页面 搭框架ing
  
  '/Examine_list'	搭框架ing
  '/Examinepage_details' 考核详情页面   √
  考核提交页面？  √
  
  '/All_Positions' 全部职位页面 80%
  '/Position_detailes' 职位详情页面 √
  '/Position_collection' 职位收藏 搭框架ing
  
  '/All_Oragnizations' 全部组织页面 暂时不用
  '/Orgnization_details' 组织详情页面 √
  
  '/login' 登录页面 （微信统一认证）ing
  
  管理端（框架搭好了？）
  '/homepage' 首页仪表盘 80% 动态部分还没做。不过我这部分代码还没push上
  
  '/Position_list' 职位列表
  '/Position_information' 职位信息
  '/Position_post' 职位发布
  
  '/Application_approval' 申请审批
  
  '/Interview_list' 面试列表
  '/Interview_assignment' 面试安排
  
  '/Examine_check' 考核批阅
  '/Examine_post' 考核发布
  ```

<<<<<<< HEAD
=======
  

<<<<<<< HEAD
=======
=======
>>>>>>> 19d891f5d3ea05ab13f64210dfb95e451745861f
>>>>>>> f388a8f638fce61905a8d9568fe3e0a1cb0591ca

>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
## 8-16 commit

- （忽略布局）微信登录功能实现了。之后这里的url记得改：

- ```
  location.href = `https://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent(
        'http://localhost:8080/LoginSucess'
      )}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
  ```

- 但是目前有个bug（应该算bug）就是回退后，就变空白页了。 

- 另外封装了axios。

- 加了导航守卫，没有登录拿到token的话，就不能访问其他页面，只能跳到login页面
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605

## 8-18commit

- 修改了登录方式
- 改了考核列表，面试列表和申请列表布局，卡片等。
<<<<<<< HEAD

## 	8-23 commit

- 用户端登录页面做好了，在浏览器可以在`localstroage`处随便存入一个`token`

- 筛选器相关在`All_positions`中，具体的组件的逻辑是在`Positiontag`组件

  
=======
=======
>>>>>>> f388a8f638fce61905a8d9568fe3e0a1cb0591ca

## 8-27commit 

组织端除了首页非必要的功能，其他已经完成。
>>>>>>> a6e9708fbeae18722ac933779f9f1b6809bf3605
