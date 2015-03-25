angular.module('idsCore')
	.service('$restful', ['$resource', function $restful($resource) {

        return $resource(base_url + '/:resource/:action', {
            action: '@action',
            resource: '@resource'
        }, {
            'get': {method: 'GET'},
            'save': {method: 'POST', params: {}},
            'put': {method: 'PUT', params: {}},
            'query': {method: 'GET', isArray: true},
            'delete': {method: 'DELETE', params: {}}
        });
    }]);