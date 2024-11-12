import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PayBill from './components/PayBill'
import Payment from './components/payment'

function App() {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderID, setOrderID] = useState(null);
    

    useEffect(() => {
      if (paymentSuccess && orderID) {
        console.log("Payment success");
      }
    }, [paymentSuccess, orderID]);



  return (
    <>
      <p>hello</p>
      <Payment // these inputs are mine for my case may you don't need this.
        firstname={"abc"} // give your details
        lastname={"bro"}
        email={"nnmjbr@gmail.com"}
        paymentTitle={"Payment for the order"} // title of the payment
        amount={"10011.00"} // amount
        sendUserId={"2222"} // who send money
        reciveUserID={"1111"} //who will recive
        setPaymentSuccess={setPaymentSuccess} //to do changes in implement page
        setOrderID={setOrderID}
      />
    </>
  );
}

export default App
