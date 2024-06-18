class TokenService {
    saveToken(token:string) {
      localStorage.setItem('accessToken', token);
    }
  
    saveRefreshToken(token:string) {
      localStorage.setItem('refreshToken', token);
    }
  
    getToken() {
      return localStorage.getItem('accessToken');
    }
  
    getRefreshToken() {
      return localStorage.getItem('refreshToken');
    }
  
    signOut() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
  
  const authTokenInstance = new TokenService();
  
  export default authTokenInstance;