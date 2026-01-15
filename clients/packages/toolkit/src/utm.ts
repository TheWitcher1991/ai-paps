import { UTMSource } from "@fgis/types"

class UTMBuilder {
	private baseUrl: string
	private params: Map<string, string> = new Map()

	constructor(url: string) {
		this.baseUrl = url
	}

	public source(value: UTMSource): this {
		this.params.set('utm_source', value)
		return this
	}

	public campaign(value: string): this {
		this.params.set('utm_campaign', value)
		return this
	}

	public term(value: string): this {
		this.params.set('utm_term', value)
		return this
	}

	public medium(value: string): this {
		this.params.set('utm_medium', value)
		return this
	}

	public content(value: string): this {
		this.params.set('utm_content', value)
		return this
	}

	public build(): string {
		const urlObj = new URL(this.baseUrl, window.location.origin)

		this.params.forEach((value, key) => {
			if (!urlObj.searchParams.has(key)) {
				urlObj.searchParams.set(key, value)
			}
		})

		return urlObj.toString()
	}

	public buildPath(): string {
		const urlObj = new URL(this.baseUrl, window.location.origin)

		this.params.forEach((value, key) => {
			if (!urlObj.searchParams.has(key)) {
				urlObj.searchParams.set(key, value)
			}
		})

		return `${urlObj.pathname}${urlObj.search}`
	}
}

export const utm = (url: string) => new UTMBuilder(url)