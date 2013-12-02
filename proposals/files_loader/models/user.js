define(['apps/common/models/singlton'], function(SingletonModel) {
    return SingletonModel.extend({
        url: '/api/user/user/',

        getEntityId: function() {
            return 'user_' + this.get('id');
        }
    });
});
