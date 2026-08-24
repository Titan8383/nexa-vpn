const express = require("express");

const app = express();

app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;

// آیدی عددی تلگرام خودت را بعداً اینجا قرار می‌دهیم
const CHAT_ID = "YOUR_CHAT_ID";


app.get("/", (req, res) => {
    res.send("NEXA VPN Server is Online 🚀");
});


app.post("/order", async (req, res) => {

    const { name, phone, plan, price } = req.body;

    if (!name || !phone || !plan || !price) {

        return res.status(400).json({
            success: false,
            message: "اطلاعات سفارش ناقص است"
        });

    }


    const message =
        "🛒 سفارش جدید NEXA VPN\n\n" +

        "👤 نام: " + name + "\n" +

        "📱 موبایل: " + phone + "\n" +

        "📦 سرویس: " + plan + "\n" +

        "💰 قیمت: " + price;


    try {

        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            }
        );


        const result = await response.json();


        if (!result.ok) {

            console.log(result);

            return res.status(500).json({
                success: false,
                message: "ارسال به تلگرام انجام نشد"
            });

        }


        res.json({
            success: true,
            message: "سفارش با موفقیت ارسال شد"
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "خطا در ارتباط با تلگرام"
        });

    }

});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `NEXA VPN Server running on port ${PORT}`
    );

});
