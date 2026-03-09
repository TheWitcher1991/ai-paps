import { Tag } from '@gravity-ui/icons'
import { Button, Card, Divider, Flex, Icon, Text } from '@gravity-ui/uikit'

import { ClassConMapper, IAnnotation, WithAnnotation } from '@wcsc/models'
import { Nullable } from '@wcsc/types'

import styles from './index.module.scss'

interface AssetAnnotationsProps {
	annotations: IAnnotation[]
	hoveredId: Nullable<number>
	onHovered: (hoveredId: Nullable<number>) => void
}

interface AnnotationCardProps extends WithAnnotation {
	onMouseEnter: () => void
	onMouseLeave: () => void
}

export const AnnotationCard = ({
	annotation,
	onMouseEnter,
	onMouseLeave,
}: AnnotationCardProps) => {
	return (
		<Card
			className={styles.annotationCard}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Flex gap={3} alignItems={'center'}>
				<Icon data={Tag} size={17} />
				<Flex direction={'column'} gap={0}>
					<Text color='secondary' variant='caption-2'>
						АННОТАЦИЯ
					</Text>
					<Text variant='subheader-1' color='primary'>
						{ClassConMapper[annotation.cls.name]}
					</Text>
				</Flex>
			</Flex>
			<Flex alignItems={'center'} gap={1}>
				<Button view='raised' size='s'>
					<Text variant='caption-2'>Полигонов {annotation.area}</Text>
				</Button>
				{annotation.area_cm2 && (
					<Button view='raised' size='s'>
						<Text variant='caption-2'>
							Площадь {annotation.area_cm2} cм²
						</Text>
					</Button>
				)}
			</Flex>
		</Card>
	)
}

export default function AssetAnnotations({
	annotations,
	hoveredId,
	onHovered,
}: AssetAnnotationsProps) {
	return (
		<>
			<div className={styles.annotations}>
				<Flex direction={'column'} gap={2}>
					{annotations.map(ann => (
						<AnnotationCard
							onMouseEnter={() => onHovered(ann.id)}
							onMouseLeave={() => onHovered(null)}
							annotation={ann}
						/>
					))}
				</Flex>
			</div>
		</>
	)
}
