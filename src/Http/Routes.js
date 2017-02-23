import FaceController from './Controllers/FaceController';

export default (router) => {
    router.post('/face', FaceController.uploadImage);
};
