const express = require("express");

const app = express();

app.use(express.json());

// اجازه ارتباط سایت با سرور
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

const BOT_TOKEN = process.env.BOT_TOKEN;

// آیدی عددی خودت
const CHAT_ID = "2077635505";


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

        console.log("Telegram:", result);

        if (!result.ok) {

            return res.status(500).json({
                success: false,
                message: "Telegram error",
                telegram: result
            });
        }

        res.json({
            success: true,
            message: "سفارش با موفقیت به تلگرام ارسال شد"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "خطا در ارتباط با تلگرام"
        });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`NEXA VPN Server running on port ${PORT}`);
});
