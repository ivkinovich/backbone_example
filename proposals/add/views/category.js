/*global dataPersonalAddProposals */

define([
    'underscore'
    , 'Backbone'
    , 'jquery'
    , 'apps/gsn/personal/proposals/add/collection/categories'
    , 'template!apps/gsn/personal/proposals/add/templates/categories.html'
], function(_, Backbone, $, CategoryCollection, CategoriesTemplate) {
    return Backbone.View.extend({
        categoriesConfig: {
            'category': {
                'products': 'Категория<sup>&nbsp;*</sup>',
                'services': 'Категория',
                'work': 'Сфера деятельности'
            },
            'subcategory': {
                'products': 'Подкатегория<sup>&nbsp;*</sup>',
                'services': '',
                'work': 'Сфера деятельности'
            },
            'current_proposal_type': null
        },

        cache: [],

        events: {
            "click li ul li a": "setCategory"
        },

        template: CategoriesTemplate,

        initialize: function() {
            _.bindAll(this);
            this.model.bind('change:proposal_type', this.loadCategory, this);
        },

        loadCategory: function() {
            var self = this;
            $("#categoryContainer label").html(this.categoriesConfig.category[this.model.get('proposal_type')]);
            if(!_.isUndefined(this.cache[this.model.get('proposal_type')])){
                this.category_list = this.cache[this.model.get('proposal_type')];
                self.render();
            } else {
                this.category_list = new CategoryCollection();
                this.category_list.fetch({
                    data: {'parent_id' : null, 'type': this.model.get('proposal_type')}/*some options*/,
                    success: function(collection) {
                        self.cache[self.model.get('proposal_type')] = self.category_list;
                        self.render();
                    }
                });
            }
        },

        setCategory: function(e) {
            e.preventDefault();
            this.model.set({category_id: $(e.currentTarget).data('category_id')});
            $('#choicesCategories a').removeClass('active');
            $(e.currentTarget).addClass("active").parent('li').css('display', 'list-item');
            $("input[name='category']").val($(e.currentTarget).data('category_sid'));
        },

        render: function() {
            this.$el.html(this.template({categories: this.category_list.toJSON()}));
            return this;
        }
    });
});