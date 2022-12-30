const express = require("express");
const router = express();

router.use("/api/accounts",require("./AccountRoutes"));
router.use("/api/paymentMethods",require("./PaymentMethodRoutes"));
router.use("/api/users", require("./UserRoutes"));
router.use("/api/origins", require("./OriginRoutes"));
router.use("/api/destinys", require("./DestinyRoutes"));

// teste route
router.get("/",(req,res) => {
    res.send("Api Rodando!");
});


module.exports = router;