var userData = require("../userData.json");
var status = require("../status.json");
var questions = require("../questions.json");

exports.addQuestions=function(req, res)
{
	var quest = req.query.question;
	var choiceA = req.query.choiceA;
	var choiceB = req.query.choiceB;
	var choiceC = req.query.choiceC;
	var choiceD = req.query.choiceD;
	var correct = req.query.correctAnswer;

	var correctAns;

	switch(correct)
	{
		case 'A':
		{
			correctAns=choiceA;
			break;
		}
		case 'B':
		{
			correctAns=choiceB;
			break;
		}
		case 'C':
		{
			correctAns=choiceC;
			break;
		}
		case 'D':
		{
			correctAns=choiceD;
			break;
		}
	}

	var selectedCourseID = status["loginStatus"]["currentCourseID"];

	if(quest=="" || choiceA == "" || choiceB =="")
	{
		res.render('createQuiz', {"status": status, "questions": questions});	
	}
	else
	{


		var arr=questions["course"];
		var courseQuestions=-1;

		for(var i=0;i<arr.length;i++)
		{
			var obj = arr[i];
			var courseID, probs;
			for(var key in obj)
			{
				var attrName = key;
				var attrValue = obj[key];

				if(attrName == "courseID")
				{
					courseID=attrValue;
				}
				if(attrName == "problems")
				{
					probs=attrValue;
				}
			}

			if(courseID==selectedCourseID)
			{
				courseQuestions=probs;
			}

		}
			//////
			if(courseQuestions!=-1)
			{
				courseQuestions.push(
				{
				problemID: "",  ////////////TO-DO
				question: quest,
				possibleAnswers:
				[
				choiceA, choiceB, choiceC, choiceD
				],
				correctAnswer: correctAns
			});

			}
			else
			{
				questions["course"].push(
				{
					courseID: selectedCourseID,
					problems:
					[
					{
				problemID: "",  ////////////TO-DO
				question: quest,
				possibleAnswers:
				[
				choiceA, choiceB, choiceC, choiceD
				],
				correctAnswer: correctAns
			}
			]
		});
			}
			res.redirect('/instructor');

		}

	};