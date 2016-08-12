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
            token: ""
        };
        vm.input.token = Core.get("token") ? Core.get("token") : "";
        vm.interfaceTypeList = [];
        vm.typeSelected = "all";
        vm.interfaceOneTypeList = [];
        vm.action = "";
        vm.params = [];
        vm.response = "";
        vm.requestUrl = "";
        vm.userInfo = Core.get("user_info") ? JSON.stringify(Core.get("user_info"), null, 4) : "";
        vm.isSuccess = false;
        var interfaceList;
        getInterfaceList();


        function toggleDesc() {
            vm.desc = !vm.desc;
        }

        function getInterfaceList() {
            Core.Api.Test.getTypeList().then(
                function (data) {
                    console.log("---------");
                    console.log(data);
                    interfaceList = data.api;
                    interfaceClassifyByType();
                    setTypeSelectedListener();
                    setNameSelectedListener();
                },
                function (reason) {
                    console.log(reason);
                    Core.set("token", "");
                    alert(reason.message);
                }
            )
        }

        function signIn() {
            Core.Api.Test.login(vm.loginInfo.username, vm.loginInfo.password).then(
                function (data) {
                    Core.set("token", data.token.token);
                    Core.set("user_info", data);
                    vm.input.token = data.token.token;
                    vm.userInfo = JSON.stringify(data, null, 4);
                },
                function (reason) {
                    Core.set("token", "");
                    alert(reason.message);
                }
            )
        }

        function apiRequest() {
            if (!vm.input.token && vm.isNeedToken) {
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
                    vm.style = "alert-info"
                },

                function (reason) {
                    vm.response = JSON.stringify(reason, null, 4);
                    vm.style = "alert-danger"
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
            var data = interfaceList;
            var interfaceTypes = [];
            for (var i in data) {
                if (interfaceTypes.length == 0) {
                    var interfaceType = {type: "", interfaceList: []};
                    interfaceType.type = data[i].type;
                    interfaceType.interfaceList.push(data[i]);
                    interfaceTypes.push(interfaceType);
                } else {
                    var hasType = false;
                    for (var j in interfaceTypes) {
                        if (interfaceTypes[j].type == data[i].type) {
                            hasType = true;
                            interfaceTypes[j].interfaceList.push(data[i]);
                        }
                    }
                    if (!hasType) {
                        var interfaceType = {type: '', interfaceList: []};
                        interfaceType.type = data[i].type;
                        interfaceType.interfaceList.push(data[i]);
                        interfaceTypes.push(interfaceType);
                    }
                }

            }
            vm.interfaceTypeList = [{type: '全部', interface: ''}].concat(interfaceTypes);
        }

        function setTypeSelectedListener() {
            vm.$watch('selectType', function () {
                if (!vm.selectType || vm.selectType == "全部") {
                    vm.interfaceOneTypeList = [].concat(interfaceList);
                } else {
                    for (var i in vm.interfaceTypeList) {
                        if (vm.interfaceTypeList[i].type == vm.selectType) {
                            vm.interfaceOneTypeList = [].concat(vm.interfaceTypeList[i].interfaceList);
                        }
                    }
                }
            });
        }

        function setNameSelectedListener() {
            vm.$watch('selectName', function () {
                    vm.action = "";
                    var paramList = [];
                    if (vm.selectName && vm.selectName != "0") {
                        for (var i in vm.interfaceOneTypeList) {

                            if (vm.interfaceOneTypeList[i].name == vm.selectName) {

                                for (var j in vm.interfaceOneTypeList[i].params) {
                                    var param = {};
                                    param.name = j;
                                    param.required = vm.interfaceOneTypeList[i].params[j];
                                    param.value = "";
                                    paramList.push(param);
                                }
                                vm.action = vm.interfaceOneTypeList[i].action;
                                vm.params = paramList;
                                vm.isNeedToken = vm.interfaceOneTypeList[i].token;
                                vm.descInfo = vm.interfaceOneTypeList[i].desc ? vm.interfaceOneTypeList[i].desc : "暂无描述";
                            }
                        }

                    }
                }
            );
        }


    }
})
();