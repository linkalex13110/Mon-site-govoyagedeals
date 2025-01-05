import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { LoginCredentials, User } from "../types/auth.types";

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      
      // Vérifier si l'utilisateur est un admin
      const adminEmails = ['alexegea7@gmail.com'];
      if (!adminEmails.includes(userCredential.user.email || '')) {
        throw new Error("Accès non autorisé");
      }

      return {
        id: userCredential.user.uid,
        email: userCredential.user.email || "",
        name: userCredential.user.displayName || "Admin",
        role: "admin"
      };
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        throw new Error("Identifiants incorrects");
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error("Trop de tentatives, veuillez réessayer plus tard");
      }
      throw new Error(error.message || "Erreur de connexion");
    }
  }

  async logout() {
    await signOut(auth);
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || "Admin",
          role: "admin"
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  }
}

export const authService = new AuthService();