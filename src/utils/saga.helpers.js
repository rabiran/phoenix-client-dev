export function* safe(effect) {
	try {
		return { result: yield effect }
	} catch (error) {
		return { error }
	}
}
