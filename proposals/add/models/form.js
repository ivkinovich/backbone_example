define(['Backbone'], function(Backbone) {

    return Backbone.Model.extend({
        url: "/api/gsn_proposals/proposal/",

        defaults: {
            category_id: 0,
            subcategory_id: 0,
            address_id: null,
            metro_id: null,
            cost: 0,
            currency_id: 0,
            title: "",
            description: "",
            proposal_type: "",
            is_price_negotiated: false,
            proposal_activity: "",
            status: "just_created"
        },

        validate: function (attrs, options) {
            var errors = [];
            if(!attrs.category_id) {
                errors.push({'name': 'category_id', 'message': "Необходимо выбрать категорию"});
            }
            if(!attrs.proposal_type) {
                errors.push({'name': 'proposal_type', 'message': "Необходимо выбрать тип предложения"});
            }

            if(!attrs.proposal_activity) {
                errors.push({'name': 'proposal_activity', 'message': "Необходимо выбрать тип предложения(спрос, предложение)"});
            }
            if(!attrs.is_price_negotiated) {
                if(!attrs.cost) {
                    errors.push({'name': 'cost', 'message': "Цена обязательна к заполнению"});
                }
                if(!attrs.currency_id) {
                    errors.push({'name': 'currency_id', 'message': "Выберите валюту"});
                }
            }
            if(!attrs.description) {
                errors.push({'name': 'description', 'message': "Описание необходимо заполнить"});
            }
            if(!attrs.title) {
                errors.push({'name': 'title', 'message': "Заголовок необходимо заполнить"});
            }

            return errors.length > 0 ? errors : false;
        }
    });
});