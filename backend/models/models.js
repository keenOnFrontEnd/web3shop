const sequelize = require('../dbs')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.STRING, primaryKey: true, unique: true },
    email: { type: DataTypes.STRING, allowNull: true },
    web3Name: { type: DataTypes.STRING, allowNull: true, unique: true }
})
const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})
const BasketItem = sequelize.define('basket_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    discountValue: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }
})
const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: true, defaultValue: 'unknowPhoto' },
    item_info: { type: DataTypes.STRING, allowNull: true, defaultValue: 'No description'},
    category: {type: DataTypes.STRING, allowNull: false, defaultValue: 'unisex'}
})
const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})
const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})
const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false }
})
const Sizes = sequelize.define('sizes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.STRING, allowNull: false }
})

const ItemSize = sequelize.define('itemSize', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, defaultValue: 0 }
})

const TypeBrand = sequelize.define('type+brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Type.hasMany(Item)
Item.belongsTo(Type)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Item.hasMany(BasketItem)

BasketItem.belongsTo(Item)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

Item.belongsToMany(Sizes, { through: ItemSize })
Sizes.belongsToMany(Item, { through: ItemSize })
ItemSize.belongsTo(Item)
ItemSize.belongsTo(Sizes)
Item.hasMany(ItemSize)
Sizes.hasMany(ItemSize)


module.exports = {
    User,
    Basket,
    BasketItem,
    Item,
    Type,
    Brand,
    Rating,
    TypeBrand,
    Sizes,
    ItemSize,
}