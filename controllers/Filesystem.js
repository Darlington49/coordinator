const FilesystemGet = (req, res) => {
  Filesystem.findAll()
    .then((products) => {
      res.render("Filesystem/Filesystem", {
        prods: products,
        pageTitle: "All Products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};