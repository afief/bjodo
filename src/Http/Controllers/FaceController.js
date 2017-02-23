import busboy from 'async-busboy';
import vision from '../../Helpers/Vision.js';

export default class FaceController {
	static async uploadImage(ctx, next) {
		const {files, fields} = await busboy(ctx.req);

		if (files.length > 0) {
			var file = files[0];
			var result = await vision.detectFaces(file.path);

			ctx.json(result);
		}
	}
}