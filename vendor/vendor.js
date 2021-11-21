const io = require("socket.io-client");
const host = "http://localhost:3030";
const vendorConection = io.connect(host);

vendorConection.emit("getAll");

vendorConection.on("takeOrder", (payload) => {
  console.log("i recived order from coutomer");
  setTimeout(() => {
    console.log(`i prepare your order : ${payload.orderId}`);
    vendorConection.emit("orderDone", payload);
  }, 2000);
});
