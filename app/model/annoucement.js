'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const Announcement = app.model.define('Announcement', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        title:STRING(64),
        abstract:STRING(128),
        poster_link:STRING(128),
        content:TEXT,
        publish_time:DATE,
        read_number:INTEGER,
        status:INTEGER(4),
        top:INTEGER(4),

    },
    {
        freezeTableName: true,  
        tableName: 'announcement',       
        timestamps: false     
    })
    Announcement.associate = function (){
        //app.model.Annoucement.hasOne(app.model.Achievement,{foreignKey:'type_id'});
    }
 
    return Announcement;
}