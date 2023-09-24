const CategoryService = require("../services/category-service");
const UserAuth = require("./middlewares/auth");
const { createRegex } = require("../utils/regex");

module.exports = (app) => {
  const service = new CategoryService();

  app.post("/category/create", async (req, res, next) => {
    try {
      const { CategoryName, CategoryImage, subcategory } = req.body; 

      const { data } = await service.CreateCategory({
        CategoryName,
        CategoryImage,
        subcategory,
      });

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/categories", async (req, res, next) => {
    try {
      const { data } = await service.GetCategories();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/:id", async (req, res, next) => {
    const categoryId = req.params.id;

    try {
      const { data } = await service.GetCategoryById(categoryId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/search", async (req, res, next) => {
    const searchValue = req.query.q;
    const searchRegex = createRegex(searchValue);

    try {
      const { data } = await service.SearchCategories(searchRegex);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/category/update/:id", async (req, res, next) => {
    const categoryId = req.params.id;
    const updatedData = req.body; // Modify this to match your category update input fields

    try {
      const { data } = await service.UpdateCategory(categoryId, updatedData);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/category/:id", async (req, res, next) => {
    const categoryId = req.params.id;

    try {
      const { data } = await service.DeleteCategory(categoryId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
