define([
    'underscore'
    , 'Backbone'
    , 'jquery'
    , 'template!apps/gsn/personal/proposals/add/templates/activity.html'
], function(_, Backbone, $, ActivityTemplate) {

    return Backbone.View.extend({
        events: {
            "click .checkbox-list input": "SelectActivity"
        },

        template: ActivityTemplate,

        configTypeNames: {
            'products': {
                'title': 'Тип предложения',
                'find': 'Ищу продукт',
                'propose': 'Предлогаю продукт'
            },
            'services': {
                'title': 'Тип предложения',
                'find': 'Ищу услугу',
                'propose': 'Предлогаю услугу'
            },
            'work': {
                'title': 'Тип предложения',
                'find': 'Ищу вакансию',
                'propose': 'Предлогаю вакансию'
            }
        },

        initialize: function() {
            this.model.bind('change:proposal_type', this.render, this);
            this.render();
        },

        SelectActivity: function(e) {
            this.model.set({proposal_activity: $(e.currentTarget).attr('value')});
        },

        render: function() {
            var self = this;
            this.model.set({proposal_activity: 'propose'});
            this.$el.html(this.template({'titles': self.configTypeNames[self.model.get('proposal_type')]})).show();
            return this;
        }
    });
});