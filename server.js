const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("NEXA VPN Server is Online 🚀");
});

app.post("/order", (req, res) => {

    const { name, phone, plan, price } = req.body;

    console.log("New Order:");
    console.log({
        name,
        phone,
        plan,
        price
    });

    res.json({
        success: true,
        message: "سفارش دریافت شد"
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
