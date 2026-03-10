import { useMutation } from '@tanstack/react-query'

import { http } from '~infra/http'

import {
	createInferenceApi,
	createInferencePredictionApi,
} from '@wcsc/models'
import { ModelID } from '@wcsc/models'

export const {
	useInference,
	useInfinityInferences,
	useInferences,
	useCreateInference,
	useUpdateInference,
} = createInferenceApi(http)

const { inferencePredictionRepository } =
	createInferencePredictionApi(http)

export const usePredict = (modelId: ModelID) =>
	useMutation({
		mutationFn: (image: File) =>
			inferencePredictionRepository.predict(modelId, image),
	})

export const usePredictWithConfidence = (modelId: ModelID) =>
	useMutation({
		mutationFn: (image: File) =>
			inferencePredictionRepository.predictWithConfidence(modelId, image),
	})
