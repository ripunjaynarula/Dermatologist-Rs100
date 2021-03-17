import doctors from '../models/doctors';
import bcrypt from 'bcrypt'

const checkDocAuth = async (req:any, res:any, next:any) => {
    const doc: any = await doctors.findOne({email: req.body.email});
    if (doc) {
        const check = await bcrypt.compare((req.body.email+doc.uid), doc.token)
        if (check) {
            next();
            return;
        }
    }
    return res.send({status:'not_logged_in'});
}

export default checkDocAuth;