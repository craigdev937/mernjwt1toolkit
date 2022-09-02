import "dotenv/config";
import express from "express";

(async () => {
    const app = express();

    app.get("/", (req, res) => res.json({
        hello: "world!"
    }));

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();



