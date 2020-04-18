import * as express from 'express';
import { AuthService } from './services/auth.service';

export const expressAuthentication = async (
  request: express.Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> => {
  const auth = new AuthService();
  switch (securityName) {
    case 'login':
      // ログイン処理
      const loginResult: any = await auth.login(request);
      if (loginResult.authenticated) {
        return loginResult.payload;
      }
      // ログインエラー
      throw loginResult.payload;

    case 'auth':
      // ログインチェック処理
      const checkResult: any = await auth.isLogin(request);
      if (checkResult.authenticated) {
        return checkResult.payload;
      }
      // 未ログイン
      throw checkResult.payload;
  }
  throw Promise.reject({});
};
