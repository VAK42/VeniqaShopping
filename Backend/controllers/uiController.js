import * as uiService from '../services/uiService.js';
export const getFeaturedSection = async (req, res) => {
  try {
    const result = await uiService.getFeaturedSection(req.query.name);
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
export const getProductCategoryList = async (req, res) => {
  try {
    const result = await uiService.getProductCategoryList();
    res.status(200).json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
};