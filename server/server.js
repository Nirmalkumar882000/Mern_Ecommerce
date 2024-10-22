const express = require("express")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
const path = require("path")
require("dotenv").config()
const connectDB = require("./database/db")
const { specs, swaggerUi } = require('./helpers/swagger');
// routers
const authRouter = require("./routes/auth/auth-routes")
const productRoute = require("./routes/admin/product-route")
const AddressRoute = require("./routes/shop/address-router")
const featureRouter = require("./routes/common/feature-routes")
const cartRouter = require("./routes/shop/cart-routes")
const orderRouter = require("./routes/admin/order-routes")

// database connection
connectDB();
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors(
    {
        origin: "*",
        credentials: true
    }
))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// routes
app.use("/api/auth", authRouter);
app.use("/api/auth", productRoute);
app.use("/api/address", AddressRoute);
app.use("/api/address", featureRouter);
app.use("/api/address", cartRouter);
app.use("/api/address", orderRouter);





app.get("/", (req, res) => {
    res.send("Hello World")
})


//  server  listen for port
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})