import { fork } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// Action types
import { ADD_VOLUME, FETCH_VOLUMES, UPDATE_VOLUME, DELETE_VOLUME } from '.';

// Action Creators
import { addVolume, fetchVolumes, updateVolume, deleteVolume } from '.';

// Workers
import {
  addVolumeWorker,
  fetchVolumesWorker,
  updateVolumeWorker,
  deleteVolumeWorker,
} from './operations';

// Watchers
import {
  addVolumeSaga,
  fetchVolumesSaga,
  updateVolumeSaga,
  deleteVolumeSaga,
} from './operations';

import * as volumeAPI from '../../APICalls/volumeAPI';

import volumeSagas from './operations';

// WORKERS
describe('addVolumeWorker', () => {
  it('adds a volume', () => {
    const action = {
      payload: {
        name: 'mon nouveau volume',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        volume: { name: 'mon nouveau volume' },
      },
    };

    return expectSaga(addVolumeWorker, action)
      .provide([[matchers.call.fn(volumeAPI.createVolume), fakeRes]])
      .put(addVolume.success({ name: 'mon nouveau volume' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        name: 'mon nouveau volume',
      },
    };
    const error = new Error('error');

    return expectSaga(addVolumeWorker, action)
      .provide([[matchers.call.fn(volumeAPI.createVolume), throwError(error)]])
      .put(addVolume.failure('error'))

      .run();
  });
});

describe('fetchVolumesWorker', () => {
  it('fetch volumes', () => {
    const fakeRes = {
      status: 200,
      data: {
        volumes: { name: 'mes volumes' },
      },
    };

    return expectSaga(fetchVolumesWorker)
      .provide([[matchers.call.fn(volumeAPI.fetchVolumes), fakeRes]])
      .put(fetchVolumes.success({ name: 'mes volumes' }))

      .run();
  });

  it('and handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchVolumesWorker)
      .provide([[matchers.call.fn(volumeAPI.fetchVolumes), throwError(error)]])
      .put(fetchVolumes.failure('error'))

      .run();
  });
});

describe('updateVolumeWorker', () => {
  it('update volume', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'New name',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        volume: action.payload,
      },
    };

    return expectSaga(updateVolumeWorker, action)
      .provide([[matchers.call.fn(volumeAPI.updateVolume), fakeRes]])
      .put(updateVolume.success({ _id: '12987', name: 'New name' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'New name',
      },
    };
    const error = new Error('error');

    return expectSaga(updateVolumeWorker, action)
      .provide([[matchers.call.fn(volumeAPI.updateVolume), throwError(error)]])
      .put(updateVolume.failure('error'))

      .run();
  });
});

describe('deleteVolumeWorker', () => {
  it('delete volume', () => {
    const action = {
      payload: 'volumeId',
    };

    const fakeRes = {
      status: 200,
      data: {
        volume: { name: 'volume supprimé', _id: action.payload },
      },
    };

    return expectSaga(deleteVolumeWorker, action)
      .provide([[matchers.call.fn(volumeAPI.deleteVolume), fakeRes]])
      .put(deleteVolume.success('volumeId'))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: 'volumeId',
    };
    const error = new Error('error');

    return expectSaga(deleteVolumeWorker, action)
      .provide([[matchers.call.fn(volumeAPI.deleteVolume), throwError(error)]])
      .put(deleteVolume.failure('error'))

      .run();
  });
});

// Watchers
it('should calls the addVolumeWorker', () => {
  testSaga(addVolumeSaga)
    .next()
    .takeLatest(ADD_VOLUME.request, addVolumeWorker)

    .finish()
    .isDone();
});

it('should calls the fetchVolumesWorker', () => {
  testSaga(fetchVolumesSaga)
    .next()
    .takeLatest(FETCH_VOLUMES.request, fetchVolumesWorker)

    .finish()
    .isDone();
});

it('should calls the updateVolumeWorker', () => {
  testSaga(updateVolumeSaga)
    .next()
    .takeLatest(UPDATE_VOLUME.request, updateVolumeWorker)

    .finish()
    .isDone();
});

it('should calls the deleteVolumeWorker', () => {
  testSaga(deleteVolumeSaga)
    .next()
    .takeLatest(DELETE_VOLUME.request, deleteVolumeWorker)

    .finish()
    .isDone();
});

it('should calls the volume sagas', () => {
  testSaga(volumeSagas)
    .next()
    .all([
      fork(addVolumeSaga),
      fork(fetchVolumesSaga),
      fork(updateVolumeSaga),
      fork(deleteVolumeSaga),
    ])

    .finish()
    .isDone();
});
