"use strict";
const supportCenter = require("socket.io")(3030);
const msgQueue = {
  openOrder: {},
  finishOrder: {},
};
supportCenter.on("connection", (socket) => {
  socket.on("openOrder", (payload) => {
    msgQueue.openOrder[payload.orderId] = payload;
    console.log({
      event: "open oder",
      payload: payload.orderId,
    });
    supportCenter.emit("takeOrder", payload);
  });
  socket.on("orderDone", (payload) => {
    console.log("wait for procssing order ");
    delete msgQueue.openOrder[payload.orderId];
    console.log("delete order from msgQueue");
    supportCenter.emit("coustomerRecivedOrder", payload);
  });
  socket.on("coustomerRecivedOrder", (payload) => {
    msgQueue.finishOrder[payload.orderId] = payload;
    console.log({
      event: "finish oder",
      payload: payload.orderId,
    });
  });

  socket.on("sureResivedOrder", (payload) => {
    console.log("for sure coustmer resived order");
    Object.keys(msgQueue.finishOrder).forEach((order) => {
      console.log(
        `${msgQueue.finishOrder[order].orderId} ${msgQueue.finishOrder[order].company}`
      );
    });
  });
  socket.on("getAll", () => {
    console.log("these are all open order");
    Object.keys(msgQueue.openOrder).forEach((order) => {
      socket.emit("takeOrder", msgQueue.openOrder[order]);
    });
  });
});
