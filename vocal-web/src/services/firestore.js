import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const alreadyCreatedApp = getApps()

let app =
  alreadyCreatedApp.length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey:process.env.FIREBASE_PRIVATE_KEY 
        }),
      })
    : alreadyCreatedApp[0]

export const firestore = getFirestore(app)
