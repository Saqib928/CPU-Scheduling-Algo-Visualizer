module.exports = {
  apps: [
    {
      name: 'os-algo-visualizer-backend',
      script: './backend/server.js',
      instances: 'max', // or a specific number of instances
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
    }
  ]
};
