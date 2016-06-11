var module = require('ui/modules').get('traffic_light_vis');


module.controller('TrafficLightVisController', function ($scope, Private) {
	var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

//	var metrics = $scope.metrics = [];
	var lines = $scope.lines = [];



	$scope.processTableGroups = function (tableGroups) 
	{
		console.log($scope);
		var metrics=[];
		var i=0;
	  	tableGroups.tables.forEach(function (table) 
		{
			if((i%$scope.vis.params.numberOfLights)==0)
			{
				metrics=[];				
				lines.push(metrics);								
			}
			
			
			if(table.tables == undefined)
			{
		    	table.columns.forEach(function (column, i) 
				{
		      	  	metrics.push({
		        		label: column.title,
		        		value: table.rows[0][i]
		      	  	});
		    	});
			}
			else
			{
			  	table.tables.forEach(function (table2) 
				{
			    	table2.columns.forEach(function (column, i) 
					{
			      	  	metrics.push({
			        		label: table.key,
			        		value: table2.rows[0][i]
			      	  	});
			    	});		
				});
			}
			i++;
      	});
	};

	$scope.$watch('esResponse', function (resp) {
	  if (resp) {
	    //metrics.length = 0;
		lines.length = 0;
	    $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
	  }
	});
});
