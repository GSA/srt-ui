webpackJsonp([1,5],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HttpService = (function (_super) {
    __extends(HttpService, _super);
    // Customize http service
    function HttpService(backend, options) {
        var _this = this;
        var token = localStorage.getItem('token'); // your custom token getter function here
        options.headers.set('Authorization', "Bearer " + token);
        _this = _super.call(this, backend, options) || this;
        return _this;
    }
    HttpService.prototype.request = function (url, options) {
        var token = localStorage.getItem('token');
        if (typeof url === 'string') {
            if (!options) {
                // let's make option object
                options = { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]() };
            }
            options.headers.set('Authorization', "Bearer " + token);
        }
        else {
            // we have to add the token to the url object
            url.headers.set('Authorization', "Bearer " + token);
        }
        return _super.prototype.request.call(this, url, options).catch(this.catchAuthError(this));
    };
    HttpService.prototype.catchAuthError = function (self) {
        // we have to pass HttpService's own instance here as `self`
        return function (res) {
            if (res.status === 401 || res.status === 403) {
            }
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(res);
        };
    };
    return HttpService;
}(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]));
HttpService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* XHRBackend */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* XHRBackend */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]) === "function" && _b || Object])
], HttpService);

var _a, _b;
//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
//Kailun's adding 
var User = (function () {
    /**
     * Constructor.
     */
    function User(user) {
        // user data record
        this.id = "";
        this.email = "";
        this.password = "";
        this.position = "";
        this.firstName = "";
        this.lastName = "";
        this.agency = "";
        this.userRole = "";
        this.tempPassword = "";
        this.creationDate = "";
        this.id = user ? user._id : "";
        this.email = user ? user.email : "";
        this.password = user ? user.password : "";
        this.position = user ? user.position : "";
        this.firstName = user ? user.firstName : "";
        this.lastName = user ? user.lastName : "";
        this.agency = user ? user.agency : "";
        this.userRole = user ? user.userRole : "";
        this.tempPassword = user ? user.tempPassword : "";
        this.creationDate = user ? user.creationDate : "";
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 1202:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(513);


/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_guard_service__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param authGuard
     * @param authService
     */
    function AppComponent(authGuard, authService) {
        var _this = this;
        this.authGuard = authGuard;
        this.authService = authService;
        /* ATTRIBUTES */
        this.isLogin = false;
        this.isGSAAdmin = false;
        authService.checkToken().subscribe(function (data) {
            _this.authGuard.isLogin = data.isLogin;
            _this.authGuard.isGSAAdmin = data.isGSAAdmin;
            _this.isLogin = _this.authGuard.isLogin;
            _this.isGSAAdmin = _this.authGuard.isGSAAdmin;
            debugger;
            if (!_this.authGuard.isLogin) {
                localStorage.clear();
            }
        });
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(892),
        styles: [__webpack_require__(774)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthComponent = (function () {
    /**
     * constructor
     */
    function AuthComponent() {
        /* ATTRIBUTES */
        this.displayTab = 'singin';
    }
    /**
     * lifecycle
     */
    AuthComponent.prototype.ngOnInit = function () {
    };
    /**
     * change tab
     * @param arg
     */
    AuthComponent.prototype.ChangeDisplay = function (arg) {
        this.displayTab = arg;
    };
    return AuthComponent;
}());
AuthComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-auth',
        template: __webpack_require__(893),
        styles: [__webpack_require__(775)]
    }),
    __metadata("design:paramtypes", [])
], AuthComponent);

//# sourceMappingURL=auth.component.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HelpComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function HelpComponent() {
    }
    /**
     * lifecycle
     */
    HelpComponent.prototype.ngOnInit = function () {
    };
    return HelpComponent;
}());
HelpComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-help',
        template: __webpack_require__(900),
        styles: [__webpack_require__(782)]
    }),
    __metadata("design:paramtypes", [])
], HelpComponent);

//# sourceMappingURL=help.component.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PrivateComponent = (function () {
    /**
     * constructor
     */
    function PrivateComponent() {
    }
    /**
     * lifecycle
     */
    PrivateComponent.prototype.ngOnInit = function () {
    };
    return PrivateComponent;
}());
PrivateComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-private',
        template: __webpack_require__(902),
        styles: [__webpack_require__(784)]
    }),
    __metadata("design:paramtypes", [])
], PrivateComponent);

//# sourceMappingURL=private.component.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__http_service__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// Import envirnoment variable

// Services

var EmailService = (function () {
    /**
     * Contructor.
     * @param http
     */
    function EmailService(http) {
        this.http = http;
        this.updatePasswordEmailUrl = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].SERVER_URL + '/email/updatePassword';
        this.resetPasswordEmailUrl = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].SERVER_URL + '/email/resetPassword';
    }
    /**
    * Send a email for Change password
    *
    */
    EmailService.prototype.updatePassword = function () {
        var body = JSON.stringify({});
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.updatePasswordEmailUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json()); });
    };
    /**
    * Notification of Reset password
    * @param email
    */
    EmailService.prototype.resetPassword = function (email) {
        debugger;
        var body = JSON.stringify({ email: email });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.resetPasswordEmailUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json()); });
    };
    return EmailService;
}());
EmailService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__http_service__["a" /* HttpService */]) === "function" && _a || Object])
], EmailService);

var _a;
//# sourceMappingURL=email.service.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_email_service__ = __webpack_require__(134);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordComponent; });
/* unused harmony export passwordMatchValidator */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import services



var PasswordComponent = (function () {
    /**
    * Constructor.
    * @param authService
    * @param router
    */
    function PasswordComponent(userService, authService, emailService, route, router) {
        this.userService = userService;
        this.authService = authService;
        this.emailService = emailService;
        this.route = route;
        this.router = router;
        this.pwshow = false;
        this.allValid = false;
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.params = {};
        this.filterParams = {};
    }
    /**
     * lifecycle
     */
    PasswordComponent.prototype.ngOnInit = function () {
        this.form = new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["FormGroup"]({
            oldPassword: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required,
                __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].minLength(8),
                __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/),
            ]),
            newPassword: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required,
                __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].minLength(8),
                __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/),
            ]),
            confirmPassword: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required,
            ])
        }, passwordMatchValidator);
        // if(this.route.snapshot.params){
        //   this.filterParams['_email'] = this.route.snapshot.params['email'];
        //   this.filterParams['_temp'] = this.route.snapshot.params['temp'];
        //   debugger
        //   this.getUrltempPassword();
        // } 
    };
    /**
    * Hide/Show password
    */
    PasswordComponent.prototype.showHidePsw = function () {
        this.pwshow = !this.pwshow;
    };
    /**
     * User update password
     */
    PasswordComponent.prototype.changePassword = function () {
        var _this = this;
        var password = this.form.value.newPassword;
        var oldpassword = this.form.value.oldPassword;
        this.params['password'] = password;
        this.params['oldpassword'] = oldpassword;
        this.userService.updatePassword(this.params).subscribe(function (data) {
            if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].EMAIL_NOTIFICATION) {
                _this.emailService.updatePassword().subscribe(function (data) {
                    console.log(data.message);
                }, function (error) { return console.log(error); });
            }
            alert(data.message);
            _this.router.navigate(['/home']);
        }, function (error) { return console.log(error); });
    };
    /**
     * Check Password  Validator
     */
    PasswordComponent.prototype.matchValidation = function () {
        if (this.step1 == true && this.step2 == true && this.step3 == true && this.step4 == true && this.str2 == this.str3) {
            this.allValid = true;
        }
    };
    /**
     * Get the serverside data for password
     */
    // getUrltempPassword(){
    //   this.authService.updatePasswordByUrl().subscribe(
    //     data => {},
    //     error => {}
    //   );
    // }
    /**
     * Password  Validator
     */
    PasswordComponent.prototype.validationFunction = function () {
        if (this.str2.length > 8) {
            this.step1 = true;
        }
        else {
            this.step1 = false;
        }
        if (/[A-Z]/.test(this.str2)) {
            this.step2 = true;
        }
        else {
            this.step2 = false;
        }
        if (/\d+/.test(this.str2)) {
            this.step3 = true;
        }
        else {
            this.step3 = false;
        }
        if (/[$-/:-?{-~!"^_`\[\]]/.test(this.str2)) {
            this.step4 = true;
        }
        else {
            this.step4 = false;
        }
    };
    return PasswordComponent;
}());
PasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-password',
        template: __webpack_require__(916),
        styles: [__webpack_require__(798)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__shared_services_email_service__["a" /* EmailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_services_email_service__["a" /* EmailService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _e || Object])
], PasswordComponent);

/**
 * Password Matching Validator
 */
function passwordMatchValidator(g) {
    return g.get('newPassword').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
}
var _a, _b, _c, _d, _e;
//# sourceMappingURL=password.component.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param user
     */
    function AdminComponent(userService, route) {
        this.userService = userService;
        this.route = route;
        /* ATTRIBUTES */
        this.displayTab = 0;
        this.pending = false;
        this.accepted = false;
        this.rejected = false;
        this.filterParams = {
            isAccepted: false,
            isRejected: false
        };
    }
    /**
     * lifecycle
     */
    AdminComponent.prototype.ngOnInit = function () {
        this.filterParams.isAccepted = this.route.snapshot.data['isAccepted'];
        this.filterParams.isRejected = this.route.snapshot.data['isRejected'];
        this.pending = !this.filterParams.isAccepted && !this.filterParams.isRejected;
        this.accepted = this.filterParams.isAccepted && !this.filterParams.isRejected;
        this.rejected = !this.filterParams.isAccepted && this.filterParams.isRejected;
        this.getUsers();
    };
    /**
     * Approve user
     * @param user
     */
    AdminComponent.prototype.Approve = function (user) {
        var _this = this;
        user.isAccepted = true;
        user.isRejected = false;
        this.userService.updateUser(user).subscribe(function (data) {
            _this.getUsers();
        }, function (error) { });
    };
    /**
     * reject user
     * @param user
     */
    AdminComponent.prototype.Reject = function (user) {
        var _this = this;
        user.isAccepted = false;
        user.isRejected = true;
        this.userService.updateUser(user).subscribe(function (data) {
            _this.getUsers();
        }, function (error) { });
    };
    /**
     * Get users
     */
    AdminComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers(this.filterParams).subscribe(function (data) {
            _this.users = data;
            console.log(_this.users);
        }, function (error) { });
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "app-admin",
        template: __webpack_require__(880),
        styles: [__webpack_require__(763)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object])
], AdminComponent);

var _a, _b;
//# sourceMappingURL=admin.component.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_analytics_service__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyticsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AnalyticsComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param AnalyticsService
     * @param router
     */
    function AnalyticsComponent(AnalyticsService, router) {
        this.AnalyticsService = AnalyticsService;
        this.router = router;
        this.solicitationNumber = 0;
        this.selectedGovernment = 'Government-wide';
        this.selectedPeriod = 'All';
        this.formPeriod = new Date(1900, 0, 1);
        this.toPeriod = new Date(2100, 11, 31);
        this.xAxis = 'Agency';
        this.ICT = [];
        this.ICTforDisplay = [];
        // bar
        this.barTitle = "Top 10 Section 508 Compliant Agencies";
        this.isGovernomentWide = true;
        this.params = {};
        this.ScannedSolicitationChart = null;
        this.MachineReadableChart = null;
        this.ComplianceRateChart = null;
        this.ConversionRateChart = null;
        this.TopSRTActionChart = null;
        this.TopAgenciesChart = null;
        this.PredictResultChart = null;
        this.UndeterminedSolicitationChart = null;
        this.filterActionChange = false;
        this.agencyList = [];
    }
    /**
     * filter on change
     * @param str
     */
    AnalyticsComponent.prototype.onChange = function (str) {
        this.selectedGovernment = str;
        this.filterActionChange = true;
        if (str == 'Government-wide') {
            this.ICTforDisplay = this.ICT;
            this.isGovernomentWide = true;
            this.xAxis = 'Agency';
        }
        else {
            this.ICTforDisplay = this.ICT.filter(function (d) { return d.agency == str; });
            this.isGovernomentWide = false;
            // Pre select for individaul agency
            if (this.selectedPeriod == 'All') {
                this.selectedPeriod = 'This Year';
                this.xAxis = 'Month';
            }
            else if (this.selectedPeriod == "This Year") {
                this.xAxis = "Month";
            }
            else if (this.selectedPeriod == "This Month") {
                this.xAxis = "Date";
            }
        }
        this.GetTotalData();
    };
    /**
     * filter time change
     * @param str
     */
    AnalyticsComponent.prototype.onPeriodChange = function (str) {
        this.selectedPeriod = str;
        this.filterActionChange = true;
        // Get time period to filter.
        switch (str) {
            case "This Year":
                this.formPeriod = new Date(new Date().getFullYear(), 0, 1);
                this.toPeriod = new Date(new Date().getFullYear(), 11, 31);
                this.xAxis = "Month";
                break;
            case "This Month":
                this.formPeriod = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                this.toPeriod = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
                this.xAxis = "Date";
                break;
            case "This Week":
                var curr = new Date; // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6; // last day is the first day + 6
                this.formPeriod = new Date(curr.setDate(first));
                this.toPeriod = new Date(curr.setDate(last));
                break;
            default:
                this.formPeriod = new Date(1900, 0, 1);
                this.toPeriod = new Date(2100, 0, 1);
                break;
        }
        if (this.selectedGovernment == "Government-wide")
            this.xAxis = "Agency";
        this.GetTotalData();
    };
    /**
     * filter agency change
     */
    AnalyticsComponent.prototype.GetAgencyList = function () {
        var _this = this;
        var agency = localStorage.getItem("agency");
        var userRole = localStorage.getItem("userRole");
        if (agency == '' ||
            (agency.indexOf("General Services Administration") > -1 && (userRole.indexOf('Administrator') > -1 || userRole.indexOf('SRT Program Manager') > -1))) {
            this.AnalyticsService.GetAgencyList()
                .subscribe(function (data) {
                _this.agencyList = data;
            }, function (err) {
            });
        }
        else {
            agency = agency.split(' (')[0];
            this.agencyList = [agency];
        }
    };
    /**
     *
     * @param date
     */
    AnalyticsComponent.prototype.convertDate = function (date) {
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    };
    /**
     * get total data
     */
    AnalyticsComponent.prototype.GetTotalData = function () {
        var _this = this;
        this.params = {
            fromPeriod: this.convertDate(this.formPeriod),
            toPeriod: this.convertDate(this.toPeriod),
            agency: this.selectedGovernment
        };
        console.log(this.params);
        this.AnalyticsService.getAnalytics(this.params)
            .subscribe(function (data) {
            _this.ScannedSolicitationChart = data.ScannedSolicitationChart;
            _this.MachineReadableChart = data.MachineReadableChart;
            _this.ComplianceRateChart = data.ComplianceRateChart;
            _this.ConversionRateChart = data.ConversionRateChart;
            _this.TopSRTActionChart = data.TopSRTActionChart;
            _this.TopAgenciesChart = data.TopAgenciesChart;
            _this.PredictResultChart = data.PredictResultChart;
            _this.UndeterminedSolicitationChart = data.UndeterminedSolicitationChart;
            _this.filterActionChange = false;
        }, function (err) {
        });
    };
    /**
     * lifecycle
     */
    AnalyticsComponent.prototype.ngOnInit = function () {
        this.GetAgencyList();
        this.GetTotalData();
    };
    /**
     * go to faq page of selected solicitation.
     * @param id
     */
    AnalyticsComponent.prototype.go = function (id) {
        this.router.navigateByUrl('faq', id);
    };
    return AnalyticsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__["BaseChartDirective"]),
    __metadata("design:type", Object)
], AnalyticsComponent.prototype, "baseChart", void 0);
AnalyticsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-analytics',
        template: __webpack_require__(881),
        styles: [__webpack_require__(58)]
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: 'baseChart' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_analytics_service__["a" /* AnalyticsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_analytics_service__["a" /* AnalyticsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object])
], AnalyticsComponent);

var _a, _b;
//# sourceMappingURL=analytics.component.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyticsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AnalyticsService = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param http
     */
    function AnalyticsService(http) {
        this.http = http;
        /* ATTRIBUTES */
        this.AnalyticUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/Analytics';
        this.AgencyListUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/AgencyList';
    }
    ;
    /**
     * Get Analytics
     * @param param
     */
    AnalyticsService.prototype.getAnalytics = function (param) {
        return this.http.post(this.AnalyticUrl, param)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server Error'); });
    };
    /**
     * Get agency list
     */
    AnalyticsService.prototype.GetAgencyList = function () {
        var data = this.http.get(this.AgencyListUrl).map(function (res) { return res.json(); });
        return data;
    };
    return AnalyticsService;
}());
AnalyticsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AnalyticsService);

var _a;
//# sourceMappingURL=analytics.service.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_email_service__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import services



var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(authService, emailService, router) {
        this.authService = authService;
        this.emailService = emailService;
        this.router = router;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.myForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]),
        });
    };
    /**
     * Reset Password
     */
    ForgotPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        var email = this.myForm.value.email;
        if (email !== '') {
            this.authService.resetPassword(email).subscribe(function (data) {
                if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].EMAIL_NOTIFICATION) {
                    _this.emailService.resetPassword(email).subscribe(function (data) {
                        alert(data.message);
                        _this.router.navigate(['/home']);
                    }, function (error) { return console.log(error); });
                }
            }, function (error) {
                console.log(error);
            });
        }
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-forgot-password',
        template: __webpack_require__(894),
        styles: [__webpack_require__(776)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_email_service__["a" /* EmailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_email_service__["a" /* EmailService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"]) === "function" && _c || Object])
], ForgotPasswordComponent);

var _a, _b, _c;
//# sourceMappingURL=forgot-password.component.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_solicitation_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__solicitation_summary_email_poc_email__ = __webpack_require__(207);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactUsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactUsComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param solicitationService
     */
    function ContactUsComponent(solicitationService) {
        this.solicitationService = solicitationService;
        this.emailSent = false;
        this.type = 'email';
    }
    /**
     * angular lifecycle
     */
    ContactUsComponent.prototype.ngOnInit = function () {
        this.myForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            content: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required)
        });
    };
    /**
     * Submit
     */
    ContactUsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.emailTo = 'marina.fox@gsa.gov';
        // this.emailTo = 'kailun_wang@unitedsolutions.biz';
        this.emailCC = '';
        this.subject = 'SRT Contact Us';
        this.emailBody =
            '<p>From: ' + this.myForm.value.name + ' (' + this.myForm.value.email + ') </p>' +
                '<br> ' +
                '<p>Content: ' + this.myForm.value.content + '</p>';
        var emailContent = new __WEBPACK_IMPORTED_MODULE_3__solicitation_summary_email_poc_email__["a" /* Email */](this.emailTo, this.subject, this.emailBody, '', '');
        this.solicitationService.sendContactEmail(emailContent)
            .subscribe(function (msg) {
            _this.emailSent = true;
        }, function (err) {
        });
    };
    return ContactUsComponent;
}());
ContactUsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-contact-us',
        template: __webpack_require__(898),
        styles: [__webpack_require__(780)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object])
], ContactUsComponent);

var _a;
//# sourceMappingURL=contact-us.component.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_help_service__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services


var FaqComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param helpService
     * @param route
     */
    function FaqComponent(helpService, route) {
        this.helpService = helpService;
        this.route = route;
        this.id = '';
        this.metrix = '{ (1) ∪ { (2) ∩ (3) } }';
    }
    /**
     * angular lifecycle
     */
    FaqComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params['id'];
        if (this.id !== null) {
            var element = document.getElementById(this.id);
            if (this.id === 'ICT') {
                __WEBPACK_IMPORTED_MODULE_3_jquery__('#search').val('What is "Information and Communication Technology"(ICT)?');
            }
            else if (this.id === 'EIT') {
                __WEBPACK_IMPORTED_MODULE_3_jquery__('#search').val('What is "Electronic and Information Technology"(E&IT)?');
            }
            // Wait for html
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_3_jquery__('.' + _this.id).click();
                _this.search();
            }, 500);
        }
        this.getFAQs();
    };
    /**
     * Get FAQs
     */
    FaqComponent.prototype.getFAQs = function () {
        var _this = this;
        this.helpService
            .getFAQs()
            .subscribe(function (data) { return (_this.faq = data); }, function (error) { return console.log(error); });
    };
    /**
     * window scroll to selected ID
     * @param ID
     */
    FaqComponent.prototype.scroll = function (ID) {
        var element = document.getElementById(ID);
        __WEBPACK_IMPORTED_MODULE_3_jquery__('html, body').animate({
            scrollTop: __WEBPACK_IMPORTED_MODULE_3_jquery__(element).offset().top - 80
        });
    };
    /**
     * Search text
     */
    FaqComponent.prototype.search = function () {
        var txt = __WEBPACK_IMPORTED_MODULE_3_jquery__('#search').val();
        __WEBPACK_IMPORTED_MODULE_3_jquery__('.search-content').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__(this).text().toLowerCase().indexOf(txt.toLowerCase()) !== -1) {
                __WEBPACK_IMPORTED_MODULE_3_jquery__(this).show();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3_jquery__(this).hide();
            }
        });
        __WEBPACK_IMPORTED_MODULE_3_jquery__('.search-title').each(function () {
            if (__WEBPACK_IMPORTED_MODULE_3_jquery__(this).text().toLowerCase().indexOf(txt.toLowerCase()) !== -1) {
                __WEBPACK_IMPORTED_MODULE_3_jquery__(this).show();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3_jquery__(this).hide();
            }
        });
    };
    return FaqComponent;
}());
FaqComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "app-faq",
        template: __webpack_require__(899),
        styles: [__webpack_require__(781)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_help_service__["a" /* HelpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_help_service__["a" /* HelpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object])
], FaqComponent);

var _a, _b;
//# sourceMappingURL=faq.component.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_guard_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param auth
     */
    function HomeComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.isGSAAdmin = false;
    }
    /**
     * lifecycle
     */
    HomeComponent.prototype.ngOnInit = function () {
        this.isGSAAdmin = this.auth.isGSAAdmin;
        this.currentID = localStorage.getItem('id');
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(901),
        styles: [__webpack_require__(783)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PublicComponent = (function () {
    /**
     * constructor
     */
    function PublicComponent() {
    }
    /**
     * lifecycle
     */
    PublicComponent.prototype.ngOnInit = function () {
    };
    return PublicComponent;
}());
PublicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-public',
        template: __webpack_require__(903),
        styles: [__webpack_require__(785)]
    }),
    __metadata("design:paramtypes", [])
], PublicComponent);

//# sourceMappingURL=public.component.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Currentuser; });
var Currentuser = (function () {
    /**
     * Constructor.
     */
    function Currentuser(firstName, lastName, agency, email, position, tempPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.agency = agency;
        this.email = email;
        this.position = position;
        this.tempPassword = tempPassword;
    }
    return Currentuser;
}());

//# sourceMappingURL=currentuser.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgencyService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AgencyService = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param http
     */
    function AgencyService(http) {
        this.http = http;
        /* ATTRIBUTES */
        this.agenciesUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].SERVER_URL + '/agencies';
    }
    /**
     * Get agencies
     */
    AgencyService.prototype.GetAgencies = function () {
        return this.http.get(this.agenciesUrl)
            .map(function (response) { return response.json(); });
    };
    return AgencyService;
}());
AgencyService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AgencyService);

var _a;
//# sourceMappingURL=agency.service.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__http_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// Services

// Import envirnoment variable

var FileService = (function () {
    function FileService(http) {
        this.http = http;
        this.upadateuserprofile = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].SERVER_URL + '/file/upload';
    }
    FileService.prototype.updateImage = function (user) {
        var body = JSON.stringify(user);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.upadateuserprofile, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json()); });
    };
    return FileService;
}());
FileService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__http_service__["a" /* HttpService */]) === "function" && _a || Object])
], FileService);

var _a;
//# sourceMappingURL=file.service.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HelpService = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param http
     */
    function HelpService(http) {
        this.http = http;
        /* ATTRIBUTES */
        this.url = '/assets/faq.json';
    }
    /**
     * Get FAQ data
     */
    HelpService.prototype.getFAQs = function () {
        return this.http.get(this.url)
            .map(function (res) { return res.json(); });
    };
    return HelpService;
}());
HelpService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], HelpService);

var _a;
//# sourceMappingURL=help.service.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_solicitation_service__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitationReviewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SolicitationReviewComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param solicitationService
     * @param route
     */
    function SolicitationReviewComponent(solicitationService, route) {
        this.solicitationService = solicitationService;
        this.route = route;
        /* ATTRIBUTES */
        this.solicitation = [];
        this.choices = [
            { value: 'Yes', display: 'Yes' },
            { value: 'No', display: 'No' }
        ];
        this.review = {
            eit: '',
            standards: '',
            v_conformance: '',
            evaluation: '',
            a_conformance: '',
            comments: ''
        };
    }
    /**
     * lifecycle
     */
    SolicitationReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.solicitationIndex = params['id'];
            _this.solicitationService.getSolicitation(_this.solicitationIndex)
                .subscribe(function (solicitation) {
                _this.solicitation.push(solicitation);
            }, function (err) {
            });
        });
    };
    return SolicitationReviewComponent;
}());
SolicitationReviewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-solicitation-review',
        template: __webpack_require__(905),
        styles: [__webpack_require__(787)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object])
], SolicitationReviewComponent);

var _a, _b;
//# sourceMappingURL=solicitation-review.component.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__solicitation_service__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackReportComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FeedbackReportComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     */
    function FeedbackReportComponent(solicitationService) {
        this.solicitationService = solicitationService;
        /* ATTRIBUTES */
        this.params = {
            "$where": "this.feedback.length > 0"
        };
    }
    /**
     * lifecycle
     */
    FeedbackReportComponent.prototype.ngOnInit = function () {
        this.getFeedback();
    };
    /**
     * get feedback
     */
    FeedbackReportComponent.prototype.getFeedback = function () {
        var _this = this;
        this.solicitationService.getSolicitationFeedback(this.params).subscribe(function (data) {
            _this.feedback = data;
            _this.feedback.forEach(function (element) {
                var history = element.history.filter(function (d) { return d.action == "provided feedback on the solicitation prediction result"; })[0];
                element.submitter = history.user;
                element.date = history.date;
            });
            _this.feedback.sort(function (a, b) {
                var aDate = new Date(a.date);
                var bDate = new Date(b.date);
                if (aDate > bDate)
                    return -1;
                else
                    return 1;
            });
        }, function (error) { return console.log(error); });
    };
    return FeedbackReportComponent;
}());
FeedbackReportComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-feedback-report',
        template: __webpack_require__(906),
        styles: [__webpack_require__(788)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object])
], FeedbackReportComponent);

var _a;
//# sourceMappingURL=feedback-report.component.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_service__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param route
     * @param solicitationService
     */
    function FormComponent(route, solicitationService) {
        var _this = this;
        this.route = route;
        this.solicitationService = solicitationService;
        var solNum = this.route.snapshot.params["id"];
        this.params = {
            solNum: solNum
        };
        this.solicitationService.getSolicitationFeedback(this.params).subscribe(function (data) {
            _this.solicitation = data[0];
            var history = _this.solicitation.history.filter(function (d) { return d.action == "provided feedback on the solicitation prediction result"; })[0];
            _this.submitter = history.user;
            _this.date = history.date;
            console.log(data[0]);
        }, function (error) { return console.log(error); });
    }
    FormComponent.prototype.ngOnInit = function () {
    };
    return FormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FormComponent.prototype, "solicitation", void 0);
FormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-feedback-form',
        template: __webpack_require__(907),
        styles: [__webpack_require__(789)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */]) === "function" && _b || Object])
], FormComponent);

var _a, _b;
//# sourceMappingURL=form.component.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitationReportComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SolicitationReportComponent = (function () {
    /**
     * constructor
     * @param solicitationService
     * @param router
     */
    function SolicitationReportComponent(solicitationService, router) {
        this.solicitationService = solicitationService;
        this.router = router;
        this.solicitation = {};
        this.ict = [];
        this.solType = [];
        this.revResult = [];
        this.dateSorting = 1;
        this.stacked = false;
        this.today = new Date();
        this.maxDate = new Date();
        this.dateScan = "";
        this.filterParams = {
            agency: '',
            office: '',
            contact: '',
            eitLikelihood: '',
            numDocs: '',
            reviewStatus: '',
            reviewRec: '',
        };
        this.sizeshow = false;
    }
    ;
    /**
     * lifecycle
     */
    SolicitationReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stacked = window.matchMedia("(max-width: 992px)").matches;
        this.initFilterParams();
        this.solicitationService.getFilteredSolicitations(this.filterParams)
            .subscribe(function (solicitations) {
            _this.solicitations = solicitations;
            _this.solicitationService.solicitations = solicitations;
            _this.solicitations = _this.solicitations.sort(function (a, b) {
                var aDate = new Date(a.date);
                var bDate = new Date(b.date);
                if (aDate > bDate)
                    return -1;
                else if (aDate < bDate)
                    return 1;
                else
                    return 0;
            });
            _this.dateScan = _this.solicitations[0].date;
            __WEBPACK_IMPORTED_MODULE_3_jquery__('.pDataTable').show();
            // sorting
            _this.solicitations = _this.sortByReviewResult(_this.solicitations);
            _this.getNoticeTypes(_this.solicitations);
        }, function (err) {
        });
        this.ict.push({ label: 'All', value: null });
        this.ict.push({ label: 'Yes', value: 'Yes' });
        this.ict.push({ label: 'No', value: 'No' });
        this.revResult.push({ label: 'All', value: null });
        this.revResult.push({ label: 'Non-compliant (Action Required)', value: "Non-compliant (Action Required)" });
        this.revResult.push({ label: 'Undetermined', value: 'Undetermined' });
        this.revResult.push({ label: 'Compliant', value: "Compliant" });
    };
    /**
     * initialize filter
     */
    SolicitationReportComponent.prototype.initFilterParams = function () {
        var agency = localStorage.getItem("agency");
        var userRole = localStorage.getItem("userRole");
        if (agency.indexOf("General Services Administration") > -1 && (userRole.indexOf('Administrator') > -1 || userRole.indexOf('SRT Program Manager') > -1)) {
            this.filterParams.agency = "";
        }
        else {
            this.filterParams.agency = localStorage.getItem("agency");
        }
    };
    /**
     * select solicitation
     * Manual review button kicks this off.  navigates to solicitation review page
     * @param solicitation
     */
    SolicitationReportComponent.prototype.selectSol = function (solicitation) {
        var _this = this;
        var now = new Date().toLocaleDateString();
        var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
        var r = solicitation.history.push({ 'date': now, 'action': "reviewed solicitation action requested summary", 'user': user, 'status': '' });
        this.solicitationService.updateHistory(solicitation)
            .subscribe(function (msg) {
            _this.router.navigate(['/solicitation/report', solicitation._id]);
        }, function (err) {
        });
    };
    /**
     * sort by review result
     * @param solicitations
     */
    SolicitationReportComponent.prototype.sortByReviewResult = function (solicitations) {
        var Undetermined = solicitations.filter(function (d) { return d.reviewRec == 'Undetermined'; });
        var Noncompliant = solicitations.filter(function (d) { return d.reviewRec == 'Non-compliant (Action Required)'; });
        var Compliant = solicitations.filter(function (d) { return d.reviewRec == 'Compliant'; });
        solicitations = Noncompliant.concat(Compliant).concat(Undetermined);
        return solicitations;
    };
    /**
     * get notice types for filter
     * @param solicitations
     */
    SolicitationReportComponent.prototype.getNoticeTypes = function (solicitations) {
        var noticeTypeMap = {};
        if (solicitations) {
            solicitations.forEach(function (element) {
                var noticeTypelabel = element.noticeType;
                var noticeTypevalue = element.noticeType;
                var noticeCount = 1;
                if (noticeTypeMap.hasOwnProperty(element.noticeType)) {
                    noticeCount = noticeTypeMap[element.noticeType].count + 1;
                    noticeTypeMap[element.noticeType] = { label: noticeTypelabel, value: noticeTypevalue, count: noticeCount };
                }
                else {
                    noticeCount = 1;
                    noticeTypeMap[element.noticeType] = { label: noticeTypelabel, value: noticeTypevalue, count: noticeCount };
                }
            });
            this.solType = [];
            this.solType.push({ label: 'Any', value: null });
            for (var k in noticeTypeMap) {
                this.solType.push({ label: noticeTypeMap[k].label + ' (' + noticeTypeMap[k].count + ')', value: noticeTypeMap[k].label });
            }
        }
    };
    /**
     * filter solicitation by date
     * @param event
     */
    SolicitationReportComponent.prototype.filterDate = function (event) {
        var _this = this;
        if (this.dateFrom && this.dateTo) {
            this.minDate = this.dateFrom;
            this.maxDate = this.dateTo;
            this.solicitations = this.solicitationService.solicitations.filter(function (d) {
                var dDate = new Date(d.date);
                return dDate >= _this.dateFrom && dDate <= _this.dateTo;
            });
            this.getNoticeTypes(this.solicitations);
        }
    };
    /**
     * reset filter result
     */
    SolicitationReportComponent.prototype.reset = function () {
        if (!this.dateFrom && !this.dateTo) {
            this.solicitations = this.solicitationService.solicitations;
        }
    };
    /**
     * sort solicitation by date
     * @param event
     */
    SolicitationReportComponent.prototype.soryByDate = function (event) {
        if (this.dateSorting != event.order) {
            this.dateSorting = event.order;
            this.solicitations = this.solicitations.sort(function (a, b) {
                var aDate = new Date(a.date);
                var bDate = new Date(b.date);
                if (aDate > bDate)
                    return -1 * event.order;
                else if (aDate < bDate)
                    return 1 * event.order;
                else
                    return 0 * event.order;
            });
        }
        this.getNoticeTypes(this.solicitations);
    };
    return SolicitationReportComponent;
}());
SolicitationReportComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-solicitation-report',
        template: __webpack_require__(908),
        styles: [__webpack_require__(790)],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object])
], SolicitationReportComponent);

var _a, _b;
//# sourceMappingURL=solicitation-report.component.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SolicitationComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     */
    function SolicitationComponent() {
    }
    /**
     * lifecycle
     */
    SolicitationComponent.prototype.ngOnInit = function () {
    };
    return SolicitationComponent;
}());
SolicitationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-solicitation',
        template: __webpack_require__(909),
        styles: [__webpack_require__(791)]
    }),
    __metadata("design:paramtypes", [])
], SolicitationComponent);

//# sourceMappingURL=solicitation.component.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__solicitation_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__email__ = __webpack_require__(207);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailPocComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EmailPocComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param solicitationService
     * @param router
     * @param route
     */
    function EmailPocComponent(solicitationService, router, route) {
        this.solicitationService = solicitationService;
        this.router = router;
        this.route = route;
        this.type = "email";
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.emailSent = false;
        this.editorContent = "<h3>I am Example content</h3>";
        this.editorOptions = {
            placeholder: "insert content...",
            modules: {
                toolbar: false
            },
        };
    }
    /**
     * lifecycle
     */
    EmailPocComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            var now = new Date().toLocaleDateString();
            _this.solicitationID = params['id'];
            _this.solicitationService.getSolicitation(_this.solicitationID).subscribe(function (data) {
                data.parseStatus.forEach(function (element) {
                    if (element.status == "successfully parsed")
                        element.status = "Yes";
                    else if (element.status == "processing error")
                        element.status = "No";
                });
                _this.step1 = data.history.filter(function (e) { return e["action"].indexOf('reviewed solicitation action requested summary') > -1; }).length > 0;
                _this.step2 = data.history.filter(function (e) { return e["action"].indexOf('sent email to POC') > -1; }).length > 0;
                _this.step3 = data.history.filter(function (e) { return e["action"].indexOf('provided feedback on the solicitation prediction result') > -1; }).length > 0;
                _this.emailSent = data.history.filter(function (e) { return ((e["action"].indexOf('sent email to POC') > -1)); }).length > 0;
                _this.emailTo = "srttestuser@gmail.com";
                _this.emailCC = localStorage.getItem("email");
                _this.subject = "Section 508 Requirements Assessment of " + data.solNum + ", reviewed on " + now;
                _this.emailBody =
                    "<p>Solicitation Title: " + data.title + "</p>" +
                        "<p>Link: " + "<a href=" + data.url + ">" + data.url + "</a></p>" +
                        "<br>" +
                        "<p>Dear Acquisition Professional:</p>" +
                        "<br>" +
                        "<p>You are receiving this letter as the point of contact for the solicitation referenced above.</p>" +
                        "<p>Your solicitation appears to be related to Information and Communication Technology (ICT) deliverables as " +
                        "defined by the Access Board in the Section 508 Standard. The GSA Solicitation Review Tool (SRT) has flagged " +
                        "your solicitation because it <i style='text-decoration: underline;'><b>does not appear to be in compliance with Section 508 of the Rehabilitation Act </b></i>. Section 508 " +
                        "requires that any ICT that is developed, procured, maintained, or used by the Federal " +
                        "government conform to the Section 508 Standards.  This means that Section 508 technical criteria MUST be " +
                        "included in the requirements document in order to inform the vendor of the Section 508 deliverables to meet the " +
                        "contractual requirements. </p>" +
                        "<br>" +
                        "<p>To assist your efforts in addressing Section 508, please refer to the " +
                        "<a href='https://section508.gov/content/guidance'>Section 508 Guidelines</a>. GSA also provides free tools and resources. " +
                        "<a href='https://www.section508.gov/content/buy'>The BuyAccessible Tool</a> is a web-based tool that guides users through the " +
                        "process of gathering Section 508 requirements for ICT procurements  and provides documentation of due diligence.</p>" +
                        "<br>" +
                        "<p>For additional assistance with Section 508 requirements or concerns about the assessment of this solicitation, " +
                        "please reach out to the Section 508 Coordinator copied on this email or contact us at <a href='mailto:section.508@gsa.gov'>section.508@gsa.gov</a>.</p>" +
                        "<br>" +
                        "<p>Sincerely</p>" +
                        "<br>" +
                        "<p>" +
                        localStorage.getItem("firstName") + " " +
                        localStorage.getItem("lastName") + "</p>" +
                        "<p>" +
                        localStorage.getItem("position") + "," +
                        localStorage.getItem("agency") + "</p>";
                _this.solicitation = data;
                _this.myForm.controls['emailTo'].setValue(_this.emailTo);
                _this.myForm.controls['emailCC'].setValue(_this.emailCC);
                _this.myForm.controls['subject'].setValue(_this.subject);
                _this.myForm.controls['message'].setValue(_this.emailBody);
            }, function (err) { return console.log(err); });
        });
        this.emailCC = localStorage.getItem("email");
        this.myForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            emailTo: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]("srttestuser@gmail.com", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            emailCC: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](this.emailCC, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            subject: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](this.subject, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            message: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](this.emailBody, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
        var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    };
    /**
     * send an email to contact
     */
    EmailPocComponent.prototype.emailContact = function () {
        var _this = this;
        var emailContent = new __WEBPACK_IMPORTED_MODULE_4__email__["a" /* Email */](this.myForm.value.emailTo, this.myForm.value.subject, this.myForm.value.message, this.myForm.value.emailFrom, this.myForm.value.emailCC);
        var now = new Date().toLocaleDateString();
        var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
        var r = this.solicitation.history.push({ 'date': now, 'action': "sent email to POC", 'user': user, 'status': 'Email Sent to POC' });
        this.solicitationService.sendContactEmail(emailContent)
            .subscribe(function (msg) {
            _this.emailSent = true;
            _this.step2 = true;
        }, function (err) {
        });
        this.solicitationService.updateHistory(this.solicitation)
            .subscribe(function (msg) {
        }, function (err) {
        });
    };
    EmailPocComponent.prototype.skiptext = function (event) {
        if (event.keyCode == 9) {
            $('#btn').focus();
        }
    };
    return EmailPocComponent;
}());
EmailPocComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-email-poc',
        template: __webpack_require__(910),
        styles: [__webpack_require__(792)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object])
], EmailPocComponent);

var _a, _b, _c;
//# sourceMappingURL=email-poc.component.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Email; });
var Email = (function () {
    /**
     * constructor
     * @param emailTo
     * @param subject
     * @param text
     * @param emailFrom
     * @param emailCC
     */
    function Email(emailTo, subject, text, emailFrom, emailCC) {
        this.emailTo = emailTo;
        this.subject = subject;
        this.text = text;
        this.emailFrom = emailFrom;
        this.emailCC = emailCC;
    }
    return Email;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__survey_service__ = __webpack_require__(212);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpUsImproveComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HelpUsImproveComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param solicitationService
     * @param surveyService
     * @param router
     * @param route
     */
    function HelpUsImproveComponent(solicitationService, surveyService, router, route) {
        this.solicitationService = solicitationService;
        this.surveyService = surveyService;
        this.router = router;
        this.route = route;
        this.surveyModel = [];
        this.feedbackSent = false;
        this.type = 'feedback';
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
    }
    /**
     * lifecycle
     */
    HelpUsImproveComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            var now = new Date().toLocaleDateString();
            _this.solicitationID = params['id'];
            console.log(_this.solicitationID);
            _this.solicitationService.getSolicitation(_this.solicitationID).subscribe(function (data) {
                data.parseStatus.forEach(function (element) {
                    if (element.status == 'successfully parsed')
                        element.status = 'Yes';
                    else if (element.status == 'processing error')
                        element.status = 'No';
                });
                _this.step1 = data.history.filter(function (e) {
                    return e['action'].indexOf('reviewed solicitation action requested summary') > -1;
                }).length > 0;
                _this.step2 = data.history.filter(function (e) {
                    return e['action'].indexOf('sent email to POC') > -1;
                }).length > 0;
                _this.step3 = data.history.filter(function (e) {
                    return e['action'].indexOf('provided feedback on the solicitation prediction result') > -1;
                }).length > 0;
                _this.solicitation = data;
                var user = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
                _this.feedbackSent = _this.solicitation.history.filter(function (e) { return ((e['action'].indexOf('provided feedback on the solicitation prediction result') > -1) && (e['user'].indexOf(user) > -1)); }).length > 0;
                _this.getSurveys();
            }, function (err) { return console.log(err); });
        });
    };
    /**
     * input percentage
     * @param survey
     * @param answer
     */
    HelpUsImproveComponent.prototype.inputPercent = function (survey, answer) {
        survey.Answer = answer;
        this.surveyModel[survey.ID] = answer;
    };
    /**
     * text area
     * @param survey
     * @param answer
     */
    HelpUsImproveComponent.prototype.textarea = function (survey, answer) {
        survey.Answer = answer;
        this.surveyModel[survey.ID] = answer;
    };
    /**
     * check box
     * @param survey
     * @param answer
     * @param checked
     */
    HelpUsImproveComponent.prototype.checkBox = function (survey, answer, checked) {
        if (checked) {
            if (survey.Type != 'multiple response') {
                survey.Answer = answer;
                this.surveyModel[survey.ID] = answer;
            }
            else {
                survey.Answer = survey.Answer == '' ? answer : survey.Answer + ',' + answer;
                this.surveyModel[survey.ID] = survey.Answer == '' ? answer : survey.Answer + ',' + answer;
            }
        }
    };
    /**
     * get survey questions
     */
    HelpUsImproveComponent.prototype.getSurveys = function () {
        var _this = this;
        this.surveyService.getSurveys().subscribe(function (data) {
            _this.surveys = data.sort(function (a, b) {
                var anum = +a.ID;
                var bnum = +b.ID;
                if (anum > bnum)
                    return 1;
                else
                    return -1;
            });
            for (var i = 0; i < data.length; i++) {
                _this.surveyModel.push('');
            }
        });
    };
    /**
     * send out a feedback
     */
    HelpUsImproveComponent.prototype.feedback = function () {
        var _this = this;
        var now = new Date().toLocaleDateString();
        var user = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
        var r = this.solicitation.history.push({ 'date': now, 'action': 'provided feedback on the solicitation prediction result', 'user': user, 'status': '' });
        this.surveys.forEach(function (element) {
            if (_this.solicitation.feedback == null) {
                _this.solicitation.feedback = [{ 'questionID': element.ID, 'question': element.Question, 'answer': element.Answer }];
            }
            else {
                _this.solicitation.feedback.push({ 'questionID': element.ID, 'question': element.Question, 'answer': element.Answer });
            }
        });
        this.solicitationService.updateHistory(this.solicitation)
            .subscribe(function (msg) {
            _this.feedbackSent = true;
            _this.step3 = true;
        }, function (err) {
        });
    };
    return HelpUsImproveComponent;
}());
HelpUsImproveComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-help-us-improve',
        template: __webpack_require__(911),
        styles: [__webpack_require__(793)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__survey_service__["a" /* SurveyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__survey_service__["a" /* SurveyService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _d || Object])
], HelpUsImproveComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=help-us-improve.component.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_service__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HistoryComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param solicitationService
     * @param router
     * @param route
     */
    function HistoryComponent(solicitationService, router, route) {
        this.solicitationService = solicitationService;
        this.router = router;
        this.route = route;
        this.type = 'history';
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
    }
    /**
     * lifecycle
     */
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            var now = new Date().toLocaleDateString();
            _this.solicitationID = params['id'];
            console.log(_this.solicitationID);
            _this.solicitationService.getSolicitation(_this.solicitationID).subscribe(function (data) {
                data.parseStatus.forEach(function (element) {
                    if (element.status == 'successfully parsed')
                        element.status = 'Yes';
                    else if (element.status == 'processing error')
                        element.status = 'No';
                });
                _this.step1 = data.history.filter(function (e) {
                    return e['action'].indexOf('reviewed solicitation action requested summary') > -1;
                }).length > 0;
                _this.step2 = data.history.filter(function (e) {
                    return e['action'].indexOf('sent email to POC') > -1;
                }).length > 0;
                _this.step3 = data.history.filter(function (e) {
                    return e['action'].indexOf('provided feedback on the solicitation prediction result') > -1;
                }).length > 0;
                _this.solicitation = data;
                _this.history = data.history.sort(function (a, b) {
                    var dateA = new Date(String(a.date));
                    var dateB = new Date(String(b.date));
                    if (dateA > dateB)
                        return 1;
                    else if (dateA < dateB)
                        return -1;
                    else
                        return 0;
                });
            }, function (err) { return console.log(err); });
        });
    };
    HistoryComponent.prototype.ngOnChanges = function () {
    };
    return HistoryComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HistoryComponent.prototype, "history", void 0);
HistoryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-history',
        template: __webpack_require__(912),
        styles: [__webpack_require__(794)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object])
], HistoryComponent);

var _a, _b, _c;
//# sourceMappingURL=history.component.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_service__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PredictionHistoryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Service

var PredictionHistoryComponent = (function () {
    /**
    * constructor
    * @param solicitationService
    * @param route
    */
    function PredictionHistoryComponent(solicitationService, route) {
        this.solicitationService = solicitationService;
        this.route = route;
        this.type = 'history';
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
    }
    PredictionHistoryComponent.prototype.ngOnInit = function () {
    };
    return PredictionHistoryComponent;
}());
PredictionHistoryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-prediction-history',
        template: __webpack_require__(913),
        styles: [__webpack_require__(795)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object])
], PredictionHistoryComponent);

var _a, _b;
//# sourceMappingURL=prediction-history.component.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_service__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResultsDetailComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param solicitationService
     * @param router
     * @param route
     */
    function ResultsDetailComponent(solicitationService, router, route) {
        this.solicitationService = solicitationService;
        this.router = router;
        this.route = route;
        /* ATTRIBUTES */
        this.emailType = '1';
        this.type = 'report';
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
    }
    /**
     * lifecycle
     */
    ResultsDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            var now = new Date().toLocaleDateString();
            _this.solicitationID = params['id'];
            console.log(_this.solicitationID);
            _this.solicitationService.getSolicitation(_this.solicitationID).subscribe(function (data) {
                console.log(data);
                data.parseStatus.forEach(function (element) {
                    if (element.status === 'successfully parsed') {
                        element.status = 'Yes';
                    }
                    else if (element.status === 'processing error') {
                        element.status = 'No';
                    }
                });
                _this.step1 = data.history.filter(function (e) {
                    return e['action'].indexOf('reviewed solicitation action requested summary') > -1;
                }).length > 0;
                _this.step2 = data.history.filter(function (e) {
                    return e['action'].indexOf('sent email to POC') > -1;
                }).length > 0;
                _this.step3 = data.history.filter(function (e) {
                    return e['action'].indexOf('provided feedback on the solicitation prediction result') > -1;
                }).length > 0;
                _this.solicitation = data;
                var totalDoc = Number(_this.solicitation.numDocs);
                if (!isNaN(totalDoc)) {
                    // doesn't have lock files
                    if (totalDoc == _this.solicitation.parseStatus.length) {
                    }
                    else {
                        var lock = totalDoc - _this.solicitation.parseStatus.length;
                        _this.lockDocs = [];
                        for (var i = 1; i <= lock; i++) {
                            _this.lockDocs.push(i);
                        }
                    }
                }
            }, function (err) { return console.log(err); });
        });
    };
    return ResultsDetailComponent;
}());
ResultsDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-results-detail',
        template: __webpack_require__(914),
        styles: [__webpack_require__(796)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _c || Object])
], ResultsDetailComponent);

var _a, _b, _c;
//# sourceMappingURL=results-detail.component.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SurveyService = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param http
     */
    function SurveyService(http) {
        this.http = http;
        /* ATTRIBUTES */
        this.surveysURL = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].SERVER_URL + '/surveys';
    }
    /**
     * Get Surveys from json file
     */
    SurveyService.prototype.getSurveys = function () {
        return this.http.get(this.surveysURL)
            .map(function (response) { return response.json(); });
    };
    return SurveyService;
}());
SurveyService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SurveyService);

var _a;
//# sourceMappingURL=survey.service.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_file_service__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_guard_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_user__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import services




// import classes

var ProfileComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     */
    function ProfileComponent(router, userService, authService, fileService, route, auth) {
        this.router = router;
        this.userService = userService;
        this.authService = authService;
        this.fileService = fileService;
        this.route = route;
        this.auth = auth;
        this.filterParams = {};
        this.params = {};
        this.self = false;
        this.isGSAAdmin = false;
        this.editable = false;
        this.paramAdmin = {};
        this.current = this.authService.getCurrent();
    }
    /**
     * lifecycle
     */
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe((function (params) {
            var userID = params['userID'];
            _this.getSelectedUser(userID);
        }));
        this.isGSAAdmin = this.auth.isGSAAdmin;
    };
    /**
     * lifecycle
     */
    ProfileComponent.prototype.ngOnChange = function () {
    };
    /**
     * Get Current User.
     */
    ProfileComponent.prototype.getSelectedUser = function (userID) {
        var _this = this;
        this.params['UserID'] = userID;
        this.userService.getUserFromDatabase(this.params).subscribe(function (data) {
            _this.selectedUser = new __WEBPACK_IMPORTED_MODULE_6__shared_user__["a" /* User */](data);
            _this.title = _this.current.id === userID ? "Your Profile" : "Review Profile";
            _this.self = _this.current.id === userID ? true : false;
            debugger;
        }, function (error) {
            console.log(error);
        });
    };
    /**
      * Edit the info.
      */
    ProfileComponent.prototype.editInfo = function () {
        this.editable = !this.editable;
    };
    /**
       * Save the info.
       */
    ProfileComponent.prototype.saveInfo = function () {
        var _this = this;
        console.log(this.newemail);
        this.paramAdmin['NewEmail'] = this.newemail;
        this.paramAdmin['UserID'] = this.route.snapshot.params['userID'];
        this.userService.updateUserInfo(this.paramAdmin).subscribe(function (data) {
            console.log(data);
            _this.selectedUser.email = data.email;
            if (_this.selectedUser.email) {
                _this.editable = false;
            }
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * update the user profile.
     * Kailun's new add
     */
    ProfileComponent.prototype.uploadphoto = function () {
        debugger;
        this.fileService.updateImage(this.current).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(917),
        styles: [__webpack_require__(799)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_file_service__["a" /* FileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_file_service__["a" /* FileService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]) === "function" && _f || Object])
], ProfileComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "correct8.944de30f0d6c95c2aa54.svg";

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Class


var AuthService = AuthService_1 = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param http
     */
    function AuthService(http) {
        this.http = http;
        this.userUrl = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].SERVER_URL + '/auth';
        this.loginUrl = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].SERVER_URL + '/auth/login';
        this.tokenUrl = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].SERVER_URL + '/auth/tokenCheck';
        this.resetUrl = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].SERVER_URL + '/auth/resetPassword';
        this.updatePasswordByUrL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].SERVER_URL + '/auth/email/temp';
    }
    /**
     * signup
     * register a new user
     * @param user
     */
    AuthService.prototype.signup = function (user) {
        var body = JSON.stringify(user);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.userUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json()); });
    };
    /**
     * login
     * login user.  returns the json web token for the user.
     * @param user
     */
    AuthService.prototype.login = function (user) {
        debugger;
        var body = JSON.stringify(user);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.loginUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json()); });
    };
    /**
  * Update password
  * @param user
  */
    // public updatePasswordByUrl() {
    //     debugger
    //   return this.http.get(this.updatePasswordByUrL)
    //     .map((response: Response) => response.json())
    //     .catch((error: Response) => Observable.throw(error.json()));
    // }
    /**
     * logout
     * clear json web token on logout
     */
    AuthService.prototype.logout = function () {
        localStorage.removeItem("token");
        localStorage.clear();
    };
    /**
     * check token
     */
    AuthService.prototype.checkToken = function () {
        var body = localStorage;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.tokenUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json()); });
    };
    /**
     * Verify if User is logged in
     */
    AuthService.prototype.isLogin = function () {
        return (this.getToken() !== null);
        // const body = { token: this.getToken() };
        // const headers = new Headers({ 'Content-Type': 'application/json' });
        // return this.http.post(this.URL_TOKEN, body, { headers: headers })
        //   .map((response: Response) => response.json())
        //   .catch((error: Response) => Observable.throw(error.json()));
    };
    /**
     * GetToken.
     */
    AuthService.prototype.getToken = function () {
        return localStorage.getItem(AuthService_1.TOKEN);
    };
    /**
   * Reset the password.
   */
    AuthService.prototype.resetPassword = function (email) {
        var body = JSON.stringify({ email: email });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.resetUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json()); });
    };
    /**
     * Get Current User from localstorage.
     */
    AuthService.prototype.getCurrent = function () {
        var current = new __WEBPACK_IMPORTED_MODULE_3__user__["a" /* User */]();
        current.id = localStorage.getItem('id');
        current.lastName = localStorage.getItem('lastName');
        current.agency = localStorage.getItem('agency');
        current.position = localStorage.getItem('position');
        current.userRole = localStorage.getItem('userRole');
        return current;
    };
    return AuthService;
}());
/* ATTRIBUTES */
AuthService.TOKEN = 'token';
AuthService = AuthService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AuthService);

var AuthService_1, _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param authService
     * @param router
     */
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
        /* ATTRIBUTES */
        this.isLogin = false;
        this.isGSAAdmin = false;
    }
    /**
     * is activate
     * @param route
     * @param state
     */
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    /**
     * check if use is logged in
     * @param url
     */
    AuthGuard.prototype.checkLogin = function (url) {
        var _this = this;
        if (this.isLogin) {
            return true;
        }
        else {
            this.authService.checkToken().subscribe(function (data) {
                _this.isLogin = data.isLogin;
                if (data.isLogin) {
                    _this.router.navigate([url]);
                    return true;
                }
                else {
                    _this.router.navigate(['/auth']);
                }
            });
        }
    };
    //Kailun's new add
    /**
   * Can activate child?
   * @param next
   * @param state
   */
    AuthGuard.prototype.canActivateChild = function (next, state) {
        return this.authService.isLogin();
        // return this.authenticationService.isLogin().map(
        //   data => {
        //     if (data.isLogin) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   },
        //   error => {
        //     return false;
        //   }
        // );
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SolicitationService = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param http
     */
    function SolicitationService(http) {
        this.http = http;
        /* ATTRIBUTES */
        this.pushedSolicitations = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.pushedSolicitation = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.analytics = {
            ScannedSolicitationChart: null,
            MachineReadableChart: null,
            ComplianceRateChart: null,
            ConversionRateChart: null,
            TopSRTActionChart: null,
            TopAgenciesChart: null,
            PredictResultChart: null,
            UndeterminedSolicitationChart: null
        };
        this.solicitationsUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].SERVER_URL + "/predictions";
        this.feedbackURL = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].SERVER_URL + "/solicitation/feedback";
        this.ICTUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].SERVER_URL + "/ICT";
        this.solicitationsFilterUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].SERVER_URL +
            "/predictions/filter";
        this.solicitationUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].SERVER_URL + "/solicitation/";
        this.emailUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].SERVER_URL + "/email/";
        this.AgencyUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].SERVER_URL + "/Agencies";
    }
    /**
     * get data
     */
    SolicitationService.prototype.getData = function () {
        var data = this.http
            .get(this.solicitationsUrl)
            .map(function (res) { return res.json(); });
        return data;
    };
    /**
     * Get filtered solicitations
     * @param body
     */
    SolicitationService.prototype.getFilteredSolicitations = function (body) {
        return this.http
            .post(this.solicitationsFilterUrl, body)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server Error');
        });
    };
    /**
     * get ICT
     */
    SolicitationService.prototype.getICT = function () {
        var data = this.http.get(this.ICTUrl).map(function (res) { return res.json(); });
        return data;
    };
    /**
     * Get solicitation
     * @param index
     */
    SolicitationService.prototype.getSolicitation = function (index) {
        var solUrl = this.solicitationUrl + index;
        return this.http.get(solUrl).map(function (res) { return res.json(); });
    };
    /**
     * get feedback of selected solicitation
     * @param filter
     */
    SolicitationService.prototype.getSolicitationFeedback = function (filter) {
        console.log(filter);
        return this.http
            .post(this.feedbackURL, filter)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server Error');
        });
    };
    /**
     * push soliciations
     * @param solicitations
     */
    SolicitationService.prototype.pushSolicitations = function (solicitations) {
        this.pushedSolicitations.emit(solicitations);
    };
    /**
     * Send contact email
     * @param emailContent
     */
    SolicitationService.prototype.sendContactEmail = function (emailContent) {
        return this.http
            .post(this.emailUrl, emailContent)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server Error');
        });
    };
    /**
     * update history of selected solicitation
     * @param solicitation
     */
    SolicitationService.prototype.updateHistory = function (solicitation) {
        return this.http
            .post(this.solicitationUrl, solicitation)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server Error');
        });
    };
    return SolicitationService;
}());
SolicitationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SolicitationService);

var _a;
//# sourceMappingURL=solicitation.service.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    // SERVER_URL: 'http://localhost:3000',
    SERVER_URL: 'http://localhost:3000',
    EMAIL_NOTIFICATION: true,
    FILE_UPLOAD_API: 'http://localhost:3000/file/upload'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 510:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAQAAACssQXfAAAAiklEQVR4AT3PNUFGARAA4MO1AFRgQVrgTEgNXBZ0Z0aLQI0XANf594932LlLROjQHgmhM9mVwlhkMJO/4S7noMjghKEIPcmuUNNyGpa8uzUcYdA1qjjJ+ntwY8Q16jiIBCte0fSmUUr2Mio3W/BJqwQt2xHaZFhXhBnPqFr7D6eRKVMereeIv5++AKLreD06aLBkAAAAAElFTkSuQmCC"

/***/ }),

/***/ 512:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 512;


/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(35);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__http_service__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//Services


var UserService = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param http
     */
    function UserService(http, authService) {
        this.http = http;
        this.authService = authService;
        /* ATTRIBUTES */
        this.removeUserUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/user/remove';
        this.updateUserUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/user/update';
        this.userUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/user/filter';
        this.updatePasswordUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/user/updatePassword';
        this.checkPasswordUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/user/checkPassword';
        this.getCurrentUserUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/user/getCurrentUser';
        this.getUserFromDBUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/user/getUserInfo';
        this.updateUserInfoUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].SERVER_URL + '/user/updateUserInfo';
        this.updateCurrentUser = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * Get entire user records
     * @param filterParams
     */
    UserService.prototype.getUsers = function (filterParams) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.userUrl, filterParams)
            .map(function (response) { return response.json(); });
    };
    /**
     * Register a new user
     * @param currentUser
     */
    UserService.prototype.saveUser = function (currentUser) {
        this.updateCurrentUser.emit(currentUser);
    };
    /**
     * Update User
     * @param updatedUser
     */
    UserService.prototype.updateUser = function (updatedUser) {
        return this.http.post(this.updateUserUrl, updatedUser)
            .map(function (response) { return response.json(); });
    };
    /**
     * Update password
     * @param user
     */
    UserService.prototype.updatePassword = function (filterParams) {
        var body = JSON.stringify(filterParams);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.updatePasswordUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json()); });
    };
    /**
   * Get Users.
   * @param filterParams
   */
    UserService.prototype.getUserPicAndDate = function (filterParams) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.getCurrentUserUrl, filterParams, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    /**
   * Get user INFO from database.
   * @param Params
   */
    UserService.prototype.getUserFromDatabase = function (params) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.getUserFromDBUrl, params, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    /**
     * Check password
     * @param user
     */
    UserService.prototype.checkPassword = function (oldpassword) {
        var body = JSON.stringify(oldpassword);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.checkPasswordUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json()); });
    };
    /**
      * Update user profile
      * @param user
      */
    UserService.prototype.updateUserInfo = function (newEmail) {
        var body = JSON.stringify(newEmail);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.updateUserInfoUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json()); });
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_app_shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_shared_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], UserService);

var _a, _b;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_charts_ng2_charts__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_tooltip__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__analytics_component__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__top_srt_actions_top_srt_actions_component__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__top_agencies_top_agencies_component__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__scanned_solicitation_scanned_solicitation_component__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__user_login_user_login_component__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__machine_readable_machine_readable_component__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__prediction_result_prediction_result_component__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__top_agencies_percentage_top_agencies_percentage_component__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__undetermined_solicitations_undetermined_solicitations_component__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__line_charts_line_charts_component__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__donut_chart_donut_chart_component__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_analytics_service__ = __webpack_require__(191);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyticsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// open sources modules


// main component

// children components










//Service

var AnalyticsModule = (function () {
    function AnalyticsModule() {
    }
    return AnalyticsModule;
}());
AnalyticsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_charts_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_6_ng2_tooltip__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__analytics_component__["a" /* AnalyticsComponent */],
            __WEBPACK_IMPORTED_MODULE_8__top_srt_actions_top_srt_actions_component__["a" /* TopSrtActionsComponent */],
            __WEBPACK_IMPORTED_MODULE_9__top_agencies_top_agencies_component__["a" /* TopAgenciesComponent */],
            __WEBPACK_IMPORTED_MODULE_10__scanned_solicitation_scanned_solicitation_component__["a" /* ScannedSolicitationComponent */],
            __WEBPACK_IMPORTED_MODULE_11__user_login_user_login_component__["a" /* UserLoginComponent */],
            __WEBPACK_IMPORTED_MODULE_12__machine_readable_machine_readable_component__["a" /* MachineReadableComponent */],
            __WEBPACK_IMPORTED_MODULE_13__prediction_result_prediction_result_component__["a" /* PredictionResultComponent */],
            __WEBPACK_IMPORTED_MODULE_14__top_agencies_percentage_top_agencies_percentage_component__["a" /* TopAgenciesPercentageComponent */],
            __WEBPACK_IMPORTED_MODULE_15__undetermined_solicitations_undetermined_solicitations_component__["a" /* UndeterminedSolicitationsComponent */],
            __WEBPACK_IMPORTED_MODULE_16__line_charts_line_charts_component__["a" /* LineChartsComponent */],
            __WEBPACK_IMPORTED_MODULE_17__donut_chart_donut_chart_component__["a" /* DonutChartComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_18__services_analytics_service__["a" /* AnalyticsService */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_7__analytics_component__["a" /* AnalyticsComponent */]
        ]
    })
], AnalyticsModule);

//# sourceMappingURL=analytics.module.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DonutChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DonutChartComponent = (function () {
    /**
     * constructor
     */
    function DonutChartComponent() {
        this.doughnutChartLabels = ['Download Sales', 'In-Store Sales'];
        this.doughnutChartData = [0, 1];
        this.doughnutChartType = 'doughnut';
        this.percentage = 0;
        this.numerator = 0;
        this.denominator = 0;
        this.id = '';
        this.options = {
            cutoutPercentage: 85,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            maintainAspectRatio: false,
            responsive: true,
        };
        this.colorsOverride = [{
                backgroundColor: ['#2C81C0', '#f7f7f7'],
                hoverBackgroundColor: ['#2C81C0', '#f7f7f7'],
            }];
    }
    /**
     * lifecycle
     */
    DonutChartComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    DonutChartComponent.prototype.ngOnChanges = function () {
        if (this.doughnutChartDataInput) {
            if (this.title === "Conversion Rate") {
                this.numerator = this.doughnutChartDataInput.updatedCompliantICT;
                this.denominator = this.doughnutChartDataInput.uncompliance;
                this.doughnutChartData = [this.doughnutChartDataInput.updatedCompliantICT, this.doughnutChartDataInput.uncompliance];
                this.percentage = this.doughnutChartDataInput.uncompliance === 0 ? 0 : Math.round(this.doughnutChartDataInput.updatedCompliantICT / this.doughnutChartDataInput.uncompliance * 100);
                var CountTo = this.percentage;
                this.id = 'ConversionRate';
                this.note = "non-compliant ICT/E&IT solicitations became compliant after they were updated on FedBizOpps.gov";
            }
            else if (this.title === "Preliminary Compliance Rate") {
                this.numerator = this.doughnutChartDataInput.compliance;
                this.denominator = this.doughnutChartDataInput.determinedICT;
                this.doughnutChartData = [this.numerator, this.doughnutChartDataInput.determinedICT - this.doughnutChartDataInput.compliance];
                this.percentage = this.doughnutChartDataInput.determinedICT === 0 ? 0 : Math.round(this.doughnutChartDataInput.compliance / this.doughnutChartDataInput.determinedICT * 100);
                var CountTo = this.percentage;
                this.id = 'ComplianceRate';
                this.note = "ICT/E&IT machine readable solicitations scanned by SRT are Section 508 compliant solicitations";
            }
            __WEBPACK_IMPORTED_MODULE_2_jquery__("#" + this.id).each(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__(this)
                    .prop("Counter", 0)
                    .animate({
                    Counter: '' + CountTo
                }, {
                    duration: 500,
                    easing: 'swing',
                    step: function (now) {
                        __WEBPACK_IMPORTED_MODULE_2_jquery__(this).text(Math.ceil(now) + '%');
                    }
                });
            });
        }
    };
    return DonutChartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonutChartComponent.prototype, "doughnutChartDataInput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonutChartComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonutChartComponent.prototype, "componentTooltip", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonutChartComponent.prototype, "note", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__["BaseChartDirective"]),
    __metadata("design:type", Object)
], DonutChartComponent.prototype, "baseChart", void 0);
DonutChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-donut-chart',
        template: __webpack_require__(882),
        styles: [__webpack_require__(58), __webpack_require__(764)]
    }),
    __metadata("design:paramtypes", [])
], DonutChartComponent);

//# sourceMappingURL=donut-chart.component.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineChartsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LineChartsComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function LineChartsComponent() {
        this.angencyPass = {};
        this.angencyTotal = {};
        this.barData = [];
        this.xAxis = 'Date';
        this.yAxis = 'Compliance Rate (%)';
        this.lineChartData = [
            { data: [0, 2, 2, 4, 8, 12, 12, 16, 16, 18, 20, 24, 28, 32, 34, 32, 30, 30, 36, 40, 43, 45, 45, 46, 47, 48, 49, 50, 51, 51, 53, 55], label: '' },
        ];
        this.lineChartLabels = [];
        this.lineChartType = 'line';
        this.options = {
            cutoutPercentage: 85,
            legend: {
                display: false
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }],
                yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }],
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return '# scanned solicitations: ' + data.datasets[0].data[tooltipItem.index];
                    }
                },
                opacity: 1,
                displayColors: false
            }
        };
        this.colorsOverride = [{
                backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'rgba(44,129,192,1)',
                pointBackgroundColor: 'rgba(44,129,192,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(44,129,192,1)'
            }];
    }
    /**
     * lifecycle
     */
    LineChartsComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    LineChartsComponent.prototype.ngOnChanges = function () {
        if (this.TopAgenciesChart.topAgencies[this.selectedGovernment] != null) {
            var array = this.TopAgenciesChart.topAgencies[this.selectedGovernment];
            if (this.selectedPeriod == "This Year" || this.selectedPeriod == "All") {
                var percentage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var pass = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var _i = 0, _a = this.TopAgenciesChart.topAgencies[this.selectedGovernment]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.date != null) {
                        var date = +item.date.split('/')[0];
                        if (item.predictions.value == 'GREEN')
                            pass[date - 1]++;
                        total[date - 1]++;
                    }
                }
                for (var i = 0; i < total.length; i++)
                    percentage[i] = total[i] == 0 ? 0 : (Math.round(pass[i] / total[i] * 1000) / 10);
                this.lineChartData = [{ data: percentage }];
                this.lineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                this.options["tooltips"].callbacks = {
                    beforeLabel: function (tooltipItem, data) {
                        return "Compliance Rate: " + percentage[tooltipItem.index] + "%";
                    },
                    label: function (tooltipItem, data) {
                        return "Compliance Solicitation: " + pass[tooltipItem.index];
                        ;
                    },
                    afterLabel: function (tooltipItem, data) {
                        var no = total[tooltipItem.index] - pass[tooltipItem.index];
                        return "Non-Compliance Solicitation:" + no;
                    }
                };
                this.xAxis = "Month";
                this.forceChartRefresh();
            }
            else if (this.selectedPeriod == "This Month") {
                var indexFrom = 1;
                var indexTo = this.toPeriod.getDate() + 1;
                var percentage = [];
                var pass = [];
                var total = [];
                this.lineChartLabels = [];
                var month = new Date().getMonth() + 1;
                for (var i = 1; i < indexTo; i++) {
                    this.lineChartLabels.push(month + "/" + i);
                    percentage.push(0);
                    pass.push(0);
                    total.push(0);
                }
                for (var _b = 0, _c = this.TopAgenciesChart.topAgencies[this.selectedGovernment]; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (item.date != null) {
                        var date = +item.date.split('/')[1];
                        if (item.predictions.value == 'GREEN')
                            pass[date - 1]++;
                        total[date - 1]++;
                    }
                }
                for (var i = 0; i < total.length; i++)
                    percentage[i] = total[i] == 0 ? 0 : (Math.round(pass[i] / total[i] * 1000) / 10);
                this.lineChartData = [{ data: percentage }];
                this.options["tooltips"].callbacks = {
                    beforeLabel: function (tooltipItem, data) {
                        return "Compliance Rate: " + percentage[tooltipItem.index] + "%";
                    },
                    label: function (tooltipItem, data) {
                        return "Compliance Solicitation: " + pass[tooltipItem.index];
                        ;
                    },
                    afterLabel: function (tooltipItem, data) {
                        var no = total[tooltipItem.index] - pass[tooltipItem.index];
                        return "Non-Compliance Solicitation:" + no;
                    }
                };
                this.xAxis = "Date";
                this.forceChartRefresh();
            }
        }
        else {
            this.lineChartData = [
                { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: '' },
            ];
            this.lineChartLabels = [];
        }
    };
    /**
     * refresf chart
     */
    LineChartsComponent.prototype.forceChartRefresh = function () {
        var _this = this;
        setTimeout(function () {
            _this.baseChart.refresh();
        }, 10);
    };
    return LineChartsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartsComponent.prototype, "TopAgenciesChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartsComponent.prototype, "selectedGovernment", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartsComponent.prototype, "selectedPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartsComponent.prototype, "toPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartsComponent.prototype, "fromPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__["BaseChartDirective"]),
    __metadata("design:type", Object)
], LineChartsComponent.prototype, "baseChart", void 0);
LineChartsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-line-charts',
        template: __webpack_require__(883),
        styles: [__webpack_require__(58), __webpack_require__(765)]
    }),
    __metadata("design:paramtypes", [])
], LineChartsComponent);

//# sourceMappingURL=line-charts.component.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MachineReadableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MachineReadableComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function MachineReadableComponent() {
        this.hasValue = false;
        this.pieChartLabels = ['Machine Readable', 'Non Machine Readable'];
        this.pieChartData = [0, 0];
        this.pieChartType = 'pie';
        this.options = {
            cutoutPercentage: 0,
            legend: {
                display: true,
                position: 'bottom',
                onClick: function () {
                }
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    title: function (tooltipItem, data) {
                        var label = tooltipItem[0].index == 0 ? "Machine Readable: " : "Non Machine Readable: ";
                        return label;
                    },
                    label: function (tooltipItem, data) {
                        return data.datasets[0].data[tooltipItem.index] + " documents";
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true,
        };
        this.colorsOverride = [{
                backgroundColor: ['#2C81C0', '#f7f7f7'],
                hoverBackgroundColor: ['#2C81C0', '#f7f7f7'],
            }];
        this.displayUnreadable = '';
        this.displayReadable = '';
    }
    /**
     * lifecycle
     */
    MachineReadableComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    MachineReadableComponent.prototype.ngOnChanges = function () {
        if (this.MachineReadableChart && !this.hasValue) {
            var readable = this.MachineReadableChart.machineReadable;
            var unreadable = this.MachineReadableChart.machineUnreadable;
            var total = readable + unreadable;
            this.pieChartData = [this.MachineReadableChart.machineReadable, this.MachineReadableChart.machineUnreadable];
            this.displayReadable = Math.round(readable / total * 1000) / 10 + "%";
            this.displayUnreadable = Math.round(unreadable / total * 1000) / 10 + "%";
            this.hasValue = true;
            this.forceChartRefresh();
        }
    };
    // refresh the charts
    MachineReadableComponent.prototype.forceChartRefresh = function () {
        var _this = this;
        setTimeout(function () {
            _this.baseChart.refresh();
        }, 10);
    };
    return MachineReadableComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], MachineReadableComponent.prototype, "MachineReadableChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__["BaseChartDirective"]),
    __metadata("design:type", Object)
], MachineReadableComponent.prototype, "baseChart", void 0);
MachineReadableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-machine-readable',
        template: __webpack_require__(884),
        styles: [__webpack_require__(58), __webpack_require__(766)]
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: 'baseChart' }),
    __metadata("design:paramtypes", [])
], MachineReadableComponent);

//# sourceMappingURL=machine-readable.component.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PredictionResultComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PredictionResultComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function PredictionResultComponent() {
        this.displayCompliance = '';
        this.displayUncompliance = '';
        this.displayUndetermined = '';
        this.hasValue = false;
        this.pieChartLabels = ['Compliant', 'Non-compliant'];
        this.pieChartData = [0, 0];
        this.pieChartType = 'pie';
        this.options = {
            cutoutPercentage: 0,
            legend: {
                display: true,
                position: 'bottom',
                onClick: function () {
                }
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.labels[tooltipItem.index] + ": " + data.datasets[0].data[tooltipItem.index] + " solicitation(s)";
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true,
        };
        this.colorsOverride = [{
                backgroundColor: ['#2C81C0', '#f38084'],
                hoverBackgroundColor: ['#2C81C0', '#f38084'],
            }];
    }
    /**
     * lifecycle
     */
    PredictionResultComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    PredictionResultComponent.prototype.ngOnChanges = function () {
        if (this.PredictResultChart && !this.hasValue) {
            var compliance = this.PredictResultChart.compliance;
            var uncompliance = this.PredictResultChart.uncompliance;
            var total = compliance + uncompliance;
            this.pieChartData = [compliance, uncompliance];
            this.displayCompliance = Math.round(compliance / total * 1000) / 10 + "%";
            this.displayUncompliance = Math.round(uncompliance / total * 1000) / 10 + "%";
            this.hasValue = true;
            this.forceChartRefresh();
        }
    };
    // refresh the charts
    PredictionResultComponent.prototype.forceChartRefresh = function () {
        var _this = this;
        setTimeout(function () {
            _this.baseChart.refresh();
        }, 10);
    };
    return PredictionResultComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PredictionResultComponent.prototype, "PredictResultChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__["BaseChartDirective"]),
    __metadata("design:type", Object)
], PredictionResultComponent.prototype, "baseChart", void 0);
PredictionResultComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-prediction-result',
        template: __webpack_require__(885),
        styles: [__webpack_require__(58), __webpack_require__(767)]
    }),
    __metadata("design:paramtypes", [])
], PredictionResultComponent);

//# sourceMappingURL=prediction-result.component.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScannedSolicitationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ScannedSolicitationComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function ScannedSolicitationComponent() {
        this.toPeriod = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
        this.fromPeriod = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 32));
        this.hasValue = false;
        this.outputData = [];
        this.barChartLabels = [];
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartData = [];
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            maintainAspectRatio: false,
            responsive: true,
            barPercentage: 1.0,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                        },
                        barPercentage: 1.0,
                        categoryPercentage: 0.9,
                    }],
                yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                        },
                    }],
                labelString: 'probability'
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return "# scanned solicitations: " + data.datasets[0].data[tooltipItem.index];
                    }
                },
                opacity: 1,
            },
        };
        this.colorsOverride = [
            { backgroundColor: __WEBPACK_IMPORTED_MODULE_2_underscore__["range"](32).map(function () { return '#2C81C0'; }) }
        ];
    }
    /**
     * lifecycle
     */
    ScannedSolicitationComponent.prototype.ngOnInit = function () {
        console.log(this.fromPeriod);
        console.log(this.toPeriod);
    };
    /**
     * lifecycle
     */
    ScannedSolicitationComponent.prototype.ngOnChanges = function () {
        if (this.ScannedSolicitationChart && !this.hasValue) {
            this.barChartLabels = [];
            var i = 0;
            for (var d = this.fromPeriod; d <= this.toPeriod && i < 32; d.setDate(d.getDate() + 1)) {
                var formattedNumber = ("0" + d.getDate()).slice(-2);
                this.outputData[i] = this.ScannedSolicitationChart.scannedData[+((d.getMonth() + 1).toString() + formattedNumber)];
                this.barChartLabels.push(d.getMonth() + 1 + "/" + d.getDate());
                i++;
            }
            this.outputData.forEach(function (element) {
                if (!element) {
                    element = 0;
                }
            });
            console.log(this.outputData);
            this.barChartData = [{ data: this.outputData, label: 'The Nuber of solicitations' }];
            this.hasValue = true;
            this.forceChartRefresh();
        }
    };
    /**
     * lifecycle
     */
    ScannedSolicitationComponent.prototype.forceChartRefresh = function () {
        var _this = this;
        setTimeout(function () {
            _this.baseChart.refresh();
        }, 10);
    };
    return ScannedSolicitationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ScannedSolicitationComponent.prototype, "ScannedSolicitationChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__["BaseChartDirective"]),
    __metadata("design:type", Object)
], ScannedSolicitationComponent.prototype, "baseChart", void 0);
ScannedSolicitationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-scanned-solicitation',
        template: __webpack_require__(886),
        styles: [__webpack_require__(58), __webpack_require__(768)]
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: 'baseChart' }),
    __metadata("design:paramtypes", [])
], ScannedSolicitationComponent);

//# sourceMappingURL=scanned-solicitation.component.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopAgenciesPercentageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TopAgenciesPercentageComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function TopAgenciesPercentageComponent() {
        this.barData = [];
        this.angencyTotal = {};
        this.angencyPass = {};
        this.angency = {};
        this.xAxisUnit = 5;
        this.xAxisBreakPoint = [];
        this.indexFrom = 0;
        this.indexTo = 10;
        this.maxSolicitation = 0;
        this.noData = true;
    }
    /**
     * lifecycle
     */
    TopAgenciesPercentageComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    TopAgenciesPercentageComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.TopAgenciesChart) {
            this.angencyTotal = {};
            this.angencyPass = {};
            this.maxSolicitation = 0;
            this.barData = [];
            if (this.selectedGovernment == "Government-wide") {
                this.indexFrom = 0;
                this.indexTo = 10;
                this.barTitle = "Top 10 Section 508 Compliant Agencies";
                // Insert data to the chart
                for (var key in this.TopAgenciesChart.topAgencies) {
                    this.barData.push([key,
                        this.TopAgenciesChart.topAgencies[key]["green"] / (this.TopAgenciesChart.topAgencies[key]["green"] + this.TopAgenciesChart.topAgencies[key]["red"]),
                        this.TopAgenciesChart.topAgencies[key]["green"],
                        (this.TopAgenciesChart.topAgencies[key]["green"] + this.TopAgenciesChart.topAgencies[key]["red"])
                    ]);
                }
                // Sorting by rate
                this.barData.sort(function (a, b) {
                    if (b[1] > a[1]) {
                        return 1;
                    }
                    else if (b[1] < a[1]) {
                        return -1;
                    }
                    else if (b[1] == a[1]) {
                        if (b[3] > a[3]) {
                            return 1;
                        }
                        else if (b[3] < a[3]) {
                            return -1;
                        }
                    }
                });
                var i = this.indexFrom;
                this.barData.forEach(function (element) {
                    if (i < _this.indexTo)
                        if (_this.maxSolicitation <= element[3])
                            _this.maxSolicitation = element[3];
                    i++;
                });
            }
            else {
                // Chagne year x-axis format
                if (this.selectedPeriod == "This Year" || this.selectedPeriod == "All") {
                    this.indexFrom = 1;
                    this.indexTo = 13;
                    this.barTitle = this.selectedGovernment;
                    // Filter by year and agency
                    if (this.TopAgenciesChart.topAgencies[this.selectedGovernment] != null) {
                        for (var _i = 0, _a = this.TopAgenciesChart.topAgencies[this.selectedGovernment]; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item.date != null) {
                                var month = +item.date.split('/')[0];
                                if (this.angencyTotal[month] == null) {
                                    this.angencyTotal[month] = 1;
                                    if (item.predictions.value == "GREEN")
                                        this.angencyPass[month] = 1;
                                    else
                                        this.angencyPass[month] = 0;
                                }
                                else {
                                    this.angencyTotal[month]++;
                                    if (item.predictions.value == "GREEN")
                                        this.angencyPass[month]++;
                                }
                            }
                        }
                        for (var i = 0; i < 13; i++) {
                            if (this.angencyPass[i] == null) {
                                this.barData.push([i, 0, 0, 0]);
                            }
                            else {
                                this.barData.push([i, this.angencyPass[i] / this.angencyTotal[i], this.angencyPass[i], this.angencyTotal[i]]);
                            }
                            if (this.maxSolicitation <= this.angencyTotal[i])
                                this.maxSolicitation = this.angencyTotal[i];
                        }
                    }
                }
                else if (this.selectedPeriod == "This Month") {
                    this.indexFrom = 1;
                    this.indexTo = this.toPeriod.getDate() + 1;
                    this.barTitle = this.selectedGovernment;
                    // Filter by year and agency
                    if (this.TopAgenciesChart.topAgencies[this.selectedGovernment] != null) {
                        for (var _b = 0, _c = this.TopAgenciesChart.topAgencies[this.selectedGovernment]; _b < _c.length; _b++) {
                            var item = _c[_b];
                            if (item.date != null) {
                                var date = +item.date.split('/')[1];
                                if (this.angencyTotal[date] == null) {
                                    this.angencyTotal[date] = 1;
                                    if (item.predictions.value == "GREEN")
                                        this.angencyPass[date] = 1;
                                    else
                                        this.angencyPass[date] = 0;
                                }
                                else {
                                    this.angencyTotal[date]++;
                                    if (item.predictions.value == "GREEN")
                                        this.angencyPass[date]++;
                                }
                            }
                        }
                        for (var i = 0; i < this.indexTo + 1; i++) {
                            if (this.angencyPass[i] == null) {
                                this.barData.push([i, 0, 0, 0]);
                            }
                            else {
                                this.barData.push([i, this.angencyPass[i] / this.angencyTotal[i], this.angencyPass[i], this.angencyTotal[i]]);
                            }
                            if (this.maxSolicitation <= this.angencyTotal[i])
                                this.maxSolicitation = this.angencyTotal[i];
                        }
                    }
                }
            }
            this.noData = this.barData.length == 0;
        }
        var remain = this.maxSolicitation % this.xAxisUnit;
        this.maxSolicitation = remain != 0 ? (this.maxSolicitation - remain + this.xAxisUnit) : this.maxSolicitation;
        var a = this.maxSolicitation / this.xAxisUnit;
        this.xAxisBreakPoint = __WEBPACK_IMPORTED_MODULE_1_underscore__["range"](a + 1);
    };
    /**
     * Get abbr of agency name
     * @param name
     */
    TopAgenciesPercentageComponent.prototype.GetAbbr = function (name) {
        if (name == "Department of the Air Force")
            return "DAF";
        else if (name == "Defense Information Systems Agency")
            return "DISA";
        else if (name == "Securities and Exchange Commission")
            return "SEC";
        else if (name == "Department of the Interior")
            return "DOI";
        else if (name == "Department of the Navy")
            return "DoN";
        else if (name == "Legal Services Corporation")
            return "LSC";
        else if (name == "Department of the Army")
            return "DA";
        else if (name == "Defense Logistics Agency")
            return "DLA";
        else if (name == "Other Defense Agencies")
            return "Other Defense Agencies";
        else if (name == "Department of Transportation")
            return "DOT";
        else if (name == "Department of Homeland Security")
            return "DHS";
        else if (name == "Department of Veterans Affairs")
            return "DVA";
        else if (name == "United States International Trade Commission")
            return "USITC";
        else if (name == "Department of Health and Human Services")
            return "HHS";
        else if (name == "Department of Commerce")
            return "DOC";
        else if (name == "Department of Labor")
            return "DOL";
        else if (name == "National Aeronautics and Space Administration")
            return "NASA";
        else if (name == "Library of Congress")
            return "LOC";
        else if (name == "Department of the Treasury")
            return "Treasury";
        else if (name == "Consumer Financial Protection Bureau")
            return "CFPB";
        else if (name == "Department of Education")
            return "ED";
        else if (name == "Pension Benefit Guaranty Corporation")
            return "PBGC";
        else if (name == "Department of State")
            return "DOS";
        else if (name == "General Services Administration")
            return "GSA";
        else if (name == "Millennium Challenge Corporation")
            return "MCC";
        else if (name == "Office of Personnel Management")
            return "OPM";
        else if (name == "National Archives and Records Administration")
            return "NARA";
        else if (name == "Export - Import Bank of the United States")
            return "EXIM";
        else if (name == "Department of Justice")
            return "DOJ";
        else if (name == "Agency for International Development")
            return "USAID";
        else if (name == "Social Security Administration")
            return "SSA";
        else if (name == "1" && this.selectedPeriod == "This Year")
            return "Jan.";
        else if (name == "2" && this.selectedPeriod == "This Year")
            return "Feb.";
        else if (name == "3" && this.selectedPeriod == "This Year")
            return "Mar.";
        else if (name == "4" && this.selectedPeriod == "This Year")
            return "Apr.";
        else if (name == "5" && this.selectedPeriod == "This Year")
            return "May";
        else if (name == "6" && this.selectedPeriod == "This Year")
            return "Jun.";
        else if (name == "7" && this.selectedPeriod == "This Year")
            return "Jul.";
        else if (name == "8" && this.selectedPeriod == "This Year")
            return "Aug.";
        else if (name == "9" && this.selectedPeriod == "This Year")
            return "Sep.";
        else if (name == "10" && this.selectedPeriod == "This Year")
            return "Oct.";
        else if (name == "11" && this.selectedPeriod == "This Year")
            return "Nov.";
        else if (name == "12" && this.selectedPeriod == "This Year")
            return "Dec.";
        else
            return name;
    };
    /**
     * Get abbr of agency name
     * @param name
     */
    TopAgenciesPercentageComponent.prototype.getAbbr = function (name) {
        var matches = name.match(/\b(\w)/g);
        var acronym = matches.join('');
        return acronym;
    };
    return TopAgenciesPercentageComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesPercentageComponent.prototype, "isGovernomentWide", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesPercentageComponent.prototype, "TopAgenciesChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesPercentageComponent.prototype, "selectedGovernment", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesPercentageComponent.prototype, "barTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesPercentageComponent.prototype, "selectedPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesPercentageComponent.prototype, "toPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesPercentageComponent.prototype, "fromPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesPercentageComponent.prototype, "xAxis", void 0);
TopAgenciesPercentageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-top-agencies-percentage',
        template: __webpack_require__(887),
        styles: [__webpack_require__(58), __webpack_require__(769)]
    }),
    __metadata("design:paramtypes", [])
], TopAgenciesPercentageComponent);

//# sourceMappingURL=top-agencies-percentage.component.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopAgenciesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TopAgenciesComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function TopAgenciesComponent() {
        this.barData = [];
        this.angencyTotal = {};
        this.angencyPass = {};
        this.angency = {};
        this.xAxisUnit = 5;
        this.xAxisBreakPoint = [];
        this.indexFrom = 0;
        this.indexTo = 10;
        this.maxSolicitation = 0;
        this.noData = true;
    }
    /**
     * lifecycle
     */
    TopAgenciesComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    TopAgenciesComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.TopAgenciesChart) {
            this.angencyTotal = {};
            this.angencyPass = {};
            this.maxSolicitation = 0;
            this.barData = [];
            if (this.selectedGovernment == 'Government-wide') {
                this.indexFrom = 0;
                this.indexTo = 10;
                this.barTitle = 'Top 10 Section 508 Compliant Agencies';
                // Insert data to the chart
                for (var key in this.TopAgenciesChart.topAgencies) {
                    this.barData.push([key,
                        this.TopAgenciesChart.topAgencies[key]["green"] / (this.TopAgenciesChart.topAgencies[key]["green"] + this.TopAgenciesChart.topAgencies[key]["red"]),
                        this.TopAgenciesChart.topAgencies[key]["green"],
                        (this.TopAgenciesChart.topAgencies[key]["green"] + this.TopAgenciesChart.topAgencies[key]["red"])
                    ]);
                }
                this.barData.sort(function (a, b) {
                    if (b[1] > a[1]) {
                        return 1;
                    }
                    else if (b[1] < a[1]) {
                        return -1;
                    }
                    else if (b[1] == a[1]) {
                        if (b[3] > a[3]) {
                            return 1;
                        }
                        else if (b[3] < a[3]) {
                            return -1;
                        }
                    }
                });
                var i = this.indexFrom;
                this.barData.forEach(function (element) {
                    if (i < _this.indexTo)
                        if (_this.maxSolicitation <= element[3])
                            _this.maxSolicitation = element[3];
                    i++;
                });
            }
            else {
                // Chagne year x-axis format
                if (this.selectedPeriod == "This Year" || this.selectedPeriod == "All") {
                    this.indexFrom = 1;
                    this.indexTo = 13;
                    this.barTitle = this.selectedGovernment;
                    // Filter by year and agency
                    for (var _i = 0, _a = this.TopAgenciesChart.topAgencies[this.selectedGovernment]; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.date != null) {
                            var month = +item.date.split('/')[0];
                            if (this.angencyTotal[month] == null) {
                                this.angencyTotal[month] = 1;
                                if (item.predictions.value == "GREEN")
                                    this.angencyPass[month] = 1;
                                else
                                    this.angencyPass[month] = 0;
                            }
                            else {
                                this.angencyTotal[month]++;
                                if (item.predictions.value == "GREEN")
                                    this.angencyPass[month]++;
                            }
                        }
                    }
                    for (var i = 0; i < 13; i++) {
                        if (this.angencyPass[i] == null) {
                            this.barData.push([i, 0, 0, 0]);
                        }
                        else {
                            this.barData.push([i, this.angencyPass[i] / this.angencyTotal[i], this.angencyPass[i], this.angencyTotal[i]]);
                        }
                        if (this.maxSolicitation <= this.angencyTotal[i])
                            this.maxSolicitation = this.angencyTotal[i];
                    }
                }
                else if (this.selectedPeriod == "This Month") {
                    this.indexFrom = 1;
                    this.indexTo = this.toPeriod.getDate() + 1;
                    this.barTitle = this.selectedGovernment;
                    // Filter by year and agency
                    for (var _b = 0, _c = this.TopAgenciesChart.topAgencies[this.selectedGovernment]; _b < _c.length; _b++) {
                        var item = _c[_b];
                        if (item.date != null) {
                            var date = +item.date.split('/')[1];
                            if (this.angencyTotal[date] == null) {
                                this.angencyTotal[date] = 1;
                                if (item.predictions.value == "GREEN")
                                    this.angencyPass[date] = 1;
                                else
                                    this.angencyPass[date] = 0;
                            }
                            else {
                                this.angencyTotal[date]++;
                                if (item.predictions.value == "GREEN")
                                    this.angencyPass[date]++;
                            }
                        }
                    }
                    for (var i = 0; i < this.indexTo + 1; i++) {
                        if (this.angencyPass[i] == null) {
                            this.barData.push([i, 0, 0, 0]);
                        }
                        else {
                            this.barData.push([i, this.angencyPass[i] / this.angencyTotal[i], this.angencyPass[i], this.angencyTotal[i]]);
                        }
                        if (this.maxSolicitation <= this.angencyTotal[i]) {
                            this.maxSolicitation = this.angencyTotal[i];
                        }
                    }
                }
            }
            this.noData = Object.keys(this.TopAgenciesChart).length == 0;
        }
        var remain = this.maxSolicitation % this.xAxisUnit;
        this.maxSolicitation = remain != 0 ? (this.maxSolicitation - remain + this.xAxisUnit) : this.maxSolicitation;
        var a = this.maxSolicitation / this.xAxisUnit;
        this.xAxisBreakPoint = __WEBPACK_IMPORTED_MODULE_1_underscore__["range"](a + 1);
    };
    /**
     * Get abbr of agency name
     * @param name
     */
    TopAgenciesComponent.prototype.GetAbbr = function (name) {
        if (name == "Department of the Air Force")
            return "DAF";
        else if (name == "Defense Information Systems Agency")
            return "DISA";
        else if (name == "Securities and Exchange Commission")
            return "SEC";
        else if (name == "Department of the Interior")
            return "DOI";
        else if (name == "Department of the Navy")
            return "DoN";
        else if (name == "Legal Services Corporation")
            return "LSC";
        else if (name == "Department of the Army")
            return "DA";
        else if (name == "Defense Logistics Agency")
            return "DLA";
        else if (name == "Other Defense Agencies")
            return "Other Defense Agencies";
        else if (name == "Department of Transportation")
            return "DOT";
        else if (name == "Department of Homeland Security")
            return "DHS";
        else if (name == "Department of Veterans Affairs")
            return "DVA";
        else if (name == "United States International Trade Commission")
            return "USITC";
        else if (name == "Department of Health and Human Services")
            return "HHS";
        else if (name == "Department of Commerce")
            return "DOC";
        else if (name == "Department of Labor")
            return "DOL";
        else if (name == "National Aeronautics and Space Administration")
            return "NASA";
        else if (name == "Library of Congress")
            return "LOC";
        else if (name == "Department of the Treasury")
            return "Treasury";
        else if (name == "Consumer Financial Protection Bureau")
            return "CFPB";
        else if (name == "Department of Education")
            return "ED";
        else if (name == "Pension Benefit Guaranty Corporation")
            return "PBGC";
        else if (name == "Department of State")
            return "DOS";
        else if (name == "General Services Administration")
            return "GSA";
        else if (name == "Millennium Challenge Corporation")
            return "MCC";
        else if (name == "Office of Personnel Management")
            return "OPM";
        else if (name == "National Archives and Records Administration")
            return "NARA";
        else if (name == "Export - Import Bank of the United States")
            return "EXIM";
        else if (name == "Department of Justice")
            return "DOJ";
        else if (name == "Social Security Administration")
            return "SSA";
        else if (name == "1" && this.selectedPeriod == "This Year")
            return "Jan.";
        else if (name == "2" && this.selectedPeriod == "This Year")
            return "Feb.";
        else if (name == "3" && this.selectedPeriod == "This Year")
            return "Mar.";
        else if (name == "4" && this.selectedPeriod == "This Year")
            return "Apr.";
        else if (name == "5" && this.selectedPeriod == "This Year")
            return "May";
        else if (name == "6" && this.selectedPeriod == "This Year")
            return "Jun.";
        else if (name == "7" && this.selectedPeriod == "This Year")
            return "Jul.";
        else if (name == "8" && this.selectedPeriod == "This Year")
            return "Aug.";
        else if (name == "9" && this.selectedPeriod == "This Year")
            return "Sep.";
        else if (name == "10" && this.selectedPeriod == "This Year")
            return "Oct.";
        else if (name == "11" && this.selectedPeriod == "This Year")
            return "Nov.";
        else if (name == "12" && this.selectedPeriod == "This Year")
            return "Dec.";
        else
            return name;
    };
    return TopAgenciesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesComponent.prototype, "isGovernomentWide", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesComponent.prototype, "TopAgenciesChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesComponent.prototype, "selectedGovernment", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesComponent.prototype, "barTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesComponent.prototype, "selectedPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesComponent.prototype, "toPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesComponent.prototype, "fromPeriod", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopAgenciesComponent.prototype, "xAxis", void 0);
TopAgenciesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-top-agencies',
        template: __webpack_require__(888),
        styles: [__webpack_require__(58), __webpack_require__(770)]
    }),
    __metadata("design:paramtypes", [])
], TopAgenciesComponent);

//# sourceMappingURL=top-agencies.component.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopSrtActionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TopSrtActionsComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function TopSrtActionsComponent() {
        this.solicitationNumber = 0;
        this.nonCompliantICTNumber = 0;
        this.updatedCompliantICTNumber = 0;
        this.updatedNonCompliantICTNumber = 0;
        this.updatedICTNumber = 0;
    }
    /**
     * lifecycle
     */
    TopSrtActionsComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    TopSrtActionsComponent.prototype.ngOnChanges = function () {
        if (this.TopSRTActionChart) {
            this.solicitationNumber = this.TopSRTActionChart.determinedICT;
            this.nonCompliantICTNumber = this.TopSRTActionChart.uncompliance;
            this.reviewed = this.TopSRTActionChart.review;
            this.emailSend = this.TopSRTActionChart.email;
            this.updatedICTNumber = this.TopSRTActionChart.updatedICT;
            this.updatedCompliantICTNumber = this.TopSRTActionChart.updatedCompliantICT;
            this.updatedNonCompliantICTNumber = this.TopSRTActionChart.updatedNonCompliantICT;
        }
    };
    return TopSrtActionsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopSrtActionsComponent.prototype, "TopSRTActionChart", void 0);
TopSrtActionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-top-srt-actions',
        template: __webpack_require__(889),
        styles: [__webpack_require__(771)]
    }),
    __metadata("design:paramtypes", [])
], TopSrtActionsComponent);

//# sourceMappingURL=top-srt-actions.component.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UndeterminedSolicitationsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UndeterminedSolicitationsComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function UndeterminedSolicitationsComponent() {
        this.hasValue = false;
        this.pieChartLabels = ['Presolicitation', 'Other Undetermined', '0 Documents', 'Non-Machine Readable'];
        this.pieChartData = [0, 0, 0, 0];
        this.pieChartType = 'pie';
        this.options = {
            cutoutPercentage: 0,
            legend: {
                display: true,
                position: 'bottom',
                onClick: function () {
                }
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.labels[tooltipItem.index] + ": " + data.datasets[0].data[tooltipItem.index] + " solicitation(s)";
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true,
        };
        this.colorsOverride = [{
                backgroundColor: ["#2C81C0", "#ff0000", "#e8e8e8", "#FFB300"],
                hoverBackgroundColor: ["#2C81C0", "#ff0000", "#e8e8e8", "#FFB300"],
            }];
        this.displayPresolicitation = "";
        this.displayNonMachineReadable = "";
        this.displayNoDocument = "";
        this.displayOtherUndetermined = "";
    }
    /**
     * lifecycle
     */
    UndeterminedSolicitationsComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    UndeterminedSolicitationsComponent.prototype.ngOnChanges = function () {
        if (this.UndeterminedSolicitationChart && !this.hasValue) {
            var presolicitation = this.UndeterminedSolicitationChart.presolicitation;
            var undetermined = this.UndeterminedSolicitationChart.latestOtherUndetermined;
            var NonMachineReadable = this.UndeterminedSolicitationChart.latestNonMachineReadable;
            var NoDocument = this.UndeterminedSolicitationChart.latestNoDocument;
            var total = presolicitation + undetermined + NonMachineReadable + NoDocument;
            this.pieChartData = [presolicitation, undetermined, NonMachineReadable, NoDocument];
            this.displayPresolicitation = Math.round(presolicitation / total * 1000) / 10 + "%";
            this.displayNonMachineReadable = Math.round(NonMachineReadable / total * 1000) / 10 + "%";
            this.displayNoDocument = Math.round(NoDocument / total * 1000) / 10 + "%";
            this.displayOtherUndetermined = Math.round(undetermined / total * 1000) / 10 + "%";
            this.hasValue = true;
            this.forceChartRefresh();
        }
    };
    /**
     * refresh chart
     */
    UndeterminedSolicitationsComponent.prototype.forceChartRefresh = function () {
        var _this = this;
        setTimeout(function () {
            _this.baseChart.refresh();
        }, 10);
    };
    return UndeterminedSolicitationsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], UndeterminedSolicitationsComponent.prototype, "UndeterminedSolicitationChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__["BaseChartDirective"]),
    __metadata("design:type", Object)
], UndeterminedSolicitationsComponent.prototype, "baseChart", void 0);
UndeterminedSolicitationsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-undetermined-solicitations',
        template: __webpack_require__(890),
        styles: [__webpack_require__(772)]
    }),
    __metadata("design:paramtypes", [])
], UndeterminedSolicitationsComponent);

//# sourceMappingURL=undetermined-solicitations.component.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserLoginComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     */
    function UserLoginComponent() {
        /* ATTRIBUTES */
        this.toPeriod = new Date();
        this.fromPeriod = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 31));
        this.currentLoginUsers = 24;
        this.lineChartData = [
            { data: [0, 2, 2, 4, 8, 12, 12, 16, 16, 18, 20, 24, 28, 32, 34, 32, 30, 30, 36, 40, 43, 45, 45, 46, 47, 48, 49, 50, 51, 51, 53, 55], label: '' },
        ];
        this.lineChartLabels = [];
        this.lineChartType = 'line';
        this.options = {
            cutoutPercentage: 85,
            legend: {
                display: false
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }],
                yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }],
            }
        };
        this.colorsOverride = [{
                backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'rgba(44,129,192,1)',
                pointBackgroundColor: 'rgba(44,129,192,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(44,129,192,1)'
            }];
    }
    /**
     * lifecycle
     */
    UserLoginComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    UserLoginComponent.prototype.ngDoCheck = function () {
        var i = 0;
        for (var d = this.fromPeriod; d <= this.toPeriod && i < 32; d.setDate(d.getDate() + 1)) {
            this.lineChartLabels.push(d.getMonth() + 1 + "/" + d.getDate());
            i++;
        }
    };
    return UserLoginComponent;
}());
UserLoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user-login',
        template: __webpack_require__(891),
        styles: [__webpack_require__(773)]
    }),
    __metadata("design:paramtypes", [])
], UserLoginComponent);

//# sourceMappingURL=user-login.component.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__analytics_analytics_module__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__help_help_module__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_auth_module__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home_module__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_user_user_module__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__solicitation_solicitation_module__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_tooltip__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_completer__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_services_agency_service__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__survey_service__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_services_user_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__auth_guard_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__header_header_component__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_app_admin_admin_component__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__solicitation_review_solicitation_review_component__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__app_routing__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__shared_components_upload_upload_component__ = __webpack_require__(552);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// MODULES









// SERVICES





// COMPONENTS




// ROUTES


var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_22__solicitation_review_solicitation_review_component__["a" /* SolicitationReviewComponent */],
            __WEBPACK_IMPORTED_MODULE_20__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_21_app_admin_admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_24__shared_components_upload_upload_component__["a" /* UploadComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_23__app_routing__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_12_ng2_tooltip__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_7__auth_auth_module__["a" /* AuthModule */],
            __WEBPACK_IMPORTED_MODULE_8__home_home_module__["a" /* HomeModule */],
            __WEBPACK_IMPORTED_MODULE_6__help_help_module__["a" /* HelpModule */],
            __WEBPACK_IMPORTED_MODULE_9_app_user_user_module__["a" /* UserModule */],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_13_ng2_completer__["a" /* Ng2CompleterModule */],
            __WEBPACK_IMPORTED_MODULE_5__analytics_analytics_module__["a" /* AnalyticsModule */],
            __WEBPACK_IMPORTED_MODULE_10__solicitation_solicitation_module__["a" /* SolicitationModule */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_17__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_14__shared_services_agency_service__["a" /* AgencyService */],
            __WEBPACK_IMPORTED_MODULE_16__survey_service__["a" /* SurveyService */],
            __WEBPACK_IMPORTED_MODULE_18__auth_guard_service__["a" /* AuthGuard */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_admin_component__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__analytics_analytics_component__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_component__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_guard_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__help_help_component__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__solicitation_review_solicitation_review_component__ = __webpack_require__(201);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'auth', component: __WEBPACK_IMPORTED_MODULE_4__auth_auth_component__["a" /* AuthComponent */] },
    { path: 'admin/accepted', component: __WEBPACK_IMPORTED_MODULE_2__admin_admin_component__["a" /* AdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]], data: { isAccepted: true, isRejected: false } },
    { path: 'admin/rejected', component: __WEBPACK_IMPORTED_MODULE_2__admin_admin_component__["a" /* AdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]], data: { isAccepted: false, isRejected: true } },
    { path: 'admin/pending', component: __WEBPACK_IMPORTED_MODULE_2__admin_admin_component__["a" /* AdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]], data: { isAccepted: false, isRejected: false } },
    { path: 'admin', component: __WEBPACK_IMPORTED_MODULE_2__admin_admin_component__["a" /* AdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]], data: { isAccepted: false, isRejected: false } },
    { path: 'analytics', component: __WEBPACK_IMPORTED_MODULE_3__analytics_analytics_component__["a" /* AnalyticsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'feedback', component: __WEBPACK_IMPORTED_MODULE_7__solicitation_review_solicitation_review_component__["a" /* SolicitationReviewComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'help', component: __WEBPACK_IMPORTED_MODULE_6__help_help_component__["a" /* HelpComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]] },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forRoot(routes),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], AppRoutingModule);

// const APP_ROUTES: Routes = [
// {path: '', redirectTo: 'home', pathMatch: 'full'},
// {path: 'auth', component: AuthComponent},
// {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
// {path: 'password', component: PasswordComponent, canActivate: [AuthGuard]},
// {path: 'home', component: SrtComponent, canActivate: [AuthGuard]},
// {path: 'admin/accepted', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: true, isRejected: false }},
// {path: 'admin/rejected', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: true }},
// {path: 'admin/pending', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
// {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] , data: { isAccepted: false, isRejected: false }},
// {path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard]},
// {path: 'feedback', component: SolicitationReviewComponent, canActivate: [AuthGuard]},
// {path: 'help', component: HelpComponent, canActivate: [AuthGuard]},
// ];
// export const routing = RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_completer__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_routing__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_shared_services_user_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__userlogin_userlogin_component__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__userregistration_userregistration_component__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_auth_auth_component__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__forgot_password_forgot_password_component__ = __webpack_require__(192);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//Kailun'add



// SERVICES


// COMPONENTS




var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__auth_routing__["a" /* AuthRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_5_ng2_completer__["a" /* Ng2CompleterModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__userlogin_userlogin_component__["a" /* UserloginComponent */],
            __WEBPACK_IMPORTED_MODULE_10__userregistration_userregistration_component__["a" /* UserregistrationComponent */],
            __WEBPACK_IMPORTED_MODULE_11_app_auth_auth_component__["a" /* AuthComponent */],
            __WEBPACK_IMPORTED_MODULE_12__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_8_app_shared_services_user_service__["a" /* UserService */]
        ],
        exports: []
    })
], AuthModule);

//# sourceMappingURL=auth.module.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_public_public_component__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password_component__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_component__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_user_password_password_component__ = __webpack_require__(135);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// COMPONENTS




var routes = [
    {
        path: 'auth',
        component: __WEBPACK_IMPORTED_MODULE_2__home_public_public_component__["a" /* PublicComponent */],
        children: [
            { path: '', redirectTo: 'signin', pathMatch: 'full' },
            { path: 'signin', component: __WEBPACK_IMPORTED_MODULE_4__auth_component__["a" /* AuthComponent */] },
            { path: 'forgetpassword', component: __WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */] },
            { path: ':email/:temp', component: __WEBPACK_IMPORTED_MODULE_5_app_user_password_password_component__["a" /* PasswordComponent */] },
        ]
    },
];
var AuthRoutingModule = (function () {
    function AuthRoutingModule() {
    }
    return AuthRoutingModule;
}());
AuthRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], AuthRoutingModule);

//# sourceMappingURL=auth.routing.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_user__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_currentuser__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_user_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_guard_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(130);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserloginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var UserloginComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param app
     * @param authGuard
     * @param authService
     * @param router
     * @param user
     */
    function UserloginComponent(app, authGuard, authService, router, user) {
        this.app = app;
        this.authGuard = authGuard;
        this.authService = authService;
        this.router = router;
        this.user = user;
        this.errorMessage = false;
        this.errorInformation = "";
    }
    /**
     * lifecycle
     */
    UserloginComponent.prototype.ngOnInit = function () {
        this.myForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]),
            password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required])
        });
    };
    /**
     * submit
     * submit authentication data.  uses local storage to hold encrypted
     * json web token and user agency.
     * the jwt is set to expire after 2 hours.
     */
    UserloginComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new __WEBPACK_IMPORTED_MODULE_3__shared_user__["a" /* User */]();
        user.email = this.myForm.value.email;
        user.password = this.myForm.value.password;
        if (!this.myForm.valid) {
            alert("your input is not valid!");
            this.myForm.reset();
        }
        else {
            this.authService.login(user)
                .subscribe(function (data) {
                debugger;
                console.log(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('firstName', data.firstName);
                localStorage.setItem('lastName', data.lastName);
                localStorage.setItem('agency', data.agency); // ToDo: clean this up and use user service
                localStorage.setItem('email', data.email);
                localStorage.setItem('position', data.position);
                localStorage.setItem('id', data.id);
                localStorage.setItem('userRole', data.userRole);
                _this.authGuard.isLogin = true;
                _this.app.isLogin = true;
                _this.authGuard.isGSAAdmin = (data.userRole == "Administrator" || data.userRole == "SRT Program Manager ") && data.agency.indexOf("General Services Administration") > -1;
                _this.app.isGSAAdmin = (data.userRole == "Administrator" || data.userRole == "SRT Program Manager ") && data.agency.indexOf("General Services Administration") > -1;
                var currentUser = new __WEBPACK_IMPORTED_MODULE_4__shared_currentuser__["a" /* Currentuser */](data.firstName, data.lastName, data.agency, data.email, data.position, data.tempPassword);
                _this.user.saveUser(currentUser);
                console.log(currentUser);
                if (currentUser.tempPassword != '') {
                    _this.router.navigate(['/user/updatePassword']);
                }
                else {
                    _this.router.navigate(['/home']);
                }
                //this.router.navigate(['/home']);
            }, function (error) {
                _this.errorMessage = true;
                _this.errorInformation = error.error.message;
            });
        }
    };
    return UserloginComponent;
}());
UserloginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-userlogin',
        template: __webpack_require__(895),
        styles: [__webpack_require__(777)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__auth_guard_service__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__auth_guard_service__["a" /* AuthGuard */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__shared_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_services_user_service__["a" /* UserService */]) === "function" && _e || Object])
], UserloginComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=userlogin.component.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_agency_service__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_user__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_completer__ = __webpack_require__(114);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserregistrationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserregistrationComponent = (function () {
    /* CONSTRUCTOR */
    /**
     * constructor
     * @param authService
     * @param agencyService
     * @param completerService
     */
    function UserregistrationComponent(authService, agencyService, completerService) {
        this.authService = authService;
        this.agencyService = agencyService;
        this.completerService = completerService;
        this.registerSuccess = false;
        this.placeholder = "Click and begin typing to initiate search...";
        this.textSearching = "Searhing for agency...";
        this.selectedUserRole = "Select your request access level";
    }
    // sets up data template for  registration form
    UserregistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            position: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            firstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            lastName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            agency: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(8),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/),
            ])
        });
        this.agencyService.GetAgencies().subscribe(function (data) {
            _this.data = [];
            data.forEach(function (element) {
                _this.data.push(element.Agency);
            });
            _this.dataService = _this.completerService.local(_this.data);
        });
    };
    /**
     * submit
     * requests user account for SRT
     */
    UserregistrationComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new __WEBPACK_IMPORTED_MODULE_4__shared_user__["a" /* User */]();
        user.email = this.myForm.value.email;
        user.password = this.myForm.value.password;
        user.position = this.myForm.value.position;
        user.firstName = this.myForm.value.firstName;
        user.lastName = this.myForm.value.lastName;
        user.agency = this.myForm.value.agency;
        user.userRole = this.selectedUserRole;
        if (!this.myForm.valid) {
            alert("your information is not valid!");
            this.myForm.reset();
        }
        else {
            this.authService.signup(user).subscribe(function (data) {
                _this.registerSuccess = true;
            }, function (error) { });
            this.myForm.reset();
        }
    };
    UserregistrationComponent.prototype.onChangeAccessLevel = function (userRole) {
        this.selectedUserRole = userRole;
    };
    UserregistrationComponent.prototype.onFocus = function () {
        $("#dropdownMenuButton").click();
    };
    return UserregistrationComponent;
}());
UserregistrationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "app-userregistration",
        template: __webpack_require__(896),
        styles: [__webpack_require__(778)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_agency_service__["a" /* AgencyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_agency_service__["a" /* AgencyService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_completer__["b" /* CompleterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng2_completer__["b" /* CompleterService */]) === "function" && _c || Object])
], UserregistrationComponent);

var _a, _b, _c;
//# sourceMappingURL=userregistration.component.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_currentuser__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_guard_service__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Module: SRTHeaderComponent







var HeaderComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param authGuard
     * @param app
     * @param authService
     * @param router
     * @param userService
     */
    function HeaderComponent(authGuard, app, authService, router, userService) {
        var _this = this;
        this.authGuard = authGuard;
        this.app = app;
        this.authService = authService;
        this.router = router;
        this.userService = userService;
        /* ATTRIBUTES */
        this.firstName = "";
        this.currentID = "";
        userService.updateCurrentUser.subscribe(function (currentUser) { return _this.saveCurrentUser(currentUser); });
        if (localStorage.getItem("firstName")) {
            this.firstName = localStorage.getItem("firstName");
            this.currentID = localStorage.getItem("id");
        }
    }
    /**
     * lifecycle
     */
    HeaderComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    HeaderComponent.prototype.ngOnChanges = function () {
        console.log(this.isGSAAdmin);
    };
    /**
     * logout
     * clear user information and remove jwt
     */
    HeaderComponent.prototype.onLogout = function () {
        var u = new __WEBPACK_IMPORTED_MODULE_3__shared_currentuser__["a" /* Currentuser */]("", "", "", "", "", "");
        this.userService.saveUser(u);
        this.authGuard.isLogin = false;
        this.app.isLogin = false;
        this.authService.logout();
        this.router.navigateByUrl('auth');
    };
    /**
     * save current user information to localstorage
     * @param currentUser
     * set the firstName of the user for display
     */
    HeaderComponent.prototype.saveCurrentUser = function (currentUser) {
        this.firstName = currentUser.firstName;
        localStorage.setItem("firstName", currentUser.firstName);
    };
    /**
     * Get hash from URL
     * @param hash
     */
    HeaderComponent.prototype.GetHash = function (hash) {
        return window.location.href.indexOf(hash) > -1;
    };
    /**
     * Go to profile
     *
     */
    HeaderComponent.prototype.gotoProfile = function () {
        var gotoID = this.authService.getCurrent().id;
        this.router.navigate(['/user/profile', gotoID]);
    };
    return HeaderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "isLogin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "isGSAAdmin", void 0);
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__(897),
        styles: [__webpack_require__(779)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__auth_guard_service__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__auth_guard_service__["a" /* AuthGuard */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */]) === "function" && _e || Object])
], HeaderComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__help_routing__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__help_component__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__faq_faq_component__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contact_us_contact_us_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_help_service__ = __webpack_require__(200);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// Route

// Components



// Services

var HelpModule = (function () {
    function HelpModule() {
    }
    return HelpModule;
}());
HelpModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__help_routing__["a" /* HelpRoutesModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__help_component__["a" /* HelpComponent */],
            __WEBPACK_IMPORTED_MODULE_5__faq_faq_component__["a" /* FaqComponent */],
            __WEBPACK_IMPORTED_MODULE_6__contact_us_contact_us_component__["a" /* ContactUsComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__shared_services_help_service__["a" /* HelpService */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__help_component__["a" /* HelpComponent */]
        ]
    })
], HelpModule);

//# sourceMappingURL=help.module.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__help_component__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__faq_faq_component__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_us_contact_us_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_guard_service__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpRoutesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: 'help',
        component: __WEBPACK_IMPORTED_MODULE_2__help_component__["a" /* HelpComponent */],
        children: [
            { path: 'faq', component: __WEBPACK_IMPORTED_MODULE_3__faq_faq_component__["a" /* FaqComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'faq/:id', component: __WEBPACK_IMPORTED_MODULE_3__faq_faq_component__["a" /* FaqComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'contactus', component: __WEBPACK_IMPORTED_MODULE_4__contact_us_contact_us_component__["a" /* ContactUsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]] },
        ]
    },
];
var HelpRoutesModule = (function () {
    function HelpRoutesModule() {
    }
    return HelpRoutesModule;
}());
HelpRoutesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], HelpRoutesModule);

//# sourceMappingURL=help.routing.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__public_public_component__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__private_private_component__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_routing__ = __webpack_require__(551);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// COMPONENTS



// ROUTES

var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__home_routing__["a" /* HomeRoutingModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_3__public_public_component__["a" /* PublicComponent */],
            __WEBPACK_IMPORTED_MODULE_4__private_private_component__["a" /* PrivateComponent */]
        ],
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__private_private_component__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_guard_service__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_3__private_private_component__["a" /* PrivateComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard_service__["a" /* AuthGuard */]],
        children: [
            { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_guard_service__["a" /* AuthGuard */]] },
        ]
    },
];
var HomeRoutingModule = (function () {
    function HomeRoutingModule() {
    }
    return HomeRoutingModule;
}());
HomeRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], HomeRoutingModule);

//# sourceMappingURL=home.routing.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__ = __webpack_require__(814);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UploadComponent = (function () {
    function UploadComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__["FileUploader"]({});
        this.fileString = {};
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
    }
    /**
   * On Init.
   */
    UploadComponent.prototype.ngOnInit = function () {
        var url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].FILE_UPLOAD_API;
        this.uploader.setOptions({
            url: url,
            authToken: this.currentId = ' ' + this.authService.getToken(),
        });
        this.uploader.uploadAll();
    };
    /**
    * On Changes.
    */
    UploadComponent.prototype.ngOnChanges = function () {
    };
    UploadComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    UploadComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    return UploadComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], UploadComponent.prototype, "uploadDirectly", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], UploadComponent.prototype, "currentId", void 0);
UploadComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-upload',
        template: __webpack_require__(904),
        styles: [__webpack_require__(786)]
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[ng2FileSelect]' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], UploadComponent);

var _a, _b;
//# sourceMappingURL=upload.component.js.map

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_tooltip__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_quill_editor__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__solicitation_routing__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__solicitation_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_guard_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__solicitation_report_solicitation_report_component__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__summary_summary_component__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__summary_results_detail_results_detail_component__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__summary_help_us_improve_help_us_improve_component__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__summary_email_poc_email_poc_component__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__summary_history_history_component__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__solicitation_component__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__feedback_report_feedback_report_component__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__feedback_report_form_form_component__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__summary_prediction_history_prediction_history_component__ = __webpack_require__(210);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitationModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var SolicitationModule = (function () {
    function SolicitationModule() {
    }
    return SolicitationModule;
}());
SolicitationModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["RouterModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_5_ng2_tooltip__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_7__solicitation_routing__["a" /* SolicitationRoutesModule */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_quill_editor__["a" /* QuillEditorModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__solicitation_report_solicitation_report_component__["a" /* SolicitationReportComponent */],
            __WEBPACK_IMPORTED_MODULE_12__summary_results_detail_results_detail_component__["a" /* ResultsDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_14__summary_email_poc_email_poc_component__["a" /* EmailPocComponent */],
            __WEBPACK_IMPORTED_MODULE_13__summary_help_us_improve_help_us_improve_component__["a" /* HelpUsImproveComponent */],
            __WEBPACK_IMPORTED_MODULE_11__summary_summary_component__["a" /* SummaryComponent */],
            __WEBPACK_IMPORTED_MODULE_15__summary_history_history_component__["a" /* HistoryComponent */],
            __WEBPACK_IMPORTED_MODULE_16__solicitation_component__["a" /* SolicitationComponent */],
            __WEBPACK_IMPORTED_MODULE_17__feedback_report_feedback_report_component__["a" /* FeedbackReportComponent */],
            __WEBPACK_IMPORTED_MODULE_18__feedback_report_form_form_component__["a" /* FormComponent */],
            __WEBPACK_IMPORTED_MODULE_19__summary_prediction_history_prediction_history_component__["a" /* PredictionHistoryComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_8__solicitation_service__["a" /* SolicitationService */],
            __WEBPACK_IMPORTED_MODULE_9__auth_guard_service__["a" /* AuthGuard */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_16__solicitation_component__["a" /* SolicitationComponent */]
        ]
    })
], SolicitationModule);

//# sourceMappingURL=solicitation.module.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_guard_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__solicitation_report_solicitation_report_component__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__summary_results_detail_results_detail_component__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__summary_help_us_improve_help_us_improve_component__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__summary_email_poc_email_poc_component__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__summary_history_history_component__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__solicitation_component__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__feedback_report_feedback_report_component__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__feedback_report_form_form_component__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__summary_prediction_history_prediction_history_component__ = __webpack_require__(210);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitationRoutesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var routes = [
    { path: 'solicitation',
        component: __WEBPACK_IMPORTED_MODULE_8__solicitation_component__["a" /* SolicitationComponent */],
        children: [
            { path: 'report', component: __WEBPACK_IMPORTED_MODULE_3__solicitation_report_solicitation_report_component__["a" /* SolicitationReportComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'report/:id', component: __WEBPACK_IMPORTED_MODULE_4__summary_results_detail_results_detail_component__["a" /* ResultsDetailComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'email/:id', component: __WEBPACK_IMPORTED_MODULE_6__summary_email_poc_email_poc_component__["a" /* EmailPocComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'feedback/:id', component: __WEBPACK_IMPORTED_MODULE_5__summary_help_us_improve_help_us_improve_component__["a" /* HelpUsImproveComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'feedback', component: __WEBPACK_IMPORTED_MODULE_9__feedback_report_feedback_report_component__["a" /* FeedbackReportComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'feedback/form/:id', component: __WEBPACK_IMPORTED_MODULE_10__feedback_report_form_form_component__["a" /* FormComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'history/:id', component: __WEBPACK_IMPORTED_MODULE_7__summary_history_history_component__["a" /* HistoryComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'prediction/:id', component: __WEBPACK_IMPORTED_MODULE_11__summary_prediction_history_prediction_history_component__["a" /* PredictionHistoryComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard_service__["a" /* AuthGuard */]] }
        ]
    },
];
var SolicitationRoutesModule = (function () {
    function SolicitationRoutesModule() {
    }
    return SolicitationRoutesModule;
}());
SolicitationRoutesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], SolicitationRoutesModule);

//# sourceMappingURL=solicitation.routing.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitation_service__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SummaryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SummaryComponent = (function () {
    /* CONSTRUCTORS */
    /**
     * constructor
     * @param solicitationService
     * @param route
     * @param router
     */
    function SummaryComponent(solicitationService, route, router) {
        this.solicitationService = solicitationService;
        this.route = route;
        this.router = router;
    }
    /**
     * lifecycle
     */
    SummaryComponent.prototype.ngOnInit = function () {
    };
    /**
     * lifecycle
     */
    SummaryComponent.prototype.ngOnChanges = function () {
        console.log(this.solicitationID);
    };
    return SummaryComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SummaryComponent.prototype, "solicitationID", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SummaryComponent.prototype, "step1", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SummaryComponent.prototype, "step2", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SummaryComponent.prototype, "step3", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SummaryComponent.prototype, "type", void 0);
SummaryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-summary',
        template: __webpack_require__(915),
        styles: [__webpack_require__(797)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__solicitation_service__["a" /* SolicitationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _c || Object])
], SummaryComponent);

var _a, _b, _c;
//# sourceMappingURL=summary.component.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_http_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_email_service__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shared_services_file_service__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_routing__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__password_password_component__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_user_profile_profile_component__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_completer__ = __webpack_require__(114);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// Services





//Routes

//Components


// Open Sources



var UserModule = (function () {
    function UserModule() {
    }
    return UserModule;
}());
UserModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_8__user_routing__["a" /* UserRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_12_ng2_completer__["a" /* Ng2CompleterModule */],
            __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["FileUploadModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__shared_services_email_service__["a" /* EmailService */],
            __WEBPACK_IMPORTED_MODULE_7_app_shared_services_file_service__["a" /* FileService */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10_app_user_profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_9__password_password_component__["a" /* PasswordComponent */],
        ]
    })
], UserModule);

//# sourceMappingURL=user.module.js.map

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_private_private_component__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__password_password_component__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_user_profile_profile_component__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_guard_service__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// COMPONENTS




var routes = [
    {
        path: 'user',
        component: __WEBPACK_IMPORTED_MODULE_2__home_private_private_component__["a" /* PrivateComponent */],
        canActivateChild: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]],
        children: [
            { path: 'updatePassword', component: __WEBPACK_IMPORTED_MODULE_3__password_password_component__["a" /* PasswordComponent */] },
            { path: 'profile/:userID', component: __WEBPACK_IMPORTED_MODULE_4_app_user_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__auth_guard_service__["a" /* AuthGuard */]] },
        ]
    },
];
var UserRoutingModule = (function () {
    function UserRoutingModule() {
    }
    return UserRoutingModule;
}());
UserRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], UserRoutingModule);

//# sourceMappingURL=user.routing.js.map

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n\n.analytic-div {\n    background-color: #ebf3f9;\n    padding: 30px 0px !important;\n    margin: 0px !important;\n}\n\n.analytic-container {\n    background-color: white; \n    padding: 0px !important\n}\n\n.analytic-overview-name {\n    padding-bottom: 5px; \n    clear: both; \n    width: 100%;\n    font-weight: 100;\n    font-size: 20px;\n    color: #112e51;\n}\n\n.analytic-summary-div {\n    position: relative; \n    display: inline-block;\n    width: calc(20% - 10px);\n    text-align: center;\n    padding: 10px;\n}\n\n.analytic-summary-result {\n    font-size: 30px;\n    padding-bottom: 20px;\n}\n\n.information-icon {\n    position: absolute;\n    top: 0px;\n    right: 0px;\n}\n\n.analytic-summary-title {\n    color: #8ca0b3;\n    font-size: 20px;\n    padding-bottom: 10px;\n}\n\n\n\n.nopadding {\n    margin: 0px !important;\n    padding: 0px !important;\n}\n\n.analytic-title {\n    font-size: 20px;   \n    color: #687a8b;\n    padding: 20px;\n    font-weight: 300;\n}\n\n.analyric-bar:hover {\n    border-top: 1px solid #53A9DE;\n    border-right: 1px solid #53A9DE;\n    border-left: 1px solid #53A9DE;\n}\n\n.analytic-padding-left{\n    float: left; padding: 0px 15px 0px 0px;\n\n}\n.analytic-padding{\n    padding: 30px 0px 10px 0px;\n}\n\noption {\n    padding: 2px 0px;\n}\n\n.row-eq-height {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.analytic-titlepadding {\n    padding: 20px 40px 0px 40px !important\n}\n\n.analytic-smalltitle {\n    padding: 10px 40px !important; \n    background-color: #e7f4e4; \n    font-weight: 500; \n    font-size: 13px;\n    margin: 0px !important;\n    \n}\n\n.analytic-bigtitle {\n    font-size: 24px;\n    margin-bottom: 20px; \n    font-weight: 600\n}\n\n\n.analytic-select-style{\n    height: 32px; \n    padding: 5px 30px 5px 15px; \n    font-size: 16px; \n    border: none; \n    border-bottom: 1px solid #4a4a4a;\n}\n\n\n.analytic-select-container{\n    padding: 0px 40px 40px 40px !important; \n    background-color: #fbfcff; \n    border-top: 1px solid #dadada;\n}\n.analytic-select-position{\n    display: inline-block; \n    vertical-align: middle; \n    padding-right: 10px; \n    font-size: 16px; \n    font-size: 24px; \n    font-weight: 600\n}\n.analytic-second-select-position{\n    display: inline-block; \n    vertical-align: middle;\n}\n.analytic-section1-container{\n    padding: 0px 40px 40px 40px !important; \n    background-color: #fbfcff; \n}\n.analytic-section2-container{\n    padding: 0px 40px 60px 40px !important; \n    background-color: #fbfcff; \n}\n.analytic-section3-container{\n   margin-bottom: 40px !important; \n   padding: 40px 40px 10px 40px !important; \n   border-top: 1px solid #dadada;\n}\n/*\n.scanned-solicitation {\n    width: calc(100% - 300px); \n    float: left;\n    margin-bottom: 60px !important\n}\n\n.prediction-result {\n    width: 250px; \n    float: right;\n    margin-bottom: 40px !important;\n}\n*/\n\n.scanned-solicitation {\n    width: calc(100% - 400px); \n    float: left;\n    margin-bottom: 60px !important\n}\n\n.user-login {\n    width: calc(100% - 400px); \n    float: left;\n    margin-bottom: 60px !important\n}\n\n.machine-readable, .prediction-result, .exclude  {\n    width: 350px; \n    float: right;\n    margin-bottom: 40px !important;\n}\n\n\n\n@media (max-width: 992px) \n{\n    .row-eq-height {\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    }\n\n    .scanned-solicitation {\n        width: 100%; \n    }\n\n    .machine-readable {\n        width: 100%; \n    }\n}\n\n\n/*analytics page*/\n\n.supfont{\n    font-size: 20px;\n}\n.precposi{\n    position: relative;\n}\n\n.chartcontainer{\n    max-width: 300px; \n    padding: 0px\n}\n\n.circlechart{\n    font-size: 20px;\n    margin-bottom: 20px; \n    font-weight: 600\n}\n\n.percentage{\n    position: absolute; \n    top: 79px; width: 100%; \n    text-align: center; \n    font-size: 30px; \n    color: #2C81C0\n\n}\n\n.chartspan{\n    font-size: 1.5em; \n    font-weight: 700\n}\n\n.perresult{\n    padding: 30px 10px; \n    text-align: center; \n    font-size: 16px; \n    color: #1768d7; \n    font-weight: 500\n}\n\n\n/* top-agencies*/\n.paddingright{\n    padding-right: 40px;\n}\n\n.topagen-title{\n    font-size: 20px; \n    margin-bottom: 70px; \n    font-weight: 600\n}\n\n.topagen-barchart{\n    width: 100%; \n    position: relative; \n    font-size: 18px; \n    margin-bottom: 60px; \n    height: 191px; \n    display: table; \n    text-align: center\n}\n.topagen-nodata{\n    display: table-cell;\n    vertical-align: middle\n}\n\n.topagen-content{\n    width: 100%;\n    position: relative;\n    margin-bottom: 40px;\n    padding-left: 40px; \n    position: relative\n}\n\n.topagen-position{\n    position: relative; \n    left: 63px; \n    top: -25px; \n    width: calc(100% - 80px);\n}\n.topagen-posabsoulte{\n    position: absolute\n}\n\n.topagen-posi1{\n    position: absolute; \n    right: 28px; \n    top: -105px;\n}\n.topagen-posi1-blue{\n width: 15px;\n height: 15px; \n background-color: #2C81C0; \n display: inline-block; \n vertical-align: middle\n}\n.topagen-posi1-white{\n    width: 15px; \n    height: 15px; \n    background-color: #eeeeee; \n    display: inline-block; \n    vertical-align: middle\n}\n.topagen-posi1-display{\n    display: inline-block; \n    vertical-align: middle\n}\n\n.topagen-posi2{\n    position: absolute; \n    right: 0px;\n    top: -80px;\n}\n.topagen-posi3{\n    position: absolute; \n    top: -55px; \n    width: 100%; \n    text-align: center; \n    font-weight: 600; \n    font-size: 16px;\n}\n.topagen-posi4{\n    position: absolute; \n    left: 0px; \n    transform: rotate(-90deg); \n    font-size: 16px; \n    font-weight: 600; \n    text-align: center\n}\n.topagen-table{\n    width: 100%; \n    transform: translateZ(0);\n}\n.topagen-td1{\n    border-right:1px solid #4a4a4a; \n    padding-right: 20px; \n    width: 40px; \n    height: 30px; \n    font-weight: 500\n}\n.topagen-td2{\n    vertical-align: middle\n}\n\n.topagen-div1{\n    background-color:#2C81C0; \n    height: 10px; \n    float: left\n}\n.topagen-div2{\n    background-color:#eeeeee; \n    height: 10px; \n    float: left; \n    position: relative\n}\n.topagen-div3{\n    position: absolute; \n    right: -40px; \n    top: -5px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".us-tab-item-slide {\n    text-align: center;\n    line-height: 37px;\n    display: inline-block;\n    position: relative;\n    padding-bottom: 3px;\n    text-transform: uppercase;\n    cursor: pointer;\n}\n\n.us-tab-item-slide:after {\n    content: '';\n    display: block;\n    margin: auto;\n    height: 3px;\n    width: 0px;\n    background: transparent;\n    transition: width .3s ease, background-color .3s ease;\n}\n\n.us-tab-item-slide.active:after {\n    width: 100%;\n    background: #17699b;\n}\n\n.us-tab-item-slide.active {\n    color: #17699b;\n}\n\n.us-tab-item-slide a {\n    color: black;\n    font-size: 16px;\n    font-weight: 500;\n    padding: 0px 10px;    \n}\n\n.us-tab-item-slide a:hover {\n    text-decoration: none; \n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n\n\n.perposition{\n  display: block;\n  margin: 0px auto;\n  height: 200px;\n  transform: translateZ(0)\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".linechart{\n    padding-left: 40px; position: relative\n}\n.positiony{\n    position: absolute; \n    left: 0px; \n    top: 0px; \n    transform: rotate(-90deg); \n    font-size: 16px; \n    font-weight: 600; \n    text-align: center; \n    height: 180px; \n    width: 180px;\n}\n.positionx{\n    position: absolute; \n    bottom: -30px; \n    font-size: 16px; \n    font-weight: 600; \n    text-align: center; \n    width: 100%\n}\n.positionchart{\n    display: block; \n    margin: 0px auto; \n    height: 200px; \n    transform: translateZ(0);\n\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 766:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".chartcontainer{\n    max-width: 350px; \n    padding: 0px 15px\n}\n.piechart{\n    font-size: 20px; \n    margin-bottom: 20px; \n    font-weight: 600;\n}\n.pieposition{\n    display: block; \n    margin: 0px auto; \n    height: 280px; \n    transform: translateZ(0); \n    font-weight: 300\n}\n.pieresultun{\n    position: absolute; \n    font-size: 20px; \n    color: #000; \n    top: -20px; \n    right: calc(50% + 10px)\n\n}\n.pieresult{\n    position: absolute; \n    font-size: 20px; \n    color: #000; \n    bottom: 45px; \n    left: calc(50% + 40px)\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".chartcontainerp{\n    max-width: 350px; \n    padding: 0px 15px\n}\n.piechart{\n    font-size: 20px; \n    margin-bottom: 20px; \n    font-weight: 600;\n}\n.pieposition{\n    display: block; \n    margin: 0px auto; \n    height: 280px; \n    transform: translateZ(0); \n    font-weight: 300\n}\n.pieresult{\n    position: absolute; \n    font-size: 20px; \n    color: #000; \n    top: -20px; \n    left: calc(50% + 30px)\n\n}\n.pieresultun{\n    position: absolute; \n    font-size: 20px; \n    color: #000; \n    top: 125px; \n    left: calc(50% + 120px)\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".chart{\n    font-size: 20px; \n    margin-bottom: 20px; \n    font-weight: 600\n}\n.barchart{\n    padding-left: 40px; \n    position: relative\n}\n.positions{\n    position: absolute; \n    left: 0px; \n    top: 0px; \n    transform: rotate(-90deg); \n    font-size: 16px; \n    font-weight: 600; \n    text-align: center; \n    height: 180px; \n    width: 180px;\n}\n.positiond{\n    position: absolute; \n    bottom: -30px; \n    font-size: 16px; \n    font-weight: 600; \n    text-align: center; \n    width: 100%\n}\n.positionbar{\n    display: block; \n    margin: 0px auto; \n    height: 250px; \n    transform: translateZ(0);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 770:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 771:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".top-srt-padding{\n    padding: 0px 20px\n}\n.top-srt-overview{\n    font-size: 16px; \n    width: 100%;\n}\n.top-srt-title{\n    font-size: 20px; \n    margin-bottom: 40px;\n    font-weight: 600\n}\n.top-srt-floatleft{\n    float: left\n}\n.top-srt-floatright{\n    float: right\n}\n.top-srt-white{\n    width: 100%; \n    background-color: #f7f7f7; \n    height: 8px; \n    float: left; \n    margin-bottom: 20px;\n}\n.top-srt-blue{\n    background-color: #2C81C0;\n     height: 8px\n}\n.supfont{\n    font-size: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 772:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "    .undeter-solic-padding{\n        padding: 0px 15px;\n        }\n    .undeter-solic-title{\n        font-size: 20px;\n        margin-bottom: 20px;\n        font-weight: 600\n    }\n    .undeter-solic-supfont{\n        font-size: 20px;\n    }\n    .undeter-solic-div{\n        position: relative;\n        max-width: 350px;\n    }\n\n    .undeter-solic-canvas{\n        display: block;\n        margin: 0px auto;\n        height: 280px;\n        transform: translateZ(0);\n        font-weight: 300\n    }\n    .undeter-solic-dispaly1{\n        position: absolute;\n        font-size: 20px;\n        color: #000;\n        top: 120px;\n        left: calc(50% + 110px)\n    }\n    .undeter-solic-dispaly2{\n        position: absolute;\n        font-size: 20px;\n        color: #000;\n        top: -17px;\n        right: calc(50% + 19px);\n    }\n    .undeter-solic-dispaly3{\n        position: absolute;\n        font-size: 20px;\n        color: #000;\n        top: -23px;\n        right: calc(50% - 25px)\n    }\n    .undeter-solic-dispaly4{\n        position: absolute;\n        font-size: 20px;\n        color: #000;\n        top: 80px;\n        right: calc(50% + 107px)\n    }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".user-login-title{\n    font-size: 20px; \n    margin-bottom: 40px; \n    font-weight: 600\n}\n.user-login-font{\n    font-size: 1.5em; \n    font-weight: 700;\n}\n.user-login-canvas{\n    display: block; \n    margin: 0px auto; \n    height: 200px; \n    transform: translateZ(0);\n}\n\n.user-login-padding{\n    padding-left: 40px; \n    position: relative\n}\n.user-login-user{\n    position: absolute; \n    left: 0px; \n    top: 0px; \n    transform: rotate(-90deg); \n    font-size: 16px; \n    font-weight: 600; \n    text-align: center; \n    height: 180px; \n    width: 180px;\n}\n.user-login-data{\n    position: absolute; \n    bottom: -30px; \n    font-size: 16px; \n    font-weight: 600; \n    text-align: center;\n     width: 100%\n}\n .user-login-content{\n        position: absolute; \n        right: 20px; \n        top: -30px; \n        font-size: 16px; \n        font-weight: 600; \n        color: #1768d7\n    }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n.nopadding {\n    margin: 0px !important;\n    padding: 0px !important;\n}\n\n.gov-msg:after {\n    /* symbol for \"opening\" panels */\n    font-family: 'Glyphicons Halflings';  /* essential for enabling glyphicon */\n    content: \"\\E114\";    /* adjust as needed, taken from bootstrap.css */\n    float: right;        /* adjust as needed */\n    color: inherit;         /* adjust as needed */\n    font-size: 10px;\n}\n.gov-msg.collapsed:after {\n    /* symbol for \"collapsed\" panels */\n    content: \"\\E113\";    /* adjust as needed, taken from bootstrap.css */\n}\n\n* {\n    font-family: Source Sans Pro !important\n}\n\n.gsa-subtitle{\n    display: inline-block; \n    font-size: 12px\n}\n.gsa-sintr{\npadding-bottom: 2.3rem; \npadding-top: 4rem; \npadding-right: 30px; \ndisplay: table\n}\n.gsa-sicon{\n    display: table-cell; \n    vertical-align: top;\n    width: 48px\n}\n.gsa-scontent{\n    display: table-cell; \n    vertical-align: top; \n    font-size: 1.6rem;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 775:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "ul.register {\n    padding: 0px;\n    margin: 0px;\n    list-style: none;\n    width: 100%;\n}\n\nul.register li {\n    float: left;\n    font-size: 20px;\n    width: 50%;\n    text-align: center;\n    cursor: pointer;\n    padding: 10px;\n    border-bottom: 1px solid #dadada;\n}\n\nul.register li.active {\n    background: #112e51;\n    color: #fff;\n    font-weight: 700;\n    transform: scaleY(1.1);\n    border: none;\n}\n\n\n/*Kailun's adding*/\n\n#gsaDropdown ul.dropdown-menu{\n    padding: 5px 0px;\n    background-color: #112e51 !important;\n}\n\n#gsaDropdown ul.dropdown-menu > li > a{\n    color: white;\n    font-weight: 300;\n}\n\n\n#gsaDropdown ul.dropdown-menu > li > a:hover{\n    background-color: transparent!important;\n}\n.dropdown-item {\nbackground-color: #112e51;\ncolor: white;\nborder: none;\npadding: 15px 0px;\ntext-align: left;\ntext-decoration: none;\ndisplay: inline-block;\nfont-size: 16px;\n    width: calc(100%);\nmargin-left: 0px;\npadding-left: 15px;\n}\n#srtlogo {\nmax-height: 40px;\nmargin-top: 8px;\nmargin-left: 10px;\n}\n#navbar ul.nav.navbar-nav,\n#navbar ul.nav.navbar-nav > li{\nheight: 60px;\ncursor: pointer;\n}\n\n#navbar ul.nav.navbar-nav > li.active{\nheight: 60px;\ncursor: pointer;\nborder-bottom: 2px solid #102c52;\n}\n\n#navbar ul.nav.navbar-nav > li > a{\nmargin: 20px 15px;\npadding: 0px;\nfont-weight: 500;\ncolor: #102c52;\nfont-size: 16px;\n}\n\n#navbar ul.nav.navbar-nav > li.active > a{\ncolor: #102c52!important;\nfont-weight: 700 !important;\n/* border-bottom: 1px solid #102c52; */\npadding-bottom: 5px!important;\nfont-weight: 700;\nbackground-color: transparent !important;\n}\n\n#navbar ul.nav.navbar-nav > li:focus {\noutline: none;\n}\n\n\nhr {\nmargin: 0px;\n}\n\n.us-navbar {\nbackground-color: white;\n}\n\n#header {\ntop: 0px;\nmargin:0px;\n\n/* border-width: 2px;\nborder-bottom-width:2px;\nborder-bottom-color: #112e51;\nborder-bottom-style: solid;\nwidth: 100%;*/\npadding: 0px; \nposition: -webkit-sticky; \nposition: sticky;  \nz-index: 50\n}\n#navbar a {\npadding-top: 20px;\n}\n#navbar a:link\n{\ntext-decoration: none;\ncolor: #4c2c92;\nfont-family: Arial, sans-serif;\nfont-size: medium;\nfont-weight: bold;\nletter-spacing: 1px;\n}\n/*#navbar a:active\n{\ntext-decoration: none;\ncolor: #112e51;\nfont-family: Arial, sans-serif;\nfont-size: medium;\nfont-weight: bold;\nletter-spacing: 1px;\n}*/\n\nimg {\nmax-width: 100%;\nmax-height: 60px;\nfloat: right;\n}\n\nhr {\ndisplay: block;\nheight: 3px;\nborder: 0;\nborder-top: 1px solid #112e51;\nmargin: 5px 0;\npadding: 0;\n}\n\n.dropdown-menu {\nleft: auto;\nright: -1px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n\n\n.srt-banner.lightblue {\n    margin: 0px;\n    background-color: #add8e6;\n    padding: 40px;\n    color: white;\n   \n    height: 300px;\n    box-shadow:0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.3);\n}\n\n\n\n\n.form-group span.required{\n     color: red;\n     font-size: 150%;\n}\n\n.form-control.ng-touched.ng-invalid{\n    border: 2px solid red\n}\n\n\n\n.title{\n    margin: 10px;\n\n}\n.border{\n    border: 1px solid black\n}\n.padding{\n    padding: 20px;\n}\n\n.text{\n    font-weight: 300;\n    font-size: 16px;\n}\n\nul.summary-steps {\n    padding: 0px;\n    font-size: 16px;\n    margin: 0px;\n}\n\nul.summary-steps li {\n    list-style: none;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".register-title {\n    padding: 0px 0px 45px 0px;\n    font-size: 28px;\n    font-weight: 700;\n}\n\n.form-group label {\n    font-weight: 300;\n    font-size: 16px;\n    width: 100%;\n}\n\n.error-form {\n    border: 2px solid #BE3430 !important;\n    border-radius: 0px;\n}\n\n.login-error{\n    color: #BE3430; \n    font-weight: bold; \n    margin-bottom: 20px; \n    margin-top: -10px\n}\n\n\n.form-group span.required{\n    color: red;\n    font-size: 150%;\n}\n\n.form-control.ng-touched.ng-invalid{\n   border: 2px solid red\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 778:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".register-title {\n    padding: 0px 0px 20px 0px;\n    font-size: 28px;\n    font-weight: 700;\n}\n\n.form-group label {\n    font-weight: 300;\n    font-size: 16px;\n    width: 100%;\n}\n\n.error-form {\n    border: 2px solid #BE3430 !important;\n    border-radius: 0px;\n}\n\n/*.dropdown-item.active {\n    font-weight: 700;\n    color: #0071bc;\n}*/\n\n.dropdown-item:hover {\n    background-color: #f1f1f1;\n    color: #0071bc;\n}\n\n.dropdown-item:hover  div {\n    background-color: #f1f1f1;\n    color: #0071bc !important;\n}\n\n.form-group span.required{\n    color: red;\n    font-size: 150%;\n}\n\n.form-control.ng-touched.ng-invalid{\n   border: 2px solid red\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 779:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "#gsaDropdown ul.dropdown-menu{\n\t\tpadding: 5px 0px;\n\t\tbackground-color: #112e51 !important;\n}\n\n#gsaDropdown ul.dropdown-menu > li > a{\n\t\tcolor: white;\n\t\tfont-weight: 300;\n}\n\n\n#gsaDropdown ul.dropdown-menu > li > a:hover{\n\t\tbackground-color: transparent!important;\n}\n.dropdown-item {\n\tbackground-color: #112e51;\n\tcolor: white;\n    border: none;\n    padding: 15px 0px;\n    text-align: left;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n\t\twidth: calc(100%);\n    margin-left: 0px;\n    padding-left: 15px;\n}\n#srtlogo {\n\tmax-height: 40px;\n    margin-top: 8px;\n    margin-left: 10px;\n}\n#navbar ul.nav.navbar-nav,\n#navbar ul.nav.navbar-nav > li{\n    height: 60px;\n    cursor: pointer;\n}\n\n#navbar ul.nav.navbar-nav > li.active{\n    height: 60px;\n    cursor: pointer;\n    border-bottom: 2px solid #102c52;\n}\n\n#navbar ul.nav.navbar-nav > li > a{\n    margin: 20px 15px;\n    padding: 0px;\n    font-weight: 500;\n    color: #102c52;\n    font-size: 16px;\n}\n\n#navbar ul.nav.navbar-nav > li.active > a{\n    color: #102c52!important;\n    font-weight: 700 !important;\n    /* border-bottom: 1px solid #102c52; */\n    padding-bottom: 5px!important;\n    font-weight: 700;\n    background-color: transparent !important;\n}\n\n#navbar ul.nav.navbar-nav > li:focus {\n    outline: none;\n}\n\n\nhr {\n    margin: 0px;\n}\n\n.us-navbar {\n\tbackground-color: white;\n}\n\n#header {\n\ttop: 0px;\n   margin:0px;\n   \n  /* border-width: 2px;\n   border-bottom-width:2px;\n   border-bottom-color: #112e51;\n   border-bottom-style: solid;\n   width: 100%;*/\n   padding: 0px; \n   position: -webkit-sticky; \n   position: sticky;  \n   z-index: 50\n}\n#navbar a {\n\tpadding-top: 20px;\n}\n#navbar a:link\n{\n    text-decoration: none;\n    color: #4c2c92;\n    font-family: Arial, sans-serif;\n    font-size: medium;\n    font-weight: bold;\n    letter-spacing: 1px;\n}\n/*#navbar a:active\n{\n    text-decoration: none;\n    color: #112e51;\n    font-family: Arial, sans-serif;\n    font-size: medium;\n    font-weight: bold;\n    letter-spacing: 1px;\n}*/\n\nimg {\n\tmax-width: 100%;\n\tmax-height: 60px;\n\tfloat: right;\n}\n\nhr {\n   display: block;\n    height: 3px;\n    border: 0;\n    border-top: 1px solid #112e51;\n    margin: 5px 0;\n    padding: 0;\n}\n\n.dropdown-menu {\n    left: auto;\n    right: -1px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".form-control.ng-touched.ng-invalid{\n  border: 2px solid red\n}\n\n.select  {\n  display: block;\n  width: 50%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);\n  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n  cursor: pointer;\n}\n\n.container {\npadding: 40px 0px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".faq-content-div {\n  padding: 50px 0px;\n}\n\n.faq-right-content h2 {\n  padding: 0px 0px 20px 0px;\n  margin: 0px;\n  color: #155394;\n}\n\n.faq-right-content {\n  padding: 0px 0px 0px 20px;\n}\n\n.faq-right-content .usa-accordion-bordered{\n  padding: 0px 0px 50px 0px;\n}\n\n.search-input {\nborder-top-left-radius: 5px;\nborder-bottom-left-radius: 5px;\nheight: 45px;\nmin-width: 300px;\nborder: 1px solid #205493;\noutline: none;\nbox-shadow: none;\npadding: 0px 10px;\nfont-weight: 500;\nfont-size: 16px;\n}\n\n.search-button {\nborder-top-right-radius: 5px;\nborder-bottom-right-radius: 5px;\nwidth: 75px;\nbackground-color: #205493;\nborder-color: #205493;\ncolor: white;\nfont-size: 20px;\nfont-weight: 500;\nheight: 45px;\ntext-align: center;\n}\n\n.nopadding {\n  padding: 0px !important;\n  margin: 0px !important;\n}\n\n.sticky-nav {\n  padding: 0px 40px 0px 0px;\n  position: -webkit-sticky;\n  position: sticky; top: 60px; left: 0px; float: left; width: 25%\n}\n\n.usa-sidenav-list {\n  margin-top: 0;\n  margin-bottom: 0;\n  list-style-type: none;\n  font-weight: 500;\n  padding: 0px;\n}\n\n.usa-sidenav-list > li:first-child {\n  border-top: none;\n}\n\n.usa-sidenav-list > li {\n  background-color: transparent;\n  border-top: 1px solid #5b616b;\n  font-size: 1.7rem;\n  cursor: pointer;\n}\n\n.usa-sidenav-list > li {\n  margin-bottom: 0;\n}\n\n.usa-sidenav-list a {\n  border: none;\n  color: #212121;\n  display: block;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  line-height: 1.3;\n  padding: 0.85rem 1rem 0.85rem 1.8rem;\n  text-decoration: none;\n}\n\n.usa-sidenav-list .active a {\n  border-left: 4px solid #0071bc;\n  color: #0071bc;\n  font-weight: 700;\n  padding-left: 1.4rem;\n}\n\n.usa-sidenav-list a:hover {\n  background-color: #f1f1f1;\n  color: #0071bc;\n  text-decoration: none;\n}\n\n.usa-sidenav-list a {\n  border: none;\n  color: #212121;\n  display: block;\n  font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  line-height: 1.3;\n  padding: 0.85rem 1rem 0.85rem 1.8rem;\n  text-decoration: none;\n}\n\nh4.panel-title {\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 16px;\n  display: inline-block;\n  width: calc(100% - 30px);\n  text-align: left\n}\n\n.panel-group .panel {\n  border-radius: 0;\n  border: none;\n}\n\n.panel-group {\n  margin-bottom: 40px;\n}\n\n.panel-body {\n  font-size: 16px;\n  font-weight: 500;\n}\n\n.panel {\n  box-shadow: none;\n}\n\na.panel-link {\n  color: black;\n}\n\na.panel-link:hover {\n  text-decoration: none;\n}\n\n.panel-link:after {\n  font-family: 'Glyphicons Halflings';  /* essential for enabling glyphicon */\n  content: \"\\2212\";    /* adjust as needed, taken from bootstrap.css */\n  color: inherit;         /* adjust as needed */\n  font-size: 10px;\n  display: inline-block;\n  width: 25px;\n  text-align: right;\n}\n\n.panel-link.collapsed:after {\n  /* symbol for \"collapsed\" panels */\n  content: \"+\";    /* adjust as needed, taken from bootstrap.css */\n}\n\n@media (max-width: 1200px)\n{\n  .usa-sidenav-list {\n      display: none;\n  }\n}\n\n.faqh4{\n  font-weight: 700;\n  font-size: 16px;\n  background-color: transparent;\n  cursor: pointer;\n  text-decoration: none;\n  line-height: 1.1;\n\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".nopadding {\n    padding: 0px !important;\n    margin: 0px !important;\n}\n\n.srt-background-image {\n    background-size: cover; \n    background-repeat: no-repeat; \n    background-position: center;    \n    height: 200px;\n    width: 100%; \n}\n\n.srt-text-section {\n    width: 100%; text-align: center; height: 240px\n}\n\n.srt-text-section-title {\n    font-size: 24px; padding: 10px; border-bottom: 1px solid #dadada; font-weight: 500;\n} \n\n.srt-text-section-description {\n    font-size: 18px; padding: 10px; border-bottom: 1px solid #dadada\n} \n\n.srt-button {\n    font-size: 20px; padding: 10px; border-bottom: 1px solid #dadada\n} \n\n.srt-home-button {\n    height: 80px; padding: 20px; text-align: center;\n}\n\n#srtlogo {\n\tmax-width: 100%;\n\tmax-height: 200px;\n\tfloat: right;\n}\n\n.centerfy img{\n    margin: 0 auto;\n}\n\n.centerfy {\n    text-align: center;\n}\n\n#gsa {\n\tmax-width: 100%;\n\tmax-height: 200px;\n\tfloat: left;\n}\n\n.card {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n    max-width: 300px;\n    margin: auto;\n    text-align: center;\n}\n\n.container {\n    padding: 0 16px;\n}\n\n.title {\n    color: grey;\n    font-size: 18px;\n}\n\nbutton:hover, a:hover {\n    opacity: 0.7;\n}\n\nbody{font-family:'Open Sans Condensed',sans-serif;font-size:18px}\n.backto{background:#039; padding:12px 0; color:#fff}\n.backto a{color:#FFF; text-decoration:none}\n.cards-row{padding-top:40px; padding-bottom:20px; background:#eee}\n.thumbnail{height: 520px; padding:0; border-radius:0; border:none; box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}\n.thumbnail>img{width:100%; height: 200px; display:block}\n.thumbnail h3{font-size:26px}\n.thumbnail h3,.card-description{margin:0; padding:8px 0; border-bottom:solid 1px #eee; text-align:center}\n.thumbnail p{padding-top:8px; font-size:20px}\n.thumbnail .btn{-ms-flex-item-align: center;-ms-grid-row-align: center;align-self: center; position: absolute; bottom: 30px; margin:0; padding: 5px 3px; border-radius:0; box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12); font-size:20px}\n\n\n\n.srt-1-1:before {\n    content: \"\";\n    display: block;\n    padding-top: 100%;\n}\n\n.srt-9-20:before {\n    content: \"\";\n    display: block;\n    padding-top: 45%;\n}\n\n.srt-11-20:before {\n    content: \"\";\n    display: block;\n    padding-top: 55%;\n}\n\n.srt-9-20, \n.srt-11-20,\n.srt-1-1 {\n    position: relative;\n    width: 100%;\n    overflow: hidden;\n    transition: all 150ms ease-in-out;\n}\n\n.srt-9-20 > div,\n.srt-11-20 > div,\n.srt-1-1 > div {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}\n\n.srt-9-20 > div > div,\n.srt-11-20 > div > div,\n.srt-1-1 > div > div {\n    height: 100%;\n    width: 100%;\n}\n\n.srt-main-box {\n    border: 1px solid #dadada;\n    transition: all 150ms ease-in-out;\n    cursor: pointer;\n}\n\n.srt-main-box:hover {\n    border: 1px solid #78aeee;\n}\n\n.srt-1-1:hover {\n    box-shadow:0 6px 10px 0 rgba(120,174,238, 0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(120,174,238, 0.3);\n}\n\n.srt-main-box h3 {\n    margin-top: 0px;\n}\n\n.srt-main-box p {\n    margin-top: 20px;\n    font-size: 18px;\n    padding: 0px 30px;\n}\n\n.srt-homehead{\n    background-image: url('/assets/home-page-cover.jpg');\n            background-size: cover;\n            background-repeat: no-repeat;\n            background-position: center;\n            height: 350px;\n            width: 100%;\n            opacity: 0.85;\n            position: relative;\n}\n.srt-headposition{\n        position: absolute; \n        top: 0px; \n        right: 0px; \n        bottom: 0px; \n        left: 0px;\n}\n\n.srt-headtext{\n    text-align: right;  \n    display: table; \n    height: 100%; \n    width: 100%\n}\n.srt-headdisplay{\n    display: table-cell; \n    vertical-align: middle;\n\n}\n.srt-headpadding{\n    padding: 0px 60px; \n    max-width: 1000px; \n    float: right\n}\n.srt-maintitle{\n    font-weight: 600; \n    border-bottom: 0.5px solid #112e51; \n    padding-bottom: 10px\n}\n.srt-textpadding{\n    padding-left: 100px; \n    padding-top: 20px\n}\n.srt-beta-container{\n    position: absolute; \n    bottom: -40px; \n    right: 60px; \n    background-color: rgba(0,0,0,0.7); \n    width: 50%; \n    max-width: 500px;\n}\n.srt-beta-position{\n    position: relative; \n    color: white; \n    display: table;\n}\n.srt-beta-padding{\n    display: table-cell; \n    vertical-align: middle; \n    padding: 15px 22px\n}\n.srt-betatitle{\n    padding-bottom: 5px; \n    font-weight: 500; \n    font-size: 16px; \n    color: white;\n}\n\n.srt-marginbot{\n    margin-bottom: 30px\n}\n.srt-block-padding{\n    text-align: center; \n    padding: 0px 25px\n}\n.srt-icon1{\n    background-image: url('/assets/review-manage-workflow.png');\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n    height: 100%; \n    width: 100%\n}\n.srt-icon2{\n    background-image: url('/assets/view-analytics.png');\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n    height: 100%; \n    width: 100%\n}\n.srt-icon3{\n    background-image: url('/assets/manage-srt-access-requests.png');\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n    height: 100%; \n    width: 100%\n}\n.srt-icon4{\n    background-image: url('/assets/get-additional-resourses.png');\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n    height: 100%; \n    width: 100%\n}\n.srt-icon5{\n    background-image: url('/assets/faq.png');\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n    height: 100%; \n    width: 100%\n}\n.srt-icon6{\n    background-image: url('/assets/settings.png');\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n    height: 100%; \n    width: 100%\n}\n.srt-iconpadding{\n    padding: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".review-title {\n    padding: 0px 0px 45px 0px;\n    font-size: 28px;\n    font-weight: 700;\n}\n\n#reps {\n  margin-left: 15px;\n  margin-bottom: 15px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "table {\n  table-layout:fixed\n}\n\n.impcontainer{\n  font-size: 16px;\n  line-height: 1.5em;\n  font-weight: 500;\n  padding: 40px 0px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "table {\n  table-layout:fixed\n}\n\n.list {\n  margin-bottom: 10px;\n}\n\n.list-title {\n  font-weight: 500;\n  display: inline-block;\n  vertical-align: baseline;\n}\n\n.list-content {\n  font-weight: 700;\n  display: inline-block;\n  vertical-align: baseline;\n}\n\n.survey-radio-option {\n  display: table-cell;\n  text-align: left;\n  width: 35px;\n}\n\n.summary-content-padding{\npadding: 30px 20px\n}\n\n/* us web design standard */\n\n[type=checkbox] + label, [type=radio] + label {\n  cursor: pointer;\n  font-weight: 400;\n  margin-bottom: 0.5em;\n}\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0;\n}\n\n[type=checkbox], [type=radio] {\n  margin-left: -2rem;\n  opacity: 0;\n  position: absolute;\n}\n\n[type=checkbox]:checked + label::before, [type=radio]:checked + label::before {\n  background-color: #0071bc;\n  box-shadow: 0 0 0 1px #0071bc;\n}\n\n\n[type=checkbox]:checked + label::before, [type=checkbox]:checked:disabled + label::before {\n  background-image: url(" + __webpack_require__(510) + ");\n  background-image: url(" + __webpack_require__(259) + ");\n  background-position: 50%;\n  background-repeat: no-repeat;\n}\n\n[type=checkbox] + label::before, [type=radio] + label::before {\n  background: #ffffff;\n  border-radius: 0.3rem;\n  box-shadow: 0 0 0 1px #757575;\n  content: '\\A0';\n  display: inline-block;\n  height: 1.8rem;\n  line-height: 1.8rem;\n  margin-right: 0.6em;\n  text-indent: 0.15em;\n  vertical-align: middle\\0;\n  width: 1.8rem;\n}\n\n.input-percentage {\n  width: 40px;\n  height: 23px;\n  margin-left: 15px;\n}\n.imsubmit{\n  width: 170px;\n  display: inline-block;\n  vertical-align: top\n}\n\n#instruction{\n  font-weight: 600;\n  font-size: 16px;\n  padding: 20px 30px;\n  border: 1px solid #dadada\n}\n.impcontainer{\n  font-size: 16px;\n  line-height: 1.5em;\n  font-weight: 500;\n  padding: 40px 0px;\n}\n.imppostion{\n  width: 100% ;\n  display: inline-block;\n  vertical-align: top\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "#solsearch{\n    width: 100%;\n    float: right;\n    border-radius: 50px;\n}\n\n#soltitle {\n    text-decoration: none;\n    color: #205493;\n    /*font-family: Arial, sans-serif;*/\n    font-size: x-large;\n    font-weight: bold;\n    letter-spacing: 1px;\n    padding: 0px  20px;\n    width: 800px;\n}\n\n#csv {\n  padding-left: 20px;\n}\n#csvlogo {\n  max-height: 40px;\n  padding-left: 10px;\n}\n\n.button {\n  background-color: white;\n}\n\n/* Override padding for bootstrap. */\n.nopadding {\n    margin: 0px !important;\n    padding: 0px !important;\n}\n\nth {\n  font-size: 18px;\n  font-weight: bold !important;\n  vertical-align: top;\n}\n\nbody {\n    font-family: \"Source Sans Pro\", \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif !important;\n}\n\n.ui-dropdown-label.ui-inputtext.ui-corner-all {\n  font-size: 16px;\n}\n\n.ui-state-default.ui-unselectable-text.ui-sortable-column {\n  font-size: 16px;\n}\n\n\n.ui-calendar, .ui-calendar input {\n    width: 100% !important;\n}\n\n\n/*Animation */\nul.cb-slideshow {\n    padding-left: 0px;\n    font-size: 80px;\n    text-align: center;\n}\n\nul.cb-slideshow li {\n    list-style: none;\n    display: inline;\n} \n/*solicitation report */\n.solic-nosolic{\n    height: calc(100vh - 60px); \n    display: table; \n    width: 100%;\n}\n.solic-nosolic-posi{\n    display:table-cell;\n    vertical-align:middle\n}\n.solic-table{\n    display: table; \n    width: 100%; \n    max-width: 600px; \n    float: right\n}\n.solic-keyword{\n    display: table-cell; \n    vertical-align: middle; \n    width: 105px; \n    font-size: 16px;\n}\n.solic-table-cell{\n    display: table-cell; \n    vertical-align: middle; \n    width: 300px;\n}\n.solic-export{\n    display: table-cell;\n    vertical-align: middle; \n    width: 65px;\n}\n.solic-export-cursor{\n    display: table-cell; \n    vertical-align: middle; \n    width: 40px; \n    cursor: pointer\n}\n.solic-littlescan{\n    font-weight: 500; \n    float: left; \n    color: #186ba0\n}\n.cb-slideshow li span {\n    opacity: 0.3;\n    display: inline;\n    -webkit-backface-visibility: hidden;\n    animation: imageAnimation 3s linear infinite 0s;\n}\n\n.cb-slideshow li:nth-child(1) span {\n    animation-delay: 0s;\n}\n\n.cb-slideshow li:nth-child(2) span {\n    animation-delay: 0.25s;\n}\n\n.cb-slideshow li:nth-child(3) span {\n    animation-delay: 0.5s;\n}\n\n.cb-slideshow li:nth-child(4) span {\n    animation-delay: 0.75s;\n}\n\n.cb-slideshow li:nth-child(5) span {\n    animation-delay: 1s;\n}\n\n.cb-slideshow li:nth-child(6) span {\n    animation-delay: 1.25s;\n}\n\n.cb-slideshow li:nth-child(7) span {\n    animation-delay: 1.5s;\n}\n\n.cb-slideshow li:nth-child(8) span {\n    animation-delay: 1.75s;\n}\n\n.cb-slideshow li:nth-child(9) span {\n    animation-delay: 2s;\n}\n\n.cb-slideshow li:nth-child(10) span {\n    animation-delay: 2.25s;\n}\n\n.cb-slideshow li:nth-child(11) span {\n    animation-delay: 2.5s;\n}\n\n.cb-slideshow li:nth-child(12) span {\n    animation-delay: 2.75s;\n}\n\n.cb-slideshow li:nth-child(13) span {\n    animation-delay: 3s;\n}\n\n@keyframes imageAnimation {\n  0% {\n      opacity: 0.5;\n      animation-timing-function: ease-in;\n  }\n\n  8% {\n      opacity: 1;\n      transform: scale(1.05);\n      animation-timing-function: ease-out;\n  }\n\n  17% {\n      opacity: 1;\n      transform: scale(1.05);\n  }\n\n  25% {\n      opacity: 0.5;\n      transform: scale(1.05);\n  }\n\n  100% {\n      opacity: 0.5;\n      transform: scale(1.05);\n  }\n}\n\n\n\n.pDataTable {\n    padding: 0px 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".input {\n  width: 100%;\n}\n\n.nopadding {\n    margin: 0px !important;\n    padding: 0px !important;\n}\n\ninput.form-control {\n    font-weight: 500;\n    display: inline-block;\n    width: calc(100% - 70px);\n}\n\nlabel {\n    width: 65px;\n}\n\n.ql-toolbar.ql-snow {\n    display: none !important;\n}\n\n\n.email-font{\n    font-weight: 500\n}\n\n/*.fr-toolbar.fr-desktop.fr-top.fr-basic.fr-sticky-off {\n    display: none !important\n}*/\n\n#rebutton{\n    font-size: 16px;\n    cursor: pointer;\n    float: right\n}\n#emailform{\n    font-weight: 500;\n    display: inline-block;\n    width: calc(100% - 170px);\n    vertical-align: top\n}\n#ebutton{\n    display: inline-block;\n    width: 150px;\n    vertical-align: top;\n    float: right\n}\n\n.summary-content-padding{\n  padding: 30px 20px\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".list {\n    margin-bottom: 10px;\n}\n\n.list-title {\n    font-weight: 500;\n    display: inline-block;\n    vertical-align: baseline;\n}\n\n.list-content {\n    font-weight: 700;\n    display: inline-block;\n    vertical-align: baseline;\n}\n\n.survey-radio-option {\n    display: table-cell;\n    text-align: left;\n    width: 35px;\n}\n\n.summary-content-padding{\n  padding: 30px 20px\n}\n\n/* us web design standard */\n\n[type=checkbox] + label, [type=radio] + label {\n    cursor: pointer;\n    font-weight: 400;\n    margin-bottom: 0.5em;\n}\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n    box-sizing: border-box;\n    padding: 0;\n}\n\n[type=checkbox], [type=radio] {\n    margin-left: -2rem;\n    opacity: 0;\n    position: absolute;\n}\n\n[type=checkbox]:checked + label::before, [type=radio]:checked + label::before {\n    background-color: #0071bc;\n    box-shadow: 0 0 0 1px #0071bc;\n}\n\n\n[type=checkbox]:checked + label::before, [type=checkbox]:checked:disabled + label::before {\n    background-image: url(" + __webpack_require__(510) + ");\n    background-image: url(" + __webpack_require__(259) + ");\n    background-position: 50%;\n    background-repeat: no-repeat;\n}\n\n[type=checkbox] + label::before, [type=radio] + label::before {\n    background: #ffffff;\n    border-radius: 0.3rem;\n    box-shadow: 0 0 0 1px #757575;\n    content: '\\A0';\n    display: inline-block;\n    height: 1.8rem;\n    line-height: 1.8rem;\n    margin-right: 0.6em;\n    text-indent: 0.15em;\n    vertical-align: middle\\0;\n    width: 1.8rem;\n}\n\n.input-percentage {\n    width: 40px;\n    height: 23px;\n    margin-left: 15px;\n}\n.imsubmit{\n    width: 170px;\n    display: inline-block;\n    vertical-align: top\n}\n\n#instruction{\n    font-weight: 600;\n    font-size: 16px;\n    padding: 20px 30px;\n    border: 1px solid #dadada\n}\n.impcontainer{\n    font-size: 16px;\n    line-height: 1.5em;\n    font-weight: 500;\n    padding: 40px 0px;\n}\n.imppostion{\n    width: 100% ;\n    display: inline-block;\n    vertical-align: top\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n.list {\n    margin-bottom: 10px;\n}\n\n.list-title {\n    font-weight: 600;\n    display: inline-block;\n    vertical-align: baseline;\n}\n\n.list-content {\n    font-weight: 400;\n    display: inline-block;\n    vertical-align: baseline;\n}\n\n.summary-content-padding{\n  padding: 30px 20px\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".nopadding {\n    margin: 0px !important;\n    padding: 0px !important;\n}\n\n.list {\n    margin-bottom: 10px;\n}\n\n.list-title {\n    font-weight: 400;\n    display: inline-block;\n    vertical-align: baseline;\n}\n\n.list-content {\n    font-weight: 600;\n    display: inline-block;\n    vertical-align: baseline;\n}\n\n#detail {\nposition: relative;\nfont-size: 16px;\n}\n\n.liststyle{\n    list-style: none;\n    line-height: 18px\n}\n\n#rbutton{\n    display: inline-block;\n    vertical-align: top;\n    float: right\n}\n\n\n.summary-content-padding{\n  padding: 30px 20px\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n.us-tab-item-slide {\n    text-align: center;\n    line-height: 37px;\n    display: inline-block;\n    position: relative;\n    padding-bottom: 3px;\n    text-transform: uppercase;\n    cursor: pointer;\n}\n\n.us-tab-item-slide:after {\n    content: '';\n    display: block;\n    margin: auto;\n    height: 3px;\n    width: 0px;\n    background: transparent;\n    transition: width .3s ease, background-color .3s ease;\n}\n\n.us-tab-item-slide.active:after {\n    width: 100%;\n    background: #17699b;\n}\n\n.us-tab-item-slide.active {\n    color: #17699b;\n}\n\n.us-tab-item-slide a {\n    color: black;\n    font-size: 16px;\n    font-weight: 500;\n    padding: 0px 10px;\n}\n\n.us-tab-item-slide a:hover {\n    text-decoration: none;\n}\n\nul.summary-steps {\n    padding: 0px;\n    font-size: 16px;\n    margin: 0px;\n}\n\nul.summary-steps li {\n    list-style: none;\n}\n\n\n\n.srt-tabs {\n    border-top: 1px solid #f7f7f7;\n    border-bottom: 1px solid #f7f7f7;\n    background-color: #00336f;\n}\n\n.srt-tabs li {\n    list-style: none;\n    border-left: 1px solid #f7f7f7;\n    text-align: center;\n    float: left;\n    text-transform: uppercase;\n    cursor: pointer;\n    padding: 10px 20px;\n}\n\n.srt-tabs li a {\n    color: #f7f7f7;\n}\n\n.srt-tabs li a:hover {\n    text-decoration: none;\n}\n\n.srt-tabs li.active {\n    background-color: #f7f7f7\n}\n\n.srt-tabs li.active a {\n    color: #00336f;\n    font-weight: 700;\n}\n\n.srt-tabs li:last-child {\n    border-right: 1px solid #f7f7f7;\n}\n\n\n/*summary*/\n.summary-title{\n    font-size: 20px;\n    padding-bottom: 15px;\n}\n.summary-steps{\n    display: inline-block;\n    vertical-align: top\n}\n.summary-instr{\n    display: inline-block;\n    vertical-align: top;\n    width: calc(100% - 80px)\n}\n.summary-tab{\n    position: -webkit-sticky;\n    position: sticky;\n    top: 60px;\n    z-index: 50\n}\n.summary-floatleft{\n    padding: 0px;\n    float: left\n}\n.summary-floatright{\n    padding: 0px;\n    float: right\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n\n\n.srt-banner.lightblue {\n    margin: 0px;\n    background-color: #add8e6;\n    padding: 40px;\n    color: white;\n   \n    height: 300px;\n    box-shadow:0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.3);\n}\n\n\n\n\n.form-group span.required{\n     color: red;\n     font-size: 150%;\n}\n\n.form-control.ng-touched.ng-invalid{\n    border: 2px solid red\n}\n\n\n\n.title{\n    margin: 10px;\n\n}\n.border{\n    border: 1px solid black\n}\n.padding{\n    padding: 20px;\n}\n\n.text{\n    font-weight: 300;\n    font-size: 16px;\n}\n\nul.summary-steps {\n    padding: 0px;\n    font-size: 16px;\n    margin: 0px;\n}\n\nul.summary-steps li {\n    list-style: none;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".profile-user-pic{\n    border-radius: 50%; \n    width:250px; \n    height:250px;\n    background-size:100%\n}\n\n.profile-user-info{\n    padding-right: 10%;\n}\n\n.profile-user-info-title{\n    font-size: 20px;  \n    font-weight: 500;\n    color: #737373\n   \n}\n.profile-user-line {\n    background-image: linear-gradient(to right, transparent 0%, #8C8C8C 15%, #8C8C8C 85%, transparent 100%);\n    height: 2px;\n  }\n\n/* For user profile picture */\n\n.profile-img-container {\n    position: relative;\n}\n\n.profile-img-container i {\n    position: absolute;\n    top: 90%;  \n    left: 85%;\n    transform: translate(-45%, -45%);\n    display: none;\n}\n\n.profile-img-container:hover img {\n    opacity: 0.5;    \n}\n\n.profile-img-container:hover i {\n    display: block;\n    z-index: 500;\n\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 260,
	"./af.js": 260,
	"./ar": 267,
	"./ar-dz": 261,
	"./ar-dz.js": 261,
	"./ar-kw": 262,
	"./ar-kw.js": 262,
	"./ar-ly": 263,
	"./ar-ly.js": 263,
	"./ar-ma": 264,
	"./ar-ma.js": 264,
	"./ar-sa": 265,
	"./ar-sa.js": 265,
	"./ar-tn": 266,
	"./ar-tn.js": 266,
	"./ar.js": 267,
	"./az": 268,
	"./az.js": 268,
	"./be": 269,
	"./be.js": 269,
	"./bg": 270,
	"./bg.js": 270,
	"./bm": 271,
	"./bm.js": 271,
	"./bn": 272,
	"./bn.js": 272,
	"./bo": 273,
	"./bo.js": 273,
	"./br": 274,
	"./br.js": 274,
	"./bs": 275,
	"./bs.js": 275,
	"./ca": 276,
	"./ca.js": 276,
	"./cs": 277,
	"./cs.js": 277,
	"./cv": 278,
	"./cv.js": 278,
	"./cy": 279,
	"./cy.js": 279,
	"./da": 280,
	"./da.js": 280,
	"./de": 283,
	"./de-at": 281,
	"./de-at.js": 281,
	"./de-ch": 282,
	"./de-ch.js": 282,
	"./de.js": 283,
	"./dv": 284,
	"./dv.js": 284,
	"./el": 285,
	"./el.js": 285,
	"./en-au": 286,
	"./en-au.js": 286,
	"./en-ca": 287,
	"./en-ca.js": 287,
	"./en-gb": 288,
	"./en-gb.js": 288,
	"./en-ie": 289,
	"./en-ie.js": 289,
	"./en-il": 290,
	"./en-il.js": 290,
	"./en-nz": 291,
	"./en-nz.js": 291,
	"./eo": 292,
	"./eo.js": 292,
	"./es": 295,
	"./es-do": 293,
	"./es-do.js": 293,
	"./es-us": 294,
	"./es-us.js": 294,
	"./es.js": 295,
	"./et": 296,
	"./et.js": 296,
	"./eu": 297,
	"./eu.js": 297,
	"./fa": 298,
	"./fa.js": 298,
	"./fi": 299,
	"./fi.js": 299,
	"./fo": 300,
	"./fo.js": 300,
	"./fr": 303,
	"./fr-ca": 301,
	"./fr-ca.js": 301,
	"./fr-ch": 302,
	"./fr-ch.js": 302,
	"./fr.js": 303,
	"./fy": 304,
	"./fy.js": 304,
	"./gd": 305,
	"./gd.js": 305,
	"./gl": 306,
	"./gl.js": 306,
	"./gom-latn": 307,
	"./gom-latn.js": 307,
	"./gu": 308,
	"./gu.js": 308,
	"./he": 309,
	"./he.js": 309,
	"./hi": 310,
	"./hi.js": 310,
	"./hr": 311,
	"./hr.js": 311,
	"./hu": 312,
	"./hu.js": 312,
	"./hy-am": 313,
	"./hy-am.js": 313,
	"./id": 314,
	"./id.js": 314,
	"./is": 315,
	"./is.js": 315,
	"./it": 316,
	"./it.js": 316,
	"./ja": 317,
	"./ja.js": 317,
	"./jv": 318,
	"./jv.js": 318,
	"./ka": 319,
	"./ka.js": 319,
	"./kk": 320,
	"./kk.js": 320,
	"./km": 321,
	"./km.js": 321,
	"./kn": 322,
	"./kn.js": 322,
	"./ko": 323,
	"./ko.js": 323,
	"./ky": 324,
	"./ky.js": 324,
	"./lb": 325,
	"./lb.js": 325,
	"./lo": 326,
	"./lo.js": 326,
	"./lt": 327,
	"./lt.js": 327,
	"./lv": 328,
	"./lv.js": 328,
	"./me": 329,
	"./me.js": 329,
	"./mi": 330,
	"./mi.js": 330,
	"./mk": 331,
	"./mk.js": 331,
	"./ml": 332,
	"./ml.js": 332,
	"./mn": 333,
	"./mn.js": 333,
	"./mr": 334,
	"./mr.js": 334,
	"./ms": 336,
	"./ms-my": 335,
	"./ms-my.js": 335,
	"./ms.js": 336,
	"./mt": 337,
	"./mt.js": 337,
	"./my": 338,
	"./my.js": 338,
	"./nb": 339,
	"./nb.js": 339,
	"./ne": 340,
	"./ne.js": 340,
	"./nl": 342,
	"./nl-be": 341,
	"./nl-be.js": 341,
	"./nl.js": 342,
	"./nn": 343,
	"./nn.js": 343,
	"./pa-in": 344,
	"./pa-in.js": 344,
	"./pl": 345,
	"./pl.js": 345,
	"./pt": 347,
	"./pt-br": 346,
	"./pt-br.js": 346,
	"./pt.js": 347,
	"./ro": 348,
	"./ro.js": 348,
	"./ru": 349,
	"./ru.js": 349,
	"./sd": 350,
	"./sd.js": 350,
	"./se": 351,
	"./se.js": 351,
	"./si": 352,
	"./si.js": 352,
	"./sk": 353,
	"./sk.js": 353,
	"./sl": 354,
	"./sl.js": 354,
	"./sq": 355,
	"./sq.js": 355,
	"./sr": 357,
	"./sr-cyrl": 356,
	"./sr-cyrl.js": 356,
	"./sr.js": 357,
	"./ss": 358,
	"./ss.js": 358,
	"./sv": 359,
	"./sv.js": 359,
	"./sw": 360,
	"./sw.js": 360,
	"./ta": 361,
	"./ta.js": 361,
	"./te": 362,
	"./te.js": 362,
	"./tet": 363,
	"./tet.js": 363,
	"./tg": 364,
	"./tg.js": 364,
	"./th": 365,
	"./th.js": 365,
	"./tl-ph": 366,
	"./tl-ph.js": 366,
	"./tlh": 367,
	"./tlh.js": 367,
	"./tr": 368,
	"./tr.js": 368,
	"./tzl": 369,
	"./tzl.js": 369,
	"./tzm": 371,
	"./tzm-latn": 370,
	"./tzm-latn.js": 370,
	"./tzm.js": 371,
	"./ug-cn": 372,
	"./ug-cn.js": 372,
	"./uk": 373,
	"./uk.js": 373,
	"./ur": 374,
	"./ur.js": 374,
	"./uz": 376,
	"./uz-latn": 375,
	"./uz-latn.js": 375,
	"./uz.js": 376,
	"./vi": 377,
	"./vi.js": 377,
	"./x-pseudo": 378,
	"./x-pseudo.js": 378,
	"./yo": 379,
	"./yo.js": 379,
	"./zh-cn": 380,
	"./zh-cn.js": 380,
	"./zh-hk": 381,
	"./zh-hk.js": 381,
	"./zh-tw": 382,
	"./zh-tw.js": 382
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 808;


/***/ }),

/***/ 880:
/***/ (function(module, exports) {

module.exports = "<!--<img src=\"https://s3.amazonaws.com/srt.bucket/assets/Members.png\" alt=\"\">-->\n<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n\n<div style=\"padding: 40px\">\n\n    <div class=\"srt-page-title srt-title-padding\">\n        User Access Requests\n    </div>\n\n\n  <!-- Tabs -->\n    <div class=\"active-tabs\" ng-if=\"showActivitySelection()\">\n        <div style=\"width: 100%; height: 70px;\">\n            <ul class=\"us-tab-slide nopadding\" style=\"padding: 0px;\">\n                <li id=\"tab0\" class=\"us-tab-item-slide\" [routerLink]=\"['/admin/pending']\" [ngClass]=\"{'active':pending}\">\n                    <a>PENDING</a>\n                </li>\n                <li id=\"tab1\" class=\"us-tab-item-slide\" [routerLink]=\"['/admin/accepted']\" [ngClass]=\"{'active': accepted}\">\n                    <a>APPROVED</a>\n                </li>\n                <li id=\"tab2\" class=\"us-tab-item-slide\" [routerLink]=\"['/admin/rejected']\" [ngClass]=\"{'active': rejected}\">\n                    <a>DENIED</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n\n\n    <div style=\"height: calc(100vh - 280px); overflow: auto; clear: both\" class=\"clearfix\">\n\n        <table class=\"table\" style=\"font-size: 16px\">\n            <thead>\n                <tr style=\"font-weight: 700\">\n                    <th>Name</th>\n                    <th>Position</th>\n                    <th>Agency</th>\n                    <th>Email</th>\n                    <th>Request Date/Time</th>\n                    <th *ngIf=\"accepted\">Security Access</th>\n                    <th *ngIf=\"rejected\">Reason</th>\n                    <th *ngIf=\"pending\">Action</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let user of users; let even = even; let odd = odd\"  [ngClass]=\"{ odd: odd, even: even }\">\n                    <td role=\"listbox\"><a [routerLink]=\"['/user/profile' ,user._id]\" role=\"option\">{{user.firstName}} {{user.lastName}}</a> </td>\n                    <td>{{user.position}} </td>\n                    <td>{{user.agency}}</td>\n                    <td>{{user.email}}</td>\n                    <td>{{user.creationDate}}</td>\n                    <td *ngIf=\"accepted\">{{user.userRole}}</td>\n                    <td *ngIf=\"rejected\"></td>\n                    <td *ngIf=\"pending\">\n                        <span style=\"color: #0a831e; cursor: pointer\" (click)=\"Approve(user)\">Approve</span>&nbsp;&nbsp;&nbsp;\n                        <span style=\"color: #E60000; cursor: pointer\" (click)=\"Reject(user)\">Deny</span>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n      </div>\n  </div>\n</main>\n\n"

/***/ }),

/***/ 881:
/***/ (function(module, exports) {

module.exports = "<!-- <router-outlet></router-outlet> -->\n<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n<div class=\"row analytic-div analytic-container\" >\n    <div class=\"clearfix\">\n        <div role=\"heading\" tabindex=\"0\" aria-level=\"1\" class=\"col-md-12  clearfix analytic-smalltitle\">\n            The data on the dashboard include only\n            <a [routerLink]=\"['/help/faq', 'ICT']\" aria-label=\"definition of ICT\" style=\"color:#0000C7\">ICT</a> /\n            <a [routerLink]=\"['/help/faq', 'EIT']\" aria-label=\"definition of EIT\" style=\"color:#0000C7\">E&IT </a>\n            solicitations.  The following are excluded from the data on the dashboard: pre-solicitations,\n            sources sought, special notices, award notice, intent to bundle requirements, solicitations with zero and/or non-machine-readable document(s),\n            and other undetermined solicitations.\n        </div>\n\n        <div class=\"col-md-12 nopadding clearfix analytic-titlepadding\" tabindex=\"0\"  role=\"region\" aria-labelledby=\"region1\">\n            <!-- it's not showing -->\n            <h2 id=\"region1\" style=\"display:none\">the result and number fo 30 day's scan </h2>\n            \n            <div class=\"srt-blue analytic-bigtitle\">LAST 30 DAYS</div>\n\n            <div class=\"scanned-solicitation\">\n                <app-scanned-solicitation [ScannedSolicitationChart]=\"ScannedSolicitationChart\"></app-scanned-solicitation>\n            </div>\n            <div class=\"prediction-result\">\n                <app-prediction-result [PredictResultChart]=\"PredictResultChart\"></app-prediction-result>\n            </div>\n\n        </div>\n\n\n        <div class=\"col-md-12 nopadding clearfix analytic-select-container\" tabindex=\"0\" role=\"region\" aria-labelledby=\"region2\">\n            <h2 id=\"region2\" style=\"display:none\">select part</h2>\n            <div class=\"clearfix analytic-padding\">\n                <div class=\"analytic-padding-left\">\n                    <label for=\"agency\"  class=\"srt-blue analytic-select-position\">Select your agency</label>\n                    <div class=\"analytic-second-select-position\" >\n                        <select id=\"agency\"\n                                class=\"analytic-select-style\"\n                                [ngModel]=\"selectedGovernment\"\n                                (ngModelChange)=\"onChange($event)\"  >\n                            <option value=\"Government-wide\" >Government-wide</option>\n                            <option *ngFor=\"let data of agencyList\" >{{data}}</option>\n                        </select>\n                    </div>\n                </div>\n\n                <div class=\"analytic-padding-left\">\n                    <label for=\"time\" class=\"srt-blue analytic-select-position\" >Time period</label>\n                    <div class=\"analytic-second-select-position\">\n                        <select id=\"time\" class=\"analytic-select-style\"\n                            (change)=\"onPeriodChange($event.target.value)\"\n                            [ngModel]=\"selectedPeriod\" >\n                            <option value=\"All\"  *ngIf=\"selectedGovernment == 'Government-wide'\">All</option>\n                            <option value=\"This Month\">This Month</option>\n                            <option value=\"This Year\">This Year</option>\n                        </select>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"col-md-12 nopadding clearfix analytic-section1-container\" tabindex=\"0\" role=\"region\" aria-labelledby=\"region3\">\n                <h2 id=\"region3\" style=\"display:none\">the result after you select</h2>\n            <div class=\"row-eq-height\">\n                <div class=\"col-md-6 nopadding\">\n                    <div class=\"col-md-6 nopadding\">\n                      <app-donut-chart\n                        [doughnutChartDataInput]=\"ComplianceRateChart\"\n                        [title]=\"'Preliminary Compliance Rate'\"\n                        [componentTooltip]=\"'Compliance Rate = (Total compliant ICT solicitations / Total ICT solicitations scanned) * 100%'\">\n                      </app-donut-chart>\n                    </div>\n                    <div class=\"col-md-6 nopadding\">\n                      <app-donut-chart\n                          [doughnutChartDataInput]=\"ConversionRateChart\"\n                          [title]=\"'Conversion Rate'\"\n                          [componentTooltip]=\"'Conversion Rate = (# updated compliant solicitations / Total non-compliant ICT solicitations) * 100%'\">\n                      </app-donut-chart>\n                    </div>\n                </div>\n\n                <div class=\"col-md-6 nopadding\">\n                    <app-top-srt-actions [TopSRTActionChart]=\"TopSRTActionChart\"></app-top-srt-actions>\n                </div>\n            </div>\n        </div>\n\n\n        <div class=\"col-md-12 nopadding clearfix analytic-section2-container\" tabindex=\"0\" role=\"region\" aria-labelledby=\"region4\" >\n                <h2 id=\"region4\" style=\"display:none\">histogram of top 10 compliant angencies</h2>\n                <app-top-agencies-percentage\n                    *ngIf=\"isGovernomentWide\"\n                    [isGovernomentWide]=\"isGovernomentWide\"\n                    [TopAgenciesChart]=\"TopAgenciesChart\"\n                    [selectedGovernment]=\"selectedGovernment\"\n                    [barTitle]=\"barTitle\"\n                    [selectedPeriod]=\"selectedPeriod\"\n                    [toPeriod]=\"toPeriod\"\n                    [fromPeriod]=\"fromPeriod\"\n                    [xAxis]=\"xAxis\"></app-top-agencies-percentage>\n                <app-line-charts\n                     *ngIf=\"!isGovernomentWide\"\n                     [TopAgenciesChart]=\"TopAgenciesChart\"\n                     [selectedGovernment]=\"selectedGovernment\"\n                     [selectedPeriod]=\"selectedPeriod\"\n                     [toPeriod]=\"toPeriod\"\n                     [fromPeriod]=\"fromPeriod\">\n                </app-line-charts>\n        </div>\n\n        <div class=\"col-md-12 nopadding clearfix analytic-section3-container\" tabindex=\"0\" role=\"region\" aria-labelledby=\"region5\" >\n                <h2 id=\"region5\" style=\"display:none\">pie chart for prediction result</h2>\n            <!-- <div style=\"font-size: 24px; margin-bottom: 20px; font-weight: 600\" class=\"srt-blue\">LAST 30 DAYS</div>  -->\n            <!-- <div class=\"user-login\">\n                <app-user-login></app-user-login>\n            </div> -->\n            <!-- <div class=\"exclude\"> -->\n                <app-undetermined-solicitations [UndeterminedSolicitationChart]=\"UndeterminedSolicitationChart\"></app-undetermined-solicitations>\n            <!-- </div> -->\n            <!-- <div class=\"machine-readable\">\n                <app-machine-readable [MachineReadableChart]=\"MachineReadableChart\" ></app-machine-readable>\n            </div> -->\n        </div>\n\n\n    </div>\n</div>\n</main>\n"

/***/ }),

/***/ 882:
/***/ (function(module, exports) {

module.exports = "<div class=\"chartcontainer\">\n\n        <div class=\"srt-blue circlechart\">\n            {{title}}\n            <sup class=\"supfont\"\n                [tooltip]=\"donutChart\" tooltipPlacement=\"bottom\">\n                <i class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n            </sup>\n            <tooltip-content #donutChart [animation]=\"true\">\n                <div>{{componentTooltip}}</div>\n            </tooltip-content>\n        </div>\n\n        <div class=\"precposi\">\n            <div id=\"{{id}}\" class=\"percentage\">\n                {{percentage}}%\n            </div>\n            <div class=\"perposition\">\n                <canvas baseChart\n                        [data]=\"doughnutChartData\"\n                        [labels]=\"doughnutChartLabels\"\n                        [options]=\"options\"\n                        [colors]=\"colorsOverride\"\n                        [chartType]=\"doughnutChartType\">\n                </canvas>\n            </div>\n        </div>\n\n        <div class=\"perresult\">\n            <span class=\"chartspan\">{{numerator}}</span> out of\n            <span class=\"chartspan\">{{denominator}}</span>\n            <span [innerHTML]=\"note\"></span>\n        </div>\n\n    </div>\n"

/***/ }),

/***/ 883:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"linechart\">\n    <div class=\"positiony\">{{yAxis}}</div>\n    <div class=\"positionx\">{{xAxis}}</div>\n    <div class=\"positionchart\"> \n        <canvas baseChart\n                [datasets]=\"lineChartData\"\n                [labels]=\"lineChartLabels\"\n                [options]=\"options\"\n                [colors]=\"colorsOverride\"\n                [chartType]=\"lineChartType\"></canvas>\n    </div>\n</div>"

/***/ }),

/***/ 884:
/***/ (function(module, exports) {

module.exports = "<div class=\"chartcontainer\">\n\n    <div class=\"srt-blue piechart\">\n        Machine Readable Documents (%) <br /> &nbsp;\n        <!--<sup style=\"font-size: 20px;\" \n            [tooltip]=\"MachineReadable\" tooltipPlacement=\"bottom\">\n            <i class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n        </sup>  \n        <tooltip-content #MachineReadable [animation]=\"true\">\n            <div></div>\n        </tooltip-content> -->\n    </div>  \n   \n    <div class=\"precposi\">\n      <div class=\"pieposition\">\n          <canvas baseChart\n                  [data]=\"pieChartData\"\n                  [labels]=\"pieChartLabels\"\n                  [options]=\"options\"\n                  [colors]=\"colorsOverride\"\n                  [chartType]=\"pieChartType\">\n          </canvas>\n      </div>\n      <div class=\"pieresultun\">\n            {{displayUnreadable}}\n      </div>\n      <div class=\"pieresult\">\n            {{displayReadable}}\n      </div>\n    </div>\n    <!--<div style=\"padding: 30px 10px; text-align: center; font-size: 16px; color: #1768d7; font-weight: 500\">\n        <span style=\"font-size: 1.5em; font-weight: 700\">{{updatedCompliantICTNumber}}</span> out of \n        <span style=\"font-size: 1.5em; font-weight: 700\">{{TotalNonCompliant}}</span> \n        non-compliant ICT solicitations have became compliant after they were updated on FedBizOpps.gov\n    </div>-->\n\n</div>\n\n"

/***/ }),

/***/ 885:
/***/ (function(module, exports) {

module.exports = "<div class=\"chartcontainerp\">\n\n    <div class=\"srt-blue piechart\">\n        Preliminary Prediction Findings\n        <!-- <sup style=\"font-size: 20px;\" \n            [tooltip]=\"predictionResult\" tooltipPlacement=\"bottom\">\n            <i class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n        </sup>  \n        <tooltip-content #predictionResult [animation]=\"true\">\n            <div>Undetermined solicitations are solicitations with attachments that are non-machine-readable and/or are currently failed to be accessed by the system due to various reasons (e.g., security redirect).</div>\n        </tooltip-content>  -->\n    </div>  \n   \n    <div class=\"precposi\">\n      <div class=\"pieposition\">\n          <canvas baseChart\n                  [data]=\"pieChartData\"\n                  [labels]=\"pieChartLabels\"\n                  [options]=\"options\"\n                  [colors]=\"colorsOverride\"\n                  [chartType]=\"pieChartType\">\n          </canvas>\n      </div>\n      <div class=\"pieresult\">\n            {{displayCompliance}}\n      </div>\n      <div class=\"pieresultun\">\n            {{displayUncompliance}}\n      </div>\n    </div>\n    <!--<div style=\"padding: 30px 10px; text-align: center; font-size: 16px; color: #1768d7; font-weight: 500\">\n        <span style=\"font-size: 1.5em; font-weight: 700\">{{updatedCompliantICTNumber}}</span> out of \n        <span style=\"font-size: 1.5em; font-weight: 700\">{{TotalNonCompliant}}</span> \n        non-compliant ICT solicitations have became compliant after they were updated on FedBizOpps.gov\n    </div>-->\n\n</div>\n"

/***/ }),

/***/ 886:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"srt-blue chart\" *ngIf=\"hasValue\">\n    Scanned Solicitation(s)\n    <sup class=\"supfont\" \n        [tooltip]=\"Scanned\" tooltipPlacement=\"bottom\">\n        <i class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n    </sup>  \n    <tooltip-content #Scanned [animation]=\"true\">\n        <div>Number of ICT/E&IT solicitation(s) scanned (latest 30 days)</div>\n    </tooltip-content> \n</div>  \n\n<div class=\"barchart\">\n    <div class=\"positions\"># Solicitation</div>\n    <div class=\"positiond\">Date</div>\n    <div class=\"positionbar\" *ngIf=\"hasValue\"> \n    \n    <canvas baseChart\n            [datasets]=\"barChartData\"\n            [labels]=\"barChartLabels\"\n            [options]=\"barChartOptions\"\n            [legend]=\"barChartLegend\"\n            [colors]=\"colorsOverride\"\n            [chartType]=\"barChartType\"></canvas>\n    </div>\n</div>"

/***/ }),

/***/ 887:
/***/ (function(module, exports) {

module.exports = "<div class=\"paddingright\">\n    <div id=\"analyticTitle\" class=\"srt-blue topagen-title\">\n        {{barTitle}}&nbsp;&nbsp;\n        <sup class=\"supfont\"\n            [tooltip]=\"chart\" tooltipPlacement=\"bottom\">\n            <i *ngIf=\"isGovernomentWide\" class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n        </sup>\n\n        <tooltip-content #chart [animation]=\"true\">\n            <div>The agencies ranking is sorted by Compliance Rate*.</div>\n            <div>* Compliance Rate = (Number of compliant solicitations / Total ICT solicitations) %</div>\n        </tooltip-content>  \n\n    </div>\n    <!-- bar chart -->\n    <div class=\"topagen-barchart\" *ngIf=\"noData\">\n        <div class=\"topagen-nodata\">\n              No data to show on this time period\n        </div>\n    </div>  \n\n    <div class=\"topagen-content\" *ngIf=\"!noData\">  \n        <div class=\"topagen-position\">\n\n            <div style=\"position: absolute; left: 0px;\">0%</div>\n            <div style=\"position: absolute; left: 25%;\">25%</div>\n            <div style=\"position: absolute; left: 50%;\">50%</div>\n            <div style=\"position: absolute; left: 74%;\">75%</div>\n            <div style=\"position: absolute; left: 100%;\">100%</div>\n            <!--<div *ngFor=\"let xaxis of xAxisBreakPoint\" \n                style=\"position: absolute;\"\n                [ngStyle]=\"{'left' : 'calc(100%/' + (xAxisBreakPoint.length - 1) / xaxis + ')'}\">\n                {{xaxis * xAxisUnit}}\n            </div>-->\n\n        </div>\n        <div class=\"topagen-posi1\">\n            <div class=\"topagen-posi1-blue\"></div>\n            <div class=\"topagen-posi1-display\"># Compliant Solicitation(s)</div>\n        </div>\n        <div class=\"topagen-posi2\">\n            <div class=\"topagen-posi1-white\"></div>\n            <div class=\"topagen-posi1-display\"># Non-Compliant Solicitation(s)</div>\n        </div>\n        \n        <div class=\"topagen-posi3\">\n            <div>Compliant Rate (%)</div>\n        </div>\n        <div class=\"topagen-posi4\"\n            [ngStyle]=\"{'width': (indexTo - indexFrom) * 30 + 'px', 'height': (indexTo - indexFrom) * 30 + 'px'}\">\n            {{xAxis}}\n        </div>\n        <table class=\"topagen-table\">\n            <tbody>\n                <tr *ngFor=\"let num of barData | slice:indexFrom:indexTo \" style=\"width: 100%;\" title=\"Total: {{num[3]}} \nCompliant Solicitations: {{num[2]}}\nNon-Compliant Solicitations: {{(num[3] - num[2])}}\">\n                    <td class=\"topagen-td1\">{{getAbbr(num[0])}}&nbsp;&nbsp;&nbsp;</td>\n                    <td class=\"topagen-td2\">                     \n                        <div class=\"topagen-div1\" [ngStyle]=\"{'width': (num[2]/num[3]) * (num[2]/num[3]) * 100 + '%'}\"></div>\n                        <div class=\"topagen-div2\" [ngStyle]=\"{'width': ((num[3] - num[2])/num[3]) * (num[2]/num[3]) * 100 + '%'}\">\n                            <div class=\"topagen-div3\" [hidden]=\"num[1]==0\">\n                                {{num[1] | percent:'.0-0'}}\n                            </div>\n                        </div>  \n                    </td>\n                </tr>\n            </tbody>\n        </table>\n        \n    </div>\n\n    \n</div>"

/***/ }),

/***/ 888:
/***/ (function(module, exports) {

module.exports = "<div class=\"paddingright\">\n    <div id=\"analyticTitle\" class=\"srt-blue topagen-title\">\n        {{barTitle}}&nbsp;&nbsp;\n        <sup class=\"supfont\"\n            [tooltip]=\"chart\" tooltipPlacement=\"bottom\">\n            <i *ngIf=\"isGovernomentWide\" class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n        </sup>\n\n        <tooltip-content #chart [animation]=\"true\">\n            <div>The agencies ranking is sorted by Compliance Rate*.</div>\n            <div>* Compliance Rate = (Number of compliant solicitations / Total ICT solicitations) %</div>\n        </tooltip-content>  \n\n    </div>\n    <!-- bar chart -->\n    <div class=\"topagen-barchart\" *ngIf=\"noData\">\n        <div class=\"topagen-nodata\">\n              No data to show on this time period\n        </div>\n    </div>  \n\n    <div class=\"topagen-content\" *ngIf=\"!noData\">  \n        <div class=\"topagen-position\">\n\n            <div *ngFor=\"let xaxis of xAxisBreakPoint\" \n                style=\"position: absolute;\"\n                [ngStyle]=\"{'left' : 'calc(100%/' + (xAxisBreakPoint.length - 1) / xaxis + ')'}\">\n                {{xaxis * xAxisUnit}}\n            </div>\n\n        </div>\n        <div class=\"topagen-posi1\">\n            <div class=\"topagen-posi1-blue\"></div>\n            <div class=\"topagen-posi1-display\"># Compliant Solicitation(s)</div>\n        </div>\n        <div class=\"topagen-posi2\">\n            <div class=\"topagen-posi1-white\"></div>\n            <div class=\"topagen-posi1-display\"># Non-Compliant Solicitation(s)</div>\n        </div>\n        \n        <div class=\"topagen-posi3\">\n            <div># Solicitation(s)</div>\n        </div>\n        <div class=\"topagen-posi4\"\n            [ngStyle]=\"{'width': (indexTo - indexFrom) * 30 + 'px', 'height': (indexTo - indexFrom) * 30 + 'px'}\">\n            {{xAxis}}\n        </div>\n        <table class=\"topagen-table\">\n            <tbody>\n                <tr *ngFor=\"let num of barData | slice:indexFrom:indexTo \" style=\"width: 100%;\" title=\"Total: {{num[3]}} \nCompliant Solicitations: {{num[2]}}\nNon-Compliant Solicitations: {{(num[3] - num[2])}}\">\n                    <td class=\"topagen-td1\">{{GetAbbr(num[0])}}&nbsp;&nbsp;&nbsp;</td>\n                    <td class=\"topagen-td2\">\n                     \n                        <div class=\"topagen-div1\" [ngStyle]=\"{'width': num[2]/maxSolicitation * 100 + '%'}\"></div>\n                        <div class=\"topagen-div2\" [ngStyle]=\"{'width': (num[3] - num[2])/maxSolicitation * 100 + '%'}\">\n                            <div class=\"topagen-div3\" [hidden]=\"num[3]==0\">\n                                {{num[1] | percent:'.0-0'}}\n                            </div>\n                        </div>  \n                    </td>\n                </tr>\n            </tbody>\n        </table>\n        \n    </div>\n\n    \n</div>"

/***/ }),

/***/ 889:
/***/ (function(module, exports) {

module.exports = "<div class=\"top-srt-padding\">\n      \n      <div id=\"overview\" class=\"top-srt-overview\">\n\n          <div class=\"srt-blue top-srt-title\">\n              Key SRT Activities\n          </div>\n\n          <!-- Total ICT Solicitations -->\n          <div class=\"clearfix analytic-overview-name\">\n              <div class=\"top-srt-floatleft\">Total ICT/E&IT Solicitations Scanned&nbsp;&nbsp;\n                  <sup class=\"supfont\" \n                      [tooltip]=\"TotalICT\" tooltipPlacement=\"bottom\">\n                      <i class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n                  </sup>  \n                  <tooltip-content #TotalICT [animation]=\"true\">\n                      <div>Total number of ICT/E&IT solicitations scanned from FedBizOpps for all federal agencies.</div>\n                  </tooltip-content> \n              </div> \n              <div class=\"top-srt-floatright\">{{solicitationNumber}}</div> \n          </div>\n          <div class=\"top-srt-white\">\n              <div class=\"top-srt-blue\" [ngStyle]=\"{'width': solicitationNumber==0 ? '0px' : solicitationNumber/solicitationNumber * 100 + '%'}\"></div>\n          </div>                        \n\n          <!-- Total Non-compliant ICT Solicitations -->\n          <div class=\"clearfix analytic-overview-name\">\n              <div class=\"top-srt-floatleft\">Total Non-Compliant ICT/E&IT Solicitations&nbsp;&nbsp;\n                  <sup class=\"supfont\" \n                      [tooltip]=\"TotalNonCompliantICT\" tooltipPlacement=\"bottom\">\n                      <i class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n                  </sup>  \n                  <tooltip-content #TotalNonCompliantICT [animation]=\"true\">\n                      <div>Total number of non-compliant ICT/E&IT solicitations scanned from FedBizOpps for all federal agencies.</div>\n                  </tooltip-content> \n              </div> \n              <div class=\"top-srt-floatright\">{{nonCompliantICTNumber}}</div> \n          </div>\n          <div class=\"top-srt-white\">\n              <div class=\"top-srt-blue\" [ngStyle]=\"{'width': solicitationNumber==0 ? '0px' : nonCompliantICTNumber/solicitationNumber * 100 + '%'}\"></div>\n          </div>\n\n          <!-- # Solicitations Reviewed by 508 Coordinators -->\n          <div class=\"clearfix analytic-overview-name\">\n              <div class=\"top-srt-floatleft\"># Solicitations Reviewed by 508 Coordinators&nbsp;&nbsp;\n                  <sup class=\"supfont\"\n                      [tooltip]=\"Reviewed\" tooltipPlacement=\"bottom\">\n                      <i class=\"fa fa-info-circle info\" aria-hidden=\"true\"></i>\n                  </sup>   \n                  <tooltip-content #Reviewed [animation]=\"true\">\n                      <div>Number of FebBizOpps solicitation links accessed through SRT by Section 508 coordinators. The solicitation links are visited for further review of SRT results prior to contacting the Point of Contact (PoC).</div>\n                  </tooltip-content>  \n              </div> \n              <div class=\"top-srt-floatright\">{{reviewed}}</div> \n          </div>\n          <div class=\"top-srt-white\">\n              <div class=\"top-srt-blue\" [ngStyle]=\"{'width': solicitationNumber==0 ? '0px' : reviewed/solicitationNumber * 100 + '%'}\"></div>\n          </div>                        \n\n          <!-- # Emails Sent to POC -->\n          <div class=\"clearfix analytic-overview-name\">\n              <div class=\"top-srt-floatleft\"># Emails Sent to POC&nbsp;&nbsp;\n                  <sup class=\"supfont\"\n                      [tooltip]=\"Emails\" tooltipPlacement=\"bottom\">\n                      <i class=\"fa fa-info-circle info\" aria-hidden=\"true\"></i>\n                  </sup>   \n                  <tooltip-content #Emails [animation]=\"true\">\n                      <div>Number of e-mails sent from Section 508 Coordinators to solicitations Point of Contact (POC).</div>\n                  </tooltip-content>   \n              </div> \n              <div class=\"top-srt-floatright\">{{emailSend}}</div> \n          </div>\n          <div class=\"top-srt-white\">\n              <div class=\"top-srt-blue\" [ngStyle]=\"{'width': solicitationNumber==0 ? '0px' : emailSend/solicitationNumber * 100 + '%'}\"></div>\n          </div>                        \n\n          <!-- # Updated Solicitations -->\n          <div class=\"clearfix analytic-overview-name\">\n              <div class=\"top-srt-floatleft\"># Updated Solicitations&nbsp;&nbsp;\n                  <sup class=\"supfont\"\n                      [tooltip]=\"Updated0\" tooltipPlacement=\"bottom\">\n                      <i class=\"fa fa-info-circle info\" aria-hidden=\"true\"></i>\n                  </sup>    \n                  <tooltip-content #Updated0 [animation]=\"true\">\n                      <div>Number of ICT/E&IT solicitations that have been re-scanned from FedBizOpps.</div>\n                  </tooltip-content>   \n              </div> \n              <div class=\"top-srt-floatright\">{{updatedICTNumber}}</div> \n          </div>\n          <div class=\"top-srt-white\">\n              <div class=\"top-srt-blue\" [ngStyle]=\"{'width': solicitationNumber==0 ? '0px' : updatedICTNumber/solicitationNumber * 100 + '%'}\"></div>\n          </div>                        \n\n          <!-- # Updated Non-compliant Solicitations -->\n          <div class=\"clearfix analytic-overview-name\">\n              <div class=\"top-srt-floatleft\"># Updated Non-compliant Solicitations&nbsp;&nbsp;\n                  <sup class=\"supfont\"\n                      [tooltip]=\"Updated1\" tooltipPlacement=\"bottom\">\n                      <i class=\"fa fa-info-circle info\" aria-hidden=\"true\"></i>\n                  </sup>     \n                  <tooltip-content #Updated1 [animation]=\"true\">\n                      <div>Number of ICT/E&IT solicitations that have been re-scanned from FedBizOpps and remained non-compliant on SRT.</div>\n                  </tooltip-content>    \n              </div> \n              <div class=\"top-srt-floatright\">{{updatedNonCompliantICTNumber}}</div> \n          </div>\n          <div class=\"top-srt-white\">\n              <div class=\"top-srt-blue\"  [ngStyle]=\"{'width': solicitationNumber==0 ? '0px' : updatedNonCompliantICTNumber/solicitationNumber * 100 + '%'}\"></div>\n          </div>                        \n\n          <!-- # Updated Compliant Solicitations -->\n          <div class=\"clearfix analytic-overview-name\">\n              <div class=\"top-srt-floatleft\"># Updated Compliant Solicitations&nbsp;&nbsp;\n                  <sup class=\"supfont\"\n                      [tooltip]=\"Updated2\" tooltipPlacement=\"bottom\">\n                      <i class=\"fa fa-info-circle info\" aria-hidden=\"true\"></i>\n                  </sup>   \n                  <tooltip-content #Updated2 [animation]=\"true\">\n                      <div>Number of ICT/E&IT solicitations that have been re-scanned from FedBizOpps and updated as compliant on SRT.</div>\n                  </tooltip-content>      \n              </div> \n              <div class=\"top-srt-floatright\">{{updatedCompliantICTNumber}}</div> \n          </div>\n          <div class=\"clearfix top-srt-white\" >\n              <div class=\"top-srt-blue\"  [ngStyle]=\"{'width': solicitationNumber==0 ? '0px' : updatedCompliantICTNumber/solicitationNumber * 100 + '%'}\"></div>\n          </div>                        \n      </div>\n\n\n  </div>"

/***/ }),

/***/ 890:
/***/ (function(module, exports) {

module.exports = "<div class=\"undeter-solic-padding\">\n\n    <div class=\"srt-blue undeter-solic-title\">\n        Last 30 Days Excluded Solicitations from SRT Prediction Results (By Category)\n        <sup class=\"undeter-solic-supfont\" \n            [tooltip]=\"predictionResult\" tooltipPlacement=\"bottom\">\n            <i class=\"fa fa-info-circle info\" aria-hidden=\"true\" ></i>\n        </sup>  \n        <tooltip-content #predictionResult [animation]=\"true\">\n            <div>'Other Undetermined' solicitations are solicitations with attachments that are currently failed to be accessed by the system due to various reasons (e.g., security redirect).</div>\n        </tooltip-content>  \n    </div>  \n   \n    <div class=\"undeter-solic-div\">\n      <div class=\"undeter-solic-canvas\">\n          <canvas baseChart\n                  [data]=\"pieChartData\"\n                  [labels]=\"pieChartLabels\"\n                  [options]=\"options\"\n                  [colors]=\"colorsOverride\"\n                  [chartType]=\"pieChartType\">\n          </canvas>\n      </div>\n      <div class=\"undeter-solic-dispaly1\">\n            {{displayPresolicitation}}\n      </div>\n      <div class=\"undeter-solic-dispaly2\">\n            {{displayNonMachineReadable}}\n      </div>\n      <div class=\"undeter-solic-dispaly3\">\n            {{displayNoDocument}}\n      </div>\n      <div class=\"undeter-solic-dispaly4\">\n            {{displayOtherUndetermined}}\n      </div>\n    </div>\n    <!--<div style=\"padding: 30px 10px; text-align: center; font-size: 16px; color: #1768d7; font-weight: 500\">\n        <span style=\"font-size: 1.5em; font-weight: 700\">{{updatedCompliantICTNumber}}</span> out of \n        <span style=\"font-size: 1.5em; font-weight: 700\">{{TotalNonCompliant}}</span> \n        non-compliant ICT solicitations have became compliant after they were updated on FedBizOpps.gov\n    </div>-->\n\n</div>"

/***/ }),

/***/ 891:
/***/ (function(module, exports) {

module.exports = "<div class=\"srt-blue user-login-title\">\n    SRT User Login Activities <br /> &nbsp;\n</div>\n\n\n<div class=\"user-login-padding\">\n    <div class=\"user-login-user\"># Users</div>\n    <div class=\"user-login-data\">Date</div>\n    <div class=\"user-login-content\">\n        <span class=\"user-login-font\">{{currentLoginUsers}}</span> users on the site now\n    </div>\n    <div class=\"user-login-canvas\">\n        <canvas baseChart\n                [datasets]=\"lineChartData\"\n                [labels]=\"lineChartLabels\"\n                [options]=\"options\"\n                [colors]=\"colorsOverride\"\n                [chartType]=\"lineChartType\"></canvas>\n    </div>\n</div>\n"

/***/ }),

/***/ 892:
/***/ (function(module, exports) {

module.exports = "<body>\n  <!--<div class=\"usa-banner\">\n    <div class=\"usa-accordion\">\n      <header class=\"usa-banner-header\">\n        <div class=\"usa-grid usa-banner-inner\">\n        <img src=\"../assets/favicon-57.png\" alt=\"U.S. flag\" >\n        <p>An official website of the United States government</p>\n        <button class=\"usa-accordion-button usa-banner-button\" aria-expanded=\"false\" aria-controls=\"gov-banner\">\n          <span class=\"usa-banner-button-text\">Here's how you know</span>\n        </button>\n        </div>\n      </header>\n      <div class=\"usa-banner-content usa-grid usa-accordion-content\" id=\"gov-banner\" aria-hidden=\"true\">\n        <div class=\"usa-banner-guidance-gov usa-width-one-half\">\n          <img class=\"usa-banner-icon usa-media_block-img\" width=\"40px\" height=\"40px\" src=\"../assets/icon-dot-gov.svg\" alt=\"Dot gov\">\n          <div class=\"usa-media_block-body\">\n            <p>\n              <strong>The .gov means it’s official.</strong>\n              <br>\n              Federal government websites always use a .gov or .mil domain. Before sharing sensitive information online, make sure you’re on a .gov or .mil site by inspecting your browser’s address (or “location”) bar.\n            </p>\n          </div>\n        </div>\n        <div class=\"usa-banner-guidance-ssl usa-width-one-half\">\n          <img class=\"usa-banner-icon usa-media_block-img\"  src=\"../assets/icon-https.svg\" alt=\"SSL\">\n          <div class=\"usa-media_block-body\">\n            <p>This site is also protected by an SSL (Secure Sockets Layer) certificate that’s been signed by the U.S. government. The <strong>https://</strong> means all transmitted data is encrypted &nbsp;— in other words, any information or browsing history that you provide is transmitted securely.</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div> -->\n    <div style=\"background-color: #f1f1f1 ; \" class=\"clearfix\">\n        <div style=\"padding-right: 3rem; padding-left: 3rem;\">\n            <div style=\"float: left\">\n                <div style=\"margin-right: 10px; display: inline-block\">\n                    <img src=\"../assets/favicon-57.png\" width=\"20px\" height=\"20px\" alt=\"U.S. flag\" >\n                </div>\n                <div class=\"gsa-subtitle\">\n                    An official website of the United States government\n                </div>\n                <div class=\"gsa-subtitle\" style=\"cursor: pointer\">\n                    <a data-toggle=\"collapse\" data-target=\"#msg\" class=\"gov-msg collapsed\" style=\"color:#0000C7\">Here's how you know&nbsp;&nbsp;</a>\n                </div>\n            </div>\n            <div style=\"float: right\">This site is currently in <span style=\"font-weight: 500\">beta</span></div>\n            <div id=\"msg\" class=\"collapse clearfix\" style=\"max-width: 1040px; clear: both\">\n                <div class=\"col-sm-6 nopadding\">\n                    <div class=\"clearfix gsa-sintr\">\n                        <div class=\"gsa-sicon\">\n                            <img class=\"usa-banner-icon usa-media_block-img\" width=\"38px\" height=\"38px\"  src=\"../assets/icon-dot-gov.svg\" alt=\"Dot gov\">\n                        </div>\n                        <div class=\"gsa-scontent\">\n                          <strong>The .gov means it’s official.</strong>\n                              <br>\n                              Federal government websites always use a .gov or .mil domain. Before sharing sensitive information online, make sure you’re on a .gov or .mil site by inspecting your browser’s address (or “location”) bar.\n                         </div>\n                    </div>\n                </div>\n                <div class=\"col-sm-6 nopadding\">\n                    <div class=\"clearfix gsa-sintr\">\n                        <div class=\"gsa-sicon\">\n                           <img class=\"usa-banner-icon usa-media_block-img\" width=\"38px\" height=\"38px\" src=\"../assets/icon-https.svg\" alt=\"SSL\">\n                        </div>\n                        <div class=\"gsa-scontent\">\n                          <p>This site is also protected by an SSL (Secure Sockets Layer) certificate that’s been signed by the U.S. government. The <strong>https://</strong> means all transmitted data is encrypted &nbsp;— in other words, any information or browsing history that you provide is transmitted securely.</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n\n    <app-header [isLogin]=\"isLogin\" [isGSAAdmin]=\"isGSAAdmin\"></app-header>\n    <router-outlet></router-outlet>\n</body>\n"

/***/ }),

/***/ 893:
/***/ (function(module, exports) {

module.exports = "<div style=\"\n            background-image:url(https://s3.amazonaws.com/srt.bucket/assets/login.jpg);\n            background-repeat: no-repeat;\n            background-size: cover;\n            background-position: center;\n            height: calc(100vh - 83px);\n            box-shadow: inset 1000px 1000px 1000px rgba(255,255,255,0.8);\n            overflow: auto;\n            position: relative\"\n            >\n            <!-- <div style=\"\n            background-image:url(../../assets/login-min.jpg);\n            background-repeat: no-repeat;\n            background-size: cover;\n            background-position: center;\n            height: calc(100vh - 83px);\n            box-shadow: inset 1000px 1000px 1000px rgba(255,255,255,0.8);\n            overflow: auto;\n            position: relative\"\n            >          -->\n   \n    <div style=\"position: absolute; bottom: 0px; left: 15px; \">\n        <div style=\"position: relative; color: white; background-color: rgba(0,0,0,0.7); display: table; width: 40%\">\n            <div style=\"display: table-cell; vertical-align: middle; padding: 15px 22px\"> \n                <div style=\"font-size: 18px; padding-bottom: 10px; font-weight: 500\">Beta Disclaimer</div>\n                <div>This is a beta version of the SRT platform. The results shown are preliminary only and should not be used or referenced in any official or internal reports.</div>\n            </div>\n            <!--<div style=\"position: absolute; top: 15px; right: 15px;\">X</div>-->\n        </div>\n    </div>\n    \n      \n    <div class=\"row spacing nopadding\">\n        <div class=\"row-eq-height\" style=\"padding: 60px 0px\">\n            <div class=\"col-lg-5 col-lg-offset-1 col-md-6 col-sm-12\" >\n                <div style=\"padding: 40px;\" class=\"srt-blue\">           \n                    <h1 style=\"font-weight: 700;\">Solicitation Review Tool </h1>\n                    <h3>The Solicitation Review Tool (SRT) is provided to help agencies evaluate the overall solicitation compliance with accessibility, cyber security, and other regulations and requirements.</h3>                \n                </div>\n            </div>\n            <div class=\"col-lg-4 col-md-6 col-sm-12\">\n                <div style=\"border: 1px solid #dadada; box-shadow: 1px 1px 10px 0px #dadada; background-color: white\">\n                    <ul class=\"register clearfix\">\n                        <li class=\"active\" (click)=\"ChangeDisplay('singin')\" data-toggle=\"tab\">Sign In</li>\n                        <li  (click)=\"ChangeDisplay('signup')\"data-toggle=\"tab\">Sign Up</li>\n                    </ul>\n                    <div style=\"padding: 40px;\" class=\"clearfix\">\n                        <div *ngIf=\"displayTab=='singin'\">\n                            <app-userlogin></app-userlogin>\n                        </div>\n                        <div *ngIf=\"displayTab=='signup'\">\n                            <app-userregistration></app-userregistration>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 894:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n\n<div class=\"srt-banner blue\">\n    <div class=\"container\">\n        <h1><span>Forget Password</span></h1>\n        <div style=\"font-size: 20px; padding-bottom: 15px;\">Forget Password Reset Instructions</div>\n\n        <ul class=\"summary-steps\">\n            <li style=\"padding:5px\">\n                <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px)\">1. Enter the email address you have registered with SRT</div>\n            </li>\n            <li style=\"padding:5px\">\n                <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px)\">2. Click on the Reset Password Button, a system generated email will be sent to your email address contains\n                    a temporary password</div>\n            </li>\n            <li style=\"padding:5px\">\n                <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px)\">3. Use the temporary password to log into the SRT system</div>\n            </li>\n            <li style=\"padding:5px\">\n                <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px)\">4. Change your password as diredcted </div>\n\n            </li>\n        </ul>\n\n\n\n    </div>\n</div>\n\n    <div class=\"container\" style=\"padding-top:50px; padding-left:20px\">\n      <form [formGroup]=\"myForm\" (ngSubmit)=\"resetPassword()\">\n        <div class=\"form-group\">\n          <label for=\"email\">Email Address        \n          </label>\n          <input type=\"email\" id=\"email\" class=\"form-control\" formControlName=\"email\">\n          <div *ngIf=\"myForm.get('email').invalid && (myForm.get('email').dirty || myForm.get('email').touched)\" class=\"validation text-danger\">\n            <div *ngIf=\"myForm.get('email').hasError('required')\">\n              Email is required.\n            </div>\n          </div>\n        </div>\n\n\n        <button type=\"submit\" class=\"srt-button\" style=\"margin-top:10px\">Reset Password</button>\n\n      </form>\n    </div>\n  \n</main>"

/***/ }),

/***/ 895:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\"> \n<!--<div class='register-title'>Log In</div>-->\n<form [formGroup]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n  <div class=\"form-group\">\n    <label for=\"email\">Email Address        \n    </label>\n    <input type=\"email\"\n            id=\"email\"\n            class=\"form-control\"\n            formControlName=\"email\">\n            <div *ngIf=\"myForm.get('email').invalid && (myForm.get('email').dirty || myForm.get('email').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"myForm.get('email').hasError('required')\">\n                  Email is required.\n                </div>\n              </div>\n  </div>\n  <div class=\"form-group\" style=\"margin-bottom: 40px;\">\n    <label for=\"password\">Password        \n    </label>\n    <input type=\"password\"\n            id=\"password\"\n            class=\"form-control\"\n            formControlName=\"password\">\n            <div *ngIf=\"myForm.get('password').invalid && (myForm.get('password').dirty || myForm.get('password').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"myForm.get('password').hasError('required')\">\n                  First name is required.\n                </div>\n              </div>\n  </div>\n  \n  <div *ngIf=\"errorMessage\" class=\"login-error\">\n      Login Failed. {{errorInformation}}\n  </div>\n\n  <button type=\"submit\" class=\"srt-button\">Log In</button>\n\n  <a style=\"padding-top: 20px\" [routerLink]=\"['/auth/forgetpassword']\"> Forgot Password?</a>\n\n\n</form>\n</main>"

/***/ }),

/***/ 896:
/***/ (function(module, exports) {

module.exports = "\n  <div class=\"alert alert-success\" *ngIf=\"registerSuccess\">\n    <strong>Success!</strong> Thank you for registering!  You should receive an email confirming access.\n  </div>\n  <div class='register-title' *ngIf=\"!registerSuccess\">\n      <!--<div>New to Solicitation Review Tool?</div>-->\n      <div style=\"color: #BE3430; font-size: 14px; padding: 5px; font-weight: 300;\"><sup>*</sup>Required fields</div>\n  </div>\n\n\n  <form [formGroup]=\"myForm\" (ngSubmit)=\"onSubmit()\" *ngIf=\"!registerSuccess\">\n\n\n    <!-- firstName -->\n    <div class=\"form-group\">\n      <label for=\"firstName\">First Name\n          <span class=\"valid-star\"><sup>*</sup></span>\n      </label>\n      <input type=\"text\"\n             id=\"firstName\"\n             class=\"form-control\"\n             formControlName=\"firstName\">\n             <div *ngIf=\"myForm.get('firstName').invalid && (myForm.get('firstName').dirty || myForm.get('firstName').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"myForm.get('firstName').hasError('required')\">\n                  First name is required.\n                </div>\n              </div>\n    </div>\n\n    <!-- lastName -->\n    <div class=\"form-group\">\n      <label for=\"lastName\">Last Name\n          <span class=\"valid-star\"><sup>*</sup></span>\n      </label>\n      <input type=\"text\"\n             id=\"lastName\"\n             class=\"form-control\"\n             formControlName=\"lastName\">\n             <div *ngIf=\"myForm.get('lastName').invalid && (myForm.get('lastName').dirty || myForm.get('lastName').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"myForm.get('lastName').hasError('required')\">\n                  Last name is required.\n                </div>\n              </div>\n    </div>\n\n    <!-- Position -->\n    <div class=\"form-group\">\n      <label for=\"position\">Position\n          <span class=\"valid-star\"><sup>*</sup></span>\n      </label>\n      <input type=\"text\"\n             id=\"position\"\n             class=\"form-control\"      \n             formControlName=\"position\">\n             <div *ngIf=\"myForm.get('position').invalid && (myForm.get('position').dirty || myForm.get('position').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"myForm.get('position').hasError('required')\">\n                  position is required.\n                </div>\n              </div>\n    </div>\n\n  \n    <!-- email -->\n    <div class=\"form-group\">\n      <label for=\"email\">Email Address\n          <span class=\"valid-star\"><sup>*</sup></span>\n      </label>\n      <input type=\"email\"\n             id=\"email\"\n             class=\"form-control\"\n             formControlName=\"email\">\n             <div *ngIf=\"myForm.get('email').invalid && (myForm.get('email').dirty || myForm.get('email').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"myForm.get('email').hasError('required')\">\n                    email is required.\n                </div>\n              </div>\n    </div>\n\n    <!-- agency -->\n    <div class=\"form-group\" >\n     \n      <label for=\"agency\">Agency\n          <span class=\"valid-star\"><sup>*</sup></span>\n      </label>\n      <ng2-completer id=\"agency\" [(ngModel)]=\"searchStr\" [datasource]=\"dataService\" [minSearchLength]=\"0\" \n            formControlName=\"agency\" [placeholder]=\"placeholder\" [textSearching]=\"textSearching\" [pause]=\"500\" matchClass=\"match\" (keydown)=\"open()\"\n      ></ng2-completer>\n\n      <div *ngIf=\"myForm.get('agency').invalid && (myForm.get('agency').dirty || myForm.get('agency').touched)\" class=\"validation text-danger\">\n        <div *ngIf=\"myForm.get('agency').hasError('required')\">\n            Agency is required.\n        </div>\n      </div>\n      <!--<input type=\"text\"\n             id=\"agency\"\n             class=\"form-control\"\n             [ngClass]=\"{'error-form': errorMessage && (myForm.value.agency == null || myForm.value.agency == '')}\"\n             formControlName=\"agency\">-->\n    </div>\n\n    <!-- Access Level -->\n   <div class=\"form-group\">\n        <label for=\"accessLevel\">Request Access Level\n            <span class=\"valid-star\"><sup>*</sup></span>\n        </label>\n        <div class=\"dropdown\">\n            <input class=\"form-control dropdown-toggle\" \n                id=\"dropdownMenuButton\" \n                data-toggle=\"dropdown\" \n                aria-haspopup=\"true\" \n                aria-expanded=\"false\"\n                style=\"cursor: pointer\"\n                (focus)=\"onFocus()\"\n                placeholder=\"Select your request access level\" \n                value=\"{{selectedUserRole}}\"/>\n            <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\" style=\"width: 100%; font-weight: 500; top: auto; bottom: 100%\" >\n                <div class=\"dropdown-item\" style=\"cursor: pointer; padding: 6px 12px\" \n                    (click)=\"onChangeAccessLevel('Administrator')\" \n                    [ngClass]=\"{'active' : selectedUserRole == 'Administrator'}\">\n                    <b>Administrator</b>\n                    <div style=\"color: #899197\">An Administrator is a superuser who can manage user access requests and user profiles</div>\n                </div>\n                <div class=\"dropdown-item\" style=\"cursor: pointer; padding: 6px 12px\"\n                    (click)=\"onChangeAccessLevel('SRT Program Manager ')\" \n                    [ngClass]=\"{'active' : selectedUserRole == 'SRT Program Manager '}\">\n                    <b>SRT Program Manager</b>\n                    <div style=\"color: #899197\">A SRT Program Manager oversees all federal agencies‘ 508 conformance activities. S/he has access to all agencies data</div>\n                </div>\n\n                <div class=\"dropdown-item\" style=\"cursor: pointer; padding: 6px 12px\" \n                    (click)=\"onChangeAccessLevel('Section 508 Coordinator')\" \n                    [ngClass]=\"{'active' : selectedUserRole == 'Section 508 Coordinator'}\">\n                    <b>Section 508 Coordinator</b>\n                    <div style=\"color: #899197\"> A Section 508 Coordinator has access to review his/her agency’s solicitations report, and is responsible to contact POC; and provide feedback on the prediction results.</div>\n                </div>\n                <div class=\"dropdown-item\" style=\"cursor: pointer; padding: 6px 12px\" \n                    (click)=\"onChangeAccessLevel('CO / COR')\" \n                    [ngClass]=\"{'active' : selectedUserRole == 'CO / dCOR'}\">\n                    <b>CO / COR</b>\n                    <div style=\"color: #899197\">A Contracting Officer / Contracting Officer Representative reviews his/her agency’s solicitations report and view the Section 508 conformance trend analytics</div>\n                </div>\n\n                <div class=\"dropdown-item\" style=\"cursor: pointer; padding: 6px 12px\" \n                    (click)=\"onChangeAccessLevel('Executive User ')\" \n                    [ngClass]=\"{'active' : selectedUserRole == 'Executive User '}\">\n                    <b>Executive User</b>\n                    <div style=\"color: #899197\">An Executive User only has access to view the Section 508 conformance trend analytics.</div> \n                </div>\n                \n            </div>\n        </div>\n        \n    </div>\n\n\n    <!-- password -->\n    <div class=\"form-group\" style=\"margin-bottom: 40px;\">\n      <label for=\"password\">Password\n          <span class=\"valid-star\"><sup>*</sup></span>\n      </label>\n      <input type=\"password\"\n             id=\"password\"\n             class=\"form-control\"\n             formControlName=\"password\">\n             <div *ngIf=\"myForm.get('password').invalid && (myForm.get('password').dirty || myForm.get('password').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"myForm.get('password').hasError('required')\">\n                  Password is required.\n                </div>\n                <div *ngIf=\"myForm.get('password').hasError('minlength')\">\n                  Password must be at least 8 characters long.\n                </div>\n                <div *ngIf=\"myForm.get('password').hasError('pattern')\">\n                  Password must have at least one uppercase letter, one lowercase letter, one number and one special character\n                </div>\n              </div>\n    </div>\n\n    <button type=\"submit\" class=\"srt-button\">Send Request</button>\n  </form>\n"

/***/ }),

/***/ 897:
/***/ (function(module, exports) {

module.exports = "<!-- SRTDashHeaderView -->\n\n<div id=\"header\">\n      <a id=\"test\" href=\"/\" style=\"position:absolute;\n      left:-10000px;\n      top:auto;\n      width:1px; \n      height:1px;\n      overflow:hidden;\">you have accessed a new page of SRT,It contains navigation and main content.</a>\n\n        <a \n        id=\"skipMain\" href=\"javascript:\n        var oh=location.hash;\n        location.hash='#content';\n        location.hash=oh;\n        void(0);\" class=\"visually-hidden visible-when-focused bypass-block-link\">\n            Skip to Main content\n          </a>  \n  <nav class=\"us-navbar navbar-default\">\n      \n        <div class=\"container-fluid\" style=\"padding: 0px;\">\n            <div class=\"navbar-header nopadding\" style=\"height: 60px\" aria-hidden=\"true\">\n                <a class=\"navbar-left\" [routerLink]=\"['/home']\"><img id=\"srtlogo\" src=\"../../assets/srtlogo.png\"></a>\n            </div>\n\n        <div class=\"collapse navbar-collapse\" id=\"navbar\" style=\"padding: 0px;\" role=\"navigation\" aria-label=\"main navigation\" >\n\n                <ul *ngIf=\"isLogin\" class=\"nav navbar-nav\" >\n                     <li data-toggle=\"tab\" [routerLink]=\"['/home']\" [ngClass]=\"{'active': GetHash('home')}\" id=\"1\" onclick=\"$('#test').focus()\"><a href=\"\">Home</a></li>\n                     <li data-toggle=\"tab\" [routerLink]=\"['/solicitation/report']\" [ngClass]=\"{'active': GetHash('solicitation')}\" id=\"2\"  onclick=\"$('#test').focus()\"><a href=\"\">Manage/Review Workload</a></li>\n                     <li data-toggle=\"tab\" [routerLink]=\"['/analytics']\" [ngClass]=\"{'active': GetHash('analytics')}\" id=\"3\"  onclick=\"$('#test').focus()\"><a href=\"\" >View Analytics</a></li>\n                     <li data-toggle=\"tab\" *ngIf=\"isGSAAdmin\" [routerLink]=\"['/admin']\" [ngClass]=\"{'active': GetHash('admin')}\" id=\"4\" onclick=\"$('#test').focus()\"><a href=\"\">Manage Access Requests</a></li>\n                     <li data-toggle=\"tab\" [routerLink]=\"['/help/contactus']\" [ngClass]=\"{'active': GetHash('contactus')}\" id=\"5\" onclick=\"$('#test').focus()\"><a href=\"\">Contact Us</a></li>\n                     <li data-toggle=\"tab\" [routerLink]=\"['/help/faq']\" [ngClass]=\"{'active': GetHash('faq')}\" id=\"6\"  onclick=\"$('#test').focus()\"><a href=\"\"> FAQs</a></li>\n                     <li data-toggle=\"tab\" *ngIf=\"isGSAAdmin\"  [routerLink]=\"['/solicitation/feedback']\" [ngClass]=\"{'active': GetHash('feedback/report')}\" id=\"7\" onclick=\"$('#test').focus()\"><a href=\"\">Feedback</a></li>       \n                </ul>\n\n                <div class=\" gsa_logo\" aria-hidden=\"true\">\n                    <a href='#' class=\"logo_li\">\n                    <div class='span-logo' >\n                        <img src='../../assets/gsa-logo.png'/>\n                    </div>\n                    </a>\n                </div>\n                <ul *ngIf=\"isLogin\" id=\"gsaDropdown\" class=\"nav navbar-nav\" style=\"float: right;\" >\n                    <li class=\"dropdown\">\n                        <a *ngIf=\"isLogin\" href=\"#\" class=\"dropdown-toggle\"\n                                    style=\"font-weight: 300\"\n                                    data-toggle=\"dropdown\"\n                                    aria-haspopup=\"true\"\n                                    aria-expanded=\"false\">Hello, {{firstName}}<span class=\"caret\"></span></a>\n\n                        <ul class=\"dropdown-menu\" role=\"listbox\">\n                            <!-- <li><a [routerLink]=\"['/user/profile', currentID]\" style=\"padding: 10px 20px;\" role=\"option\">Profile</a></li> -->\n                            <li><a (click) = \"gotoProfile()\" style=\"padding: 10px 20px; font-weight:300; font-size:medium; font-family: Arial, sans-serif;\">Profile</a></li> \n                            <li><a [routerLink]=\"['/user/updatePassword']\" style=\"padding: 10px 20px;\" role=\"option\">Password</a></li>\n                            <li><button class=\"dropdown-item\" type=\"button\" style=\"padding: 10px 20px; font-weight:300; font-size:medium; font-family: Arial, sans-serif;\" (click)=\"onLogout()\" role=\"option\">Log Out</button></li>\n                      </ul>\n                    </li>\n                </ul>\n\n            </div>\n\n        </div>\n    </nav>\n    <hr style=\"margin: 0px; height: 0px;\">\n</div>\n\n"

/***/ }),

/***/ 898:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n\n    <!-- banner -->\n    <div class=\"srt-banner blue\">\n      <div class=\"container\">\n        <h1>Contact Us</h1>\n        <p>We are here to answer any questions you may have about the Solicitation Review Tool (SRT) and assist your agency to\n          have an efficient procurement process ensuring Section 508 Compliance. Fill in the form below to reach out to us,\n          we will get back to you with solutions as soon as possible. </p>\n        <p>If you have any suggestions to enhance SRT, we would be happy to hear from you as well. </p>\n      </div>\n    </div>\n\n    <!-- content -->\n    <div class=\"container\">\n      <div class=\"alert alert-success email-font\" *ngIf=\"emailSent\">\n        Your message is successfully sent.\n      </div>\n\n      <form [formGroup]=\"myForm\" (ngSubmit)=\"onSubmit()\" [ngStyle]=\"{'display': emailSent ? 'none': 'block'}\">\n        <div class=\"form-group\">\n          <label for=\"name\">Your Name </label>\n          <input formControlName=\"name\" type=\"text\" id=\"name\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"email\">Your Email </label>\n          <input pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" formControlName=\"email\" type=\"email\" id=\"email\" class=\"form-control\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"textcontent\">Content</label>\n          <textarea class=\"form-control\" rows=\"10\" placeholder=\"Enter Content\" formControlName=\"content\" id=\"textcontent\"></textarea>\n        </div>\n\n        <button type=\"submit\" class=\"srt-button\">Send Message</button>\n      </form>\n    </div>\n  </main>\n"

/***/ }),

/***/ 899:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n  <div class=\"srt-banner blue\">\n    <div class=\"container\">\n      <h1>Frequently Asked Questions</h1>\n      <p>Solicitation Review Tool (SRT) is an automated predictive analysis application that performs scans of the Federal Business\n        Opportunities /FedBizOpps website and delivers: (1) a report containing all of the new solicitations for the previous\n        day; (2) a report of flagged solicitations that require manual review for specific regulatory requirements and compliance;\n        (3) a web-based portal for agency SMEs to perform manual reviews of flagged solicitations and to communicate with contracting\n        POCs for improvement; and (4) analytics and trending of flagged solicitations overtime by agency and government-wide.\n      </p>\n      <p>SRT uses natural language processing, text mining, and machine learning algorithms to automatically identify whether\n        a solicitation contains sufficient compliance requirements for a particular use case (e.g. Section 508 Technical Requirements).\n        To learn more about SRT from the FAQs below. </p>\n    </div>\n  </div>\n\n  <div class=\"container\">\n\n    <div class=\"faq-content-div\">\n\n      <!-- Search FAQs by text -->\n\n      <div style=\"display: table; float: right\">\n        <div style=\"display: table-cell; vertical-align: middle\">\n          <input id=\"search\" class=\"search-input\" placeholder=\"Search FAQs\" (keyup)=\"search()\" aria-label=\"input area to search your question\">\n        </div>\n        <div style=\"display: table-cell; vertical-align: middle; cursor: pointer\" (click)=\"search()\" class=\"search-button\">\n          Search\n        </div>\n      </div>\n\n      <div class=\"row nopadding\" style=\"clear: both\">\n\n        <!-- Left navigation -->\n\n        <div class=\"sticky-nav\">\n          <ul class=\"usa-sidenav-list\">\n            <li>\n              <a data-toggle=\"tab\" (click)=\"scroll('mostViewTitle')\">Most Viewed FAQs</a>\n            </li>\n            <li>\n              <a data-toggle=\"tab\" (click)=\"scroll('backgroundInfoTitle')\">Background</a>\n            </li>\n            <li>\n              <a data-toggle=\"tab\" (click)=\"scroll('aboutTitle')\">About SRT</a>\n            </li>\n            <li>\n              <a data-toggle=\"tab\" (click)=\"scroll('scanningProcessTitle')\">Explore the Scanning Process</a>\n            </li>\n            <li>\n              <a data-toggle=\"tab\" (click)=\"scroll('accessLevelTitle')\">Understand Access Privileges</a>\n            </li>\n            <li>\n              <a data-toggle=\"tab\" (click)=\"scroll('manageWorkloadTitle')\">Manage/ Review Solicitations</a>\n            </li>\n            <li>\n              <a data-toggle=\"tab\" (click)=\"scroll('manageProfileTitle')\">Manage Your Profile</a>\n            </li>\n            <li>\n              <a data-toggle=\"tab\" (click)=\"scroll('requestSupportTitle')\">Request Support</a>\n            </li>\n          </ul>\n        </div>\n\n        <!-- Content area -->\n\n        <div class=\"col-md-9 nopadding\">\n          <div class=\"faq-right-content\">\n            <div class=\"search-title\" *ngFor=\"let section of faq;\">\n              <h2 id=\"{{section.title}}\">{{section.name}}</h2>\n              <div class=\"panel-group\" id=\"{{section.id}}\" *ngIf=\"section.children\">\n                <div class=\"panel panel-default search-content\" *ngFor=\"let element of section.children; let i='index'\">\n\n                  <div class=\"panel-heading\">\n                    <a class=\"panel-link collapsed\" data-toggle=\"collapse\" [attr.data-parent]=\"'#'+section.id\" href=\"#{{section.id}}{{i}}\" [ngClass]=\"element.titleClass\">\n                      <h4 class=\"panel-title\" style=\"color:black\">{{element.title}}</h4>\n                    </a>\n                  </div>\n                  <div id=\"{{section.id}}{{i}}\" class=\"panel-collapse collapse\" [ngClass]=\"element.class\">\n                    <div class=\"panel-body\" [ngClass]=\"element.picclass\" [innerHTML]=\"element.body\">\n                      {{element.body}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n\n      </div>\n    </div>\n  </div>\n</main>\n"

/***/ }),

/***/ 900:
/***/ (function(module, exports) {

module.exports = " <router-outlet></router-outlet> "

/***/ }),

/***/ 901:
/***/ (function(module, exports) {

module.exports = "<!-- /home -->\n\n<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n  \n    <div class=\"srt-homehead\">\n  \n      <div class=\"srt-headposition\">\n        <div class=\"srt-headtext\">\n          <div class=\"srt-headdisplay\">\n            <div class=\"srt-headpadding\">\n              <h1 class=\"srt-blue srt-maintitle\">Solicitation Review Tool</h1>\n              <h3 class=\"srt-blue srt-textpadding\">\n                The Solicitation Review Tool (SRT) is provided to help agencies evaluate the overall solicitation compliance with accessibility,\n                cyber security, and other regulations and requirements.\n              </h3>\n            </div>\n          </div>\n        </div>\n      </div>\n  \n      <div class=\"srt-beta-container\">\n        <div class=\"srt-beta-position\">\n          <div class=\"srt-beta-padding\">\n            <div class=\"srt-betatitle\">Beta Disclaimer</div>\n            <div style=\"font-size: 14px;\">This is a beta version of the SRT platform. The results shown are preliminary only and should not be used or referenced\n              in any official or internal reports.</div>\n  \n          </div>\n        </div>\n      </div>\n  \n    </div>\n  \n    <div class=\"container\">\n        <div style=\"padding: 60px 40px;\">\n            <div class=\"row\">\n  \n                <!-- Review/Manage Workload -->\n                <div class=\"col-md-4 col-sm-6 srt-marginbot\">\n                    <div class=\"srt-1-1\">\n                        <div>\n                            <div class=\"srt-main-box\" >\n                                <!-- image -->\n                                <div class=\"srt-9-20\">\n                                    <div>\n                                        <div class=\"srt-iconpadding\">\n                                            <div class=\"srt-icon1\">\n  \n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <!-- description -->\n                                <div class=\"srt-11-20\">\n                                    <div>\n                                        <div class=\"srt-block-padding\">\n                                                <a [routerLink]=\"['/solicitation/report']\">\n                                            <h3 style=\"color:black\">Review/Manage Workload</h3>\n                                            <p style=\"color:black\">Access and manage solicitation review results for your agency</p>\n                                                </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n  \n                <!-- View Analytic -->\n                <div class=\"col-md-4 col-sm-6 srt-marginbot\">\n                    <div class=\"srt-1-1\">\n                        <div>\n                            <div class=\"srt-main-box\" >\n                                <!-- image -->\n                                <div class=\"srt-9-20\">\n                                    <div>\n                                        <div class=\"srt-iconpadding\">\n                                            <div class=\"srt-icon2\">\n  \n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <!-- description -->\n                                <div class=\"srt-11-20\">\n                                    <div>\n                                        <div class=\"srt-block-padding\">\n                                                <a [routerLink]=\"['/analytics']\">\n                                            <h3 style=\"color:black\">View Analytics</h3>\n                                            <p style=\"color:black\">Visualize trend and discover insights from the analytics</p>\n                                                </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n  \n                <!-- Manage SRT Access Requests -->\n                <div class=\"col-md-4 col-sm-6 srt-marginbot\" *ngIf=\"isGSAAdmin\">\n                    <div class=\"srt-1-1\">\n                        <div>\n                            <div class=\"srt-main-box\">\n                                <!-- image -->\n                                <div class=\"srt-9-20\">\n                                    <div>\n                                        <div class=\"srt-iconpadding\">\n                                            <div class=\"srt-icon3\">\n  \n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <!-- description -->\n                                <div class=\"srt-11-20\">\n                                    <div>\n                                        <div class=\"srt-block-padding\">\n                                            <a [routerLink]=\"['/admin']\">\n                                            <h3 style=\"color:black\">Manage SRT Access Requests</h3>\n                                            <p style=\"color:black\"> The Administrator manages new SRT sign up requests and current users settings</p>\n                                            </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n  \n                <!-- Get Additional Resourses -->\n                <div class=\"col-md-4 col-sm-6 srt-marginbot\" tabindex=\"0\">\n                    <div class=\"srt-1-1\">\n                        <div>\n                            <div class=\"srt-main-box\" >\n                                <!-- image -->\n                                <div class=\"srt-9-20\">\n                                    <div>\n                                        <div class=\"srt-iconpadding\">\n                                            <div class=\"srt-icon4\">\n  \n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <!-- description -->\n                                <div class=\"srt-11-20\">\n                                    <div>\n                                        <div class=\"srt-block-padding\">\n                                            <a onclick=\"window.open('https://app.buyaccessible.gov/baw/Main.jsp')\">\n                                            <h3 style=\"color:black\">Get Additional Resources</h3>\n                                            <p style=\"color:black\">Need help with Accessiblity requirements? Buy Accessible Wizard can assist you with that</p>\n                                            </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n  \n                <!-- FAQ -->\n                <div class=\"col-md-4 col-sm-6 srt-marginbot\">\n                    <div class=\"srt-1-1\">\n                        <div>\n                            <div class=\"srt-main-box\">\n                                <!-- image -->\n                                <div class=\"srt-9-20\">\n                                    <div>\n                                        <div class=\"srt-iconpadding\">\n                                            <div class=\"srt-icon5\">\n  \n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <!-- description -->\n                                <div class=\"srt-11-20\">\n                                    <div>\n                                        <div class=\"srt-block-padding\">\n                                            <a [routerLink]=\"['/help/faq']\">\n                                            <h3 style=\"color:black\">FAQ</h3>\n                                            <p style=\"color:black\">Review Frequently Asked Questions and learn more about SRT</p>\n                                            </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n  \n                <!-- Settings -->\n                <div class=\"col-md-4 col-sm-6 srt-marginbot\">\n                    <div class=\"srt-1-1\">\n                        <div>\n                            <div class=\"srt-main-box\">\n                                <!-- image -->\n                                <div class=\"srt-9-20\">\n                                    <div>\n                                        <div class=\"srt-iconpadding\">\n                                            <div class=\"srt-icon6\">\n  \n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <!-- description -->\n                                <div class=\"srt-11-20\">\n                                    <div>\n                                        <div class=\"srt-block-padding\">\n                                            <a [routerLink]=\"['/user/profile/', currentID]\">\n                                            <h3 style=\"color:black\">Settings</h3>\n                                            <p style=\"color:black\">Change your profile and/or password</p>\n                                            </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n  \n  \n            </div>\n        </div>\n    </div>\n  </main>\n  "

/***/ }),

/***/ 902:
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"header section\">\n  <app-header [isLogin]=\"isLogin\" [isGSAAdmin]=\"isGSAAdmin\"></app-header>\n</div> -->\n\n\n<div class=\"section-body\">\n  <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ 903:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 904:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 905:
/***/ (function(module, exports) {

module.exports = "<div>\n  <div id=\"nav\">\n    <button pButton type=\"button\" label=\"All Solicitations\" [routerLink]=\"['/solicitation/report']\" id=\"reps\"></button>\n  </div>\n  <p-dataTable #dt [value]=\"solicitation\">\n    <p-column field=\"solNum\" header=\"Solicitation\"></p-column>\n    <p-column field=\"title\" header=\"Title\"></p-column>\n    <p-column field=\"url\" header=\"URL\" [style]=\"{'width': '300px'}\"></p-column>\n    <p-column field=\"predictions.value\" header=\"Review Result\" [style]=\"{'width': '90px'}\">\n      <ng-template let-sol=\"rowData\" pTemplate=\"body\">\n        <div *ngIf=\"sol.predictions.value == 'RED'\">\n          <span [style.color]=\"sol.predictions.value\">\n            <i class=\"fa fa-exclamation-triangle\"></i> {{sol.predictions.value}}</span>\n        </div>\n        <div *ngIf=\"sol.predictions.value == 'GREEN'\">\n          <span [style.color]=\"sol.predictions.value\">\n            <i class=\"fa fa-check\"></i> {{sol.predictions.value}}</span>\n        </div>\n      </ng-template>\n    </p-column>\n    <p-column field=\"isReadable\" header=\"Machine Readable (Yes/No)\" [style]=\"{'width': '90px'}\"></p-column>\n    <p-column field=\"eitLikelihood\" header=\"E&IT (ICT) (Yes/No)\" [style]=\"{'width': '90px'}\"></p-column>\n    <p-column field=\"agency\" header=\"Agency\"></p-column>\n    <p-column field=\"office\" header=\"Office\"></p-column>\n    <p-column field=\"contact\" header=\"Contact\"></p-column>\n    <p-column field=\"position\" header=\"Position\"></p-column>\n  </p-dataTable>\n</div>\n<hr>\n<div class=\"col-xs-4 col-md-offset-1\">\n  <div class='review-title'>Review Instructions</div>\n  <ul>\n    <li>Navigate to solicitation URL</li>\n    <li>Download applicable solicitation documents</li>\n    <li>Review documents for accessibility compliance</li>\n    <li>Answer questions to the right</li>\n    <li>Provide narrative comment</li>\n  </ul>\n</div>\n\n<div class=\"col-xs-4 col-md-offset-1\">\n  <div class='review-title'>Manual Review</div>\n  <form (ngSubmit)=\"onSubmit(f)\" #f=\"ngForm\">\n    <div class=\"reviewData\">\n      <div>\n        <label for=\"eit\">(1) Does this solicitation identify Information and Communication Technology (ICT) deliverables that are covered\n          under the law?</label>\n        <div class=\"form-group\">\n          <label class=\"sr-only\" for=\"eit\">Agency Conformance</label>\n          <div class=\"radio\" *ngFor=\"let c of choices\">\n            <label>\n              <input type=\"radio\" name=\"eit\" id=\"eit\" [(ngModel)]=\"review.eit\" value=\"{{c.value}}\">{{c.display}}\n            </label>\n          </div>\n        </div>\n      </div>\n      <div>\n        <label for=\"standards\">(2) Does this solicitation identify applicable 508 standards for each ICT deliverable covered by the law?</label>\n        <div class=\"form-group\">\n          <label class=\"sr-only\" for=\"standards\">Agency Conformance</label>\n          <div class=\"radio\" *ngFor=\"let c of choices\">\n            <label>\n              <input type=\"radio\" name=\"standards\" id=\"standards\" [(ngModel)]=\"review.standards\" value=\"{{c.value}}\">{{c.display}}\n            </label>\n          </div>\n        </div>\n      </div>\n      <div>\n        <label for=\"v_conformance\">(3) Does this solicitation identify how vendors shall define conformance for each ICT deliverable?</label>\n        <div class=\"form-group\">\n          <label class=\"sr-only\" for=\"v_conformance\">Agency Conformance</label>\n          <div class=\"radio\" *ngFor=\"let c of choices\">\n            <label>\n              <input type=\"radio\" name=\"v_conformance\" id=\"v_conformance\" [(ngModel)]=\"review.v_conformance\" value=\"{{c.value}}\">{{c.display}}\n            </label>\n          </div>\n        </div>\n      </div>\n      <div>\n        <label for=\"evaluation\">(4) Does this solicitation include evaluation criteria for 508 conformance?</label>\n        <div class=\"form-group\">\n          <label class=\"sr-only\" for=\"evaluation\">Agency Conformance</label>\n          <div class=\"radio\" *ngFor=\"let c of choices\">\n            <label>\n              <input type=\"radio\" name=\"evaluation\" id=\"evaluation\" [(ngModel)]=\"review.evaluation\" value=\"{{c.value}}\">{{c.display}}\n            </label>\n          </div>\n        </div>\n      </div>\n\n    </div>\n    <div class=\"form-group\">\n      <label for=\"comment\">Comment</label>\n      <textarea rows=\"4\" class=\"form-control\" id=\"comment\" [(ngModel)]=\"review.comment\" name=\"comment\"></textarea>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n    <a href=\"/solicitation\">Cancel</a>\n  </form>\n</div>\n"

/***/ }),

/***/ 906:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n<div class=\"container\">\n  <div class=\"impcontainer\">\n    <table class=\"table table-bordered\">\n      <tr>\n        <th scope=\"col\">Solicitation Feedback</th>\n        <th scope=\"col\">Submitter</th>\n        <th scope=\"col\">Submission Date</th>\n      </tr>\n\n      <tr *ngFor=\"let item of feedback\">\n        <td>\n          <a [routerLink]=\"['/solicitation/feedback/form', item.solNum]\">{{item.title}}</a>\n        </td>\n        <td>{{item.submitter}}</td>\n        <td>{{item.date}}</td>\n      </tr>\n\n    </table>\n  </div>\n</div>\n</main>"

/***/ }),

/***/ 907:
/***/ (function(module, exports) {

module.exports = "<!-- <a [routerLink]=\"['/solicitation/report/', solicitation._id]\">{{solicitation.title}}</a> -->\n<div class=\"container\" *ngIf=\"solicitation\">\n  <div class=\"clearfix impcontainer\">\n    <div class=\"imppostion\">\n      <div style=\"padding-bottom: 20px;\">\n        <div class=\"list\">\n          <div class=\"list-title\" style=\"width: 120px\">Solicitation Title:&nbsp;</div>\n          <div class=\"list-content\">{{solicitation.title}}</div>\n        </div>\n        <div class=\"list\">\n          <div class=\"list-title\" style=\"width: 142px\">Solicitation Number:&nbsp;</div>\n          <div class=\"list-content\">{{solicitation.solNum}}</div>\n        </div>\n        <div class=\"list\">\n          <div class=\"list-title\" style=\"width: 142px\">Submitter:&nbsp;</div>\n          <div class=\"list-content\">{{submitter}}</div>\n        </div>\n        <div class=\"list\">\n          <div class=\"list-title\" style=\"width: 142px\">Submission Date: </div>\n          <div class=\"list-content\">{{date}}</div>\n        </div>\n      </div>\n\n\n      <table class=\"table table-bordered\">\n        <tr>\n          <th scope=\"col\">Question</th>\n          <th scope=\"col\">Answer</th>\n        </tr>\n\n        <tr *ngFor=\"let item of solicitation.feedback\">\n          <td style=\"font-weight: 800\">{{item.question}}</td>\n          <td>{{item.answer}}</td>\n        </tr>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 908:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n<div *ngIf=\"!solicitations\" class=\"solic-nosolic\">\n    <div class=\"solic-nosolic-posi\">\n        <ul class=\"cb-slideshow\">\n            <i class=\"fa fa-cog fa-spin\" style=\"color: #4a4a4a\"></i>\n            <li><span>L</span></li>\n            <li><span>O</span></li>\n            <li><span>A</span></li>\n            <li><span>D</span></li>\n            <li><span>I</span></li>\n            <li><span>N</span></li>\n            <li><span>G</span></li>\n            <li><span>.</span></li>\n            <li><span>.</span></li>\n            <li><span>.</span></li>\n        </ul>\n    </div>\n</div>\n\n<div *ngIf=\"solicitations\">\n    <div class=\"row nopadding\">\n        <div style=\"padding: 20px\" class=\"clearfix\">\n            <div class=\"srt-page-title srt-blue\" style=\"padding-bottom: 5px;\"  role=\"heading\" aria-level=\"1\">Solicitation Review Results for Section 508 Requirements</div>\n\n            <div class=\"solic-table\">\n                    <div class=\"solic-keyword\">\n                    <label for=\"ksearch\" class=\"solic-keyword\">Keyword Search:        \n                            <!--<span class=\"input-invalid\" *ngIf=\"errorMessage && (myForm.value.email == null || myForm.value.email == '')\">Please fill in requred field</span>-->\n                    </label>\n                    </div>\n                <!-- <div class=\"solic-keyword\">Keyword Search:</div> -->\n                <div class=\"solic-table-cell\">\n                    <div class=\"input-group\" id=\"solsearch\">\n                        <span class=\"input-group-btn\">\n                            <button class=\"btn btn-primary\" type=\"button\" role=\"presentation\" tabindex=\"-1\">\n                                <span class=\" glyphicon glyphicon-search\"></span>\n                            </button>\n                        </span>\n                        <input id=\"ksearch\" #gb type=\"text\" class=\"search-query form-control\" placeholder=\"Global Filter\" />\n                    </div>\n                </div>\n                <div class=\"solic-export\"><div style=\"padding: 0px 0px 0px 15px;\">Export As:</div></div>\n                <div class=\"solic-export-cursor\">\n\n\n                    <img tabindex=\"0\" id=\"csvlogo\" alt=\"click to export as csv\" src=\"../../../assets/downloadcsv.jpeg\" style=\"float:left\" (keydown.enter)=\"dt.exportCSV()\"  (click)=\"dt.exportCSV()\">\n                </div>\n            </div>\n\n\n                <div class=\"solic-littlescan\" role=\"heading\" aria-level=\"2\">Last scanned date: {{dateScan}}</div>\n            </div>\n        </div>\n\n    <p-dataTable #dt styleClass=\"pDataTable\"\n            [value]=\"solicitations\"\n            [rows]=\"15\"\n            [paginator]=\"true\"          \n            [pageLinks]=\"4\"\n            [rowsPerPageOptions]=\"[15, 25, 35, 45]\"\n            [globalFilter]=\"gb\"\n            [responsive]=\"true\"\n            [stacked]=\"stacked\">\n\n        <p-column field=\"solNum\"  header=\"Solicitation ID\" [sortable]=\"true\" [filter]=\"false\" filterPlaceholder=\"Search\" [style]=\"{'width': '170px'}\" ></p-column>\n        <p-column field=\"title\" header=\"Solicitation Title\" [sortable]=\"true\" [filter]=\"false\" filterPlaceholder=\"Search\">\n            <ng-template let-sol=\"rowData\" pTemplate=\"body\">        \n                <a href=\"{{sol.url}}\" target=\"_blank\">{{sol.title}}</a> \n            </ng-template>\n        </p-column>\n\n        <p-column field=\"noticeType\" header=\"Notice Type\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible', 'width': '200'}\"  filterPlaceholder=\"Search\" >\n            <ng-template pTemplate=\"filter\" let-col >\n                <p-dropdown [options]=\"solType \" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\" aria-hidden=\"true\" ></p-dropdown>\n            </ng-template>\n        </p-column>\n\n        <p-column field=\"date\" header=\"Date Posted on FedBizOpps\" sortable=\"custom\" (sortFunction)=\"soryByDate($event)\" [style]=\"{'overflow':'visible', 'width': '150'}\" filterPlaceholder=\"Search\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-calendar aria-hidden=\"true\"\n                            [(ngModel)]=\"dateFrom\"\n                            [maxDate]=\"maxDate\"\n                            (onSelect)=\"filterDate($event)\"\n                            (onBlur)=\"reset()\"\n                            placeholder=\"Select Start Date\">\n                </p-calendar>\n                <p-calendar aria-hidden=\"true\"\n                            [(ngModel)]=\"dateTo\"\n                            [minDate]=\"minDate\"\n                            [maxDate]=\"today\"\n                            (onSelect)=\"filterDate($event)\"\n                            (onBlur)=\"reset()\"\n                            placeholder=\"Select End Date\">\n                </p-calendar>\n            </ng-template>\n        </p-column>\n\n        <p-column field=\"reviewRec\" header=\"SRT Review Result\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow': 'visible', 'width': '200px'}\" filterPlaceholder=\"Search\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"revResult\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\" aria-hidden=\"true\"></p-dropdown>\n            </ng-template>\n            \n            <ng-template let-sol=\"rowData\" pTemplate=\"body\">\n                <div *ngIf=\"sol.predictions.value == 'RED'\">\n                    <span [ngStyle]=\"{'color' : sol.undetermined ? 'black' : 'red'}\">\n                        <button class=\"button\" (click)=\"selectSol(sol)\" onclick=\"$('#test').focus()\" style=\"border: none; text-align: left; padding: 0px;\">\n                            <i class=\"fa fa-exclamation-triangle\" style=\"padding-right: 5px;\" *ngIf=\"!sol.undetermined\"></i>\n                            <span style=\"text-decoration: underline;\">{{sol.reviewRec}}</span>\n                        </button>\n                    </span>\n                </div>\n                <div *ngIf=\"sol.predictions.value == 'GREEN'\">\n                  <span style=\"color: green\" >\n                      <button class=\"button\" (click)=\"selectSol(sol)\" style=\"border: none; text-align: left; padding: 0px;\">\n                          <i class=\"fa fa-check\" style=\"padding-right: 5px;\"></i>\n                          <span style=\"text-decoration: underline;\">{{sol.reviewRec}}</span>\n                      </button>\n                  </span>\n                </div>\n            </ng-template>\n        </p-column>\n\n        <p-column field=\"actionStatus\" header=\"Action Status\" [sortable]=\"true\" [style]=\"{'width': '200px'}\" filterPlaceholder=\"Search\"></p-column>\n\n        <p-column field=\"actionDate\" header=\"Latest Action Date\" [sortable]=\"true\" [style]=\"{'width': '110px'}\" filterPlaceholder=\"Search\">\n            <ng-template let-sol=\"rowData\" pTemplate=\"body\">\n                {{sol.actionDate ? sol.actionDate : \"-\"}}\n            </ng-template>\n        </p-column>\n\n        <p-column field=\"agency\" header=\"Agency\" [sortable]=\"true\" [filter]=\"false\" filterPlaceholder=\"Search\"></p-column>\n\n        <p-column field=\"office\" header=\"Office\" [sortable]=\"true\" [filter]=\"false\" filterPlaceholder=\"Search\"></p-column>\n    </p-dataTable>\n\n</div>\n</main>"

/***/ }),

/***/ 909:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 910:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n<app-summary [step1]=\"step1\" [step2]=\"step2\" [step3]=\"step3\" [solicitationID]=\"solicitationID\" [type]=\"type\"></app-summary>\n<div class=\"container\">\n\n  <div class=\"clearfix summary-content-padding\">\n    <div class=\"srt-title-padding\">\n      <a [routerLink]=\"['/solicitation/report']\" style=\"font-weight: 500\">\n        < Back to Solicitation Review Results for Section 508 Requirements</a>\n    </div>\n\n\n\n    <div class=\"col-md-12 nopadding\">\n      <!--<legend style=\"font-weight: 500\">Email Solicitation Point of Contact</legend>-->\n      <div class=\"alert alert-success email-font\" *ngIf=\"emailSent\">\n        Your email is successfully sent to the designated recipient(s), you will receive an email notification when the solicitation\n        is updated on FedBizOpps.\n      </div>\n      <div *ngIf=\"emailSent\" class=\"email-font\">\n        <a (click)=\"emailSent = false\" id=\"rebutton\">\n        Send another email\n    </a>\n      </div>\n\n\n      <form [formGroup]=\"myForm\" (ngSubmit)=\"emailContact()\" [ngStyle]=\"{'display': emailSent ? 'none': 'block'}\">\n        <div id=\"emailform\">\n          <div>\n            <div class=\"form-group\">\n              <label for=\"emailTo\">To:</label>\n              <input type=\"text\" id=\"emailTo\" class=\"form-control\" formControlName=\"emailTo\">\n            </div>\n            <div class=\"form-group\">\n              <label for=\"emailCC\">CC:</label>\n              <input type=\"text\" id=\"emailCC\" class=\"form-control\" formControlName=\"emailCC\">\n            </div>\n            <div class=\"form-group\" >\n              <label for=\"subject\">Subject:</label>\n              <input type=\"text\" id=\"subject\" class=\"form-control\" formControlName=\"subject\" >\n            </div>\n            <div class=\"form-group\" style=\"padding-bottom: 20px\" >\n              <label for=\"message\" style=\"padding-bottom: 10px\">Message:</label>\n              <quill-editor id=\"maessage\" style=\"min-height: calc(100vh - 585px)\" formControlName=\"message\" [options]=\"editorOptions\" (keydown)=\"skiptext($event)\"></quill-editor>\n            </div>\n\n          </div>\n        </div>\n        <div id=\"ebutton\">\n          <button type=\"submit\" class=\"srt-button\" id=\"btn\">Send Email</button>\n        </div>\n      </form>\n\n\n    </div>\n  </div>\n</div>\n</main>"

/***/ }),

/***/ 911:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n  <app-summary [step1]=\"step1\" [step2]=\"step2\" [step3]=\"step3\" [solicitationID]=\"solicitationID\" [type]=\"type\">\n  </app-summary>\n\n  <div class=\"container\">\n\n    <div class=\"clearfix summary-content-padding\">\n      <div class=\"srt-title-padding\">\n        <a [routerLink]=\"['/solicitation/report']\" style=\"font-weight: 500\">\n          < Back to Solicitation Review Results for Section 508 Requirements</a>\n      </div>\n\n      <div class=\"alert alert-success\" *ngIf=\"feedbackSent\" style=\"font-weight: 500\">\n        Your response is successfully submitted.\n      </div>\n\n      <div *ngIf=\"!feedbackSent\">\n        <div id=\"instruction\">\n          <div style=\"padding-bottom: 10px\">The SRT Team welcome your Subject Matter Expertise to make our tool better for all. To review scanned solicitation\n            and provide your feedback, please follow the steps below:</div>\n\n          <div>1) Click on the solicitation’s “FBO Link” provided below to access the solicitation on FedBizOpps website and download\n            the solicitation documents;</div>\n          <div>2) Evaluate the documents’ Section 508 conformance languages (here are some suggested keywords to search for in\n            the documents: Section 508, accessibility, EIT, compliance, conform, conformance, GPAT, VPAT, Section 508 requirements,\n            70, WCAG, and Buy Accessible);</div>\n          <div>3) Answer the short survey below to provide manual review feedback; and</div>\n          <div>4) Click submit to send out your evaluation to the SRT Team.</div>\n\n        </div>\n\n\n        <div *ngIf=\"solicitation\" class=\"clearfix impcontainer\">\n          <div class=\"imppostion\">\n            <div style=\"padding-bottom: 20px;\">\n              <div class=\"srt-section-title\" style=\"text-transform: uppercase; padding-bottom: 20px;\">\n                solicitation review result\n              </div>\n              <div class=\"list\">\n                <div class=\"list-title\" style=\"width: 120px\">Solicitation Title:&nbsp;</div>\n                <div class=\"list-content\">{{solicitation.title}}</div>\n              </div>\n              <div class=\"list\">\n                <div class=\"list-title\" style=\"width: 142px\">Solicitation Number:&nbsp;</div>\n                <div class=\"list-content\">{{solicitation.solNum}}</div>\n              </div>\n              <div class=\"list\">\n                <div class=\"list-title\" style=\"width: 68px\">FBO Link:&nbsp;</div>\n                <div class=\"list-content\"><a href=\"{{solicitation.url}}\" target=\"_blank\">{{solicitation.url}}</a></div>\n              </div>\n              <div class=\"list\">\n                <div class=\"list-title\" style=\"width: 130px\">Prediction Results:&nbsp; </div>\n                <div class=\"list-content\">\n                  <ul class=\"nopadding\">\n                    <li style=\"list-style: none; line-height: 18px;\">{{solicitation.reviewRec}}</li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n\n            <!-- <fieldset *ngFor=\"let survey of surveys; let i = index\" style=\"padding: 0px;\">\n              <legend><span *ngIf=\"survey.Question != 'Additional feedback:'\">Q{{i+1}}.</span>{{survey.Question}}\n                <span style=\"color: #899197\">{{survey.Note}}</span>\n              </legend><br>\n              <div *ngFor=\"let choice of survey.Choices; let c=index\" [ngStyle]=\"{'display': survey.Type=='multiple choice' ? 'inline-block' : 'block'}\">\n                <input id=\"{{survey.ID}}{{choice}}\" [ngModel]=\"surveyModel[i]==survey.Choices[c]\" (ngModelChange)=\"checkBox(survey, choice, $event)\"\n                  type=\"checkbox\" value=\"{{choice}}\" name=\"{{i}}\">\n                <label for=\"{{survey.ID}}{{choice}}\">{{choice}}\n                    <span *ngIf='survey.ChoicesNote.length > 0' style=\"color: #899197\">({{survey.ChoicesNote[c]}})</span>\n                </label>\n              </div>\n\n              <div *ngIf=\"survey.Type=='essay'\" style=\"list-style: none; padding: 0px 15px 0px 0px;\">\n                <div> <label for=\"{{survey.ID}}{{choice}}\" style=\"position:absolute;\n                  left:-10000px;\n                  top:auto;\n                  width:1px;\n                  height:1px;\n                  overflow:hidden;\">textarea to enter your feedback</label></div>\n                <textarea id=\"{{survey.ID}}{{choice}}\" class=\"form-control\" [ngModel]=\"surveyModel[i]\" (ngModelChange)=\"textarea(survey, $event)\" [ngStyle]=\"{'min-height':survey.Question == 'Additional feedback:' ? '150px' : 'auto' }\"> </textarea>\n                </div>\n\n            </fieldset> -->\n\n\n\n\n           \n          <ul *ngFor=\"let survey of surveys; let i = index\" style=\"padding: 0px;\">\n            <li style=\"list-style: none;\"><span *ngIf=\"survey.Question != 'Additional feedback:'\">Q{{i+1}}. </span>{{survey.Question}} <br>\n              <span style=\"color: #899197\">{{survey.Note}}</span>\n              <ul style=\"padding: 5px 0px 0px 0px;\">\n                <li *ngFor=\"let choice of survey.Choices; let c=index\" style=\"list-style: none; padding: 0px 15px 0px 0px;\" [ngStyle]=\"{'display': survey.Type=='multiple choice' ? 'inline-block' : 'block'}\">\n                  <input id=\"{{survey.ID}}{{choice}}\" style=\"display:none\"  [ngModel]=\"surveyModel[i]==survey.Choices[c]\" (ngModelChange)=\"checkBox(survey, choice, $event)\"\n                    type=\"checkbox\" value=\"{{choice}}\"/>\n                  <label for=\"{{survey.ID}}{{choice}}\">{{choice}}\n                      <span *ngIf='survey.ChoicesNote.length > 0' style=\"color: #899197\" aria-label=\"Choice\" >({{survey.ChoicesNote[c]}})</span>\n                  </label>\n                </li>\n                <li *ngIf=\"survey.Type=='essay'\" style=\"list-style: none; padding: 0px 15px 0px 0px;\">\n                  <div> <label for=\"{{survey.ID}}{{choice}}\" style=\"position:absolute;\n                    left:-10000px;\n                    top:auto;\n                    width:1px;\n                    height:1px;\n                    overflow:hidden;\">textarea to enter your feedback</label></div>\n                  <textarea id=\"{{survey.ID}}{{choice}}\" class=\"form-control\" [ngModel]=\"surveyModel[i]\" (ngModelChange)=\"textarea(survey, $event)\" [ngStyle]=\"{'min-height':survey.Question == 'Additional feedback:' ? '150px' : 'auto' }\"> </textarea>\n                </li>\n              </ul>\n            </li>\n          </ul>\n     \n            <div style=\"padding: 15px;\">\n              <button type=\"submit\" class=\"srt-button imsubmit\" (click)=\"feedback()\" aria-label=\"submit this feedback\">Submit</button>\n            </div>\n\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n\n\n\n\n</main>\n"

/***/ }),

/***/ 912:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n  <app-summary [step1]=\"step1\" [step2]=\"step2\" [step3]=\"step3\" [solicitationID]=\"solicitationID\" [type]=\"type\"></app-summary>\n\n  <div class=\"container\">\n\n    <div class=\"clearfix summary-content-padding\">\n      <div class=\"srt-title-padding\">\n        <a [routerLink]=\"['/solicitation/report']\" style=\"font-weight: 500\">\n          < Back to Solicitation Review Results for Section 508 Requirements</a>\n      </div>\n      <div style=\"font-size: 16px;\">\n        <div class=\"list-title\" style=\"width: 100%;\">\n          Action History\n        </div>\n        <div class=\"list-content\">\n          <ul *ngIf=\"history\" class=\"nopadding\">\n            <li *ngFor=\"let action of history\" style=\"list-style: none;\">{{action.date}} -\n              <span style=\"font-weight: 600\">{{action.user}}</span> {{action.action}}</li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</main>\n"

/***/ }),

/***/ 913:
/***/ (function(module, exports) {

module.exports = "<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n  <app-summary [step1]=\"step1\" [step2]=\"step2\" [step3]=\"step3\" [solicitationID]=\"solicitationID\" [type]=\"type\"></app-summary>\n\n  <div class=\"container\">\n\n    <div class=\"clearfix summary-content-padding\">\n      <div class=\"srt-title-padding\">\n        <a [routerLink]=\"['/solicitation/report']\" style=\"font-weight: 500\">\n          < Back to Solicitation Review Results for Section 508 Requirements</a>\n      </div>\n      <div style=\"font-size: 16px;\">\n        <div class=\"list-title\" style=\"width: 100%;\">\n          Prediction History\n        </div>\n   \n      </div>\n    </div>\n\n  </div>\n</main> "

/***/ }),

/***/ 914:
/***/ (function(module, exports) {

module.exports = "\n<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n<app-summary [step1]=\"step1\" [step2]=\"step2\" [step3]=\"step3\" [solicitationID]=\"solicitationID\" [type]=\"type\"></app-summary>\n\n<div class=\"container\">\n\n  <div class=\"clearfix summary-content-padding\">\n    <div class=\"srt-title-padding\">\n      <a [routerLink]=\"['/solicitation/report']\" style=\"font-weight: 500\">\n        < Back to Solicitation Review Results for Section 508 Requirements</a>\n    </div>\n\n\n    <div id=\"detail\">\n\n      <div style=\"display: inline-block; font-weight: 500\" *ngIf=\"solicitation\">\n        <div style=\"font-size: 24px; padding-bottom: 15px;\">{{solicitation.title}}</div>\n        <div style=\"padding-bottom: 5px\"><a target=\"_blank\" href=\"{{solicitation.url}}\">{{solicitation.url}}</a></div>\n        <div style=\"padding-bottom: 5px\">\n          <span style=\"font-weight:600\">Results:&nbsp;</span>\n          <span style=\"font-weight:500\" >{{solicitation.reviewRec}}</span>\n          \n        </div>\n      </div>\n\n      <div id=\"rbutton\">\n        <div [routerLink]=\"['/solicitation/email', solicitationID]\" class=\"srt-button\" style=\"width: 150px; \">\n          <div>\n            Email POC\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"solicitation\" style=\"clear: both; padding-top: 30px;\">\n\n        <div class=\"col-md-8\">\n          <div class=\"list\">\n            <div class=\"list-title\">Solicitation Number:&nbsp;</div>\n            <div class=\"list-content\">{{solicitation.solNum}}</div>\n          </div>\n\n          <div class=\"list\">\n            <div class=\"list-title\">Date Posted on FedBizOpps:&nbsp;</div>\n            <div class=\"list-content\">{{solicitation.date}}</div>\n          </div>\n\n\n          <div class=\"list\">\n            <div class=\"list-title\">Solicitation Type:&nbsp;</div>\n            <div class=\"list-content\">{{solicitation.noticeType}}</div>\n          </div>\n\n          <!--<div class=\"list\">\n                  <div class=\"list-title\">URL:&nbsp;</div>\n                  <div class=\"list-content\"><a target=\"_blank\" href=\"{{solicitation.url}}\" (click)=\"ReviewSolicitation()\">{{solicitation.url}}</a></div>\n              </div>-->\n\n          <div class=\"list\">\n            <div class=\"list-title\">ICT/E&IT (Yes/No):\n              <sup [tooltip]=\"ICT\" tooltipPlacement=\"right\">\n                          <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>\n                      </sup>\n              <tooltip-content #ICT [animation]=\"true\">\n                <div>SRT identifies Information and Communication Technology (ICT) / Electronic and Information Technology (E&IT)\n                  solicitations with a set of NAICS codes (334111, 334112, 334113, 334119, 511210, 516110, 517110, 517510,\n                  518111, 518112, 518210, 5324, 54121, 5415, 54161, and 561320).</div>\n              </tooltip-content>\n              &nbsp;</div>\n            <div class=\"list-content\">{{solicitation.eitLikelihood.value}}</div>\n          </div>\n\n          <div class=\"list\">\n            <div class=\"list-title\">Total Documents Scanned:&nbsp;</div>\n            <div class=\"list-content\">\n              <span *ngIf=\"solicitation.numDocs != 'No Document Links Found' &&\n                                  solicitation.numDocs != 'Insecure Redirect: Unable to Download' &&\n                                  solicitation.numDocs != 'Connection Failed' &&\n                                  solicitation.numDocs != 'Failed to Load' &&\n                                  solicitation.numDocs != '0'\">\n                          {{solicitation.parseStatus.length}} <span *ngIf=\"lockDocs\">out of {{solicitation.numDocs}}</span>\n              </span>\n              <span *ngIf=\"!(solicitation.numDocs != 'No Document Links Found' &&\n                                  solicitation.numDocs != 'Insecure Redirect: Unable to Download' &&\n                                  solicitation.numDocs != 'Connection Failed' &&\n                                  solicitation.numDocs != 'Failed to Load' &&\n                                  solicitation.numDocs != '0')\">\n                          {{solicitation.numDocs}}\n                      </span>\n            </div>\n          </div>\n\n          <div class=\"list\" *ngIf=\"solicitation.parseStatus.length != 0 || lockDocs\">\n            <div class=\"list-title\" style=\"width: 100%\">Machine Readable (Yes/No):\n              <sup [tooltip]=\"Machine\" tooltipPlacement=\"right\">\n                          <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>\n                      </sup>\n              <tooltip-content #Machine [animation]=\"true\">\n                <div>Machine-readable documents are documents whose content can be readily processed by computers and electronically\n                  searchable. A digital image does not allow the text to be indexed and searched.</div>\n              </tooltip-content>\n              &nbsp; </div>\n            <div class=\"list-content\">\n              <ul class=\"nopadding\">\n                <li class=\"liststyle\" *ngFor=\"let doc of solicitation.parseStatus\">{{doc.name}} : {{doc.status}}</li>\n                <li class=\"liststyle\" *ngFor=\"let lock of lockDocs\">solicitation_{{solicitation.solNum}}_document: Failed to Load</li>\n              </ul>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-4\">\n          <div class=\"list\">\n            <div class=\"list-title\">Agency:&nbsp;</div>\n            <div class=\"list-content\">{{solicitation.agency}}</div>\n          </div>\n\n          <div class=\"list\">\n            <div class=\"list-title\">Office:&nbsp;</div>\n            <div class=\"list-content\">{{solicitation.office}}</div>\n          </div>\n\n          <div class=\"list\">\n            <div class=\"list-title\">Point of Contact:&nbsp;</div>\n            <div class=\"list-content\">{{solicitation.contactInfo.name}}</div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n\n\n\n  </div>\n</div>\n</main>\n"

/***/ }),

/***/ 915:
/***/ (function(module, exports) {

module.exports = "<div class=\"srt-banner blue\">\n    <div class=\"container\">\n        <h1>Solicitation Review Result Summary</h1>\n        <!--<div class=\"srt-section-title\">About Solicitation Review Tool</div>       -->\n        <div class=\"summary-title\">Solicitation Review Instructions and Next Steps:</div>\n        <ul class=\"summary-steps\">\n            <li>\n                <div class=\"summary-steps\"><i class=\"fa fa-check\" aria-hidden=\"true\" style=\"color: #f7f7f7\" [ngStyle]=\"{'opacity' : step1 ? '1' : '0'}\"></i>&nbsp;&nbsp;STEP 1 - </div>\n                <div class=\"summary-instr\">Open the solicitation and review the documents to determine whether the solicitation is compliant;</div>\n            </li>\n            <li>\n                <div class=\"summary-steps\"><i class=\"fa fa-check\" aria-hidden=\"true\" style=\"color: #f7f7f7\" [ngStyle]=\"{'opacity' : step2 ? '1' : '0'}\"></i>&nbsp;&nbsp;STEP 2 - </div>\n                <div class=\"summary-instr\">Click on the “Email POC” button to share the results with the Point of Contact (POC) listed in the solicitation. Edit the proposed email message with any additional feedback to help improve the 508 compliance of the solicitation, click “Send Email”; and</div>\n            </li>\n            <li>\n                <div class=\"summary-steps\"><i class=\"fa fa-check\" aria-hidden=\"true\" style=\"color: #f7f7f7\" [ngStyle]=\"{'opacity' : step3 ? '1' : '0'}\"></i>&nbsp;&nbsp;STEP 3 - </div>\n                <div class=\"summary-instr\">Click on the “MAKE SRT SMARTER” tab to fill out a short survey regarding the current solicitation, which will help to improve the accuracy of the prediction.</div>\n\n            </li>\n        </ul>\n    </div>\n</div>\n<div class=\"srt-tabs summary-tab\">\n    <div class=\"container\">\n        <div ng-if=\"showActivitySelection()\" role=\"navigation\" aria-label=\"step navigation\">\n            \n            <ul class=\"nopadding summary-floatleft\" >\n                <li [ngClass]=\"{'active' : type=='report'}\">\n                    <a [routerLink]=\"['/solicitation/report', solicitationID]\">STEP 1: VIEW RESULT</a>\n                </li>\n                <li  [ngClass]=\"{'active' : type=='email'}\">\n                    <a [routerLink]=\"['/solicitation/email', solicitationID]\">STEP 2: EMAIL POC</a>\n                </li>\n                 <li  [ngClass]=\"{'active' : type=='feedback'}\">\n                    <a [routerLink]=\"['/solicitation/feedback', solicitationID]\">STEP 3: MAKE SRT SMARTER</a>\n                </li>\n            </ul>\n            <ul class=\"nopadding summary-floatright\">\n                <li>\n                    <a [routerLink]=\"['/solicitation/prediction', solicitationID]\">Prediction History</a>\n                </li>\n                <li [ngClass]=\"{'active' : type=='history'}\">\n                    <a [routerLink]=\"['/solicitation/history', solicitationID]\">History</a>\n                </li>\n            </ul>\n\n        </div>\n    </div>\n</div>\n\n<!-- <div class=\"container\">\n\n    <div class=\"clearfix summary-content-padding\">\n        <div class=\"srt-title-padding\">\n            <a [routerLink]=\"['/solicitation/report']\" style=\"font-weight: 500\"> < Back to Solicitation Review Results for Section 508 Requirements</a>\n        </div>\n\n    </div>\n</div> -->\n"

/***/ }),

/***/ 916:
/***/ (function(module, exports) {

module.exports = " <!-- <img src=\"https://s3.amazonaws.com/srt.bucket/assets/password.png\" alt=\"\">  -->\n<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n    \n<div class=\"srt-banner blue\">\n    <div class=\"container\">\n        <h1><span>Reset Password</span></h1>\n        <div style=\"font-size: 20px; padding-bottom: 15px;\">Password Reset Instructions and Next Steps:</div>\n\n        <ul class=\"summary-steps\">\n            <li style=\"padding:5px\">\n                <div style=\"display: inline-block; vertical-align: top\"><i class=\"fa fa-check\"  aria-hidden=\"true\" style=\"color: #f7f7f7\" [ngStyle]=\"{'opacity' : step1 ? '1' : '0'}\"></i>&nbsp;&nbsp;</div>\n                <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px)\">Be at least 8 characters</div>\n            </li>\n            <li style=\"padding:5px\">\n                <div style=\"display: inline-block; vertical-align: top\"><i aria-hidden=\"true\" class=\"fa fa-check\"  style=\"color: #f7f7f7\" [ngStyle]=\"{'opacity' : step2 ? '1' : '0'}\" ></i>&nbsp;&nbsp;</div>\n                <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px)\">Have at least 1 upper case character (e.g., A, Z)</div>\n            </li>\n            <li style=\"padding:5px\">\n                <div style=\"display: inline-block; vertical-align: top\"><i aria-hidden=\"true\" class=\"fa fa-check\"  style=\"color: #f7f7f7\" [ngStyle]=\"{'opacity' : step3 ? '1' : '0'}\" ></i>&nbsp;&nbsp;</div>\n                <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px)\">Have at least 1 numerical character (e.g., 1, 2, 3 )</div>\n                \n            </li>\n            <li style=\"padding:5px\">\n                <div style=\"display: inline-block; vertical-align: top\"><i aria-hidden=\"true\" class=\"fa fa-check\"  style=\"color: #f7f7f7\" [ngStyle]=\"{'opacity' : step4 ? '1' : '0'}\"></i>&nbsp;&nbsp;</div>\n                <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px)\">Have at least 1 symbols (e.g., #, $, %)</div>\n                \n            </li>\n        </ul>\n\n\n        \n    </div>\n</div>\n\n\n\n<div class=\"container\" style=\"padding:50px 0px 0px 0px;\"> \n    \n\n    <form [formGroup]=\"form\" class=\"form-horizontal\" (ngSubmit)=\"changePassword()\"> \n    \n\n        <div class=\"form-group padding\">\n          <label for=\"oldPassword\" class=\"col-sm-2 text\">Current password\n               <span style=\"color: #BE3430; padding-left: 5px;\"><sup>*</sup></span>\n          </label>\n            <div class=\"col-sm-10\">\n              <input formControlName=\"oldPassword\" name=\"oldPassword\" id=\"oldPassword\" type=\"{{pwshow? 'text':'password'}}\" class=\"form-control\"  placeholder=\"current password\" [(ngModel)] = \"str1\" >\n              <div *ngIf=\"form.get('oldPassword').invalid && (form.get('oldPassword').dirty || form.get('oldPassword').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"form.get('oldPassword').hasError('required')\">\n                  Password is required.\n                </div>\n              </div>\n              \n                  \n            </div>\n        </div>\n\n\n        <div class=\"form-group padding\">\n          <label for=\"newPassword\" class=\"col-sm-2 text\">New password\n              <span style=\"color: #BE3430; padding-left: 5px;\"><sup>*</sup></span>\n          </label>\n            <div class=\"col-sm-10\">\n              <input formControlName=\"newPassword\" id=\"newPassword\" type=\"{{pwshow? 'text':'password'}}\" class=\"form-control\"  placeholder=\"new password\" [(ngModel)] =\"str2\"  (ngModelChange) = \"validationFunction()\">\n              \n              <div *ngIf=\"form.get('newPassword').invalid && (form.get('newPassword').dirty || form.get('newPassword').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"form.get('newPassword').hasError('required')\">\n                  Password is required.\n                </div>\n                <div *ngIf=\"form.get('newPassword').hasError('minlength')\">\n                  Password must be at least 8 characters long.\n                </div>\n                <div *ngIf=\"form.get('newPassword').hasError('pattern')\">\n                  Password must have at least one uppercase letter, one lowercase letter, one number and one special character\n                </div>\n              </div>\n              \n            </div>\n        </div>\n\n\n        <div class=\"form-group padding\">\n          <label for=\"confirmPassword\" class=\"col-sm-2 text\">Confirm password\n              <span style=\"color: #BE3430; padding-left: 5px;\"><sup>*</sup></span>\n          </label>\n              <div class=\"col-sm-10\">\n                <input formControlName=\"confirmPassword\" name =\"confirmPassword\" id=\"confirmPassword\" type=\"{{pwshow? 'text':'password'}}\" class=\"form-control\"  placeholder=\"confirm new pasword\" [(ngModel)] = \"str3\" (ngModelChange) = \"matchValidation()\">\n               \n              <div *ngIf=\"form.get('confirmPassword').invalid && (form.get('confirmPassword').dirty || form.get('confirmPassword').touched)\" class=\"validation text-danger\">\n                <div *ngIf=\"form.get('confirmPassword').hasError('required')\">\n                  Password is required.\n                </div>\n              </div>\n\n            </div>\n            \n        </div>\n\n    \n    \n     <div class=\"form-group padding\">\n       \n          <a style=\"float:right; padding:0px 20px 0px 0px; cursor: pointer;\" herf=\"#\"  (click) = \"showHidePsw()\">Show the typing</a>\n          \n        \n    </div>\n        <div style=\"padding:0px 20px 0px 0px\">\n         <button type=\"submit\" class=\"srt-button\"  [ngStyle]=\"{'display': allValid == true ? 'block' : 'none'}\" >Reset password</button>\n        </div>\n        \n       \n    </form>\n</div> \n</main>"

/***/ }),

/***/ 917:
/***/ (function(module, exports) {

module.exports = "\n<main id=\"content\" class=\"bypass-block-target\" tabindex=\"-1\">\n<!-- <img src=\"https://s3.amazonaws.com/srt.bucket/assets/profile.png\" alt=\"\"> -->\n\n\n        <div class=\"srt-banner blue\">\n                <div class=\"container\">\n                        <h1><span>{{title}}</span></h1>\n                        \n                        <div style=\"font-size: 20px; padding-bottom: 15px;\">{{title}} Instructions</div>\n\n                        <ul class=\"summary-steps\">\n                                <li style=\"padding:5px\">\n                                        <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px); font-size: 16px\">Only Administration(GSA) can edit Profile</div>\n                                </li>\n                                <li style=\"padding:5px\">\n                                        <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px); font-size: 16px\">If you are an Administrator, you can edit other people's profile</div>\n                                </li>\n                                <li style=\"padding:5px\">\n                                        <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px);font-size: 16px\">If you are not an Administration, you can click 'Contact Us to Update Your Info'\n                                                to send a request to edit your profile</div>\n                                </li>\n                                <li style=\"padding:5px\">\n                                        <div style=\"display: inline-block; vertical-align: top; width: calc(100% - 80px);font-size: 16px\">The user profile as following:</div>\n\n                                </li>\n                        </ul>\n\n                </div>                \n        </div>\n\n        <div *ngIf = \"selectedUser\">\n        <div class=\"profile-user-name\" style=\"padding-left:20%\">\n\n                <div style=\" border-radius: 50%; position:relative;float:left; height: 100px; width: 100px ;background-image: url('/assets/Kailun/test1.png'); background-size:100%\">\n                        <!-- <i style=\"position: absolute; bottom: 0px; left: 80px\" class=\"fa fa-upload\" aria-hidden=\"true\" (click) =\"uploadFile()\"></i> -->\n\n                        <!-- <form [formGroup]=\"myform\">\n                                <input type=\"file\" id=\"selectFile\" name=\"selectFile\" [disabled]=\"uploading\" formControlName=\"selectFile\" (change)=\"uploadImage($event)\">\n                        </form> -->\n\n                        <!-- <form  action=\"http://localhost:3000/upload\"  method=\"post\" enctype=\"multipart/form-data\">\n                                头像：<input type=\"file\" name=\"f1\" /><br>\n                                <input type=\"submit\" value=\"upload\"/>\n                        </form>\n                        -->\n                    \n                </div>\n\n              \n                \n\n                <h1 style=\"font-weight: 600;color:#041e4a\">{{selectedUser.firstName}} {{selectedUser.lastName}}</h1>\n                <p style=\"font-size:20px; font-weight:400; color:#031747\">{{selectedUser.position}}</p>\n                \n                <div *ngIf = \"self == false\"style=\"padding-left:50%\">\n                                <a (click)=\"editInfo()\" style=\"font-size:20px; font-weight:500;color:#1958b5\"> Edit Profile</a>        \n                                <a (click)=\"saveInfo()\" style=\" padding-left: 20px; font-size:20px; font-weight:500;color:#1958b5\"> Save Profile</a>      \n                </div>\n               \n                <a *ngIf = \"self == true\" href=\"\" [routerLink]=\"['/help/contactus']\" style=\"padding-left:60%; font-size:20px; font-weight:500;color:#1958b5\"> Contact Us to Update Your Info</a>\n        </div> \n        <div>   \n                <div class=\"profile-user-line\"></div>\n        </div>\n\n        <div id=\"userProfile\" tabindex=\"-1\" class=\"profile-user-info\" style=\"padding-left:20%\">\n\n                <div class=\"form-group\" role=\"group\">\n                        <label class=\"col-md-6 control-label profile-user-info-title\" for=\"textinput\">Email Address</label>\n                        <div class=\"col-md-6\" *ngIf = \"editable == false\">\n                                <h4 style=\"color:#030354;\">{{selectedUser.email}}</h4>\n                        </div>\n                        <input *ngIf = \"editable == true\" [(ngModel)]=\"newemail\" class=\"col-md-6 form-control\" type=\"text\" id=\"textinput\" placeholder=\"{{selectedUser.email}}\">\n\n                </div>\n\n \n                <div class=\"form-group\" role=\"group\">\n                        <label class=\"col-md-6 control-label profile-user-info-title\" for=\"textinput\">Agency</label>\n                        <div class=\"col-md-6\">\n                                <h4 style=\"color:#030354\">{{selectedUser.agency}}</h4>\n                        </div>\n                </div>\n\n                <div class=\"form-group\" role=\"group\" *ngIf = \"self == true\">\n                        <label class=\"col-md-6 control-label profile-user-info-title\" for=\"textinput\">Password</label>\n                        <div class=\"col-md-6\">\n                                <a href=\"\" [routerLink]=\"['/user/updatePassword']\">\n                                        <h4>Reset Password</h4>\n                                </a>\n                        </div>\n                </div>\n\n                <div class=\"form-group\" role=\"group\">\n                        <label class=\"col-md-6 control-label profile-user-info-title\" for=\"textinput\">Access Privilege</label>\n                        <div class=\"col-md-6\">\n                                <h4 style=\"color:#030354\">{{selectedUser.userRole}}</h4>\n                        </div>\n                </div>\n\n                <div class=\"form-group\" role=\"group\">\n                        <label class=\"col-md-6 control-label profile-user-info-title\" for=\"textinput\">Member Since</label>\n                        <div class=\"col-md-6\">\n                                <h4 style=\"color:#030354\">{{selectedUser.creationDate}}</h4>\n                        </div>\n                </div>\n        </div>\n        </div>\n\n\n</main>"

/***/ })

},[1202]);
//# sourceMappingURL=main.bundle.js.map