const envConfigs = {
    development: {
        databaseFile: 'dev.db.sqlite3',
        currentEnv: 'development'
    },
    production: {
        databaseFile: 'prod.db.sqlite3',
        currentEnv: 'production'
    },
    test: {
        databaseFile: 'int.test.db.sqlite3',
        currentEnv: 'test'
    },
    e2e: {
        databaseFile: 'e2e.test.db.sqlite3',
        currentEnv: 'e2e'
    }
} as const

type ConfigsByEnv = {
    readonly databaseFile: string;
    readonly currentEnv: keyof EnvConfigs;
}

type EnvConfigs = typeof envConfigs;
type AllowedEnvKeys = keyof EnvConfigs;

function isValidEnv(env: string): env is AllowedEnvKeys {
    return Object.keys(envConfigs).includes(env);
}

export function checkEnv(): AllowedEnvKeys {
    const currentEnv = process.env.CURRENT_ENV;

    if (!currentEnv || !isValidEnv(currentEnv)) {
        throw new Error('Verifique os .env* e os valores em src/env/configs.ts');
    }

    return currentEnv as AllowedEnvKeys;
}

export function getFullEnv() {
    const currentenv = checkEnv();
    return envConfigs[currentenv] as ConfigsByEnv;
}