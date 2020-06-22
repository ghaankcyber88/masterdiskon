export function PostDataAeroToken(BaseUrl,type,param){
	let BaseUrl='https://masterdiskon.com/front/api/api/';
	console.log('--------url'+type+'------');
	console.log(BaseUrl+type);
	return new Promise((resolve,reject)=>{ 

	    fetch(BaseUrl+type,param)
		    .then((response) => response.json())
		    .then((responseJson) => {
		      resolve(responseJson);
		    })
		    .catch((error) => {
		      console.error(error);
		});

	});
}

