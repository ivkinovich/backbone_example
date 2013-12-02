define([
    'underscore',
    'Backbone',
    'jquery',
    'gen-js/media_types',
    '../collections/files',
    './file',
    '../models/user',
    'bower_components/blueimp-file-upload/js/jquery.fileupload',
    'bower_components/blueimp-file-upload/js/jquery.iframe-transport',
    'bower_components/blueimp-file-upload/js/jquery.fileupload-process',
    'bower_components/blueimp-file-upload/js/jquery.fileupload-image'
], function(_, Backbone, $, MediaTypes, FilesCollections, FileView, UserModel) {

    return Backbone.View.extend({
        el: $(".gallery"),

        filesCollection: new FilesCollections(),

        events: {
            'click .upload-link-container a': 'addFile'
        },

        initialize: function() {
            this.bindFileUploadPlugin();
            this.listenTo(this.filesCollection, "add", _.bind(this.uploadFile, this));
        },

        addFile: function(e) {
             e.preventDefault();

             this.$el.find(".upload-link-container input").click();
        },

        uploadFile: function(model) {
            var view = new FileView();
            view.render(model);
            this.$el.find(".uploaded-files").append(view.el);
        },

        bindFileUploadPlugin: function() {
            var that = this;

            this.$el.find('input[type=file]').fileupload({
                dataType: 'json',
                autoUpload: false,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
            }).on('fileuploadprocessdone', function(e, data) {
                that.filesCollection.add(data);
                var addedFile = that.filesCollection.at(that.filesCollection.length - 1);

                $.ajax({
                    type: 'POST',
                    url: '/api/media/upload',
                    /*
                        TODO: пока фотографии привязываются на текущего пользователя
                        в формате "user_[user id]". Тип пока используется для объявлений.
                        Позже нужно заменить entity_id на нужный, и тип на правильный.
                     */
                    data: {
                        will_be_private: false,
                        entity_id: UserModel.getInstance().getEntityId(),
                        max_content_length: (2 * 1024 * 1024),
                        entity_type: MediaTypes.EntityType.ADVERT
                    }
                }).done(function(res) {
                    addedFile.set({
                        url: res.upload_endpoint,
                        paramName: res.upload.name
                    });

                    that.options.proposalsInstance.addUploadName(
                        res.upload.name + ',' + res.upload.file.public_url
                    );

                    addedFile.attributes.submit();
                });
            });
        },

        render : function() {}
    });
});