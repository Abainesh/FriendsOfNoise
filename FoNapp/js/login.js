function loginalerts() {
    var message;
    var username = document.forms["login"]["username"];
    var password = document.forms["login"]["password"];
    
    if (username!="" && password!="")) {
        message = "Welcome" + username;
    } else if(username == "") {
        message = "Please enter a valid username";
    } else if(password == ""){
        message = "Please enter a valid password";
    }
    
    alert(message);
    
}