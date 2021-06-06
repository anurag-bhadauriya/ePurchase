export class User {
    userId; 
    firstName; 
    lastName;
    email; 
    dob; 
    phone;
    cartDetails;
    address;

    constructor( userId, firstName, lastName, email, dob, phone,
        cartDetails, address){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
        this.phone = phone;
        this.cartDetails = cartDetails;
        this.address = address;
    }
}