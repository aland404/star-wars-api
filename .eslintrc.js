export default {
  root: true,
  extends: ['@antfu'],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    // Ajouter d'autres réglages si nécessaire
  },
  rules: {
    // Ajoutez des règles personnalisées ou surchargez les règles existantes
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Ajustez selon vos fichiers
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
}
