const path = require('path');
const express = require("express");
const sequelize = require("./util/database");
const bodyParser = require("body-parser");


//Import MODELS
const ProductTypes = require("./models/ProductTypes");
const Firmware = require("./models/Firmware");
const Filesystem = require("./models/Filesystem");
const FlashingRequest = require("./models/FlashingRequest");
const ControllerLog = require("./models/ControllerLog");

//IMPORT ROUTERS
const ProductTypesRoute = require("./routes/ProductTypes");
const flashingAPI_rout = require("./routes/flashingAPI");
const Firmware_route = require("./routes/Firmware");
const Filesystem_route = require("./routes/Filesystem");
const FlashingRequest_route = require("./routes/FlashingRequest");
const ControllerLog_route = require("./routes/ControllerLog");
//const flash = require("./routes/flash");
const file_route = require("./routes/file");
const errorController = require("./controllers/error");

var app = express();

//Public Folder
app.use(express.static(path.join(__dirname, 'public')));


app.set("views", "./Views");
app.set("view engine", "ejs");

ProductTypes.belongsTo(Firmware);
ProductTypes.belongsTo(Filesystem);

FlashingRequest.belongsTo(ProductTypes);
ProductTypes.hasMany(FlashingRequest);

ControllerLog.belongsTo(FlashingRequest);
FlashingRequest.hasMany(ControllerLog);
//app.use(express.urlencoded({extended: true, }));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// GET method route
app.get("/", function (req, res) {
  //res.send("GET request to the homepage");
/*  ProductTypes.create({
    ProductName: "test2",
  });

  Firmware.create({
    Version: "test2",
    RepositoryURL : "link1"
  });

  Filesystem.create({
    Version: "test2",
    RepositoryURL : "link2"

  });
*/
 /* ProductTypes.findAll({
    where: {
      id: 1,
    },
  })
    .then((product) => {
      console.log(product[0]);
      product[0].createFlashingRequest({ ProductMacAdress: "123456" });
    })
    .catch((err) => {
      console.log(err);
    });
    res.render("home", {
      //items: items,
      pageTitle: "Home",
    });*/

    res.render("home", {
      //items: items,
      pageTitle: "Home",
    });
});

// POST method route
app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});

app.post("/submit-form", (req, res) => {
  console.log(req.body);
  ProductTypeId = req.body.ProductTypes;
  ProductTypes.findAll({
    where: {
      id: ProductTypeId,
    },
  })
    .then((product) => {
      console.log(product[0].dataValues);
      FirmwareId = product[0].dataValues.FirmwareId;
      console.log(FirmwareId);
      Firmware.findAll({
        where: {
          id: FirmwareId,
        },
      })
        .then((firmware) => {
          console.log(firmware[0].dataValues);
          // FirmwareLink = firmware[0].dataValues.FirmwareLink;
          // console.log(FirmwareId);

          res.send(product.FirmwareId);
        })
        .catch((err) => console.log(err));
      //res.send(product.FirmwareId);
    })
    .catch((err) => console.log(err));
  res.end();
});

sequelize
  // .sync({ force: true })
  .sync() //{force : true}
  .then((result) => {
    app.listen(3002);
    // console.log("srv");
  })
  .catch((err) => {
    console.log(err);
  });

// blog routes
app.use("/ProductTypes", ProductTypesRoute);
app.use("/flashingAPI", flashingAPI_rout);
app.use("/firmware", Firmware_route);
app.use("/filesystem", Filesystem_route);
app.use("/FlashingRequest", FlashingRequest_route);
app.use("/ControllerLog", ControllerLog_route);
app.use("/file", file_route);




//app.use("/flash", flash);
//app.use("/flash", flash);
app.use(errorController.get404);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
