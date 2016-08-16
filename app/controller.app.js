(function () {
    angular
        .module('app')
        .controller('IndexController', ['$scope', 'Core', IndexController]);


    function IndexController($scope, Core) {
        var vm = $scope;
        vm.signIn = signIn;
        vm.logout = logout;
        vm.apiRequest = apiRequest;
        vm.toggleDesc = toggleDesc;
        vm.selectType = "";
        vm.selectName = "";
        vm.desc = false;
        vm.descInfo = "暂无描述";
        vm.loginInfo = {
            password: "",
            username: ""
        };
        vm.input = {
            token: Core.get("token") ? Core.get("token") : ""
        };

        vm.interfaceTypeList = [];
        vm.typeSelected = "all";
        vm.interfaceOneTypeList = [];
        vm.action = "";
        vm.params = [];
        vm.response = "";
        vm.requestUrl = "";
        vm.userInfo = Core.get("user_info") ? JSON.stringify(Core.get("user_info"), null, 4) : "";
        vm.isSuccess = false;
        var interfaceList = [];
        getInterfaceList();


        function toggleDesc() {
            vm.desc = !vm.desc;
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
            console.log(vm.loginInfo);
            Core.Api.Test.login(
                vm.loginInfo.username,
                vm.loginInfo.password
            ).then(
                function (responseData) {
                    Core.set("token", responseData.token);
                    Core.set("user_info", responseData);
                    vm.input.token = responseData.token;
                    vm.userInfo = JSON.stringify(responseData, null, 4);
                },
                function (reason) {
                    Core.set("token", "");
                    alert(reason.message);
                }
            )
        }

        function apiRequest() {
            if (!vm.input.token) {
                alert("请输入token");
                vm.requestUrl = "";
                return;
            }
            var action = vm.action;
            var data = {};
            for (var i in vm.params) {
                data[vm.params[i].name] = vm.params[i].value;
            }
            vm.requestUrl = Core.Api.getUrl(action, data);
            Core.Api.post(action, data).then(
                function (data) {
                    vm.response = JSON.stringify(data, null, 4);
                    vm.style = "alert-info";
                },

                function (reason) {
                    vm.response = JSON.stringify(reason, null, 4);
                    vm.style = "alert-danger";
                }
            );

        }

        function logout() {
            Core.set("token", "");
            Core.set("user_info", "");
            vm.input.token = "";
            vm.userInfo = "";
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


                if (apiItem.type != undefined)
                {
                    typeListInit.push(apiItem.type);
                }
            }
            var typeList = Core.arrayUnique(typeListInit);
            angular.forEach(typeList, function(type, key){
                var typeObject = {
                    type: type,
                    interfaceList: []
                };
                for (var i in apiList) {
                    var apiItem = apiList[i];
                    if (apiItem.type == type)
                    {
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
    }
})
();