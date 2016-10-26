'use strict';

// User related
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const REFRESH_USER_INFO_SUCCESS = 'REFRESH_USER_INFO_SUCCESS';
export const REFRESH_USER_INFO_ERROR = 'REFRESH_USER_INFO_ERROR';

// Password Recovery
export const REQUEST_PASSWORD_RECOVERY_TOKEN = 'REQUEST_PASSWORD_RECOVERY_TOKEN';
export const VERIFY_PASSWORD_RECOVERY_TOKEN = 'VERIFY_PASSWORD_RECOVERY_TOKEN';
export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';

// Organizations
export const ORGANIZATION_SELECT = 'ORGANIZATION_SELECT';

export const ORGANIZATIONS_LOAD = 'ORGANIZATIONS_LOAD';
export const ORGANIZATIONS_LOAD_SUCCESS = 'ORGANIZATIONS_LOAD_SUCCESS';
export const ORGANIZATIONS_LOAD_ERROR = 'ORGANIZATIONS_LOAD_ERROR';

export const ORGANIZATION_DELETE = 'ORGANIZATION_DELETE';
export const ORGANIZATION_DELETE_CONFIRM = 'ORGANIZATION_DELETE_CONFIRM';
export const ORGANIZATION_DELETE_SUCCESS = 'ORGANIZATION_DELETE_SUCCESS';
export const ORGANIZATION_DELETE_ERROR = 'ORGANIZATION_DELETE_ERROR';

export const ORGANIZATION_CREATE = 'ORGANIZATION_CREATE';
export const ORGANIZATION_CREATE_CONFIRM = 'ORGANIZATION_CREATE_CONFIRM';
export const ORGANIZATION_CREATE_SUCCESS = 'ORGANIZATION_CREATE_SUCCESS';
export const ORGANIZATION_CREATE_ERROR = 'ORGANIZATION_CREATE_ERROR';

// Organizations - Add / Remove members
export const ORGANIZATION_ADD_MEMBER = 'ORGANIZATION_ADD_MEMBER';
export const ORGANIZATION_ADD_MEMBER_CONFIRM = 'ORGANIZATION_ADD_MEMBER_CONFIRM';
export const ORGANIZATION_ADD_MEMBER_SUCCESS = 'ORGANIZATION_ADD_MEMBER_SUCCESS';
export const ORGANIZATION_ADD_MEMBER_ERROR = 'ORGANIZATION_ADD_MEMBER_ERROR';

export const ORGANIZATION_REMOVE_MEMBER = 'ORGANIZATION_REMOVE_MEMBER';
export const ORGANIZATION_REMOVE_MEMBER_CONFIRM = 'ORGANIZATION_REMOVE_MEMBER_CONFIRM';
export const ORGANIZATION_REMOVE_MEMBER_SUCCESS = 'ORGANIZATION_REMOVE_MEMBER_SUCCESS';
export const ORGANIZATION_REMOVE_MEMBER_ERROR = 'ORGANIZATION_REMOVE_MEMBER_ERROR';

// Clusters
export const CLUSTER_SELECT = 'CLUSTER_SELECT';

export const CLUSTER_LOAD_DETAILS = 'CLUSTER_LOAD_DETAILS';
export const CLUSTER_LOAD_DETAILS_SUCCESS = 'CLUSTER_LOAD_DETAILS_SUCCESS';
export const CLUSTER_LOAD_DETAILS_ERROR = 'CLUSTER_LOAD_DETAILS_ERROR';

export const CLUSTER_LOAD_PARTIAL_DETAILS = 'CLUSTER_LOAD_PARTIAL_DETAILS';

export const CLUSTER_LOAD_DETAILS_FOR_ORGANIZATION = 'CLUSTER_LOAD_DETAILS_FOR_ORGANIZATION';
export const CLUSTER_LOAD_DETAILS_FOR_ORGANIZATION_SUCCESS = 'CLUSTER_LOAD_DETAILS_FOR_ORGANIZATION_SUCCESS';
export const CLUSTER_LOAD_DETAILS_FOR_ORGANIZATION_ERROR = 'CLUSTER_LOAD_DETAILS_FOR_ORGANIZATION_ERROR';

export const CLUSTER_LOAD_METRICS_SUCCESS = 'CLUSTER_LOAD_METRICS_SUCCESS';
export const CLUSTER_LOAD_METRICS_ERROR = 'CLUSTER_LOAD_METRICS_ERROR';

// Modals
export const MODAL_HIDE = 'MODAL_HIDE';

// Flashes
export const FLASH_REMOVE = 'FLASH_REMOVE';
export const FLASH_ADD = 'FLASH_ADD';
export const FLASH_CLEAR_ALL = 'FLASH_CLEAR_ALL';

// General Errors

export const UNAUTHORIZED = 'UNAUTHORIZED';