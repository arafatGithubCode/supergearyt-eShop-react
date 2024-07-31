import { useEffect } from "react";
import { store } from "../lib/store";
import Container from "../ui/Container";
import Loader from "../ui/Loader";
import Registration from "../ui/Registration";
import UserInfo from "../ui/UserInfo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const Profile = () => {
  const { currentUser, isLoading, getUserInfo } = store();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (typeof user?.uid === "string") {
        getUserInfo(user?.uid);
      }
    });

    return () => {
      unSub();
    };
  }, [getUserInfo]);
  return (
    <Container>
      {currentUser ? <UserInfo currentUser={currentUser} /> : <Registration />}
      {isLoading && <Loader />}
    </Container>
  );
};

export default Profile;
