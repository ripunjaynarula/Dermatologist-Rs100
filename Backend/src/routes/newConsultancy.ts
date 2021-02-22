import express from 'express'

const router = express.Router();

router.post('/', async (req:any, res: any) => {
    return res.send('ok')
});

export default router;