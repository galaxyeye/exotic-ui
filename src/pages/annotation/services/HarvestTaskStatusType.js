export type RowType = string[]

export type TableDataType = {
  isCombined: boolean,
  hyperPath: string,
  xsql: string,
  alignedTop: number,
  name: string,
  documentSize: number,
  score: string,
  numClusters: number,
  numQualifiedClusters: number,
  titleSuffix: string,
  distortion: number,
  dataTypeStatistics: {},
  clusterTaskStatus: {},
  clusterGroupMetrics: {},
  microP: number,
  microR: number,
  microF1: number,
  macroP: number,
  macroR: number,
  macroF1: number,
  ff: number,
  ffr: number
}

export type TableType = {
  tableData: TableDataType,
  rows: RowType[]
}

export type HarvestResultType = {
  portalUrl: string,
  args: string,
  numTables: number,
  tables: TableType[]
}

export type HarvestTaskStatusType = {
  statusCode: number,
  status: string,
  uuid: string,
  result: HarvestResultType,
  ntotalPages: number,
  nsuccessPages: number
}
