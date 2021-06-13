import express from 'express'
 import path from 'path'
import checkAuthStatus from '../actions/checkLoginStatus'
const router = express.Router();


router.get('/', async (req:any, res: any) => {
 if(!req.query.token)
{
    return res.send({isError: true, message: "Internal Server Error"})
}
    req.headers.token = req.query.token

console.log(req.body)
var isLoggedIn = await checkAuthStatus.checkAuthStatus(req)
if(!isLoggedIn)     return res.send({isError: true, message: "Internal Server Error"})

if(req.body.role !== "doctor")     return res.send({isError: true, message: "Internal Server Error"})


     res.sendFile(path.join(__dirname, "../../src/client", "index.html"))

});

export default router;