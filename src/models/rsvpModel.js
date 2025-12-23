import { Model, DataTypes } from 'sequelize';// Adjust the path as necessary
import { sequelize } from '../config/database.js';

const Rsvp = sequelize.define('rsvp', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPresence: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_presence',
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total',
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    guestId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'guest_id',
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
    modelName: 'rsvp',
    tableName: 'rsvp',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Rsvp.belongsTo(sequelize.models.guest, { foreignKey: 'guest_id' });

export default Rsvp;