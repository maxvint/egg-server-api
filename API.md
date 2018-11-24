### API

- [GET] /api/v1/hello

##### User
- [GET] /api/v1/user 获取热门用户
- [GET] /api/v1/user/:id 获取某个用户的详细信息
- [GET] /api/v1/user/profile 获取当前用户的完整信息
- [GET] /api/v1/user/:id/reply 获取用户回帖列表
- [GET] /api/v1/user/:id/topics 获取用户话题列表
- [POST] /api/v1/user/:id/block 屏蔽用户
- [POST] /api/v1/user/:id/unblock 取消屏蔽用户
- [GET] /api/v1/user/:id/blocked 获取当前用户的屏蔽列表
- [POST] /api/v1/user/:id/follow 关注用户
- [POST] /api/v1/user/:id/unfollow 取消关注用户
- [GET] /api/v1/user/:id/following 获取用户的关注列表
- [GET] /api/v1/user/:id/followers 获取用户的关注者列表
- [GET] /api/v1/user/:id/favorites 获取某个用户的收藏列表

##### Node
- [GET] /api/v1/node 获取节点列表
- [GET] /api/v1/node/:id 获取节点详情

##### Topic

##### Reply
- [GET] /api/v1/reply/:id 获取回帖的详细内容
- [POST] /api/v1/reply/:id 修改回帖
- [DELETE] /api/v1/reply/:id 删除回帖

##### Photo
- [POST] /api/v1/photo 上次附件

##### Like
- [POST] /api/v1/like 点赞
- [DELETE] /api/v1/like 取消赞

##### Notification
- [GET] /api/v1/notification 获取用户的通知列表
- [POST] /api/v1/notification/read 批量将通知设为已读状态
- [GET] /api/v1/notification/unread_count 获取未读通知数量
- [DELETE] /api/v1/notification/:id 删除某个通知
- [DELETE] /api/v1/notification/all 清空通知
