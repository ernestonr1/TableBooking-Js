window.onload = function(){
	addEventListenerToPeople();
	makeDaysClickable();	
}

function makeDaysClickable(){
	var days = document.getElementsByClassName("day");
	for( var i = 0; i < days.length; i++ ){
		days[ i ].onclick = function(){
			var selectedDay = document.querySelectorAll( "td.active" );
			if(selectedDay[0] != null)
				selectedDay[0].setAttribute( "class", "day" );
			var currentAttributeValue = this.getAttribute( "class" );
			this.setAttribute( "class", currentAttributeValue + " active" );
			var selectPeopleButton = document.getElementById("selectDate");
			selectPeopleButton.removeAttribute( "disabled" );
			selectPeopleButton.onclick = showContactForm;
		}
	}
}

function showContactForm(){
	var dateSelectorSection = document.getElementsByClassName( "roBB-calendar hastopbar show" );
	dateSelectorSection[0].setAttribute( "class", "roBB-calendar hastopbar" );
	var calenderSection = document.getElementsByClassName( "roBB-sessions hastopbar" );
	calenderSection[0].setAttribute( "class", "roBB-sessions hastopbar show" );
}

function addEventListenerToPeople(){
	
	var peopleNumber = document.getElementsByClassName("roBB-peopleNum");
	for( var i = 0; i < peopleNumber.length-1; i++ ){
		peopleNumber[ i ].onclick = function(event){
			
			/* Removing slected value */
			// Get all elements that have "selected in their class"
			//var selectedPeople = document.getElementsByClassName( "roBB-peopleNum selected" );
			var selectedPeople = document.querySelectorAll( "article.selected" );
			if( selectedPeople[0] != null ){
				selectedPeople[0].setAttribute( "class", "roBB-peopleNum" );
			}
			/* Removing select value ends here */
			
			var currentAttributeValue = this.getAttribute( "class" );
			this.setAttribute( "class", currentAttributeValue + " selected" );
			var selectPeopleButton = document.getElementById("selectPeople");
			selectPeopleButton.removeAttribute( "disabled" );
			selectPeopleButton.onclick = showCalender;
		}
	}
}
	
function showCalender(){
	var peopleSelectorSection = document.getElementsByClassName( "roBB-people hastopbar show" );
	peopleSelectorSection[0].setAttribute( "class", "roBB-people hastopbar" );
	var calenderSection = document.getElementsByClassName( "roBB-calendar hastopbar" );
	calenderSection[0].setAttribute( "class", "roBB-calendar hastopbar show" );
	
}