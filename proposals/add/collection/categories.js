define([
    'Backbone'
    , 'apps/gsn/personal/proposals/add/models/category'
], function(Backbone, CategoryModel) {

    return Backbone.Collection.extend({
        model: CategoryModel,
        url: "/api/gsn_proposals/categories/",
        parse : function(resp) {
            return resp;
        }
    });
});