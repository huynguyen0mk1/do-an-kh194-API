"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Order = function (order) {
  this.id = order.id;
};

Order.newOrder = (info, result) => {
  for (let i in info) {
    sql.query("INSERT INTO orders set ?", info[i], (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      }
    });
  }
  result(null, { status: true });
};
Order.deleteOrder = (info, result) => {
  sql.query(
    "DELETE FROM `orders` WHERE `id` LIKE  ?",
    info.concat("%"),
    (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      } else result(null, { status: true });
    }
  );
};
Order.updateOrder = (info, result) => {
  sql.query(
    "UPDATE `orders` SET `status`=? WHERE `id` LIKE  ?",
    [info.status, info.id.concat("%")],
    (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      } else result(null, { status: true });
    }
  );
};

Order.getDTOfSellerOnWEEK = (info, result) => {
  sql.query(
    "UPDATE `orders` SET `status`=? WHERE `id` LIKE  ?",
    [info.status, info.id.concat("%")],
    (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      } else result(null, { status: true });
    }
  );
};

Order.getSellerOrder = (info, result) => {
  sql.query(
    "SELECT `id`, `create_date`,  `name_shop`,code_shipping,  `name_category`,  `total`,  `status`, `status_ship`, `name_ship` FROM `allorder` WHERE `code` = ?  ORDER BY create_date DESC",
    [info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};

module.exports = Order;