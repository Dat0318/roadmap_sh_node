   /* --- Dispatch an event when user finishes reading */

$(window).on("scroll", function(event) {
   window.bottomEdgePosition = window.scrollY + window.innerHeight;

   if (window.bottomEdgePosition != document.body.offsetHeight)
      { /* do nothing */; }
   else
      $("#main").trigger("user-finishes-reading");
}); // #main

   /* --- Load the previous articles from server */

$("#main").on("user-finishes-reading", function(event) {
   var top = 10;
   var order = "reversed";
   var offset = [...$("#main .entry")].length + 1;
   var url = `/api/article/select?top=${top}&order=${order}&offset=${offset}`;

   jQuery.get(url, renderEntry);
}); // #main

   /* --- Render more .entry components */

const renderEntry = function(articleList = []) {
   console.log(articleList);   // for testing
   articleList.forEach(function(article) {
      var entryElement = jQuery(`
         <section class="entry">
            <h2> ${article["title"]} </h2>
            <p> ${article["content"].slice(0, 321)} </p>
            <a href="/article/view/${article["@id"]}"> Đọc tiếp </a>
         </section>
      `);

      $("#main .container").append(entryElement);
   }); // articleList.forEach
}; // renderEntry
