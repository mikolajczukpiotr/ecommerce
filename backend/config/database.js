module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env(
        "DATABASE_HOST",
        "dpg-cnav9ota73kc73eoepl0-a.frankfurt-postgres.render.com"
      ),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "sample_ivt6"),
      user: env("DATABASE_USERNAME", "admin"),
      password: env("DATABASE_PASSWORD", "30nS3Tkdpipl4Dx0WFHSg4Kxg8Z7cqJi"),
      ssl: env.bool("DATABASE_SSL", true),
    },
  },
});
