const Category = class extends Map {
  constructor(...params) {
    super(...params);

    for (var key of Category.fieldNames) {
      if (this.has(key)) { /* do nothing */; }
      else
        this.set(key, null);
    } // for .. of

    return this;
  }

  static fieldNames = [
    "@id",
    "name",
    "keywords",
    "content"
  ];

  static clone(
    in_source = new Category(),
    out_target = new Category()
  ) {
    for (var entry of in_source) {
      var [key, value] = entry;
      out_target.set(key, value);
    }

    return Category;
  }

  static populateHeaderJSON(
    in_source = new Category(),
    out_headerJSON = new Object()
  ) {
    for (var entry of in_source) {
      var [key, value] = entry;

      if (key == "content") { /* don't take content */; }
      else
        out_headerJSON[key] = value;
    } // for .. of

    return Category;
  }
}; // Category

module.exports = Category;
