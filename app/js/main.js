var app;

function app() {
	this.users = null
};

app.prototype.initEvents = function () {
	var self = this;
    // $(document.body).on('submit', '#addform', function (e) {      
    //     e.preventDefault();
    //     self.addUser($(this));
    // });
    $('#getbut').on('click', function() {
    	self.getUsers();
    });
};

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
	$.each(arr, function(i, val) {
		$('#result tbody').append('<tr>' +
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





