import { Controller } from "stimulus"
import mql from "@microlink/mql"

export default class extends Controller {
    static targets = [ "input", "descriptionInput", "imageInput", "titleInput", "output", "message" ]

    connect() {
        this.previewDescription = this.outputTarget.querySelector("p");
        this.previewImage       = this.outputTarget.querySelector("img");
        this.previewTitle       = this.outputTarget.querySelector("h5");
    }

    async handleChange() {
        this.messageTarget.innerText = null;
        this.clearFormData();
        this.clearPreview();
        if (this.inputTarget.value != "") {
            try {
                const { status, data } = await mql(this.inputTarget.value)
                this.messageTarget.innerText = "Fetching link preview...";
                if(status == "success") {
                    this.setFormData(data);
                    this.renderPreview(data);
                    this.messageTarget.innerText = null;
                } else {
                    this.messageTarget.innerText = "There was an error fetching the link preview.";
                }
            } catch(e) {
                this.messageTarget.innerText = e;
            }
        }
    }

    clearFormData() {
        this.descriptionInputTarget.value   = null;
        this.imageInputTarget.value         = null;
        this.titleInputTarget.value         = null;
    }

    clearPreview() {
        this.previewDescription.innerHTML   = null;
        this.previewImage.setAttribute("src", "");
        this.previewTitle.innerHTML         = null;
        this.outputTarget.style.display     = "none";
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