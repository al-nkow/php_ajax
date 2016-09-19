var app;

function app() {
	this.users = null
};

app.prototype.initEvents = function () {
	var self = this;

	$(document.body).on('click', '#addUserBut', function () {   
        $('#myModalLabel').text('Add user modal');
    });

    $(document.body).on('click', '.js-upload', function () {   
        var iditem = this.getAttribute('iditem');
        self.showUploadFileModal(iditem);
    });

    $(document.body).on('click', '#addUser', function () {   
        self.addUser();
    });

    $(document.body).on('click', '.js-delete', function () {   
        var iditem = this.getAttribute('iditem');
        self.deleteUser(iditem);
    });

    $(document.body).on('click', '.js-edit', function () {   
        var iditem = this.getAttribute('iditem');
        self.showEditUserModal(iditem);
    });

    $('#uploadImage').on('click', function (event) {
    	self.uploadFile();
    });

    $('#getbut').on('click', function() {
    	self.getUsers();
    });

    $('#userModal').on('hidden.bs.modal', function (e) {
		$('#userform')[0].reset();
	})
};

app.prototype.deleteUser = function(id) {
	var self = this;
	$.ajax({
		type: 'POST',
		url: 'dist/php/delete.php',
		data: {id: id},
		success: function(res, status, xhr){
			if (xhr.status != 200) return false;
			console.log('result: ', res);
			self.getUsers();
		},
		error: function(xhr, status, error){
			console.log('Error! ' + xhr.status + ' ' + error + ' ' + status);
		}
	});
}

app.prototype.showEditUserModal = function(id) {
	var self = this;
	$('#myModalLabel').text('Edit user modal');
	$('#userModal').modal('show');
	var user = self.users.filter(function(n){ return n.id == +id; })[0];
	$('#firstname').val(user.firstName);
	$('#lastname').val(user.lastName);
	$('#address').val(user.address);
	$('#phone').val(user.phone);
	$('#userid').val(user.id);
}

app.prototype.showUploadFileModal = function(id){
	var self = this;
	$('#uploadModal').modal('show');
	$('#uploadModal .userid').val(id);
};






















app.prototype.uploadFile = function(){

	var files = $('#uploadform input[type="file"]')[0].files;

	// console.log('file upload');
	//configuration
	var max_file_size           = 2048576; //allowed file size. (1 MB = 1048576)
	var allowed_file_types      = ['image/png', 'image/gif', 'image/jpeg', 'image/pjpeg']; //allowed file types
	// var result_output           = '#output'; //ID of an element for response output
	// var my_form_id              = '#upload_form'; //ID of an element for response output
	var total_files_allowed     = 3; //Number files allowed to upload

	var error = []; //errors
    var total_files_size = 0;

    //if browser doesn't supports File API
    if(!window.File && window.FileReader && window.FileList && window.Blob){
        alert("Your browser does not support new File API! Please upgrade.");
        return false;
    }

    //number of files
    var total_selected_files = files.length;
    if(total_selected_files > total_files_allowed){
        alert( "You have selected "+total_selected_files+" file(s), " + total_files_allowed +" is maximum!");
        return false;
    }

	//iterate files in file input field
	var flag = false;
	$(files).each(function(i, ifile){
		if(ifile.value == "") return false; //continue only if file(s) are selected
		if(allowed_file_types.indexOf(ifile.type) === -1){ //check unsupported file
			alert( '"'+ ifile.name + '" is unsupported file type!'); //push error text
			flag = true;
			return false;
		}
		total_files_size = total_files_size + ifile.size; //add file size to total size
	});
	if (flag) return false;

	//if total file size is greater than max file size
    if(total_files_size > max_file_size){ 
        alert( "You have "+total_selected_files+" file(s) with total size "+total_files_size+", Allowed size is " + max_file_size +", Try smaller file!"); //push error text
        return false;
    }


    // TODO: Здесь запустить какой-то спинербол или индикатор загрузки или спрятать кнопку загрузки
    // еще флаг какой-то - защита от повторной попытки загрузить файлы пока эти не прогрузились

    var form_data = new FormData($('#uploadform')[0]); //Creates new FormData object
    console.log(form_data); 

    $.ajax({
        url : 'dist/php/upload.php',
        type: "POST",
        data : form_data,
        contentType: false,
        cache: false,
        processData:false,
        mimeType:"multipart/form-data"
    }).done(function(res){
    	console.log('======= RESULT =======');
    	console.log(res);
    	console.log('======================');
        // $(my_form_id)[0].reset(); //reset form
        // $(result_output).html(res); //output response from server
        // submit_btn.val("Upload").prop( "disabled", false); //enable submit button once ajax is done
    });
};

































app.prototype.addUser = function() {
	var self = this;
	var data = {}
	var arr = $('#userform').serializeArray();
	arr.forEach(function(item, i) {
		data[item.name] = item.value;
	});
	// var data = $('#userform').serialize();
	if (!data.first_name) {
		alert('You must specify at least a name!');
		return false;
	}
	var url = data.userid ? 'dist/php/edituser.php' : 'dist/php/adduser.php';
	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		success: function(res, status, xhr){
			if (xhr.status != 200) return false;
			console.log('result: ', res);
			self.getUsers();
			$('#userModal').modal('hide');
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
			self.users = data;
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
		'<td><button type="button" class="btn btn-xs btn-success js-edit" iditem="' + val.id + '">' +
		'<span class="glyphicon glyphicon-pencil"><span></button>  ' +
		'<button type="button" class="btn btn-xs btn-danger js-delete" iditem="' + val.id + '">' +
		'<span class="glyphicon glyphicon-remove"><span></button>  ' +
		'<button type="button" class="btn btn-xs btn-info js-upload" iditem="' + val.id + '">' +
		'<span class="glyphicon glyphicon-upload"><span></button></td>' +
		'</tr>');
	});
};

app.prototype.init = function() {
	this.getUsers();
	this.initEvents();
};

(function() {
	var App = new app();
    App.init();
})() 
