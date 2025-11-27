import * as catalogService from '../services/catalogService.js';
export const searchCatalog = async (req, res) => {
  try {
    const { searchTerm, categoryIds, pagingOptions } = req.body;
    const result = await catalogService.searchCatalog(searchTerm, categoryIds, pagingOptions?.limit, pagingOptions?.offset);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const getProductDetails = async (req, res) => {
  try {
    const result = await catalogService.getProductDetails(req.query.productId);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};