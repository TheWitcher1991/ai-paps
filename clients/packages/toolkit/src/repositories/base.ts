import { HttpClientInstance } from "../http"


export class BaseRepository {
	constructor(
		readonly http: HttpClientInstance,
		readonly URL: string,
	) {
		this.http = http
		this.URL = URL
	}

	get instance() {
		return this.http
	}
}