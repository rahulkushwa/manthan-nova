const { setGlobalOptions } = require("firebase-functions");
const {
  onCall,
  HttpsError,
} = require("firebase-functions/v2/https");

const {
  getAuth,
} = require("firebase-admin/auth");

const {
  getFirestore,
} = require("firebase-admin/firestore");

const {
  initializeApp,
} = require("firebase-admin/app");

setGlobalOptions({
  maxInstances: 10,
});

initializeApp();

const db = getFirestore();

/**
 * Deletes a student's:
 *
 * 1. Firebase Authentication account
 * 2. users/{uid} Firestore document
 *
 * The students/{studentId} document is deleted
 * by the frontend after this function succeeds.
 *
 * Only users with role === "admin" can perform this action.
 */
exports.deleteStudentAccount = onCall(
  async (request) => {
    // Check authentication
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to perform this action."
      );
    }

    const adminUid = request.auth.uid;

    // Check current user's role
    const adminSnapshot = await db
      .collection("users")
      .doc(adminUid)
      .get();

    if (!adminSnapshot.exists) {
      throw new HttpsError(
        "permission-denied",
        "Admin profile not found."
      );
    }

    const adminData = adminSnapshot.data();

    if (adminData.role !== "admin") {
      throw new HttpsError(
        "permission-denied",
        "Only administrators can delete student accounts."
      );
    }

    // Get student UID
    const { uid } = request.data || {};

    if (!uid) {
      throw new HttpsError(
        "invalid-argument",
        "Student UID is required."
      );
    }

    // Prevent accidental deletion of the currently
    // authenticated admin account.
    if (uid === adminUid) {
      throw new HttpsError(
        "failed-precondition",
        "You cannot delete your own account."
      );
    }

    try {
      // ==========================================
      // 1. Delete Firebase Authentication account
      // ==========================================

      try {
        await getAuth().deleteUser(uid);
      } catch (error) {
        if (error.code !== "auth/user-not-found") {
          throw error;
        }
      }

      // ==========================================
      // 2. Delete users/{uid}
      // ==========================================

      await db
        .collection("users")
        .doc(uid)
        .delete();

      return {
        success: true,
        message:
          "Student authentication account and user profile deleted successfully.",
      };
    } catch (error) {
      console.error(
        "Failed to delete student account:",
        error
      );

      throw new HttpsError(
        "internal",
        "Failed to delete student account."
      );
    }
  }
);