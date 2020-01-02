export const getUserLoggedInStatus = (state) => state.user.isLoggedIn;
export const getUserData = (state) => ({
	Name: state.user.Name,
	TownName: state.user.TownName,
	GoogleId: state.user.GoogleId,
	...state.user.NewLeaf
});
export const getUserVillagers = (state) => state.user.NewLeaf.Villagers;
export const getUserDonations = (state) => state.user.NewLeaf.Museum;
export const getUserFurniture = (state) => state.user.NewLeaf.Catalogue.Furniture;
export const getUserClothing = (state) => state.user.NewLeaf.Catalogue.Clothing;
export const getUserCatalog = (state) => state.user.NewLeaf.Catalogue;

export const getUserFurnitureByType = (type) => (state) => state.user.NewLeaf.Catalogue.Furniture[type];
