function createTransaction() {
	$.ajax({
    type: 'get',
    url: '/api/createpayment',
    success: function (data) {
		if (data == "OK")
        	alert("Payment service succeeded!");
		else
        	alert("Payment service failed!");
    }});
}