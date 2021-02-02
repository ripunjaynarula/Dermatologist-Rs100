import bcrypt from 'bcrypt';

async function hashPassword(pass: string) {
  const hash = await bcrypt.hash(pass, 8);
  return hash;
}
  
export default hashPassword;