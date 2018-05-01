$(".page").append("<div class='pagination'></div>");
$('.student-item').hide();
$(".page-header").append(`
	<div class='student-search'>
		<input type="text" name="search">
		<button>Search</button>
	</div>
`);

var allStudents = [];
$('li').each(function(i, element){
	allStudents.push(element);
});

// a group of list items that will display on each "page".
var liGroup = [];
// an arr of groups.
var liGroups = [];

function groupListItems(listItems){
	liGroups = [];
	listItems.forEach(function(student, i){
		// construct groups.
		liGroup.push(student);
		if((i+1)%10==0){
			//  construct liGroups arr and clear group arr for next grouping.
			liGroups.push(liGroup);
			liGroup = [];
		}
	});
	// contruct last group out of the left-over list items.
	liGroups.push(liGroup);
	liGroup = [];
}

// build pagination links from number of groups.
function buildPagination(){
	$(".pagination").empty();
	liGroups.forEach(function(value, i){
		$(".pagination").append('<li id='+(i+1)+'><a>'+(i+1)+'</a></li>');
	});
}

// display based on selected link.
function display(){
	liGroups[selected].forEach(function(value){
		value.style.display = 'block';
	});
}

// listen for changes in selected link and update display.
function paginatnListener(){
	$('.pagination li').click(function(event){
		$('.student-item').hide();
		selected = $(this).attr('id')-1;
		display();
	});
}

groupListItems(allStudents);
buildPagination();
var selected = 0; // initial selected pagination link is the first group.
display();

paginatnListener();

// listen for student search
$('.student-search button').click(function(){
	var search = $('.student-search input').val();
	// clear error messages if any.
	$('#error').remove();
	// clear pagination links in case no results found.
	$(".pagination").empty();

	// if search cleared display all students.
	if (search === ''){
		groupListItems(allStudents);
		buildPagination();
		selected = 0; 
		display();

	// else filter all students by name and email matches.
	}else{
		var matches = allStudents.filter(function(student){
			var name = student.getElementsByTagName('h3')[0].textContent;
			var email = student.getElementsByClassName("email")[0].textContent;
			return name.indexOf(search)>=0||email.indexOf(search)>=0;
		});

		// if no matches found hide all student list items and show error msg.
		if (matches.length==0){
			$('.student-item').hide();
			$('.student-list').append("<p id='error'>No students found.</p>");

		// else display matches in groups of 10 students and build pagination accordingly. 
		// also listen for clicks on pagination links.
		}else{
			groupListItems(matches);
			buildPagination();
			selected = 0; 
			display();
			paginatnListener();
		}		
	}
});