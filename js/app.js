const showSelected=(selected)=>{
	let minShown = (selected-1)*10;
	let maxShown = minShown+10;

	$('.visible').each(function(i, element){
		if (i>=minShown){
			$(element).show();
		}
		if (i>=maxShown){
			$(element).hide();
		}
	});
}
const watchPagination=()=>{
	$('.pagination li').on('click', function(event){
		$('.student-item').hide();
		let selected = $(this).find('a').text();
		showSelected(selected);
	});
}
const buildPagination=()=>{
	$(".pagination").empty();
	let students = $('.visible');

	if (students.length>10){
		students.each(function(i, element){
			if((i+1)%10==0){
				let text = ((i+1)/10);
				$(".pagination").append('<li><a>'+text+'</a></li>');
			}
		});
		if(students.length%10!==0){
			let text = $(".pagination li").length + 1;
			$(".pagination").append('<li><a>'+text+'</a></li>');
		}
		watchPagination();
		showSelected(1);
	}

}
const noStudentsFound=()=>{
	$('.student-item').hide().removeClass('visible');
	$('.student-list').append("<p id='error'>No students found.</p>");
	$(".pagination").empty();
}
const nameOrEmailSearch=(search)=>{
	return $('.student-item').filter(function(student){
			var name = $(this).find('h3').text();
			var email = $(this).find(".email").text();
			return name.indexOf(search)>=0||email.indexOf(search)>=0;
	});
}
const watchForm=()=>{
	$('.student-search').on('submit', function(e){
		e.preventDefault();
		$('.student-item').hide().removeClass('visible');
		$('#error').remove();

		let searchTerm = $('.student-search input').val();

		if (searchTerm === ''){
			$('.student-item').show().addClass('visible');
			buildPagination();
		}else{
			let matches = nameOrEmailSearch(searchTerm);
			if(matches.length===0){
				noStudentsFound();
			}else{
				matches.show().addClass('visible');
				buildPagination();
			}

		}
	});
}
const addForm=()=>{
	$(".page-header").append(`
		<form class='student-search'>
			<input type="text" name="search">
			<button type="submit">Search</button>
		</form>
	`);
}

const initialDisplay=()=>{
	$(".page").append("<div class='pagination'></div>");
	addForm();
	watchForm();
	$('.student-item').addClass('visible');
	buildPagination();
}

$(initialDisplay);
