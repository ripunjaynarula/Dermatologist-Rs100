import { Request, Response } from 'express';
import express from 'express';
import consultations from '../models/consultation';
import chats from '../models/chat';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const consultation: any = await consultations.findOne({uid: req.body.id});
    if ( Date.now() - consultation.time > 4000 ){
        return res.send({success: false, message: 'time limit exceeded'});
    }

    
})