import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { User } from "../../types/auth.types";

class AuthService {
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return this.formatUser(userCredential.user);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, (firebaseUser) => {
      callback(firebaseUser ? this.formatUser(firebaseUser) : null);
    });
  }

  private formatUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      name: firebaseUser.displayName || "Admin",
      role: "admin"
    };
  }

  private handleAuthError(error: any): Error {
    const errorMessages: Record<string, string> = {
      'auth/invalid-credential': "Identifiants incorrects",
      'auth/too-many-requests': "Trop de tentatives, veuillez réessayer plus tard",
      'auth/user-not-found': "Utilisateur non trouvé",
      'auth/wrong-password': "Mot de passe incorrect"
    };

    return new Error(errorMessages[error.code] || "Erreur d'authentification");
  }
}

export const authService = new AuthService();