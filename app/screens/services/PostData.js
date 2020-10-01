export function PostData(type,userData){
	let BaseUrl='https://masterdiskon.com/front/api/api/';
	//console.log('--------url'+type+'------');
	//console.log(BaseUrl+type);
	return new Promise((resolve,reject)=>{ 

	    fetch(BaseUrl+type,
		    	{
				  method: 'POST',
				  headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
				  },
				  body: JSON.stringify(userData),
				}
			)
		    .then((response) => response.json())
		    .then((responseJson) => {
		      resolve(responseJson);
		    })
		    .catch((error) => {
		      console.error(error);
		});

	});
}

