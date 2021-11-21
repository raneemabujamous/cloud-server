const io = require("socket.io-client");
const host = "http://localhost:3030";
const coutmerConection = io.connect(host);
const faker = require("faker");

coutmerConection.on("coustomerRecivedOrder", (payload) => {
  console.log("i recive order thank you for your service");
  coutmerConection.emit("coustomerRecivedOrder", payload);

  coutmerConection.emit("sureResivedOrder", payload);
});

setInterval(() => {
  let request = {
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    company: faker.company.companyName(),
    vehicle: faker.vehicle.vehicle(),
    time: new Date().toLocaleString(),
  };

  console.log("i have new order ");
  coutmerConection.emit("openOrder", request);
}, 5000);
