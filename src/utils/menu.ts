export const createMenu = (push: Function) => [
	{
		label: 'Dashboard',
		icon: 'fas fa-tachometer-alt',
		command: () => push('/')
	},
	{
		label: 'Villagers',
		icon: 'fas fa-users',
		command: () => push('/villagers')
	},
	{
		label: 'Nature',
		icon: 'fas fa-spider',
		items: [
			{ label: 'Fishes', command: () => push('/fishes') },
			{ label: 'Bugs', command: () => push('/bugs') },
			{ label: 'Deep Sea', command: () => push('/deepSea') }
		]
	},
	{
		label: 'Museum',
		icon: 'fas fa-landmark',
		items: [ { label: 'Fossils', command: () => push('/fossils') }, { label: 'Art', command: () => push('/art') } ]
	},
	{
		label: 'Clothing',
		icon: 'fas fa-tshirt',
		items: [
			{ label: 'Tops', command: () => push('/clothing?type=Tops') },
			{ label: 'Bottoms', command: () => push('/clothing?type=Bottoms') },
			{ label: 'Headwear', command: () => push('/clothing?type=Hats') },
			{ label: 'Shoes', command: () => push('/clothing?type=Footwear') },
			{ label: 'Dresses', command: () => push('/clothing?type=Dresses') },
			{ label: 'Umbrellas', command: () => push('/clothing?type=Umbrellas') },
			{ label: 'Accessories', command: () => push('/clothing?type=Accessories') },
			{ label: 'View all', command: () => push('/clothing') }
		]
	},
	{
		label: 'Furniture & More',
		icon: 'fas fa-leaf',
		items: [
			{ label: 'Furniture', command: () => push('/furniture') },
			{ label: 'Wallpaper', command: () => push('/wallpaper') },
			{ label: 'Flooring', command: () => push('/flooring') },
			{ label: 'Songs', command: () => push('/songs') },
			{ label: 'Gyroids', command: () => push('/gyroids') },
			{ label: 'Paper', command: () => push('/paper') },
			{ label: 'Public Works', command: () => push('/projects') }
		]
	}
];
