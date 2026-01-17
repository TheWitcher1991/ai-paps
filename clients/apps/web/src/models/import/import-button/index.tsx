import { ArrowDownToSquare } from '@gravity-ui/icons'
import { Button, Icon } from '@gravity-ui/uikit'

export const ImportButton = () => {
	return (
		<Button view={'action'}>
			<Icon data={ArrowDownToSquare} size={16} />
			Импорт датасета
		</Button>
	)
}
