var userData = require("../userData.json");
var status = require("../status.json");



exports.changeProfilePicture = function(req, res)
{


	var newURL = req.body.profilePictureURL;
	if(!(newURL==""))
	{

		status["loginStatus"]["image"]= newURL;
		var username = status["loginStatus"]["username"];


		var arr = userData["loginData"];

		

		for(var i=0;i<arr.length;i++)
		{
			var obj = arr[i];
			var uname;
			var match=false;
			for(var key in obj)
			{
				var attrName = key;
				var attrValue = obj[key];

				if(attrName == "username")
				{
					uname=attrValue;

					if(uname == username)
					{
						match=true;
					}
					else
					{
						match= false;
					}
				}

				if(attrName == "image" && match)
				{
					obj[key] = newURL;
				}
			}

		}
	}
};