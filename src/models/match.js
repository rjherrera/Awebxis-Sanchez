module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    // proposerBookInstance - BookInstance of the user that proposed the match.
    proposerBookInstanceId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    // proposeeBookInstance - BookInstance of the user that has to accept it.
    proposeeBookInstanceId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    scopes: {
      settled: {
        where: {
          accepted: true,
        },
      },
      pending: {
        where: {
          accepted: false,
        },
      },
      withInstances: () => ({
        include: [{
          model: sequelize.models.BookInstance.scope('withBook', 'withUser'),
          as: 'proposerBookInstance',
        }, {
          model: sequelize.models.BookInstance.scope('withBook', 'withUser'),
          as: 'proposeeBookInstance',
        }],
      }),
    },
  });

  Match.prototype.accept = async function accept() {
    await this.update({ accepted: true });

    const proposerInstance = await this.getProposerBookInstance();
    const proposeeInstance = await this.getProposeeBookInstance();

    return proposerInstance.swap(proposeeInstance);
  };

  Match.associate = (models) => {
    Match.belongsTo(models.BookInstance,
      { foreignKey: 'proposerBookInstanceId', as: 'proposerBookInstance' });
    Match.belongsTo(models.BookInstance,
      { foreignKey: 'proposeeBookInstanceId', as: 'proposeeBookInstance' });
  };

  return Match;
};
