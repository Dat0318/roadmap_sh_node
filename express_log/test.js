var selected = new Article();

await databaseManager.execute(
   selected.name,   /* kiểu bản ghi */
   "select-by-id",   /* tên thủ tục  */
   "0001",   /* tham số id   */
   selected   /* nhận kết quả */
);
