import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface TransactionAttributes {
  id: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt?: Date;
}

export interface TransactionInput extends Optional<TransactionAttributes, "id"> {}

export class Transaction extends Model<TransactionAttributes, TransactionInput> {
  static initModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        fromAccountId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'id'
          }
        },
        toAccountId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'id'
          }
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        status: {
          type: DataTypes.ENUM('pending', 'completed', 'failed'),
          defaultValue: 'pending'
        }
      },
      {
        sequelize,
        tableName: 'transactions'
      }
    );
  }
}