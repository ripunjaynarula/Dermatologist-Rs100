import doctors from '../models/doctors';
import hashPassword from '../actions/hash';

const checkDocAuth = async (req:any, res:any, next:any) => {
    const doc: any = await doctors.findOne({email: req.body.email});
    const hash: string = await  hashPassword(req.body.email+doc.uid);
    if (hash === req.session.token) {
        next();
        return;
    }
    return res.send({status:'not_logged_in'});
}

export default checkDocAuth;