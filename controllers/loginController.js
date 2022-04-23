"use strict";
var login = require("../models/loginModel");
exports.saveUser = (req, res) => {
  console.log(req.body.user);
  if (req.body.key === "111111111") {
    login.checkUser(req.body.user, (err, result) => {
      if (err) res.json({ data: result });
      else {
        if (result.data.length > 0)
          res.json({
            data: { status: false, Message: err.sqlMessage, data: [] },
          });
        else
          login.saveUser(req.body.user, (err1, resultA) => {
            if (err1) res.json({ data: resultA });
            else res.json({ data: resultA });
          });
      }
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getAllUser = (req, res) => {
  if (req.body.key === "111111111") {
    login.getAllUser((err, result) => {
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getUser = (req, res) => {
  if (req.body.key === "111111111") {
    // console.log(req.body.user);
    login.checkUser(req.body.user, (err, result) => {
      if (err) res.json({ data: result, note: "User Name is Incorrect" });
      else {
        if (result.data.length !== 1)
          res.json({
            data: { status: false, data: [] },
            note: "User Name is Incorrect",
          });
        else {
          //console.log(req.body.user);
          login.getUser(req.body.user, (err, resultA) => {
            if (err)
              res.json({
                status: false,
                Message: err.sqlMessage,
                data: resultA,
                note: "Password is Incorrect",
              });
            else
              res.json({
                data: resultA,
                note: "Password is Incorrect",
              });
          });
        }
      }
    });
  } else
    res.json({
      data: { status: false, data: {} },
      note: "User Name is Incorrect",
    });
};
exports.getRole = (req, res) => {
  //console.log(req.body.user);
  if (req.body.key === "111111111") {
    login.getRole(req.body.user, (err, result) => {
      if (err) res.json({ data: result,Message: err.sqlMessage, note: "User Name is Incorrect" });
      else {
        if (result.data.length !== 1)
          res.json({
            data: { status: false,  data: [] },
            note: "User Name is Incorrect",
          });
        else {
          res.json({
            data: { status: true, data: result.data[0] },
            note: "Password is Incorrect",
          });
        }
      }
    });
  } else
    res.json({
      data: { status: false, data: {} },
      note: "User Name is Incorrect",
    });
};
