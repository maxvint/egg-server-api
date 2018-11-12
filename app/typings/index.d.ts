interface IPagination {
  page: number
  page_size: number
  total_page: number
  total_count: number
}

interface IPageParams {
  conditions: object
  order: Array
  include: Array
  attributes: Array
}
