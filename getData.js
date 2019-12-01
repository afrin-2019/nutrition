const express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/Productdatabase";
var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("Productdatabase");
  dbo.createCollection("Productcollection", function(err, res) {
    if (err) throw err;
  });
  app.post("/insert", (req, res) => {
    var get_request = req.body;
    var myDataString = new Date();
    var time = { datetime: myDataString };
    var status = { isdeleted: "NO" };
    var insert_details = Object.assign({}, get_request, time, status);

    dbo
      .collection("Productcollection")
      .insertOne(insert_details, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
      });

    res.send(req.body);
  });
  app.get("/User_Id", (req, res, next) => {
    dbo
      .collection("Productcollection")
      .find({ isdeleted: "NO" })
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send({ express: result });
      });
  });

  app.delete("/delete/product", (req, res) => {
    var get_request = req.body;
    var array_items = get_request["Product"];
    console.log(array_items);
    var get_objectvalue;
    array_items.forEach(element => {
      var get_objectvalue = element.Name;
      dbo
        .collection("Productcollection")
        .find({ Name: get_objectvalue })
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          var find_value = result[0]["Name"];
          if (get_objectvalue == find_value) {
            var key_field = { Name: get_objectvalue, isdeleted: "NO" };
            var need_to_change = { $set: { isdeleted: "YES" } };
            if ({ isdeleted: "NO" }) {
              dbo
                .collection("Productcollection")
                .updateMany(key_field, need_to_change, function(err, res) {
                  if (err) throw err;
                });
            }
          }
          console.log(get_objectvalue);
        });
    });
    res.send({ Message: "Deleted successfully" });
  });

  app.put("/update/product", (req, res) => {
    var update_details = req.body;
    var need_to_update = {
      $set: update_details.data,
      $currentDate: { datetime: true }
    };
    var key_field = { Name: update_details.data["Name"], isdeleted: "NO" };
    console.log(key_field, "---", need_to_update, "---", update_details);
    dbo
      .collection("Productcollection")
      .updateMany(key_field, need_to_update, function(err, res) {
        if (err) throw err;
        console.log("updated!");
        //db.close();
      });
    res.send({ Message: "Updated successfully" });
  });
});
app.listen(5001);
