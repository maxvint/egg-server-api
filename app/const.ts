// resource状态
export const RESOURCE_STATUS_INVALID_MARK = -20 // 标注人员标记为无效数据
export const RESOURCE_STATUS_INVALID_CONFIRM = -21 // 修改后不合格
export const RESOURCE_STATUS_DEFAULT = 0 // 未标注
export const RESOURCE_STATUS_MARKED = 1 // 待质检
export const RESOURCE_STATUS_MARK_FAILURE = -1 // 质检不合格，待修改
export const RESOURCE_STATUS_MARK_SUCCESS_WITH_MODIFY = 20 // 修改后质检合格
export const RESOURCE_STATUS_MARK_SUCCESS = 21 // 合格

export const TASK_JOIN_ROLE_MARKER = 0
export const TASK_JOIN_ROLE_CHECKER = 1
export const TASK_JOIN_ROLE_CREATOR = 2

export const TASK_JOIN_ROLE_MAP: KeyMap = new Map([
  [ 0, 'marker' ],
  [ 1, 'checker' ],
  [ 2, 'creator' ],
])

export const TASK_JOINER_MAP: Map<string, number> = new Map([
  [ 'marker', 0 ],
  [ 'checker', 1 ],
  [ 'creator', 2 ],
])
