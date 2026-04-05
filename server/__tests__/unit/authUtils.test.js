process.env.JWT_SECRET = 'unit-test-secret';

const {
  signToken,
  verifyToken,
  hashPassword,
  comparePassword,
} = require('../../utils/authUtils');

describe('authUtils', () => {
  describe('JWT', () => {
    it('signs and verifies token payload', () => {
      const token = signToken({ userId: 'u1', role: 'user' });
      expect(typeof token).toBe('string');
      const decoded = verifyToken(token);
      expect(decoded.userId).toBe('u1');
      expect(decoded.role).toBe('user');
    });

    it('throws on invalid token', () => {
      expect(() => verifyToken('not-a-jwt')).toThrow();
    });
  });

  describe('bcrypt', () => {
    it('hashes and compares password', async () => {
      const hash = await hashPassword('myPassword123');
      expect(hash).not.toBe('myPassword123');
      const ok = await comparePassword('myPassword123', hash);
      expect(ok).toBe(true);
      const bad = await comparePassword('wrong', hash);
      expect(bad).toBe(false);
    });
  });
});
