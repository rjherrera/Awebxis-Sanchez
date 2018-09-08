const KoaRouter = require('koa-router');

const router = new KoaRouter();

const loadGenre = async (ctx, next) => {
  ctx.state.genre = await ctx.orm.Genre.findOne({ where: { id: ctx.params.id } });
  ctx.assert(ctx.state.genre, 404);
  return next();
};

router.get('genres', '/', async (ctx) => {
  const genres = await ctx.orm.Genre.findAll();
  await ctx.render('genres/index', {
    genres,
  });
});

router.get('genres-new', '/new', async (ctx) => {
  const genre = ctx.orm.Genre.build();
  await ctx.render('genres/new', {
    genre,
    submitGenrePath: ctx.router.url('genres-create'),
  });
});

router.get('genres-edit', '/:id/edit', loadGenre, async (ctx) => {
  const { genre } = ctx.state;
  await ctx.render('genres/edit', {
    genre,
    submitGenrePath: ctx.router.url('genres-update', genre.id),
  });
});

router.post('genres-create', '/', async (ctx) => {
  try {
    const genre = await ctx.orm.Genre.create(ctx.request.body);
    ctx.redirect(ctx.router.url('genres-show', { id: genre.id }));
  } catch (validationError) {
    await ctx.render('genres/new', {
      genre: ctx.orm.Genre.build(ctx.request.body),
      errors: validationError.errors,
      submitGenrePath: ctx.router.url('genres-create'),
    });
  }
});

router.patch('genres-update', '/:id', loadGenre, async (ctx) => {
  const { genre } = ctx.state;
  try {
    await genre.update(ctx.request.body);
    ctx.redirect(ctx.router.url('genres-show', { id: genre.id }));
  } catch (validationError) {
    await ctx.render('genres/edit', {
      genre,
      errors: validationError.errors,
      submitGenrePath: ctx.router.url('genres-update', genre.id),
    });
  }
});

router.get('genres-show', '/:id', loadGenre, async (ctx) => {
  const { genre } = ctx.state;
  await ctx.render('genres/show', {
    genre,
    editGenrePath: ctx.router.url('genres-edit', genre.id),
  });
});

router.delete('genres-destroy', '/:id', loadGenre, async (ctx) => {
  const { genre } = ctx.state;
  await genre.destroy();
  ctx.redirect(ctx.router.url('genres'));
});

module.exports = router;