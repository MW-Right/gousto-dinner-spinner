import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { authRequest } from '../models';

@Component({
    selector: 'gs-login-page',
    templateUrl: './login.component.html',
    styleUrls: './login.component.scss'
})
export class LoginPageComponent {
    validationsForm: FormGroup;
    errorMessage: string = '';

    validationMessages = {
        'email': [
            { type: 'required', message: 'Email is required.' },
            { type: 'pattern', message: 'Please enter a valid email.'}
        ],
        'password': [
            { type: 'required', message: 'Password is required you speng.'},
            { type: 'minlength', message: 'Password must be at least 5 characters long.'}
        ]
    };

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.validationsForm = this.formBuilder.group({
            email: new FormControl(null, Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-0-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ]))
        });
    }

    tryLogin(value: authRequest) {
        this.authService.doLogin(value)
            .then(res => this.router.navigate(["/recipes"]),
                err => {
                    this.errorMessage = err.message;
                    console.log(err);
                }
            );
    }

    goRegisterPage() {
        this.router.navigate(["/register"]);
    }
}