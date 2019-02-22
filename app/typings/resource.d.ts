interface IResourceCreateTransfer {
  task_id: object
  title: object
  path: object
}

interface IResourceUpdateTransfer {
  id: object
  task_id: object
  title: object
  path: object
}

interface IResourceExportItem {
  id: number,
  path: string,
  status: number,
  mark_result: object
}
