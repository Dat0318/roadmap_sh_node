const readAllRecordId = require("../procedure/sub-procedure/read-all-record-ids--async-throw");
const selectCategoryById = require("../procedure/Category/select-by-id--async-throw");
const Category = require("../type/Category");

const CategoryView = class {
   /* --- Index data into the view instance */
   static async indexData(
      out_instance = new CategoryView(),
      in_order = "default", /* default | reversed */
      in_partial = Category.fieldNames
   ) {
      /* --- Initialize allRecordIds */
      out_instance.allRecordIds = [];
      await readAllRecordId(Category.name, out_instance.allRecordIds);

      /* --- Order the id-list (if needed) */
      if (in_order == "default") { /* keep the order */; }
      else
         out_instance.allRecordIds.reverse();

      /* --- Initialize fieldNames */
      out_instance.fieldNames = in_partial;

      return CategoryView;
   }

   /* --- Provide iterator method */
   async *[Symbol.asyncIterator]() {
      for (var recordId of this.allRecordIds) {
         var selected = new Category();
         await selectCategoryById(recordId, selected, this.fieldNames);
         yield selected;
      } // for .. of
   }
}; // CategoryView

module.exports = CategoryView;
