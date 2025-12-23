import { Model, DataTypes } from 'sequelize';// Adjust the path as necessary
import { sequelize } from '../config/database.js';

const Guest = sequelize.define('guest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name',
    },
    totalInvitation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_invitation',
    },
    isVip: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_vip',
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
    },
    updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
    }
}, {
    modelName: 'guest',
    tableName: 'guest',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Guest;