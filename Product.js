const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    desc: String,
    banner: String,
    category: String,
    subcategory: String,
    unit: Number,
    regular_price: Number,
    store: String,
    highlight: String,
    weight: Number,
    brand: String,
    price: Number,
    available: Boolean
});

module.exports =  mongoose.model('product', ProductSchema);


const { ProductModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");

//Dealing with data base operations
class ProductRepository {
  async CreateProduct({
    name,
    desc,
    banner,
    category,
    subcategory,
    unit,
    regular_price,
    store,
    highlight,
    weight,
    brand,
    price,
    available,
  }) {
    try {
      const product = new ProductModel({
        name,
        desc,
        banner,
        category,
        subcategory,
        unit,
        regular_price,
        store,
        highlight,
        weight,
        brand,
        price,
        available,
      });

      const productResult = await product.save();
      return productResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  async Products() {
    try {
      return await ProductModel.find();
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Products"
      );
    }
  }

  async FindById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }

  async FindByCategory(category) {
    try {
      const products = await ProductModel.find({ category: category });
      return products;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }

  async FindSelectedProducts(selectedIds) {
    try {
      const products = await ProductModel.find()
        .where("_id")
        .in(selectedIds.map((_id) => _id))
        .exec();
      return products;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }
}

module.exports = ProductRepository;
