import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import AdminBroMongoose from '@admin-bro/mongoose';
import patients from '../models/patients';
import doctors from '../models/doctors';
import consultations from '../models/consultation';
 import blogs from '../models/blog';
 import Videos from '../models/videos';

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro ({
    resources: [patients, doctors, consultations,blogs, Videos ],
    rootPath: '/admin',
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS,
    cookiePassword: 'a-sample-password',
});

export default router;

