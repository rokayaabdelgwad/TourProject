import axios from "axios";
import { showAlert } from "./alerts";
const { default: Stripe } = require("stripe");

const stripe = Stripe(
  "pk_test_51N5EAPH3inU9i4F6Umqcx9qlQPzwegnHFIyATyWuVGvdTBNi2iVFyPvmsrIcfdnYK0iJDcrgkq8QpF0TKGVVC0Oh00E3kr9OOb"
);

export const bookTour = async (tourID) => {
  try{

    // 1) Get checkout session from API
    const session = await axios(
      `https://127.0.0.1:3001/api/v1/bookings/checkout-session/${tourID}`
    );
    
    // 2) Create checkout  form + charge credit card
  await stripe.redirectToCheckout({
    sessionId:session.data.id
  })
  
}catch(err){
    
    showAlert('error',err)
  }


};
