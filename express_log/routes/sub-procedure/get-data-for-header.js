const Data = require("../../views/type/Data");
const config = require("../../config");

/* --- */

module.exports = async (
   out_data = new Data(),
   in_layout = "home", /* home | category */
   in_categoryId = "Infinity"
) => {
   if (in_layout == "home")
      await getHeaderForHome(out_data);
   else
      throw new Error("Unsupported layout");
};

/* --- */

const getHeaderForHome = async (
   out_data = new Data()
) => {
   out_data
      .set("heading", config.get("site-heading"))
      .set("description", config.get("site-description"));
};

