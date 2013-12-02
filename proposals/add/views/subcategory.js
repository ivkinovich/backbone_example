/*global dataPersonalAddProposals */

define([
    'underscore'
    , 'Backbone'
    , 'jquery'
    , 'apps/gsn/personal/proposals/add/collection/categories'
    , 'template!apps/gsn/personal/proposals/add/templates/subcategories.html'
], function(_, Backbone, $, CategoryCollection, CategoriesTemplate) {
    return Backbone.View.extend({

        events: {
            "change select" : "setSubcategory"
        },

        template: CategoriesTemplate,

        initialize: function() {
            _.bindAll(this);
            this.model.bind('change:category_id', this.loadSubCategory, this);
        },

        loadSubCategory: function() {
            if(this.model.get('proposal_type') == 'products') {
                this.$el.show();
                var self = this;
                this.subcategory_list = new CategoryCollection();
                this.subcategory_list.fetch({
                    data: {'parent_id' : this.model.get('category_id'), 'type': this.model.get('proposal_type')}/*some options*/,
                    success: function(collection) {
                        self.render();
                        $("select", self.$el).trigger("change");
                    }
                });
            } else {
                this.$el.hide();
            }
        },

        setSubcategory: function(e) {
            this.model.set({subcategory_id: $(e.currentTarget).find(":selected").val()});
        },

        render: function() {
            this.$el.html(this.template({categories: this.subcategory_list.toJSON()}));
            return this;
        }
    });
});