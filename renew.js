console.log("renew.js works")
// https://www.thrdzz.com/renew/?name=value1&lastName=value2&email=test@gmail.com

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value of a specific parameter
    const firstName = urlParams.get('name');
    const lastName = urlParams.get('lastName');
    const email = urlParams.get('email');
    const userId = urlParams.get('_id');
    
    // Get the reference to the input element
    const firstNameRef = document.getElementById('fname');
    const lastNameRef = document.getElementById('lname');
    const emailRef = document.getElementById('email');
    
    // Set the value of the input field
    firstNameRef.value = firstName;
    lastNameRef.value = lastName;
    emailRef.value = email;
    
    // disable all input boxes to prevent editing
    firstNameRef.disabled = true
    lastNameRef.disabled = true
    emailRef.disabled = true
    
    updateUserRenewDate(userId);
});


// TO UPDATE RENEW DAT ONTO DATABASE 
function updateUserRenewDate(userId){
    const data = {
        'renew Date' : 'fort'
    };
    const url = `https://thrdzzz.bubbleapps.io/version-test/api/1.1/obj/license/${userId}`;

    const otherparaam = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer 9d6b76b4ac1c064e264efa87b2bf398a",
        },
        body: JSON.stringify(data),
        method: "PATCH",
    };
    fetch(url, otherparaam)
        .then((response) => response.json()) // convert to json
        .then((json) => {

            if (json.status == "success") {
                alert(
                    "Awesome! You are all set for another year of Thrdzz Pro! \n Thank you and enjoy!"
                );
            }else{
                alert("Something went wrong please contact Admin!")
            }

        }) //print data to console
        .catch((err) => console.log("Request Failed", err)); // Catch errors
}

// TO START THE PAYMENT 
function initPayPalButton() {
    paypal
        .Buttons({
            style: {
                shape: "rect",
                color: "blue",
                layout: "vertical",
                label: "checkout",
            },

            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: "Thrdzz Pro",
                            amount: { currency_code: "USD", value: 0.1 },
                        },
                    ],
                });
            },

            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    updateUserRenewDate();
                    alert(
                        "Transaction completed by " + details.payer.name.given_name + "!"
                    );
                });
            },

            onError: function (err) {
                console.log(err);
            },
        })
        .render("#paypal-button-container");
}
