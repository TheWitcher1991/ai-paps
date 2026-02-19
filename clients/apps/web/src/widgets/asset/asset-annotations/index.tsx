import AssetTabs from '../asset-tabs'
import { Flex } from '@gravity-ui/uikit'

import { IAnnotation } from '@wcsc/models'
import { Nullable } from '@wcsc/types'

import styles from './index.module.scss'

interface AssetAnnotationsProps {
	annotations: IAnnotation[]
	hoveredId: Nullable<number>
	onHovered: (hoveredId: Nullable<number>) => void
}

export default function AssetAnnotations({
	annotations,
	hoveredId,
	onHovered,
}: AssetAnnotationsProps) {
	return (
		<>
			<div className={styles.annotations}>
				<AssetTabs />

				<Flex direction={'column'} gap={1}>
					{annotations.map((ann: any) => (
						<div
							className={styles.annotation}
							key={ann.id}
							onMouseEnter={() => onHovered(ann.id)}
							onMouseLeave={() => onHovered(null)}
							style={{
								cursor: 'pointer',
								color: 'white',
								border:
									hoveredId === ann.id
										? '1px solid yellow'
										: '1px solid #333',
								transition: '0.2s',
							}}
						>
							<b>
								#{ann.id} {ann.cls?.name}
							</b>
							<div>Полигонов: {ann.area}</div>
							{ann.area_cm2 && (
								<div>Площадь: {ann.area_cm2} cм²</div>
							)}
						</div>
					))}
				</Flex>
			</div>
		</>
	)
}
