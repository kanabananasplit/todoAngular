(function(){
	var app = angular.module("TodoApp"); 

	app.service("TaskDataSvc", function($http){

		var self = this;

		self.getTasks = function(){
			//Get request
			var promise1 = $http.get('http://localhost:3000/tasks')
			var promise2 = promise1.then(function(response) {
				return response.data;
			});
			return promise2;
		}

		self.saveTask = function(taskData){
			//Put request
			return $http.put('http://localhost:3000/tasks/' + taskData.id, taskData) //this returns a promise so have to do a then
			.then(function(response){
				console.log(response);
			});
		}

		self.createTask = function(taskData){
			//Post request
			return $http.post('http://localhost:3000/tasks/', taskData) //this returns a promise so have to do a then
			.then(function(response){
				console.log(response);
			});
		}
		//#scope = self
		
	});
})();





