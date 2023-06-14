import {Skeleton} from '../../Skeleton'

import {Container} from './styles'

export function  SkeletonSnack() {
	return (
		<div className="skeleton-wraper">
			<Container>
				<Skeleton type='title'/>
				<Skeleton type='thumbnail'/>
				<Skeleton type='description'/>
				<Skeleton type='description'/>
				<div>
					<Skeleton type='title'/>
					<Skeleton type='image'/>
				</div>
			</Container>
		</div>
	)
}