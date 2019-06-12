const admin = require('firebase-admin');
	const functions = require('firebase-functions');
	
	
	// TO OBTAIN SERVICE ACCOUNT KEY go to our Firestore App > Project Settings > Service Accounts
	// Click GENERATE NEW KEY. Save this to your disk and add the file location  to the below variable
	var serviceAccount = require("/Users/kingj/OneDrive/Documents/North Seattle/AD410_Web_App_Practicum/friendsofnoise-2ced6-firebase-adminsdk-pih7o-8eaac3cb45.json");
	
	
	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: "https://friendsofnoise-2ced6.firebaseio.com"
	});

let db = admin.firestore();