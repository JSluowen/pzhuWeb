'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;
    const Major = app.model.define('Major', {
        id: {
            type: INTEGER(10),
            primaryKey: true
        },
        name: {
            type: STRING(16)
        },
        school: {
            type: INTEGER(10),
            references: {
                model: 'school'
            }
        },
        created_at: DATE,
        updated_at: DATE,
    })
    Major.associate = function(){
        app.model.Major.belongsTo(app.model.School,{foreignKey:'school',targetKey:'id'})
    }
    
    return Major
}