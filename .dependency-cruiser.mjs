/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Production source dependencies must remain acyclic.',
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    includeOnly: '^src',
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: 'tsconfig.json' },
    skipAnalysisNotInRules: true,
  },
};
