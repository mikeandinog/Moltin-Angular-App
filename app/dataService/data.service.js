System.register(['angular2/core', 'rxjs/Rx', 'angular2/http', './service.details'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1, http_1, service_details_1;
    var DataService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (service_details_1_1) {
                service_details_1 = service_details_1_1;
            }],
        execute: function() {
            DataService = (function () {
                function DataService(http) {
                    this.http = http;
                    this.currentDate = Math.floor(Date.now());
                }
                //authenticates with Moltin API and gets access token
                DataService.prototype.authorize = function () {
                    this.moltin = new Moltin({ publicId: service_details_1.Statics.PUBLIC_ID });
                    this.moltin.Authenticate(function (response) {
                        sessionStorage.setItem('access-token', JSON.stringify(response));
                    });
                };
                DataService.prototype.getData = function (dataurl) {
                    //stores sessionStorage in a temp varirable
                    var session = JSON.parse(sessionStorage.getItem('access-token'));
                    //
                    //Checks if Token has expired
                    if (this.currentDate >= session.expires) {
                        this.authorize();
                    }
                    else {
                    }
                    //gets data from API
                    return this.http.get(dataurl, {
                        headers: new http_1.Headers({
                            "Authorization": "Bearer " + session.token
                        })
                    })
                        .map(function (data) { return data.json().result; })
                        .catch(this.handleError);
                };
                DataService.prototype.getCategories = function () {
                    return this.getData('https://api.molt.in/v1/categories');
                };
                DataService.prototype.getAllProducts = function () {
                    return this.getData('https://api.molt.in/v1/products');
                };
                DataService.prototype.search = function (terms) {
                    return this.getData('https://api.molt.in/v1/products/search?title=' + terms);
                };
                DataService.prototype.handleError = function (error) {
                    // in a real world app, we may send the error to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Rx_1.Observable.throw(error.json().error || 'Server error');
                };
                DataService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DataService);
                return DataService;
            }());
            exports_1("DataService", DataService);
        }
    }
});
//# sourceMappingURL=data.service.js.map