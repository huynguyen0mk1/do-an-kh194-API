"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var user = require("./loginModel");
var Shop = function (shop) {
  this.name = shop.name;
};

Shop.getAllWithUser = (info, result) => {
  sql.query(
    "SELECT id, name, name_category, is_activate, phone_number, address, create_date, code FROM sellershop WHERE code = ?",
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
Shop.getAllWithNameShop = (info, result) => {
  sql.query(
    "SELECT id, name, name_category, is_activate, phone_number, address, create_date, code FROM sellershop WHERE name = ?",
    [info.name],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
Shop.getAllWithUserAndShop = (info, result) => {
  sql.query(
    "SELECT `id`, `name`, `name_category`, `id_category`, `is_activate`, `phone_number`, `address`, `create_date`, `code`, `short_description`, `full_description`, image FROM sellershop WHERE id=? and code = ?",
    [info.id, info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, { status: true, data: res[0] });
      }
    }
  );
};
Shop.getAShop = (info, result) => {
  sql.query(
    "SELECT DISTINCT `id`, `name`, `name_category`, `id_category`, `phone_number`, `address`, `create_date`, `code`, `short_description`, `full_description`, image FROM sellershop WHERE id=?",
    [info.id],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        if (res.length > 0) result(null, { status: true, data: res[0] });
        else result(null, { status: false, data: {} });
      }
    }
  );
};
Shop.getAllShop = (info, result) => {
  sql.query(
    "SELECT id, name, id_user, name_user, id_category, name_category, is_activate, full_description, short_description, phone_number, address, create_date FROM allshop",

    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
Shop.updateStatusShop = (info, result) => {
  sql.query(
    "UPDATE `shops` SET is_activate = is_activate*(-1) WHERE id = ?",
    [info.id],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage });
      } else {
        result(null, { status: true });
      }
    }
  );
};
Shop.updateInfoShop = (info, result) => {
  sql.query(
    "UPDATE shops SET name=?,phone_number=?,address=?,short_description=?,full_description=?, image=? WHERE id=?",
    info,
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage });
      } else {
        result(null, { status: true });
      }
    }
  );
};

Shop.newShop = (info, result) => {
  user.getIdUser(info.id_user, (err1, data) => {
    if (err1) res.json({ data: data });
    else {
      sql.query(
        "INSERT INTO shops set ?",
        { ...info, id_user: data.data.id },
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage });
          } else {
            result(null, { status: true });
          }
        }
      );
    }
  });
};
Shop.newAShop = (info, result) => {
  sql.query("INSERT INTO shops set ?", info, (err, res) => {
    if (err) {
      result(err, { status: false, Message: err.sqlMessage });
    } else {
      result(null, { status: true });
    }
  });
};
module.exports = Shop;
