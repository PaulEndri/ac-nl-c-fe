export const getUserLoggedInStatus = (state) => state.user.isLoggedIn;
export const getUserEmail = (state) => state.user.Email;
export const getUserGoogleId = (state) => state.user.GoogleId;
export const getUserCore = (state) => ({
	Name: state.user.Name,
	TownName: state.user.NewLeaf.TownName,
	Email: state.user.Email
});

export const getUserData = (state) => state.user;
export const getUserVillagers = (state) => state.user.NewLeaf.Villagers;
export const getUserDonations = (state) => state.user.NewLeaf.Museum;
export const getUserFurniture = (type) => (state) =>
	((state.user.NewLeaf.Catalogued || {}).Furniture || {})[type] || [];
export const getUserClothing = (state) => (state.user.NewLeaf.Catalogued || {}).Clothing || [];
export const getUserCatalog = (state) => state.user.NewLeaf.Catalogued;

export const getUserCatalogByType = (type) => (state) => (state.user.NewLeaf.Catalogued || {})[type] || [];
export const getUserFurnitureByType = (type) => (state) => state.user.NewLeaf.Catalogue.Furniture[type];
export const getUserDonationsByType = (type) => (state) => (state.user.NewLeaf.Museum || {})[type] || [];

export const getUserFossils = (state) => (state.user.NewLeaf.Museum ? state.user.NewLeaf.Museum.Fossils : []);
export const getUserArt = (state) => (state.user.NewLeaf.Museum ? state.user.NewLeaf.Museum.Art : []);
