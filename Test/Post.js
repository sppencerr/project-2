const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      post: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      //   defaultValue: '0',
        field: 'Post'
      },
      postStatusId: {
          type: DataTypes.INTEGER(10),
          allowNull: true,
          field: 'PostStatusId'
        },
        createdBy: {
          type: DataTypes.INTEGER(10),
          allowNull: true,
          field: 'CreatedBy'
        },
        updatedBy: {
          type: DataTypes.INTEGER(10),
          allowNull: true,
          field: 'ModifiedBy'
        }
    },
        {
            tableName: 'posts',
            updatedAt: false,
            createdAt: false
          }
        );
    
    Post.associate = models => {
        Post.belongsTo(models.Post, { foreignKey: 'postId', as: 'userspost' });
        Post.belongsTo(models.Users, { foreignKey: 'id', as: 'user' }); 
    };