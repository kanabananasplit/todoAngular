(function(){
	var app = angular.module("TodoApp"); 
	app.controller("TaskCtrl", TaskCtrl);


	function TaskCtrl(TaskDataSvc){ 
		var self = this;

		self.editMode = false;
		self.addMode = false;

		TaskDataSvc.getTasks()
		.then(function(data){
			self.tasks = data;
		});

		this.selectTask = function(index) {
			this.selectedTask = this.tasks[index];
			self.successMessage = undefined; //clears the alert messsage when clicked on a different user 
			self.errorMessage = undefined;
		}

		this.toggleEditMode = function(){
			this.editMode = ! this.editMode;
		}

		this.saveTask= function() {
			this.toggleEditMode();

			//Persist the data
			var taskData = this.selectedTask;
			if (self.addMode){
				TaskDataSvc.createTask(taskData)
				.then(function(){
					self.successMessage = "Data successfully updated";
				},
				function() {
					self.errorMessage = "There was an error. Please try again.";
				});
				self.addMode = false;
			}
			else{ 
				TaskDataSvc.saveTask(taskData)
				.then(function(){
					self.successMessage = "Data successfully updated";
				},
				function() {
					self.errorMessage = "There was an error. Please try again.";
				});
			}
		}

		this.addTask = function() {
			self.addMode = true;
			this.selectedTask = {
				"id" : new Date().toTimeString()
			};
			this.editMode = true;
		}
	}
})();



