import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

// GENERATED KEY
// BLJUrc1ZF3ksismi-KvS4P_82yScJwvJPJoT3qzHOOXJ8FmxcOYuHliFReJ3jjCurhRRoqY9e5Qk4k95kun9HPY

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  init: async function() {
    firebase.initializeApp({
      messagingSenderId: "665999612795"
    });
     console.log('firebase initing...')
    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false;
      }
      // get permission for notification
      // get token

      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();

      localforage.setItem("fcm_token", token);
      console.log("fcm_token", token);
    } catch (error) {
      // USER DENIAL PUSH MESSAGE PERMISSION
      console.error(error);
    }
  }
};

export { firebaseCloudMessaging };
