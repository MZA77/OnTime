import * as AuthSession from 'expo-auth-session';

const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true, // Ensures compatibility with Expo
});
console.log("Redirect URI:", redirectUri);
