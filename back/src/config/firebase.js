require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS 환경변수를 설정하세요.");
}

const serviceAccount = require(serviceAccountPath);

const initializeFirebaseApp = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return admin.auth();
  } catch (error) {
    process.exit(1);
  }
};

let auth;

const initPromise = initializeFirebaseApp().then((authInstance) => {
  auth = authInstance;
});

module.exports = {
  admin,
  getAuth: () => auth,
  initPromise,
};
