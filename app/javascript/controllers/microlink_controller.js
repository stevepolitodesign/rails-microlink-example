import { Controller } from "stimulus"
import mql from "@microlink/mql"

export default class extends Controller {
    static targets = [ "input" ]

    async handleChange() {
        const { status, data } = await mql(this.inputTarget.value)
        console.log(status, data)
    }
}