// configuring the initial state
let AccountFormState={
  customerName:'',
  customerEmail:'',
  customerPassword:''
};


// creating the AccountFormReducer function
const AccountFormReducer=(state=AccountFormState,action)=>{
  switch(action.type){
    case 'CUSTOMER_NAME':
    return {
      ...state,
      customerName:action.text
    };
    case 'CUSTOMER_EMAIL':
    return {
      ...state,
      customerEmail:action.text
    };
    case 'CUSTOMER_PASSWORD':
    return {
      ...state,
      customerPassword:action.text
    };
    default: return {...state};
  }
}


// exporting the function
export default AccountFormReducer;
