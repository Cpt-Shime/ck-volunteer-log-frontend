import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {EducationsService} from "../../../educations.service";

@Component({
    selector: "education-modal-wizard",
    templateUrl: "./education-modal.component.html"
})
export class EducationModalComponent implements OnInit {

    createForm: FormGroup = new FormGroup({
        title: new FormControl("",Validators.nullValidator),
        date: new FormControl("",Validators.nullValidator ),
        hours: new FormControl("",Validators.nullValidator ),
        description: new FormControl("",Validators.nullValidator),

    });

    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private educationsService: EducationsService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }
    save() {
        this.promiseBtn = (async () => {
            const data = this.createForm.value;
            const result = await this.educationsService.create(data);
            if (!result.success) {
                //ngx-toastr error message
                return;
            }

            //Show ngx-toastr success message
            this.aModal.close({ success: true });
        })()
    }

}