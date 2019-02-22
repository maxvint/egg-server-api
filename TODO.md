# TODO List

### 2019-02-16
- 任务增加筛选类型，关联筛选工具

### 2019-01-31
- feedback模块完善

### 2019-01-30
- 新增图片打标签任务类型，不用绘制，只打标签
- 小程序实现图片筛选功能

### 2019-01-22
- 增加工会功能
  会长：创建工会、管理工会、添加会员、删除会员
  会员：加入工会、退出工会
- 任务增加私有类型，任务列表不可见

### 2019-01-14
- ✅ users列表获取有bug，没有过滤掉密码

### 2019-01-09
- 统计重构
  - 所有统计数据，单独加一个表
    - id
    - model
    - target_id
    - key
    - value
    - created_at
    - updated_at
    - deleted_at
  - 统计类型
    - task
      - marker 标注人数
      - checker 质检人数
      - resource_total 数据总数
      - resource_marked 已标注的数据
      - resource_mark_passed 合格标注数
      - resource_checked 已质检的数据
      - resource_check_passed 质检合格数
      - resource_mark_object 标注总框数
    - resource
      - mark_total 标注次数
      - check_total 质检次数
    - user
      - task_created 发布任务总数
      - task_marked 参与标注的任务总数
      - task_checked 参与质检的任务总数
      - resource_uploaded 上传数据总数
      - resource_marked 已标注数据总数
      - resource_mark_passed 已标注数据通过数
      - resource_checked 已质检数据总数
    - task_join 用户参与的任务数据统计
      - resource_mark_passed 标注合格数
      - resource_mark_object 框数统计
  - 只统计大于0的项
