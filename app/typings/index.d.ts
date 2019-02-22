declare type KeyMap = Map<number, string>

interface IPagination {
  page: number
  page_size: number
  page_max: number
  total: number
}

interface IPageParams {
  model?: any
  conditions?: object
  order?: Array
  include?: Array
  attributes?: Array
}

interface ISucessResponse {
  code: number
  data: any
  message?: string
}
