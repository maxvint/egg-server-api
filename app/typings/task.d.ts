declare type TaskExportFormat = 'json' | 'xml' | 'txt'

interface ITaskCreateTransfer {
  user_id: object
  title: object
  content: object
}

interface ITaskUpdateTransfer {
  id: object
  user_id: object
  title: object
  content: object
}
