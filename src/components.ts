import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader()

const Components = {
    imageList : componentLoader.add('imageList', './components/imageList'),
    imageShow: componentLoader.add('imageShow', './components/imageShow')
};

export { componentLoader, Components }