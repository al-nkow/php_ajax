var app;

function app() {
	this.users = null
};

app.prototype.initEvents = function () {
	var self = this;

    $(document.body).on('click', '#addUser', function () {   
        self.addUser();
    });

    $('#getbut').on('click', function() {
    	self.getUsers();
    });
};












app.prototype.addUser = function() {
	
	var data = {}
	var arr = $('#userform').serializeArray();
	
	arr.forEach(function(item, i) {
		data[item.name] = item.value;
	});

	console.log('DATA:', data);

	$.ajax({
		type: 'POST',
		url: 'dist/php/adduser.php',
		data: data,
		success: function(res, status, xhr){
			if (xhr.status != 200) return false;
			console.log('result: ', res);
		},
		error: function(xhr, status, error){
			console.log('Error! ' + xhr.status + ' ' + error + ' ' + status);
		}
	});
}

















app.prototype.getUsers = function() {
	var self = this;
	$.ajax({
		type: 'GET',
		url: 'dist/php/getusers.php',
		// headers: {
		// 	token: 'aAs123sSDa8s31fds834gdD'
		// },
		success: function(data, status, xhr){
			if (xhr.status != 200) return false;
			console.log('data: ', data);
			self.renderTable(data);
		},
		error: function(xhr, status, error){
			console.log('Error! ' + xhr.status + ' ' + error + ' ' + status);
		}
	});
};

app.prototype.renderTable = function(arr) {
	var tbody = $('#result tbody');
	tbody.text('');
	$.each(arr, function(i, val) {
		tbody.append('<tr>' +
		'<th scope="row">' + (i + 1) + '</td>' +
		'<td>' + val.firstName + '</td>' +
		'<td>' + val.lastName + '</td>' +
		'<td>' + val.address + '</td>' +
		'<td>' + val.phone + '</td>' +
		'<td><button type="button" class="btn btn-xs btn-success">' +
		'<span class="glyphicon glyphicon-pencil"><span></button>  ' +
		'<button type="button" class="btn btn-xs btn-danger">' +
		'<span class="glyphicon glyphicon-remove"><span></button></td>' +
		'</tr>');
	});
};

app.prototype.init = function() {
	this.initEvents();
};

(function() {
	var App = new app();
    App.init();
})() 





