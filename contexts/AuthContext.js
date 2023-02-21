import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  //   const register = async (name, email, password) => {
  //     try {
  //       const res = await createUserWithEmailAndPassword(auth, email, password);
  //       const user = res.user;
  //       //axios post to the backend with body containing user.uid and name
  //       const res2 = await axios.post("http://192.168.170.179:5000/members/", {
  //         memberID: user.uid,
  //         name: name,
  //         email: email,
  //         gymOwner: "hzaaU5hcJMgOMbPdDWdUzxn37zU2",
  //         membershipType: "",
  //         admin: false,
  //       });
  //       console.log(res2);
  //     } catch (err) {
  //       console.error(err);
  //       alert(err.message);
  //     }
  //   };

  //   const login = async (email, password) => {
  //     try {
  //       const res = await signInWithEmailAndPassword(auth, email, password);
  //       const res3 = await axios.get("http://192.168.170.179:5000");
  //       console.log(res3.data);
  //       console.log(res.user.uid);
  //     } catch (err) {
  //       console.error(err);
  //       alert(err.message);
  //     }
  //   };

  //   const logout = () => {
  //     signOut(auth);
  //   };

  // onAuthStateChanged(auth, (user) => {
  //   setCurrentUser(user);
  //   setLoading(false);
  // });

  const value = {
    currentUser,
    setCurrentUser,
    admin,
    loading,
    setLoading,
    setAdmin,
    // login,
    // register,
    // logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
