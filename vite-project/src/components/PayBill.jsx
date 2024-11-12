// import Payment from "../../../Payment/Payment";

import Payment from "./payment";

const PayBill = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    if (paymentSuccess && orderID) {
     // write your code
    }
  }, [paymentSuccess, orderID]);


  return (
    <Payment  // these inputs are mine for my case may you don't need this.
      firstname={"Nipun"}  // give your details
      lastname={"Madhushan"}
      email={"nipun2001@gmail.com"}
      paymentTitle={"Payment for the order"} // title of the payment
      amount={"1000"} // amount
      sendUserId={"2222"} // who send money
      reciveUserID={null} //who will recive
      setPaymentSuccess={setPaymentSuccess} //to do changes in implement page
      setOrderID={setOrderID}
    />
  );
  // ... (other code)
};
export default PayBill