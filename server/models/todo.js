'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User);
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Field Title cannot be empty'
        },
        customValid (value) {
          if (!value) {
            throw new Error('Field Title cannot be empty');
          }
        }     
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Field Description cannot be empty'
        },
        customValid (value) {
          if (!value) {
            throw new Error('Field Description cannot be empty');
          }
        }    
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Field Status cannot be empty'
        },
        isIn: {
          args :[['active', 'nonactive']], 
          msg: 'Input status with active or nonactive'
        },
        customValid (value) {
          if (!value) {
            throw new Error('Field Description cannot be empty');
          }
        }    
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Field Due Date cannot be empty'
        },
        isAfter: {
          args : `${new Date()}`,
          msg  : 'Due Date must after today'
        },
        customValid (value) {
          if (!value) {
            throw new Error('Field Description cannot be empty');
          }
        }    
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};