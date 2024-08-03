import { Link, useLocation, useNavigate } from "react-router-dom";
import { store } from "../lib/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Container from "../ui/Container";
import Loader from "../ui/Loader";

const Success = () => {
  const { currentUser, resetCart, cartProduct } = store();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    } else if (cartProduct.length > 0) {
      const saveOrder = async () => {
        try {
          setLoading(true);
          if (currentUser?.email) {
            const orderRef = doc(db, "orders", currentUser.email!);
            const docSnap = await getDoc(orderRef);
            if (docSnap.exists()) {
              // documents exist, update the order items array
              await updateDoc(orderRef, {
                orders: arrayUnion({
                  userEmail: currentUser?.email,
                  paymentId: sessionId,
                  orderItems: cartProduct,
                  paymentMethod: "stripe",
                  userId: currentUser?.id,
                }),
              });
            } else {
              // document does't exist, create a new one
              await setDoc(orderRef, {
                orders: [
                  {
                    userEmail: currentUser?.email,
                    paymentId: sessionId,
                    orderItems: cartProduct,
                    paymentMethod: "stripe",
                    userId: currentUser?.id,
                  },
                ],
              });
            }
            toast.success("Payment accepted successfully & order saved!");
            resetCart();
          }
        } catch (error) {
          toast.error("Error saving order data!");
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      saveOrder();
    }
  }, [sessionId, navigate, currentUser, cartProduct, resetCart]);
  return (
    <Container>
      {loading && <Loader />}
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          {loading
            ? "Your order payment is processing"
            : "Your Payment Accepted by supergear.com"}
        </h2>
        <p>
          {loading ? "Once done" : "Now"} you can view your Orders or continue
          Shopping with us
        </p>
        <div className="flex items-center gap-x-5">
          <Link to={"/orders"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              View Orders
            </button>
          </Link>
          <Link to={"/"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Success;
