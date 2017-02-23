import GoogleVision from '@google-cloud/vision';

export default class Vision {
    
	static async detectFaces(file) {

		const vis = GoogleVision();

		var result = await vis.detectFaces(file);
		
		if (result.length > 0) {
			result = result[0];
			for (var i = 0; i < result.length; i++) {
				delete result[i].features;
			};
			return result;
		}
	
		return false;

	}

};
