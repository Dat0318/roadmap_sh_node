const CategoryView = require("../../view/Category");
const Category = require("../../type/Category");

module.exports = async (
   out_selected = [],
   in_top = Infinity,
   in_order = "default", /* default | reversed */
   in_partial = Category.fieldNames
) => {
   try {
      /* --- Create view & index data */
      var view = new CategoryView();
      await CategoryView.indexData(view, in_order, in_partial)

      /* --- Loop & Collect record */
      for await (var record of view) {
         /* --- Limit the result set */
         if (out_selected.length == in_top)
            break /* out of the loop */;
         else
            out_selected.push(record);
      } // for ... of
   }
   catch (error) {
      throw error;
   }
}; // module.exports
