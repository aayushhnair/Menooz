import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

// Check App Platform
const checkPlatform = () => {
  if (Platform.OS === 'android') {
    return 'android';
  } else {
    return 'ios';
  }
};

// Device Type
const getDeviceType = () => {
  if (checkPlatform() === 'ios') {
    return 2;
  } else {
    return 1;
  }
};

// Set Async Storage Data
const setAsyncStorageData = async (key, value) => {
  const stringData = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringData);
};

// Get Async Storage Data
const getAsyncStorageData = async key => {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data);
};

// Debounce
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function getTotalByKey(array, keyName) {
  return array.reduce((total, item) => {
    if (item[keyName]) {
      return total + item[keyName];
    }
    return total;
  }, 0);
}

function getTotalOfMultiplyByKey(array, key1, key2) {
  return array.reduce((total, item) => {
    if (item[key1] && item[key2]) {
      return total + item[key1] * item[key2];
    }
    return total;
  }, 0);
}

export {
  getAsyncStorageData,
  setAsyncStorageData,
  getDeviceType,
  checkPlatform,
  debounce,
  getTotalByKey,
  getTotalOfMultiplyByKey,
};
