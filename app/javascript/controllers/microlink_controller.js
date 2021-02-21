import { Controller } from "stimulus"
import mql from "@microlink/mql"

export default class extends Controller {
    static targets = [ "input", "descriptionInput", "imageInput", "titleInput" ]

    async handleChange() {
        const { status, data } = await mql(this.inputTarget.value)
        if(status == "success") {
            this.setFormData(data);
        }
    }

    setFormData(data) {
        this.descriptionInputTarget.value   = data?.description ? data?.description : null;
        this.imageInputTarget.value         = data?.image?.url ? data?.image?.url : null;
        this.titleInputTarget.value         = data?.title ? data?.title : null;
    }
}