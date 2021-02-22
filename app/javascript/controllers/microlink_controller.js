import { Controller } from "stimulus"
import mql from "@microlink/mql"

export default class extends Controller {
    static targets = [ "input", "descriptionInput", "imageInput", "titleInput", "output" ]

    connect() {
        this.previewDescription = this.outputTarget.querySelector("p");
        this.previewImage       = this.outputTarget.querySelector("img");
        this.previewTitle       = this.outputTarget.querySelector("h5");
    }

    async handleChange() {
        const { status, data } = await mql(this.inputTarget.value)
        if(status == "success") {
            this.setFormData(data);
            this.renderPreview(data);
        }
    }

    renderPreview(data) {
        this.previewDescription.innerHTML = data?.description ? data.description : null;
        data?.image?.url ? this.previewImage.setAttribute("src", data.image.url) : null;
        this.previewTitle.innerHTML = data?.title ? data.title : null;
        this.outputTarget.style.display = "block";
    }

    setFormData(data) {
        this.descriptionInputTarget.value   = data?.description ? data.description : null;
        this.imageInputTarget.value         = data?.image?.url ? data.image.url : null;
        this.titleInputTarget.value         = data?.title ? data.title : null;
    }
}