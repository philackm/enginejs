var ENGINE = ENGINE || {};

ENGINE.namespace = function namespace(namespaceString){
	
	var parts = namespaceString.split("."),
		parent = window.ENGINE,
		i;
	
	if(parts[0] === "ENGINE"){
		parts = parts.splice(1);
	}
	
	for(i = 0; i < parts.length; i++){
				
		if(!parent.hasOwnProperty(parts[i])){
			parent[parts[i]] = {};
		}
		
		parent = parent[parts[i]];
	}
		
	return parent;
};