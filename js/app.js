$(".page").append("<div class='pagination'></div>");
$('.student-item').hide();

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

groupListItems(allStudents);
buildPagination();
var selected = 0; // initial selected pagination linki s the first group.
display();

// listen for changes in selected link and update display.
$('.pagination li').click(function(event){
	$('.student-item').hide();
	selected = $(this).attr('id')-1;
	display();
});