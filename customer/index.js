const express = require('express');
const app = express();
app.use(express.json());
const port = 8001;

app.use('/' , (req,res,next) => {
 return res.status(200).json({'message' : "hello from customer"});
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
