(function () {
    angular
        .module('app')
        .controller('IndexController', ['$scope', 'Core', IndexController]);


    function IndexController($scope, Core) {
        var vm = $scope;
        vm.signIn = signIn;
        vm.adminSignIn = adminSignIn;
        vm.logout = logout;
        vm.adminLogout = adminLogout;
        vm.apiRequest = apiRequest;
        vm.toggleDesc = toggleDesc;
        vm.showUserDetail = showUserDetail;
        vm.showAdminDetail = showAdminDetail;
        vm.inputToken = inputToken;
        vm.selectType = "";
        vm.selectName = "";
        vm.desc = false;
        vm.descInfo = "暂无描述";
        vm.loginInfo = {
            password: "",
            username: ""
        };
        vm.adminLoginInfo = {
            password: "",
            username: ""
        };
        vm.input = {
            token: Core.getToken() ? Core.getToken() : ""
        };

        vm.interfaceTypeList = [];
        vm.typeSelected = "all";
        vm.interfaceOneTypeList = [];
        vm.action = "";
        vm.params = [];
        vm.response = "";
        vm.requestUrl = "";
        vm.userInfo = Core.get(Core.Const.KEY_USER_INFO) ? JSON.stringify(Core.get(Core.Const.KEY_USER_INFO), null, 4) : "";
        vm.adminInfo = Core.get(Core.Const.KEY_ADMIN_INFO) ? JSON.stringify(Core.get(Core.Const.KEY_ADMIN_INFO), null, 4) : "";
        vm.isSuccess = false;
        vm.showUserDeatilStatus = false;
        vm.showAdminDeatilStatus = false;
        var interfaceList = [];
        getInterfaceList();


        function toggleDesc() {
            vm.desc = !vm.desc;
        }

        function showUserDetail() {
            vm.showUserDeatilStatus = !vm.showUserDeatilStatus;
        }

        function showAdminDetail() {
            vm.showAdminDeatilStatus = !vm.showAdminDeatilStatus;
        }

        function getInterfaceList() {
            Core.Api.Test.getTypeList().then(
                function (data) {
                    interfaceList = data.list;
                    // console.log(interfaceList);
                    interfaceClassifyByType();
                    setTypeSelectedListener();
                    setNameSelectedListener();
                },
                function (reason) {
                    Core.setToken("");
                    alert(reason.message);
                }
            )
        }

        function signIn() {
            console.info("user login");
            Core.Api.Test.login(
                vm.loginInfo.username,
                vm.loginInfo.password
            ).then(
                function (res) {
                    console.log('12');
                    if (res.code == 0) {
                        Core.setToken(res.token);
                        Core.set(Core.Const.KEY_USER_INFO, res);
                        vm.input.token = res.token;
                        vm.userInfo = JSON.stringify(res, null, 4);
                    }
                    else {
                        showError(res);
                    }
                },
                function (err) {
                    Core.setToken("");
                    showError(err.message);
                }
            )
        }

        function adminSignIn() {
            console.info("admin login");
            Core.Api.Test.adminLogin(
                vm.adminLoginInfo.username,
                vm.adminLoginInfo.password
            ).then(
                function (res) {
                    if (res.code == 0) {
                        Core.setToken(res.token);
                        Core.set(Core.Const.KEY_ADMIN_INFO, res);
                        vm.input.token = res.token;
                        vm.adminInfo = JSON.stringify(res, null, 4);
                    }
                    else {
                        showError(res)
                    }
                },
                function (err) {
                    Core.setToken("");
                    showError(err.message);
                }
            )
        }

        function apiRequest() {
            // if (!vm.input.token) {
            //     alert("请输入token");
            //     vm.requestUrl = "";
            //     return;
            // }
            var action = vm.action;
            var data = {};
            for (var i in vm.params) {
                data[vm.params[i].name] = vm.params[i].value;
            }
            Core.Api.getUrl(action, data).then(function (data) {
                vm.requestUrl = data;
            });

            Core.Api.post(action, data).then(
                function (res) {
                    if (res.hasOwnProperty("token")) {
                        Core.setToken(res.token);
                        vm.input.token = res.token;
                    }
                    vm.response = JSON.stringify(res, null, 4);
                    vm.style = "alert-info";
                },

                function (err) {
                    vm.response = JSON.stringify(err, null, 4);
                    vm.style = "alert-danger";
                }
            );

        }

        function logout() {
            Core.setToken("");
            Core.set(Core.Const.KEY_USER_INFO, "");
            vm.input.token = "";
            vm.userInfo = "";
        }

        function adminLogout() {
            Core.setToken("");
            Core.set(Core.Const.KEY_ADMIN_INFO, "");
            vm.input.token = "";
            vm.adminInfo = "";
        }

        function interfaceClassifyByType() {
            var apiList = interfaceList;

            //接口类型列表
            var apiTypeList = [];

            //所有接口列表, 未分类
            var typeAllList = {
                type: '全部',
                interfaceList: []
            };

            var typeListInit = [];
            //先生成全部的接口列表
            for (var i in apiList) {
                var apiItem = apiList[i];
                typeAllList.interfaceList.push(apiItem);


                if (apiItem.type != undefined) {
                    typeListInit.push(apiItem.type);
                }
            }
            var typeList = Core.arrayUnique(typeListInit);
            angular.forEach(typeList, function (type, key) {
                var typeObject = {
                    type: type,
                    interfaceList: []
                };
                for (var i in apiList) {
                    var apiItem = apiList[i];
                    if (apiItem.type == type) {
                        typeObject.interfaceList.push(apiItem);
                    }
                }
                apiTypeList.push(typeObject);
            });

            apiTypeList.unshift(typeAllList);

            console.log(apiTypeList);

            vm.interfaceTypeList = apiTypeList;
        }

        function setTypeSelectedListener() {
            vm.$watch('selectType', function (newValue, oldValue) {
                if (!newValue) return;
                vm.interfaceOneTypeList = newValue.interfaceList;
            });
        }

        function setNameSelectedListener() {
            vm.$watch('selectName', function (newValue, oldValue) {
                if (!newValue) return;

                console.log(newValue);

                vm.action = "";
                var paramList = [];

                angular.forEach(newValue.params, function (item, key) {
                    var param = {
                        name: key,
                        value: "",
                        required: item
                    };

                    paramList.push(param);
                });
                vm.action = newValue.action;
                vm.params = paramList;
                vm.descInfo = newValue.desc ? newValue.desc : "暂无描述";
            });
        }

        function inputToken() {
            var token = prompt("Input Your Token", "");
            console.info("input token: ", token);
            if (token != null) {
                Core.setToken(token);
                vm.input.token = token;
            }
            else {

            }
        }
        
        function showError(data) {
            alert(JSON.stringify(data));
        }
    }
})
();