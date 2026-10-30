export class AuthService {
  validateSession(token: string) {
    return { valid: true, userId: "usr-mohamed" };
  }
}
