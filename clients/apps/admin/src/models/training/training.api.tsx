import { http } from '~infra/http'
import {
  createReadonlyTrainingApi,
  createTrainingApi,
  createTrainingRunApi,
  ITraining,
} from '@wcsc/models'

const { useTraining, useInfinitTrainings, useTrainings } =
  createReadonlyTrainingApi(http)

const { useCreateTraining, useUpdateTraining } = createTrainingApi(http)
const { useStartTrainingRun, useCancelTrainingRun, useTrainingRun } = createTrainingRunApi(http)

export {
  useTraining,
  useInfinitTrainings,
  useTrainings,
  useCreateTraining,
  useUpdateTraining,
  useStartTrainingRun,
  useCancelTrainingRun,
  useTrainingRun,
}
export type { ITraining }
