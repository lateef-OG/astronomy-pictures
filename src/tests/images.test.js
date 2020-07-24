import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { getImageData } from '../redux/actions';

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  imageData: {},
};

const date = '2019-12-01';

let store;
beforeEach(() => {
  store = mockStore(initialState);

  localStorage.clear();
});

afterEach(async () => {
  localStorage.clear();
});

it('successfully saves image data to local storage', async done => {
  await store.dispatch(getImageData(date)).then(async () => {
    const { imageData } = store.getState();
    const imagesData = JSON.parse(localStorage.getItem("imagesData"));
    expect(imagesData[date]).toMatchObject(imageData);
    expect(imagesData[date]).toHaveProperty('url');
    done();
  });
});