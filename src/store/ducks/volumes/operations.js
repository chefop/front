import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action type
import { ADD_VOLUME, FETCH_VOLUMES, UPDATE_VOLUME, DELETE_VOLUME } from '.';

// Import action creators
import { addVolume, fetchVolumes, updateVolume, deleteVolume } from '.';

import * as volumeAPI from '../../APICalls/volumeAPI';

// WORKERS
export function* addVolumeWorker(action) {
  try {
    const volume = action.payload;
    const res = yield call(volumeAPI.createVolume, volume);
    if (res.status === 200) {
      const volume = res.data.volume;
      yield put(addVolume.success(volume));
    }
  } catch (err) {
    yield put(addVolume.failure(err.message));
  }
}

export function* fetchVolumesWorker() {
  try {
    const res = yield call(volumeAPI.fetchVolumes);
    if (res.status === 200) {
      const volumes = res.data.volumes;
      yield put(fetchVolumes.success(volumes));
    }
  } catch (err) {
    yield put(fetchVolumes.failure(err.message));
  }
}

export function* updateVolumeWorker(action) {
  try {
    const volume = action.payload;
    const res = yield call(volumeAPI.updateVolume, volume);
    if (res.status === 200) {
      const volume = res.data.volume;
      yield put(updateVolume.success(volume));
    }
  } catch (err) {
    yield put(updateVolume.failure(err.message));
  }
}

export function* deleteVolumeWorker(action) {
  try {
    const volume = action.payload;
    const res = yield call(volumeAPI.deleteVolume, volume);
    if (res.status === 200) {
      const volume = res.data.volume;
      yield put(deleteVolume.success(volume._id));
    }
  } catch (err) {
    yield put(deleteVolume.failure(err.message));
  }
}

// WATCHERS
export function* addVolumeSaga() {
  yield takeLatest(ADD_VOLUME.request, addVolumeWorker);
}

export function* fetchVolumesSaga() {
  yield takeLatest(FETCH_VOLUMES.request, fetchVolumesWorker);
}

export function* updateVolumeSaga() {
  yield takeLatest(UPDATE_VOLUME.request, updateVolumeWorker);
}

export function* deleteVolumeSaga() {
  yield takeLatest(DELETE_VOLUME.request, deleteVolumeWorker);
}

// Export watchers
export default function* volumeSagas() {
  yield all([
    fork(addVolumeSaga),
    fork(fetchVolumesSaga),
    fork(updateVolumeSaga),
    fork(deleteVolumeSaga),
  ]);
}
