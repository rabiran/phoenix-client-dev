import { call } from 'redux-saga/effects'

export function* safe(effect) {
	try {
		return { result: yield effect }
	} catch (error) {
		return { error }
	}
}

export function* safeCall(fn, ...args) {
  return yield safe(call(fn, ...args))
}
