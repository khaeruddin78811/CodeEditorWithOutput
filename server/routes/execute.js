const express = require("express");
const ivm = require("isolated-vm");
const router = express.Router();

router.post("/", async (req, res) => {
  const isolate = new ivm.Isolate({ memoryLimit: 128 });
  const context = await isolate.createContext();
  const jail = context.global;
  const code = req.body.code;

  try {
    const result = await context.eval(code, { timeout: 5000 });
    res.json({ output: result });
  } catch (error) {
    res.json({ error: error.message });
  } finally {
    isolate.dispose();
  }
});

module.exports = router;
