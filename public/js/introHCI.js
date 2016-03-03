'use strict';
var tempForm;
var selectedCourse;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 function initializePage() {
	//$('.project a').click(addProjectDetails);
	//$('#loginBtn').click(login);
	$('#toggleClick').click(toggleSignup);
	//$('#instructorActionBtn').click(checkSelectedCourse);
	$('.proPic').error(invalidImageError);

}



function invalidImageError(e)
{
	alert('Image URL invalid.');	
	$.post('/changeProfilePicture', {profilePictureURL: "/images/user.png"});
	window.location.reload();
}

function changeProfilePicture(e)
{
	var proPic = prompt("Enter URL of new image:", "");
	$.post('/changeProfilePicture', {profilePictureURL: proPic});
	window.location.reload();
}


function updateSelectedCourse(e)
{
	window.selectedCourse=e.courseDropdown.value;
	if (window.selectedCourse==-1)
	{
		alert("Please select a course.");
		selectedCourse="";
		return false;
	}
	return true;
}

function selectAction(e)
{
	$.post('/selectAction', {action: e});
}

/*
function checkSelectedCourse(e)
{
	$.get('/getSelectedCourse', checkCourse);
}


function checkCourse(result)
{
	var selectedCourse=result;
	if (selectedCourse=="" || selectedCourse==-1 || selectedCourse==undefined)
	{
		alert("Please select a course first.");
		return false;
	}
	return true;
}*/

function checkQuestions(form)
{
	if(form.question.value == "")
	{
		alert("Error: Question cannot be blank!");
		form.question.focus();
		return false;
	}
	if(form.choiceA.value == "")
	{
		alert("Error: Answer choice A cannot be blank!");
		form.choiceA.focus();
		return false;
	}
	if(form.choiceB.value == "")
	{
		alert("Error: Answer choice B cannot be blank!");
		form.choiceB.focus();
		return false;
	}
	return true;
}

function submitAnswer(form)
{
	var answer=form.studentAnswer.value;
	alert(answer);
	$.post('/getCorrectAnswer', {studentAnswer: answer}, checkAnswer);

}

function checkAnswer(result)
{
	alert(result);
}


function checkSignup(form)
{

	if(form.userType.value == "") {
		alert("Error: User type cannot be blank!");
		form.userType.focus();
		return false;
	}

	if(form.name.value == "") {
		alert("Error: Name cannot be blank!");
		form.name.focus();
		return false;
	}

	if(form.username.value == "") {
		alert("Error: Username cannot be blank!");
		form.username.focus();
		return false;
	}
/*
	var re = /^\w+$/;
	if(!re.test(form.username.value)) {
		alert("Error: Username must contain only letters, numbers and underscores!");
		form.username.focus();
		return false;
	}*/



	if(form.password.value != "" && form.password.value == form.password2.value) {
		if(form.password.value.length < 6) {
			alert("Error: Password must contain at least six characters!");
			form.password.focus();
			return false;
		}
		if(form.password.value == form.username.value) {
			alert("Error: Password must be different from Username!");
			form.password.focus();
			return false;
		}
		/*re = /[0-9]/;
		if(!re.test(form.password.value)) {
			alert("Error: password must contain at least one number (0-9)!");
			form.password.focus();
			return false;
		}
		re = /[a-z]/;
		if(!re.test(form.password.value)) {
			alert("Error: password must contain at least one lowercase letter (a-z)!");
			form.password.focus();
			return false;
		}
		re = /[A-Z]/;
		if(!re.test(form.password.value)) {
			alert("Error: password must contain at least one uppercase letter (A-Z)!");
			form.password.focus();
			return false;
		}*/
	} else {
		alert("Error: Please check that you've entered and confirmed your password!");
		form.password.focus();
		return false;
	}

	tempForm=form;
	$.get('/getLoginData', checkUsername);
	
	return true;
}


function checkUsername(result)
{
	var username = tempForm.username.value;

	for(var i=0;i<result.length;i++)
	{
		var obj = result[i];
		var uname;
		for(var key in obj)
		{
			var attrName = key;
			var attrValue = obj[key];

			if(attrName == "username")
			{
				uname=attrValue;
			}
		}

		if(uname == username)
		{
			alert("Error: Username already exists!");
			form.username.focus();
			return false;
		}

		return true;
	}

	return true;
}


function checkLogin(form)
{

	if(form.username.value == "") {
		alert("Error: Username cannot be blank!");
		form.username.focus();
		return false;
	}

	if(form.password.value == "") {
		alert("Error: Password cannot be blank!");
		form.password.focus();
		return false;
	}

	tempForm=form;

	$.get('/getLoginData', checkLoginDetails)


	return true;
}

function checkLoginDetails(result)
{

	var username = tempForm.username.value;
	var password = tempForm.password.value;
	var usernameExists = false;


	for(var i=0;i<result.length;i++)
	{
		var obj = result[i];
		var uname, pw;
		for(var key in obj)
		{
			var attrName = key;
			var attrValue = obj[key];

			if(attrName == "username")
			{
				uname=attrValue;
			}
			if(attrName == "password")
			{
				pw=attrValue;
			}
		}

		if(uname == username)
		{

			usernameExists=true;

			if(pw != password)
			{
				alert("Error: Password incorrect!");
				tempForm.password.focus();
				return false;
			}
		}

	}


	if(!usernameExists)
	{
		alert("Error: Username does not exist!");
		tempForm.username.focus();
		return false;
	}
	return true;
}



function toggleSignup(e)
{
	e.preventDefault();

	$('#loginForm').toggle();
	$('#signupForm').toggle();

	var elem = document.getElementById("toggleClick");
	if (elem.value=="Sign Up Instead")
	{
		elem.value = "Login Instead";

	}
	else
	{
		elem.value = "Sign Up Instead";
	}
}

